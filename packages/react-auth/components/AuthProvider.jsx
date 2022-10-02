import { useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import { AuthService } from '../services/auth.service';

export const AuthProvider = ({ children, config }) => {

  const { signUpUrl, logInUrl, verifyUrl } = config;

  const authService = new AuthService({
    signUpUrl,
    logInUrl,
    verifyUrl
  });

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