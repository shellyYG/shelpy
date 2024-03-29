import ConfirmBtn from '../../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../App.css';
import {
  clearSignInStatus,
  postHelperSignInData,
  getHelperAuthStatus,
} from '../../store/helper/helper-actions';
import { useTranslation } from 'react-i18next';
const MySwal = withReactContent(Swal);

const HelperSignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  const emailToken = searchParams.get('emailToken');
  const passwordResetToken = searchParams.get('passwordResetToken');
  const isAfterRole = searchParams.get('isAfterRole');

  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const { signInStatus, signInStatusTitle, signInStatusMessage } = useSelector(
    (state) => state.helperNotification
  );
  const { helperAccountStatus } = useSelector((state) => state.helper);
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  if (loading) {
    MySwal.fire({
      title: t('loading'),
      html: t('do_not_close_window'),
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }
  async function handleConfirm(e) {
    e.preventDefault();
    // change DB & global state
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      isHelpee: false,
    };
    dispatch(postHelperSignInData(data));
    setIsLoading(true);
  }

  useEffect(() => {
    if (signInStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearSignInStatus());
      }
      sweetAlertAndClearStatus(signInStatus, signInStatusMessage);
      return;
    } else if (signInStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        dispatch(getHelperAuthStatus());
        dispatch(clearSignInStatus());
        if (helperAccountStatus === 'password_created') {
          if (emailToken) {
            navigate(`/${currentLanguage}/helper/basic-form`, {replace: true});
          } else if (passwordResetToken) {
            navigate(`/${currentLanguage}/helper/home`, {
              replace: true,
            });
          } else if (isAfterRole === '1') {
            let path = `/${currentLanguage}/helpee/home`;
            if (window.location.search) {
              path += window.location.search;
              path = path.replace('isAfterRole=1', 'isAfterRole=0');
            }
            navigate(path, {
              replace: true,
            });
          } else {
            navigate(-1);
          }
          
        } else {
          if (emailToken) {
            navigate(`/${currentLanguage}/helper/basic-form`, {
              replace: true,
            });
          } else if (passwordResetToken) {
            navigate(`/${currentLanguage}/helper/home`, {
              replace: true,
            });
          } else if (isAfterRole === '1') {
            let path = `/${currentLanguage}/helper/home`;
            if (window.location.search) {
              path += window.location.search;
              path = path.replace('isAfterRole=1', 'isAfterRole=0');
            }
            navigate(path, {
              replace: true,
            });
          } else {
            navigate(-1);
          }
        }
      }
      sweetAlertAndNavigate(signInStatus, signInStatusMessage);
    }
  }, [
    t,
    isAfterRole,
    emailToken,
    passwordResetToken,
    currentLanguage,
    helperAccountStatus,
    signInStatus,
    signInStatusMessage,
    signInStatusTitle,
    navigate,
    dispatch,
  ]);

  return (
    <div
      className='main-content-wrapper-homepage-helper'
      style={{ backgroundImage: 'url(/static-imgs/helper-home.jpeg)' }}
      title='Photo by Humphrey Muleba on Unsplash'
    >
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          {t('helper_big')}, {t('sign_in_welcome')}
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          {t('sign_in_introduction')}
        </h2>

        <form action='' className='centerbox-landing'>
          <input
            type='text'
            className='form-control-password'
            placeholder={t('home_enter_email_placeholder')}
            ref={emailRef}
          />
          <input
            type='password'
            className='form-control-password'
            placeholder={t('enter_password_placeholder')}
            ref={passwordRef}
          />
          <div
            style={{
              paddingBottom: '10px',
              fontSize: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '5px 10px',
              width: 'fit-content',
              margin: 'auto',
              marginBottom: '15px',
            }}
          >
            <Link
              to={`/${currentLanguage}/helper/forget-password?refId=${refId}`}
              style={{
                marginRight: '10px',
              }}
            >
              {t('forget_password')}
            </Link>
            <Link to={`/${currentLanguage}/helper/home?refId=${refId}`}>
              {t('dont_have_account_sign_up')}
            </Link>
          </div>

          <ConfirmBtn cta={t('sign_in')} handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default HelperSignInPage;
