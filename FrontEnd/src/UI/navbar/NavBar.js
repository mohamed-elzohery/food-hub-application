import React from "react";
import classes from'./NavBar.module.css';
import Container from "../container/Container";
import NavLinks from "./NavLinks";
import NavCollapse from './NavCollapse';
import LogoBox from "./LogoBox";

const NavBar = () => {
    return (
        
    <nav className={classes.navbar}>
        <Container styles={classes.nav}>
            <LogoBox />
            <NavLinks navlinksStyles={classes.navlinks}/>
            <NavCollapse />
        </Container>
    </nav>
    )
    
}

export default NavBar;