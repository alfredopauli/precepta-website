import { fakedb } from "../database";

import { createContext, useState } from "react";


export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [ data, setData ] = useState(fakedb);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

