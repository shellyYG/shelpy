import React from 'react';
import { NavLink } from 'react-router-dom';
import GlobalIcon from './icon';

const NavBar = () => {
  return (
    <>
      <nav>
        <div className="nav-menu">
          <NavLink className="nav-logo" to="/" exact={true} activeStyle>
            <img src={'/Shelpy_logo.jpg'} alt={'logo'} />
          </NavLink>
          <NavLink className="nav-link" to="/about" activeStyle>
            Forum
          </NavLink>
          <NavLink className="nav-link" to="/find-helpers" activeStyle>
            Book a Shelper
          </NavLink>
        </div>
        <div className="nav-button">
          <NavLink className="nav-button-link" to="/sign-up">
            Sign In
          </NavLink>
          <GlobalIcon />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
