import React, { useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token);

  //to reverse falsey & true values to booleans
  const userIsLoggedIn = !!token;
  const loginHandler = (token, expirationData) => {
    setToken(token);
    setCookie("token", token, { path: "/", expires: expirationData });
  };
  const logoutHandler = () => {
    setToken(null);
    removeCookie("token");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
