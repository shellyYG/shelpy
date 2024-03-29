import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GlobalIcon from './Icons/GlobalIcon';
import ShopIcon from './Icons/ShopIcon';
import HelpIcon from './Icons/HelpIcon';
import ProfileIcon from './Icons/ProfileIcon';
import OfferIcon from './Icons/OfferIcon';
import HomeIcon from './Icons/HomeIcon';
import { useTranslation } from 'react-i18next';
import UserRoleBtn from './UserRoleBtn';
import { updateUserRole } from '../store/general/general-actions';
import QuestionMarkIcon from './Icons/QuestionMarkIcon';

const NavBar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');

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
                ? `/${currentLanguage}/helpee/home?refId=${refId}&providerId=${providerId}&offerId=${offerId}`
                : `/${currentLanguage}/helper/home?refId=${refId}&providerId=${providerId}&offerId=${offerId}`
            }
          >
            <img
              src={'/static-imgs/shelpy_logo.png'}
              alt={'shelpy'}
              style={{ width: '55px', height: '55px' }}
            />
          </NavLink>
          {userRole === 'helper' && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={`/${currentLanguage}/helper/home?refId=${refId}&providerId=${providerId}&offerId=${offerId}`}
            >
              <HomeIcon />{' '}
            </NavLink>
          )}
          {userRole === 'helpee' && (
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={`/${currentLanguage}/home?refId=${refId}&providerId=${providerId}&offerId=${offerId}`}
            >
              <HomeIcon />{' '}
            </NavLink>
          )}
          {
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
              to={`/${currentLanguage}/helpee/guidance?refId=${refId}&providerId=${providerId}&offerId=${offerId}`}
            >
              <QuestionMarkIcon />{' '}
              <div className='navBarText'>{t('how_shelpy_works')}</div>
            </NavLink>
          }
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            to={
              userRole === 'helpee'
                ? `/${currentLanguage}/helpee/service-types?refId=${refId}&providerId=${providerId}&offerId=${offerId}`
                : `/${currentLanguage}/helper/service-types?refId=${refId}&providerId=${providerId}&offerId=${offerId}`
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
              to={`/${currentLanguage}/marketing/offers?refId=${refId}&providerId=${providerId}&offerId=${offerId}`}
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
              to={`/${currentLanguage}/helper/home?refId=${refId}&providerId=${providerId}&offerId=${offerId}`}
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
              to={`/${currentLanguage}/home?refId=${refId}&providerId=${providerId}&offerId=${offerId}`}
            >
              <HelpIcon />{' '}
              <div className='navBarText'>{t('nav_become_helpee')}</div>
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
            helperStatus={props.helperStatus}
          />
          <GlobalIcon dropDownNavTarget={dropDownNavTarget} />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
