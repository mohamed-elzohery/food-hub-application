import React from 'react';
import classes from './Backdrop.module.css';
import { createPortal } from 'react-dom';

const BackdropRoot = document.getElementById('backdrop');

const Backdrop = (props) => {
    return <>{createPortal(<div className={classes.backdrop}></div>, BackdropRoot)}</>;
}

export default Backdrop;