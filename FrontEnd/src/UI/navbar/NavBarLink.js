import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBarLink.module.css';
const NavBarLink = (props) => {
    return (
        <li className={classes.navitem}>
            <NavLink className={`${classes.navlink}`} to={`${props.path}`} onClick={props.onClickHandler}>
            {props.children}
            </NavLink>
        </li>
    )
}

export default NavBarLink;