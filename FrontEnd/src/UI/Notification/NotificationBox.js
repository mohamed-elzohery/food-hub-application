import React from 'react';
import {createPortal} from 'react-dom';
import classes from './NotificationBox.module.css';
const overlay = document.getElementById('overlay');

const NotificationBox = (props) => {
    return <>
    {createPortal(<div className={classes.notificationBox}>{props.children}</div>, overlay)}
    </>
}

export default NotificationBox;