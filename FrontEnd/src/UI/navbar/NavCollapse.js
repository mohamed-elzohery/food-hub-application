import React from 'react';
import classes from './NavCollapse.module.css';
import { UIActions } from '../../slices/UI-slice';
import { useDispatch } from 'react-redux';

const NavCollapse = (props) => {
    const dispatch = useDispatch()

    const showSidebarHandler = () => {
        dispatch(UIActions.showSidebar());
    }
    return <button className={classes.collapse} onClick={showSidebarHandler}>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
    </button>
}

export default NavCollapse;