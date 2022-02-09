import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GlobalIcon from './Icons/GlobalIcon';
import {
  getHelpeeAuthStatus,
  getPotentialHelpers,
} from '../store/helpee/helpee-actions';
import {
  getHelperAuthStatus,
  getPotentialCustomers,
} from '../store/helper/helper-actions';
import ChatIcon from './Icons/ChatIcon';
import ProfileIcon from './Icons/ProfileIcon';


const NavBar = (props) => {
  const dispatch = useDispatch();
  
  const { helpeeUserId, allPotentialHelpers } =
    useSelector((state) => state.helpee);
  const { helperUserId, allPotentialCustomers } =
    useSelector((state) => state.helper);
  const { dropDownNavTarget } = useSelector((state) => state.general);
  
  console.log('@NavBar->helpeeUserId: ', helpeeUserId, 'herperUserId: ', helperUserId);

  useEffect(() => {
    if (helpeeUserId) dispatch(getPotentialHelpers({ helpeeUserId }));
  }, [helpeeUserId, dispatch]);

   useEffect(() => {
     if (helperUserId) dispatch(getPotentialHelpers({ helperUserId }));
   }, [helperUserId, dispatch]);

  
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
            to='/helpee/service-types'
          >
            Book Shelper
          </NavLink>
          {!props.isHelperAuthenticated && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to='/helper/home'
            >
              Become Shelper
            </NavLink>
          )}
          {props.isHelperAuthenticated && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to='/helper/home'
            >
              Helper HomePage
            </NavLink>
          )}
        </div>
        <div className='nav-button'>
          <ProfileIcon
            dropDownNavTarget={dropDownNavTarget}
            isHelpeeAuthenticated={props.isHelpeeAuthenticated}
            isHelperAuthenticated={props.isHelperAuthenticated}
          />
          <GlobalIcon dropDownNavTarget={dropDownNavTarget} />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
