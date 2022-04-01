import React from "react";
import "../styles/Home.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../storeTokens/Auth-Context";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
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
            {/* to change pw , uncomment if you want to implement it */}
            {/* {isLoggedIn && (
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            )} */}
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Home;
