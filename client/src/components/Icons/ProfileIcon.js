import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { onClickUpdateActiveIconTarget } from '../../store/general/general-actions';
import {
  getHelpeeAuthStatus,
} from '../../store/helpee/helpee-actions';
import { getHelperAuthStatus } from '../../store/helper/helper-actions';
import NavbarIdentity from '../NavbarIdentity';
import { useTranslation } from 'react-i18next';


const MySwal = withReactContent(Swal);

const ProfileIcon = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  
  function handleProfileClick(e) {
    e.preventDefault();
    const data = {
      dropDownNavTarget: 'profile',
    };
    try {
      dispatch(onClickUpdateActiveIconTarget(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  function handleHelpeeSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('shelpy-token');
    MySwal.fire({
      title: <strong>{t('success_sign_out')}</strong>,
      html: <p>{t('you_are_signed_out')}</p>,
      icon: 'success',
    });
    dispatch(getHelpeeAuthStatus());
  }
  function handleHelperSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('shelper-token');
    MySwal.fire({
      title: <strong>{t('success_sign_out')}</strong>,
      html: <p>{t('you_are_signed_out')}</p>,
      icon: 'success',
    });
    dispatch(getHelperAuthStatus());
  }
  function handleToHelpeeDashboard(e) {
    e.preventDefault();
    navigate('/helpee/dashboard');
  }
  function handleToHelperDashboard(e) {
    e.preventDefault();
    navigate('/helper/dashboard');
  }
  function handleHelpeeSignIn(e) {
    e.preventDefault();
    navigate('/helpee/sign-in');
  }
  function handleHelperSignIn(e) {
    e.preventDefault();
    navigate('/helper/sign-in');
  }
  function handleToHelpeeChatroom(e) {
    e.preventDefault();
    navigate('/helpee/chatroom');
  }
  function handleToHelperChatroom(e) {
    e.preventDefault();
    navigate('/helper/chatroom');
  }
  function handleToHelpeeUpdateProfile(e) {
    e.preventDefault();
    navigate('/helpee/basic-form');
  }
  function handleToHelperUpdateProfile(e) {
    e.preventDefault();
    navigate('/helper/basic-form');
  }

  useEffect(() => {
    if (props.dropDownNavTarget !== 'profile') {
      setActive(false);
    }
  }, [props.dropDownNavTarget, props.value]);

  return (
    <IconContext.Provider value={{ color: 'white', size: '35' }}>
      <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
        {active && (
          <div className='navPopUpWrapper'>
            <div className='navDropDownContentProfiles'>
              {<NavbarIdentity isHelpee={true} />}
              {props.isHelpeeAuthenticated && (
                <div onClick={handleToHelpeeDashboard}>
                  {t('view_dashboard')}
                </div>
              )}
              {props.isHelpeeAuthenticated && (
                <div onClick={handleToHelpeeChatroom}>
                  {t('chat_with_helper')}
                </div>
              )}
              {props.isHelpeeAuthenticated && (
                <div onClick={handleToHelpeeUpdateProfile}>
                  {t('update_profile')}
                </div>
              )}
              {!props.isHelpeeAuthenticated && (
                <div onClick={handleHelpeeSignIn}>{t('sign_in')}</div>
              )}
              {props.isHelpeeAuthenticated && (
                <div onClick={handleHelpeeSignOut}>{t('sign_out')}</div>
              )}
              {<NavbarIdentity isHelpee={false} />}
              {props.isHelperAuthenticated && (
                <div onClick={handleToHelperDashboard}>
                  {t('view_dashboard')}
                </div>
              )}
              {props.isHelperAuthenticated && (
                <div onClick={handleToHelperChatroom}>
                  {t('chat_with_helpee')}
                </div>
              )}
              {props.isHelperAuthenticated && (
                <div onClick={handleToHelperUpdateProfile}>
                  {t('update_profile')}
                </div>
              )}
              {!props.isHelperAuthenticated && (
                <div onClick={handleHelperSignIn}>{t('sign_in')}</div>
              )}
              {props.isHelperAuthenticated && (
                <div onClick={handleHelperSignOut}>{t('sign_out')}</div>
              )}
            </div>
          </div>
        )}
        <CgProfile color='white' />
      </div>
    </IconContext.Provider>
  );
};

export default ProfileIcon;
