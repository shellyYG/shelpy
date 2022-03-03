import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GlobalIcon from './Icons/GlobalIcon';
import ShopIcon from './Icons/ShopIcon';
import HelpIcon from './Icons/HelpIcon';
import ProfileIcon from './Icons/ProfileIcon';
import OfferIcon from './Icons/OfferIcon';
import { useTranslation } from 'react-i18next';
import UserRoleBtn from './UserRoleBtn';

const NavBar = (props) => {
  const { t } = useTranslation();
  const { dropDownNavTarget } = useSelector((state) => state.general);
  const { userRole } = useSelector((state) => state.general);

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
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
                ? `/${currentLanguage}/home`
                : `/${currentLanguage}/helper/home`
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
                ? `/${currentLanguage}/helpee/service-types`
                : `/${currentLanguage}/helper/service-types`
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
          { userRole === 'helpee' && <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to={`/${currentLanguage}/marketing/offers`}
          >
            <OfferIcon
              color={({ isActive }) => (isActive ? 'black' : 'white')}
            />
            <div className='navBarText'>{t('nav_top_helper')}</div>
          </NavLink>}
          {!props.isHelperAuthenticated && userRole === 'helpee' && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={`/${currentLanguage}/helper/home`}
            >
              <HelpIcon
                color={({ isActive }) => (isActive ? 'black' : 'white')}
              />
              <div className='navBarText'>{t('nav_become_helper')}</div>
            </NavLink>
          )}
          {props.isHelperAuthenticated && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={`/${currentLanguage}/helper/home`}
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
