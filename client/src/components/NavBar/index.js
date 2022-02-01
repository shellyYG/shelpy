import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import GlobalIcon from '../Icons/GlobalIcon';
import { getAuthStatus } from '../../store/helpee/helpee-actions';

const MySwal = withReactContent(Swal);

const NavBar = (props) => {
  const dispatch = useDispatch();
  const [buttonActive, setButtonActive] = useState(false);
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
  function handleSignOut(e) {
    e.preventDefault();
    setButtonActive(!buttonActive);
    localStorage.removeItem('shelpy-token');
    MySwal.fire({
      title: <strong>Successfully Signed-Out.</strong>,
      html: <p>You are now signed-out.</p>,
      icon: 'success',
    });
    dispatch(getAuthStatus());
  }
  return (
    <>
      <nav>
        <div className='nav-menu'>
          <NavLink className='nav-logo' to='/home'>
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
            to='/helpee/book-a-helper'
          >
            Book an Insider
          </NavLink>
        </div>
        <div className='nav-button'>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/helper/home'
          >
            Become Helper
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/helpee/order-history'
          >
            My Requests
          </NavLink>
          {!props.isAuthenticated && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to='/helpee/sign-in'
            >
              Sign-In
            </NavLink>
          )}
          {props.isAuthenticated && (
            <button
              className={
                buttonActive ? 'logoutButtonActive' : 'logoutButtonNonActive'
              }
              onClick={handleSignOut}
            >
              Sign-Out
            </button>
          )}

          <GlobalIcon />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
