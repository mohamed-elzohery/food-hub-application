import React from 'react';
import classes from './LogoBox.module.css';
import { NavLink } from 'react-router-dom';
import logo from './logo192.png';

const LogoBox = (props) => {
    return <NavLink className={`${classes.logobox}`} to='/' >
            <img src={logo} className={classes.logo}/>
            <h1>Food Hub</h1>
        </NavLink>
}

export default LogoBox;