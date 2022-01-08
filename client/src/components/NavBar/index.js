import React from 'react';
import { NavLink } from 'react-router-dom';
import GlobalIcon from './icon';

const NavBar = () => {
  const nonActiveStyle = {
    color: "white",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "10px 22px",
    cursor: "pointer",
    borderBottom: "1px solid #fff995",
    margin: "3px",
  };
  const activeStyle = {
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    padding: '10px 22px',
    cursor: 'pointer',
    border: '1px solid #fff995',
    backgroundColor: '#fff995',
    borderRadius: '1px',
    margin: '3px',
    fontWeight: 'bold',
  }
  return (
    <>
      <nav>
        <div className='nav-menu'>
          <NavLink
            className='nav-logo'
            to='/home'
          >
            <img src={'/Shelpy_logo.jpg'} alt={'logo'} />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/about'
          >
            About
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/service-options'
          >
            Book a Shelper
          </NavLink>
        </div>
        <div className='nav-button'>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/sign-in'
          >
            Sign-In
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/order-history'
          >
            My Requests
          </NavLink>
          {/* <GlobalIcon /> */}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
