import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GlobalIcon from './Icons/GlobalIcon';
import ShopIcon from './Icons/ShopIcon';
import HelpIcon from './Icons/HelpIcon';
import AboutIcon from './Icons/AboutIcon';
import ProfileIcon from './Icons/ProfileIcon';
import OfferIcon from './Icons/OfferIcon';
import { useTranslation } from 'react-i18next';

const NavBar = (props) => {
  const { dropDownNavTarget } = useSelector((state) => state.general);
  const { t } = useTranslation();
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
          <NavLink className='nav-logo' to='/home'>
            <img src={'/pinterest.png'} alt={'shelpy'} style={{ width: '55px', height: '55px'}}/>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/about'
          >
            <AboutIcon
              color={({ isActive }) => (isActive ? 'black' : 'white')}
            />
            <div className='navBarText' style={{ marginLeft: '5px' }}>
              {t('nav_about')}
            </div>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/helpee/service-types'
          >
            <ShopIcon
              color={({ isActive }) => (isActive ? 'black' : 'white')}
            />
            <div className='navBarText'>{t('nav_book_helper')}</div>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to='/marketing/offers'
          >
            <OfferIcon
              color={({ isActive }) => (isActive ? 'black' : 'white')}
            />
            <div className='navBarText'>{t('nav_top_helper')}</div>
          </NavLink>
          {!props.isHelperAuthenticated && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to='/helper/home'
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
              to='/helper/home'
            >
              <HelpIcon />{' '}
              <div className='navBarText'>{t('helper_home_page')}</div>
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
