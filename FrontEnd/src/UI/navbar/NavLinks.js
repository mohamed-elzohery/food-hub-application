import React from "react";
import NavBarLink from "./NavBarLink";
import classes from "./NavLinks.module.css";
import { ReactComponent as CartSVG } from "./cart-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../storeTokens/Auth-Context";
import { useNavigate } from "react-router-dom";
import { UIActions } from "../../slices/UI-slice";

const NavLinks = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.cart.cartCount);
  const isLoggedIn = true;

  const openCartHandler = (e) => {
    e.preventDefault();
    dispatch(UIActions.openCart());
  }

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/");
    console.log("logout");
  };
  const loginHandler = (event) => {
    event.preventDefault();
    navigate("/auth");
  };

  const registerHandler = (event) => {
    event.preventDefault();
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
