import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../supabase-client'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined); 

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) 
          throw Error(error);
        setSession(data.session);
      } catch (error) {
        console.error("Error getting session: ", error.message);
      }
    } 
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    getInitialSession();
  }, []); // [] is important! only once it renders first time
  

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase signin error");
        return { success: false, error: error.message }
      }
      console.log("Supabase singin success");
      return { success: true, data };
    } catch (error) {
      console.error("Unexpeted", error.message);
      return { success: false, error: "Unexpected" }
    }
  };
  
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.log("Supabase signout error");
        return { success: false, error: error.message };
      }
      console.log("Signout sucess");
      return { success: true };
    } catch (error) {
      console.log("Unexpeted", error.message);
      return { success: false, error: error.message };
    }
  }

  const signUpUser = async (email, password) => {
    try {
      console.log("Loggin in...");
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase signup error");
        return { success: false, error: error.message }
      }
      console.log("Supabase singup success");
      return { success: true, data };
    } catch (error) {
      console.error("Unexpeted", error.message);
      return { success: false, error: "Unexpected" }
    }
  }
  
  return (
    <AuthContext.Provider value={{ session, signInUser, signOut, signUpUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}

