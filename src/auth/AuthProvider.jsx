import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, configurationError } from '../lib/supabase';
const Context = createContext(null);
export const useAuth = () => useContext(Context);
export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, admin: false, loading: !!supabase, error: '' });
  const generation = useRef(0);
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    const check = async session => {
      const token = ++generation.current;
      const user = session?.user ?? null;
      setState({ user, admin: false, loading: !!user, error: '' });
      if (!user) return;
      // Never infer admin from login alone. Failure denies access. Generation prevents
      // old membership responses restoring protected state after logout/user change.
      try {
        const { data, error } = await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
        if (!alive || token !== generation.current) return;
        setState({ user, admin: !error && data?.user_id === user.id, loading: false, error: error ? 'Não foi possível verificar sua permissão de administrador. Tente entrar novamente.' : '' });
      } catch {
        if (alive && token === generation.current) setState({ user, admin: false, loading: false, error: 'Não foi possível verificar sua permissão. Confira sua conexão.' });
      }
    };
    // INITIAL_SESSION restores persisted sessions. Defer DB work outside auth callback.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      generation.current++;
      setState({ user: session?.user ?? null, admin: false, loading: !!session?.user, error: '' });
      queueMicrotask(() => { if (alive) check(session); });
    });
    return () => { alive = false; generation.current++; subscription.unsubscribe(); };
  }, []);
  const logout = async () => {
    generation.current++;
    setState({ user: null, admin: false, loading: false, error: '' });
    const { error } = await supabase.auth.signOut();
    if (error) setState(s => ({ ...s, error: 'Não foi possível encerrar a sessão no servidor. Tente sair novamente.' }));
  };
  return <Context.Provider value={{ ...state, logout }}>{children}</Context.Provider>;
}
export function Protected({ children }) {
  const auth = useAuth();
  if (configurationError) return <p className="notice" role="alert">{configurationError}</p>;
  if (auth.loading) return <p role="status">Verificando acesso…</p>;
  if (!auth.user) return <Navigate to="/entrar" replace />;
  if (!auth.admin) return <div className="notice" role="alert">{auth.error || 'Acesso restrito a administradores autorizados.'}</div>;
  return children;
}
