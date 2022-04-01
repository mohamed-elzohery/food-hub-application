import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
return (
    <footer>
        <div className={classes.listssections}>

        </div>
        <div className={classes.copysection}>
            <p>All Copyrights {new Date(Date.now()).getFullYear()}&copy; reserved to the team</p>
        </div>
    </footer>
);
}

export default Footer;