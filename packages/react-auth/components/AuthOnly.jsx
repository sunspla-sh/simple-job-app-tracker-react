import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { Navigate } from 'react-router-dom';

/**
 * This component protects pages that the user
 * should only be able to reach if logged in
 */
export const AuthOnly = ({ children }) => {

  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if(isLoading){
    return (
      <p>Loading...</p>
    );
  }

  if(!isLoggedIn){
    return (
      <Navigate to="/login" />
    );
  }
  
  return children;

};