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

export default NavLinks;