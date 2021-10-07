import React from 'react';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from './NavBarElements';

import GlobalIcon from './icon';

const NavBar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" exact={true} activeStyle>
            Home
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
          <GlobalIcon />
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavBar;
