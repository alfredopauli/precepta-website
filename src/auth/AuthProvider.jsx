import { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
const Context = createContext();
export const useAuth = () => useContext(Context);
export function AuthProvider({ children }) {
  const [state, setState] = useState({
    loading: !!supabase,
    user: null,
    admin: false,
    error: "",
  });
  const generation = useRef(0);
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    async function verify(session) {
      const token = ++generation.current;
      if (!active) return;
      setState({ loading: true, user: null, admin: false, error: "" });
      let admin = false,
        error = "";
      if (session?.user) {
        try {
          const result = await supabase
            .from("admins")
            .select("user_id")
            .eq("user_id", session.user.id)
            .maybeSingle();
          if (result.error) throw result.error;
          admin = !!result.data;
        } catch {
          error =
            "Não foi possível verificar seu acesso administrativo. Tente entrar novamente.";
        }
      }
      if (active && token === generation.current)
        setState({ loading: false, user: session?.user ?? null, admin, error });
    }
    // Schedule outside the auth callback to avoid locking Supabase auth operations.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((s) => ({ ...s, loading: true, admin: false }));
      queueMicrotask(() => verify(session));
    });
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        if (active)
          setState({
            loading: false,
            user: null,
            admin: false,
            error: "Não foi possível restaurar a sessão.",
          });
      } else verify(data.session);
    });
    return () => {
      active = false;
      generation.current++;
      subscription.unsubscribe();
    };
  }, []);
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Não foi possível sair. Tente novamente.");
  };
  return (
    <Context.Provider value={{ ...state, logout }}>{children}</Context.Provider>
  );
}
