import React from 'react';
import Backdrop from '../backdrop/Backdrop';
import NavLinks from '../navbar/NavLinks';
import classes from './SideBar.module.css';
import { createPortal } from 'react-dom';
import LogoBox from '../navbar/LogoBox';

const overlay = document.getElementById('overlay');

const SideDrawer = (props) => {
    return <div className={classes.sidebar}>
        <LogoBox />
        <NavLinks navlinksStyles={classes.sidelinks}/>
    </div>
}

const SideBar = (props) => {
    return <>
        <Backdrop />
        {createPortal(<SideDrawer />, overlay)}
    </>
}

export default SideBar;