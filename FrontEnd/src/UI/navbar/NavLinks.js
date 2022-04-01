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
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    console.log("logout");
  };

  return (
    <ui className={`${props.navlinksStyles} ${classes.navlinks}`}>
      <NavBarLink>Login</NavBarLink>
      <NavBarLink>Register</NavBarLink>
      <NavBarLink>Meals</NavBarLink>
      <NavBarLink>
        My Cart{" "}
        <span className={classes.carticon}>
          <CartSVG />
          <span className={classes.counter}>0</span>
        </span>
      </NavBarLink>
      <button onClick={logoutHandler}>logout</button>
    </ui>
  );
};

export default NavLinks;
