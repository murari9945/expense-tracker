import React, { createContext, useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './authReducer';
/*export const AuthContext = createContext({
  token:' ',
  isLoggedIn:false,
  login: (token) => {},
  logout: () => {},
  sendEmailVerification: () => {},
  // Add the isEmailVerified state and its default value
  isEmailVerified: false,
});*/

const AuthContextProvider = (props) => {
   /* const initialToken=localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [isEmailVerified, setIsEmailVerified] = useState(false);*/
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isEmailVerified = useSelector((state) => state.auth.isEmailVerified);
  const userLoggedIn= !!token;
  useEffect(() => {
    let logoutTimer;
    if (token) {
      const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
      logoutTimer = setTimeout(logoutHandler, expirationTime);
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [token]);

  const loginHandler = (token) => {
   // setToken(token);
   dispatch(authActions.login(token));
    localStorage.setItem('token',token);
  };

  const logoutHandler = () => {
    //setToken(null);
    dispatch(authActions.logout());
    localStorage.removeItem('token');
  };
  
  const sendEmailVerification = () => {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyClIPPOHZO2rXXR0jqDK2r6W4eXHCqU5SQ', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Email verification sent:', data);
      })
      .catch((error) => {
        console.log('Email verification error:', error);
      });
      
  };


  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn:userLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        sendEmailVerification:sendEmailVerification,
        isEmailVerified:isEmailVerified,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
