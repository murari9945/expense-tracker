import React, { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext({
  token:' ',
  isLoggedIn:false,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
    const initialToken=localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
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
    setToken(token);
    localStorage.setItem('token',token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn:userLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
