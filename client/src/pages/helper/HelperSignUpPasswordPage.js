import ConfirmBtn from '../../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../App.css';
import {
  getHelperAuthStatus,
  clearSignUpPasswordStatus,
  postHelperSignUpPassword,
} from '../../store/helper/helper-actions';
import { useTranslation } from 'react-i18next';

const MySwal = withReactContent(Swal);

const HelperSignUpPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const consentRef = useRef();
  const { DBHelpeeEmail } = useSelector((state) => state.helpee);
  const [email, setEmail] = useState(DBHelpeeEmail);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [hasGiveConsent, setHasGiveConsent] = useState(false);
  const [usernameString, setUsernameString] = useState('');
  const [enableBtn, setEnableBtn] = useState(false);
  
  const {
    signUpPasswordStatus,
    signUpPasswordStatusTitle,
    signUpPasswordStatusMessage,
  } = useSelector((state) => state.helperNotification);
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

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
    if (!hasGiveConsent) {
      await MySwal.fire({
        title: <strong>Please checkmark!</strong>,
        html: <p>Please click on yes to finish the final sign-up process</p>,
        icon: 'error',
      });
      return;
    }
    setIsLoading(true);
    // change DB & global state
    const data = {
      email: email || emailRef.current.value,
      username: usernameRef.current.value,
      isHelpee: false,
      password: passwordRef.current.value,
      refId: refId,
      subscribed: true,
      status: 'password_created',
      currentLanguage,
    };
    dispatch(postHelperSignUpPassword(data));
  }
  function handlePasswordTyping(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  function handleRepeatPasswordTyping(e) {
    e.preventDefault();
    setRepeatPassword(e.target.value);
  }
  function handleHasGiveConsent() {
    setHasGiveConsent(!hasGiveConsent);
  }
  useEffect(() => {
    if (repeatPassword && repeatPassword === password) {
      if (consentRef.current) consentRef.current.focus();
    }
  }, [password, repeatPassword]);
  useEffect(() => {
    setEmail(DBHelpeeEmail);
  }, [DBHelpeeEmail]);
  useEffect(() => {
    if (signUpPasswordStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearSignUpPasswordStatus());
      }
      sweetAlertAndClearStatus(
        signUpPasswordStatusTitle,
        signUpPasswordStatusMessage
      );
      let path = `/${currentLanguage}/helper/home`;
      if (window.location.search) path += window.location.search;
      navigate(path, { replace: true });
      return;
    } else if (signUpPasswordStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        dispatch(getHelperAuthStatus());
        dispatch(clearSignUpPasswordStatus());
      }
      sweetAlertAndNavigate(
        signUpPasswordStatusTitle,
        signUpPasswordStatusMessage
      );
    }
  }, [
    t,
    currentLanguage,
    signUpPasswordStatus,
    signUpPasswordStatusMessage,
    signUpPasswordStatusTitle,
    navigate,
    dispatch,
  ]);
  function handleUsernameTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setUsernameString(typingInput);
  }
  useEffect(() => {
    setEnableBtn(usernameString && hasGiveConsent && password.length !== 0);
  }, [usernameString, hasGiveConsent, password]);

  return (
    <div
      className='main-content-wrapper-homepage-helper'
      style={{ backgroundImage: 'url(/static-imgs/helper-home.jpeg)' }}
      title='Photo by Humphrey Muleba on Unsplash'
    >
      <div className='section-center-align'>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          {t('create_password_to_complete_sign_up')}
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          {t('take_less_than_a_minute')}
        </h2>

        <form action='' className='centerbox-landing'>
          <input
            type='text'
            className='form-control-password'
            placeholder={t('home_enter_email_placeholder')}
            value={email}
            ref={emailRef}
            style={{ color: 'white' }}
            disabled
          />
          {!email && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                marginBottom: '14px',
                backgroundColor: 'white',
                width: 'fit-content',
                borderRadius: '8px',
                margin: 'auto auto 15px',
                padding: '5px 10px',
              }}
            >
              {t('no_email_warning_helper')}:{' '}
              <a
                href={`/${currentLanguage}/helper/home?refId=${refId}`}
                rel='noreferrer'
              >
                {t('helper_home_page')}
              </a>
            </p>
          )}
          <input
            type='input'
            className='form-control-password'
            title={t('username_title')}
            placeholder={t('username_placeholder')}
            ref={usernameRef}
            onChange={handleUsernameTyping}
          />
          <input
            type='password'
            className='form-control-password'
            placeholder={t('enter_password_placeholder')}
            value={password}
            onChange={handlePasswordTyping}
            ref={passwordRef}
          />
          <input
            type='password'
            className='form-control-password'
            placeholder={t('repeat_password_placeholder')}
            value={repeatPassword}
            onChange={handleRepeatPasswordTyping}
          />
          {repeatPassword !== password && (
            <p style={{ color: 'red', fontSize: '12px', marginBottom: '14px' }}>
              {t('password_not_aligned_warning')}
            </p>
          )}
          <div className='form-row-password' style={{ marginBottom: '20px' }}>
            <input
              type='checkbox'
              checked={hasGiveConsent}
              onChange={handleHasGiveConsent}
              style={{
                marginRight: '20px',
                cursor: 'pointer',
                marginBottom: 'auto',
                width: '100px',
              }}
              ref={consentRef}
            />
            <div className='checkbox-text-password-page'>
              <p
                style={{
                  textAlign: 'center',
                  marginBottom: '10px',
                  fontSize: '14px',
                  color: 'white',
                }}
              >
                {t('helper_home_terms_and_condition_introduction')}{' '}
                <a
                  href={`/${currentLanguage}/helper-terms?refId=${refId}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {t('helper_home_employee_contract')}
                </a>
                {t('comman_and')}{' '}
                <a
                  href={`/${currentLanguage}/privacy?refId=${refId}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {t('helper_home_privacy_policy')}
                </a>
                {t('home_ending')} <br />
                {t('home_you_can')}{' '}
                <a
                  href={`/${currentLanguage}/unsubscribe?isHelpee=false&refId=${refId}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {t('home_unsubscribe')}{' '}
                </a>{' '}
                {t('home_at_any_time')}
              </p>
            </div>
          </div>
          <ConfirmBtn
            cta={t('home_free_sign_up')}
            disable={!enableBtn}
            handleConfirm={handleConfirm}
          />
        </form>
      </div>
    </div>
  );
};

export default HelperSignUpPasswordPage;
