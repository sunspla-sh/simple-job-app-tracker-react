import { useState, useEffect, createContext } from 'react';

import { AuthService } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children, config }) => {

  const { signUpUrl, logInUrl, verifyUrl } = config;

  const authService = new AuthService({
    signUpUrl,
    logInUrl,
    verifyUrl
  });
  console.log(authService);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const value = {
    isLoading,
    isLoggedIn,
    user,
    authService
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
  
};