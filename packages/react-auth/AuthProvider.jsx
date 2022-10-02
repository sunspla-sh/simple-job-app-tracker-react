import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null)

  const value = {
    isLoading,
    isLoggedIn,
    user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
  
};