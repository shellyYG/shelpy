import React from 'react';
import { NavLink } from 'react-router-dom';
import GlobalIcon from './icon';

const NavBar = () => {
  return (
    <>
      <nav>
        <div className="nav-menu">
          <NavLink className="nav-logo" to="/" exact={true} activeStyle>
            <img src={'/Shelpy_logo.jpg'} />
          </NavLink>
          <NavLink className="nav-link" to="/about" activeStyle>
            About
          </NavLink>
          <NavLink className="nav-link" to="/find-helpers" activeStyle>
            Find Helpers
          </NavLink>
        </div>
        <div className="nav-button">
          <NavLink className="nav-button-link" to="/sign-up">
            Sign Up
          </NavLink>
          <GlobalIcon />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
