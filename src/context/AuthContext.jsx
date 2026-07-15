import { createContext, useState } from 'react';


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [ session, setSession ] = useState(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

