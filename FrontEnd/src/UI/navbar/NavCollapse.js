import React from 'react';
import classes from './NavCollapse.module.css';

const NavCollapse = (props) => {
    return <button className={classes.collapse}>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
    </button>
}

export default NavCollapse;