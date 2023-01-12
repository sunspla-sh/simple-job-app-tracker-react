import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

import { WSContext } from "./WSContext";
import { AuthContext } from "react-auth";


export const WSProvider = ({ children, config }) => {

  const { baseUrl } = config;

  const { isLoggedIn, authService } = useContext(AuthContext);

  const [socket, setSocket] = useState(null);

  //DO WE NEED A SERVICE? PROBABLY, BUT LET'S GET A BETA DEPLOYED FIRST

  useEffect(() => {
    
    if(isLoggedIn){ //open connection
      const s = io(baseUrl, {
        auth: {
          authToken: authService.retrieveAuthToken()
        }
      });
      s.on("connect_error", err => {
        console.log("connect_error from socket middleware", err.message); // not authorized
        setSocket(null);
      });
      s.on('connect', () => {
        setSocket(s);
      });
    } else { //close connection
      if(socket){
        socket.disconnect()
        setSocket(null);
      }
    }
  }, [isLoggedIn]);

  return (
    <WSContext.Provider value={{
      socket
    }}>
      { children }
    </WSContext.Provider>
  );

};