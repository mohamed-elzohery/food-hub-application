import React from "react";
import NavBarLink from "./NavBarLink";
import classes from "./NavLinks.module.css";
import { ReactComponent as CartSVG } from "./cart-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/Auth-slice";
import { loginAction, registerAction } from "../../slices/Login-State-slice";

import { useNavigate } from "react-router-dom";
import { UIActions } from "../../slices/UI-slice";

const NavLinks = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.cartCount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggined);

  const openCartHandler = (e) => {
    e.preventDefault();
    dispatch(UIActions.openCart());
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/");
    console.log("logout");
  };
  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(loginAction());
    navigate("/auth");
  };

  const registerHandler = (event) => {
    event.preventDefault();
    dispatch(registerAction());
    navigate("/auth");
  };

  return (
    <ul className={`${props.navlinksStyles} ${classes.navlinks}`}>
      {!isLoggedIn && (
        <NavBarLink onClickHandler={loginHandler}>Login</NavBarLink>
      )}
      {!isLoggedIn && (
        <NavBarLink onClickHandler={registerHandler}>Register</NavBarLink>
      )}
      <NavBarLink>Meals</NavBarLink>
      <NavBarLink onClickHandler={openCartHandler}>
        My Cart
        <span className={classes.carticon}>
          <CartSVG />
          <span className={classes.counter}>{cartCount}</span>
        </span>
      </NavBarLink>
      {isLoggedIn && (
        <NavBarLink onClickHandler={logoutHandler}>Logout</NavBarLink>
      )}
    </ul>
  );
};

export default NavLinks;
