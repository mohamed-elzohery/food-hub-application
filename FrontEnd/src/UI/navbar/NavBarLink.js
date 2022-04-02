import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavBarLink.module.css";
const NavBarLink = (props) => {
  return (
    <li className={classes.navitem}>
      <NavLink
        className={`${classes.navlink}`}
        to="/"
        onClick={props.onClickHander}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavBarLink;
