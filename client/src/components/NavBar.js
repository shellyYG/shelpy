import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GlobalIcon from './Icons/GlobalIcon';
import ShopIcon from './Icons/ShopIcon';
import HelpIcon from './Icons/HelpIcon';
import ProfileIcon from './Icons/ProfileIcon';
import OfferIcon from './Icons/OfferIcon';
import { useTranslation } from 'react-i18next';
import UserRoleBtn from './UserRoleBtn';
import { updateUserRole } from '../store/general/general-actions';

const NavBar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const { dropDownNavTarget } = useSelector((state) => state.general);
  const { userRole } = useSelector((state) => state.general);

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  useEffect(()=> {
    const userRole = window.location.pathname.includes('/helper')
      ? 'helper'
      : 'helpee';
    try {
      dispatch(updateUserRole({ userRole }));
    } catch (err) {
      console.error(err);
    }
  },[dispatch])
  const nonActiveStyle = {
    color: "white",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "5px 3px",
    cursor: "pointer",
    margin: "3px",
  };
  const activeStyle = {
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    padding: '5px 3px',
    cursor: 'pointer',
    border: '1px solid #fff995',
    backgroundColor: '#fff995',
    borderRadius: '8px',
    margin: '3px',
    fontWeight: 'bold',
  };
  
  return (
    <>
      <nav>
        <div className='nav-menu'>
          <NavLink
            className='nav-logo'
            to={
              userRole === 'helpee'
                ? `/${currentLanguage}/home?refId=${refId}`
                : `/${currentLanguage}/helper/home?refId=${refId}`
            }
          >
            <img
              src={'/static-imgs/shelpy_logo.png'}
              alt={'shelpy'}
              style={{ width: '55px', height: '55px' }}
            />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to={
              userRole === 'helpee'
                ? `/${currentLanguage}/helpee/service-types?refId=${refId}`
                : `/${currentLanguage}/helper/service-types?refId=${refId}`
            }
          >
            <ShopIcon
              color={({ isActive }) => (isActive ? 'black' : 'white')}
            />
            {userRole === 'helpee' && (
              <div className='navBarText'>{t('nav_book_helper')}</div>
            )}
            {userRole === 'helper' && (
              <div className='navBarText'>{t('nav_create_offer')}</div>
            )}
          </NavLink>
          {userRole === 'helpee' && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={`/${currentLanguage}/marketing/offers?refId=${refId}`}
            >
              <OfferIcon
                color={({ isActive }) => (isActive ? 'black' : 'white')}
              />
              <div className='navBarText'>{t('nav_top_helper')}</div>
            </NavLink>
          )}
          {!props.isHelperAuthenticated && userRole === 'helpee' && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={`/${currentLanguage}/helper/home?refId=${refId}`}
            >
              <HelpIcon
                color={({ isActive }) => (isActive ? 'black' : 'white')}
              />
              <div className='navBarText'>{t('nav_become_helper')}</div>
            </NavLink>
          )}
          {userRole === 'helper' && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={`/${currentLanguage}/helper/home?refId=${refId}`}
            >
              <HelpIcon />{' '}
              <div className='navBarText'>{t('helper_home_page')}</div>
            </NavLink>
          )}
        </div>
        <div className='nav-button'>
          <UserRoleBtn role='helpee' />
          <UserRoleBtn role='helper' />
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
