import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmBtn from '../components/ConfirmBtn';
import { useDispatch, useSelector } from 'react-redux';
import { clearSignInStatus, clearSignUpEmailStatus, clearSignUpPasswordStatus, getHelpeeAuthStatus, postHelpeeSignInData, postHelpeeSignUpPassword } from '../store/helpee/helpee-actions';
import { signInOnSingleOffer, signUpOnSingleOffer } from '../service/fbPixelsHelper';
const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const MySwal = withReactContent(Swal);
const SignUpPopUp = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const usernameRef = useRef();
  const passwordRef = useRef();
  const consentRef = useRef();
  const emailRef = useRef();

  const [loading, setIsLoading] = useState(false);
  const [showSignUpBox, setShowSignUpBox] = useState(false);
  const [showLogInBox, setShowLogInBox] = useState(false);
  const [usernameString, setUsernameString] = useState('');
  const [hasGiveConsent, setHasGiveConsent] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showOnlyLogin, setShowOnlyLogin] = useState(false);
  const [showSignUpLogInSelection, setShowSignUpLogInSelection] =
    useState(true);
  const [showAgainLogin, setShowAgainLogin] = useState(false);
  const [hidePopUp, setHidePopUp] = useState(false);

const {
  signUpPasswordStatus,
  signUpPasswordStatusTitle,
  signUpPasswordStatusMessage,
  signInStatus,
  signInStatusTitle,
  signInStatusMessage,
} = useSelector((state) => state.helpeeNotification);
const { helpeeAccountStatus } = useSelector((state) => state.helpee);

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

  function handleEmailTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setEmail(typingInput);
  }

  function handleShowSignUpBox(e) {
    e.preventDefault();
    signUpOnSingleOffer(props.providerId, props.offerId);
    setShowSignUpBox(true);
    setShowLogInBox(false);
    setShowSignUpLogInSelection(false);
  }
  function handleShowLogInBox(e) {
    e.preventDefault();
    signInOnSingleOffer(props.providerId, props.offerId);
    setShowSignUpBox(false);
    setShowLogInBox(true);
    setShowSignUpLogInSelection(false);
    setShowOnlyLogin(false);
    setEmail('');
    setPassword('');
  }
  function handleShowAgainLogInBox(e) {
      e.preventDefault();
      setShowAgainLogin(true);
      setEmail('');
      setPassword('');
  }
  function handleHasGiveConsent() {
    setHasGiveConsent(!hasGiveConsent);
  }
  function handleUsernameTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setUsernameString(typingInput);
  }
  function handlePasswordTyping(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  function handleSignUp(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: email || emailRef.current.value,
      username: usernameRef.current.value,
      isHelpee: true,
      password: passwordRef.current.value,
      refId: refId,
      subscribed: true,
      status: 'password_created',
      currentLanguage,
    };
    dispatch(postHelpeeSignUpPassword(data));
  }
  function handleLogIn(e) {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      isHelpee: true,
    };
    dispatch(postHelpeeSignInData(data));
    setIsLoading(true);
  }
  useEffect(() => {
    if (showSignUpBox) {
      setEnableBtn(
        usernameString &&
          email.length !== 0 &&
          hasGiveConsent &&
          password.length !== 0
      );
    } else if (showLogInBox) {
      setEnableBtn(email.length !== 0 && password.length !== 0);
    }
  }, [
    showSignUpBox,
    showLogInBox, 
    usernameString,
    hasGiveConsent,
    email,
    password,
  ]);

  // Sign Up State
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
      return;
    } else if (signUpPasswordStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        dispatch(getHelpeeAuthStatus());
        dispatch(clearSignUpPasswordStatus());
      }
      sweetAlertAndNavigate(
        signUpPasswordStatusTitle,
        signUpPasswordStatusMessage
      );
      setShowOnlyLogin(true);
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

  // Sign In State
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
      sweetAlertAndClearStatus(signInStatusTitle, signInStatusMessage);
      return;
    } else if (signInStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        dispatch(getHelpeeAuthStatus());
        dispatch(clearSignInStatus());
      }
      sweetAlertAndNavigate(signInStatusTitle, signInStatusMessage);
      setHidePopUp(true);
    }
  }, [
    t,
    currentLanguage,
    helpeeAccountStatus,
    signInStatus,
    signInStatusMessage,
    signInStatusTitle,
    navigate,
    dispatch,
  ]);
  return (
    <>
      {!hidePopUp && (
        <div className='popupSignUp'>
          <div className='pureFlexRow' style={{ flexWrap: 'wrap' }}>
            {' '}
            <div
              style={{ marginLeft: 'auto', cursor: 'pointer' }}
              onClick={props.onClick}
            >
              X
            </div>
          </div>
          <div>
            {!!showOnlyLogin && !showAgainLogin && (
              <div className='signUpPopUpSelectActionWrapper'>
                <div className='pureFlexRow'>
                  <div style={{ margin: 'auto' }}>
                    {' '}
                    <button
                      className='btn-next'
                      onClick={handleShowAgainLogInBox}
                    >
                      {t('log_in')}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {!showOnlyLogin && !!showSignUpLogInSelection && (
              <div className='signUpPopUpSelectActionWrapper'>
                <label>{t('please_sign_up_log_in_first')}</label>
                <div className='pureFlexRow' style={{ margin: 'auto' }}>
                  <div style={{ margin: 'auto' }}>
                    {' '}
                    <button className='btn-next' onClick={handleShowSignUpBox}>
                      {t('home_free_sign_up')}
                    </button>
                    <button className='btn-next' onClick={handleShowLogInBox}>
                      {t('log_in')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!showOnlyLogin && !!showSignUpBox && (
              <>
                <input
                  type='input'
                  className='form-control-sign-up'
                  title={t('username_title')}
                  placeholder={t('username_placeholder')}
                  ref={usernameRef}
                  onChange={handleUsernameTyping}
                  maxLength={'11'}
                />
              </>
            )}
            {!showOnlyLogin && (!!showSignUpBox || !!showLogInBox) && (
              <div className='pureFlexColumn'>
                <div className='signUpPopUpEmailPassWrapper'>
                  <input
                    type='email'
                    className='form-control-sign-up'
                    placeholder={t('home_enter_email_placeholder')}
                    ref={emailRef}
                    onChange={handleEmailTyping}
                  />
                  <input
                    type='password'
                    className='form-control-sign-up'
                    placeholder={t('enter_password_placeholder')}
                    value={password}
                    onChange={handlePasswordTyping}
                    ref={passwordRef}
                  />
                </div>
                {showSignUpBox && (
                  <div className='pureFlexRow'>
                    <div className='form-row-password'>
                      <input
                        type='checkbox'
                        checked={hasGiveConsent}
                        onChange={handleHasGiveConsent}
                        style={{
                          cursor: 'pointer',
                          width: '30px',
                        }}
                        ref={consentRef}
                      />
                      <div className='checkbox-text-sign-up-popup'>
                        <p
                          style={{
                            textAlign: 'center',
                            fontSize: '8px',
                          }}
                        >
                          {t('home_terms_and_condition_introduction')}{' '}
                          <a
                            href={`/${currentLanguage}/terms?refId=${refId}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {t('terms_and_conditions')}
                          </a>
                          {t('comman_and')}{' '}
                          <a
                            href={`/${currentLanguage}/privacy?refId=${refId}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {t('home_privacy_policy')}
                          </a>
                          {t('home_ending')} <br />
                          {t('home_you_can')}{' '}
                          <a
                            href={`/${currentLanguage}/unsubscribe?isHelpee=true&refId=${refId}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {t('home_unsubscribe')}{' '}
                          </a>{' '}
                          {t('home_at_any_time')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className='pureFlexRow'>
                  <div style={{ margin: 'auto' }}>
                    <ConfirmBtn
                      cta={showLogInBox ? t('log_in') : t('home_free_sign_up')}
                      disable={!enableBtn}
                      handleConfirm={showLogInBox ? handleLogIn : handleSignUp}
                    />
                  </div>
                </div>
              </div>
            )}
            {showAgainLogin && (
              <div className='pureFlexColumn'>
                <div className='signUpPopUpEmailPassWrapper'>
                  <input
                    type='email'
                    className='form-control-sign-up'
                    placeholder={t('home_enter_email_placeholder')}
                    ref={emailRef}
                    onChange={handleEmailTyping}
                  />
                  <input
                    type='password'
                    className='form-control-sign-up'
                    placeholder={t('enter_password_placeholder')}
                    value={password}
                    onChange={handlePasswordTyping}
                    ref={passwordRef}
                  />
                </div>

                <div className='pureFlexRow'>
                  <div style={{ margin: 'auto' }}>
                    <ConfirmBtn
                      cta={t('log_in')}
                      disable={!enableBtn}
                      handleConfirm={handleLogIn}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPopUp;
