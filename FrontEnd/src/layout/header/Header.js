import React from "react";
import foodImg from "./food.jpg";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={classes.header}>
        <img src={foodImg} alt="food" />
        <div className={classes.textbox}>
          <h1>Order your food</h1>
          <p>
            We give you a large variety of food to choose from, It os fast and
            easy application tou can use it now for free.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
