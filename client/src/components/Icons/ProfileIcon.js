import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const { userRole } = useSelector((state) => state.general);
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
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
  async function handleHelpeeSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('shelpy-token');
    await MySwal.fire({
      title: <strong>{t('success_sign_out')}</strong>,
      html: <p>{t('you_are_signed_out')}</p>,
      icon: 'success',
    });
    window.location.reload();
  }
  async function handleHelperSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('shelper-token');
    await MySwal.fire({
      title: <strong>{t('success_sign_out')}</strong>,
      html: <p>{t('you_are_signed_out')}</p>,
      icon: 'success',
    });
    window.location.reload();
  }
  function handleToHelpeeDashboard(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helpee/dashboard`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  function handleToHelperDashboard(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helper/dashboard`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  function handleSignIn(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/sign-in`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  
  function handleToHelpeeChatroom(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helpee/chatroom`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  function handleToHelperChatroom(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helper/chatroom`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  function handleToHelpeeUpdateProfile(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helpee/basic-form`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  function handleToHelperUpdateProfile(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helper/basic-form`;
    if (window.location.search) path += window.location.search;
    navigate(path);
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
              {userRole === 'helpee' && (
                <>
                  {/* {<NavbarIdentity isHelpee={true} />} */}
                  {props.isHelpeeAuthenticated && (
                    <div onClick={handleToHelpeeDashboard}>
                      {t('view_helpee_dashboard')}
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
                    <div onClick={handleSignIn}>{t('sign_in')}</div>
                  )}
                  {props.isHelpeeAuthenticated && (
                    <div onClick={handleHelpeeSignOut}>{t('sign_out')}</div>
                  )}
                </>
              )}
              {userRole === 'helper' && (
                <>
                  {/* {<NavbarIdentity isHelpee={false} />} */}
                  {props.isHelperAuthenticated && (
                    <div onClick={handleToHelperDashboard}>
                      {t('view_helper_dashboard')}
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
                    <div onClick={handleSignIn}>{t('sign_in')}</div>
                  )}
                  {props.isHelperAuthenticated && (
                    <div onClick={handleHelperSignOut}>{t('sign_out')}</div>
                  )}
                </>
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
