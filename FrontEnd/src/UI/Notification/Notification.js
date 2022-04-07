import React from 'react';
import classes from './Notification.module.css';

const Notification = (props) => {
    return <p className={classes.notification}>{props.msg}</p>
}

export default Notification;