import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from 'react-router-dom';
import { LoadingHeart } from "react-ui";

/**
 * This component protects pages that the user
 * should only be able to reach if logged out
 */
export const UnauthOnly = ({ redirect, children }) => {

  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if(isLoading){
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}>
        <LoadingHeart message={'Loading...'} />
      </div>
    );
  }

  if(isLoggedIn){
    return (
      <Navigate to={redirect} />
    );
  }
  
  return children;

};