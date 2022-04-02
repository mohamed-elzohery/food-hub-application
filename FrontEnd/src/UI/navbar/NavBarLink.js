import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavBarLink.module.css";
const NavBarLink = (props) => {
<<<<<<< HEAD
    return (
        <li className={classes.navitem}>
            <NavLink className={`${classes.navlink}`} to={`${props.path}`} onClick={props.onClickHandler}>
            {props.children}
            </NavLink>
        </li>
    )
}
=======
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
>>>>>>> a601112a9272fbbde3fb0d51bf2ed71c7ce83d49

export default NavBarLink;
