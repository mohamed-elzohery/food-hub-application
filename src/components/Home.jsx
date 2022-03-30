import React from "react";
import "../styles/Home.module.css";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
        <div className="nav">
          <ul>
            <li className="first">
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Home;
