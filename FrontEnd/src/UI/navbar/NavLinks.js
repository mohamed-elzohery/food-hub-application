import React from 'react';
import NavBarLink from './NavBarLink';
import classes from './NavLinks.module.css';
import { ReactComponent as CartSVG } from './cart-icon.svg';

const NavLinks = (props) => {
    return (
        <ui className={`${props.navlinksStyles} ${classes.navlinks}`}>
            <NavBarLink>Login</NavBarLink>
            <NavBarLink>Register</NavBarLink>
            <NavBarLink>Meals</NavBarLink>
            <NavBarLink>My Cart <span className={classes.carticon}><CartSVG /><span className={classes.counter}>0</span></span></NavBarLink>
            <NavBarLink>logout</NavBarLink>
        </ui>
    )
}

export default NavLinks;