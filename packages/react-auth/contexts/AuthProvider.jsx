import { useState, useEffect } from 'react';

import { AuthContext } from './AuthContext';

import { AuthService } from '../services/auth.service';

export const AuthProvider = ({ children, config }) => {

  const { signUpUrl, logInUrl, verifyUrl, requestPasswordResetUrl, passwordResetUrl } = config;

  const authService = new AuthService({
    signUpUrl,
    logInUrl,
    verifyUrl,
    requestPasswordResetUrl,
    passwordResetUrl
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyUser = async () => {

    try{
      const user = await authService.verify();
      setIsLoading(false);
      setIsLoggedIn(true);
      setUser(user);
    } catch (err) {
      setIsLoading(false);
      setIsLoggedIn(false);
      setUser(null);
      throw err
    }

  };

  const logOutUser = async () => {
    authService.removeAuthToken();
    try {
      await verifyUser();
    } catch (err) {}
  }

  useEffect(() => {
    (async () => {
      try {
        await verifyUser();
      } catch (err) {
        console.log(err)
      }
    })();
  }, [])

  const value = {
    isLoading,
    isLoggedIn,
    user,
    authService,
    verifyUser,
    logOutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
  
};