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
  const emailRef = useRef();
  const passwordRef = useRef();
  const { DBHelpeeEmail } = useSelector((state) => state.helpee);
  const [email, setEmail] = useState(DBHelpeeEmail);
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [hasGiveConsent, setHasGiveConsent] = useState(false);
  const {
    signUpPasswordStatus,
    signUpPasswordStatusTitle,
    signUpPasswordStatusMessage,
  } = useSelector((state) => state.helperNotification);
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  console.log('@HelpeeHome password: ', refId);

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
      isHelpee: false,
      password: passwordRef.current.value,
      refId: refId,
      subscribed: true,
      status: 'password_created',
    };
    dispatch(postHelperSignUpPassword(data));
  }
  function handlePasswordTyping(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  function handleHasGiveConsent() {
    setHasGiveConsent(!hasGiveConsent);
  }
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
      navigate('/helper/home', { replace: true });
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
    signUpPasswordStatus,
    signUpPasswordStatusMessage,
    signUpPasswordStatusTitle,
    navigate,
    dispatch,
  ]);

  return (
    <div
      className='main-content-wrapper-homepage-helper'
      style={{ backgroundImage: 'url(/images/assets/helper-home.jpeg)' }}
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
            disabled
          />
          <input
            type='text'
            className='form-control-password'
            placeholder={t('enter_password_placeholder')}
            value={password}
            onChange={handlePasswordTyping}
            ref={passwordRef}
          />
          <div className='form-row-password' style={{ marginBottom: '20px' }}>
            <input
              type='checkbox'
              checked={hasGiveConsent}
              onChange={handleHasGiveConsent}
              style={{ marginRight: '20px', cursor: 'pointer' }}
            />
            <div className='checkbox-text-password-page'>
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '5px',
                  marginBottom: '10px',
                  fontSize: '10px',
                  padding: '5px 30px',
                }}
              >
                {t('home_terms_and_condition_introduction')}{' '}
                <a href='/privacy-policy' target='_blank'>
                  {t('home_privacy_policy')}
                </a>
                {t('home_ending')} <br />
                {t('home_you_can')}{' '}
                <a href='/unsubscribe?isHelpee=false' target='_blank'>
                  {t('home_unsubscribe')}{' '}
                </a>{' '}
                {t('home_at_any_time')}
              </p>
            </div>
          </div>
          <ConfirmBtn
            cta={t('home_free_sign_up')}
            disable={!hasGiveConsent || password.length === 0}
            handleConfirm={handleConfirm}
          />
        </form>
      </div>
    </div>
  );
};

export default HelperSignUpPasswordPage;
