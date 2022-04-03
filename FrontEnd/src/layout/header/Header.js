import React from "react";
import { useSelector } from "react-redux";
import foodImg from "./food.jpg";
import classes from "./Header.module.css";
import NavBar from "../../UI/navbar/NavBar";
const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggined);
  return (
    <header>
      <NavBar />
      {isLoggedIn && <div className={classes.header}>
        <img src={foodImg} alt="food" />
        <div className={classes.textbox}>
          <h1>Order your food</h1>
          <p>
            We give you a large variety of food to choose from, It os fast and
            easy application tou can use it now for free.
          </p>
        </div>
      </div>}
    </header>
  );
};

export default Header;
