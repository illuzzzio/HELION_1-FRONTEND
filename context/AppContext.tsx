"use client"
import { createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs";

// 1. Create the context
export const AppContext = createContext();

// 2. Custom hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};

// 3. Context provider component
export const AppContextProvider = ({ children }) => {
  const { user } = useUser();

  const value = {
    user,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

 