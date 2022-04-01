import React, { useContext } from "react";
import "../styles/Home.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../storeTokens/Auth-Context";

function Home() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <>
      <header>
        <div className="nav">
          <ul>
            <li className="first">
              <NavLink to="/">Home</NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink to="/auth">Signup/Login</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            )}
            {/* {!isLoggedIn && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )} */}
            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Home;
