import React from 'react';
import Backdrop from '../backdrop/Backdrop';
import NavLinks from '../navbar/NavLinks';
import classes from './SideBar.module.css';
import { createPortal } from 'react-dom';
import LogoBox from '../navbar/LogoBox';
import { UIActions } from '../../slices/UI-slice';
import { useDispatch } from 'react-redux';
const overlay = document.getElementById('overlay');

const SideDrawer = (props) => {
    return <div className={classes.sidebar} onClick={props.onClickHandler}>
        <LogoBox />
        <NavLinks navlinksStyles={classes.sidelinks}/>
    </div>
}

const SideBar = (props) => {
    const dispatch = useDispatch(); 
    const closeSidebar = () => {
        dispatch(UIActions.hideSidebar());
    };
    return <>
        <Backdrop onClickHandler={closeSidebar}/>
        {createPortal(<SideDrawer onClickHandler={closeSidebar}/>, overlay)}
    </>
}

export default SideBar;