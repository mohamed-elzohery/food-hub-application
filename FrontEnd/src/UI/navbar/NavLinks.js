<<<<<<< HEAD
import React from 'react';
import NavBarLink from './NavBarLink';
import classes from './NavLinks.module.css';
import { ReactComponent as CartSVG } from './cart-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { UIActions } from '../../slices/UI-slice';

const NavLinks = (props) => {
    const cartAmount = useSelector(state => state.cart.cartCount);
    const dispatch = useDispatch();
    const openCart = (e) => {
        e.preventDefault();
        console.log("Cart will be opened soon");
        dispatch(UIActions.openCart());
    }

    return (
        <ul className={`${props.navlinksStyles} ${classes.navlinks}`}>
            <NavBarLink path='/login'>Login</NavBarLink>
            <NavBarLink>Register</NavBarLink>
            <NavBarLink>Home</NavBarLink>
            <NavBarLink onClickHandler={openCart}>My Cart <span className={classes.carticon}><CartSVG /><span className={classes.counter}>{cartAmount}</span></span></NavBarLink>
            <NavBarLink>logout</NavBarLink>
        </ul>
    )
}
=======
import React from "react";
import NavBarLink from "./NavBarLink";
import classes from "./NavLinks.module.css";
import { ReactComponent as CartSVG } from "./cart-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../storeTokens/Auth-Context";
import { useNavigate } from "react-router-dom";

const NavLinks = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggined);
>>>>>>> a601112a9272fbbde3fb0d51bf2ed71c7ce83d49

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
        <NavBarLink onClickHander={loginHandler}>Login</NavBarLink>
      )}
      {!isLoggedIn && (
        <NavBarLink onClickHander={registerHandler}>Register</NavBarLink>
      )}
      <NavBarLink>Meals</NavBarLink>
      <NavBarLink>
        My Cart{" "}
        <span className={classes.carticon}>
          <CartSVG />
          <span className={classes.counter}>0</span>
        </span>
      </NavBarLink>
      {isLoggedIn && (
        <NavBarLink onClickHander={logoutHandler}>Logout</NavBarLink>
      )}
    </ul>
  );
};

export default NavLinks;
