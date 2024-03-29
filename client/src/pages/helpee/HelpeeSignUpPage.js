import ConfirmBtn from '../../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../App.css';
import {
  clearSignUpEmailStatus,
  postHelpeeSignUpEmail,
} from '../../store/helpee/helpee-actions';
import { useTranslation } from 'react-i18next';
import HelpeeMarketingSection from '../../components/HelpeeMarketingSection';
import FeaturedHelperPart from '../../components/FeaturedHelperPart';
import { signUpOnHelpeeHomePage } from '../../service/fbPixelsHelper';

const MySwal = withReactContent(Swal);
const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function HelpeeSignUpPage(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const { DBHelpeeEmail } = useSelector((state) => state.helpee);
  const {
    signUpEmailStatus,
    signUpEmailStatusTitle,
    signUpEmailStatusMessage,
  } = useSelector((state) => state.helpeeNotification);
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');

  async function handleConfirm(e) {
    e.preventDefault();
    signUpOnHelpeeHomePage(providerId, offerId);
    if (emailRef && emailRef.current && emailRef.current.value) {
      if (!regex.test(emailRef.current.value)) {
        await MySwal.fire({
          title: <strong>Invalid Email Form</strong>,
          html: <p>Please input a valid email.</p>,
          icon: 'error',
        });
        return;
      }
    }
    const data = {
      email: emailRef.current.value,
      isHelpee: true,
      status: 'only_email_signed_up',
    };
    dispatch(postHelpeeSignUpEmail(data));
  }
  function handleEmailTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setEmail(typingInput);
  }
  useEffect(() => {
    setEmail(DBHelpeeEmail);
  }, [DBHelpeeEmail]);
  useEffect(() => {
    if (signUpEmailStatus === 'error') {
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearSignUpEmailStatus());
      }
      sweetAlertAndClearStatus(
        signUpEmailStatusTitle,
        signUpEmailStatusMessage
      );
      return;
    } else if (signUpEmailStatus === 'success') {
      navigate(`/${currentLanguage}/helpee/sign-up-final-step?refId=${refId}`, { replace: true });
      dispatch(clearSignUpEmailStatus());
    }
  }, [
    t,
    currentLanguage,
    refId,
    signUpEmailStatus,
    signUpEmailStatusMessage,
    signUpEmailStatusTitle,
    navigate,
    dispatch,
  ]);
  return (
    <div className='main-content-wrapper-no-height'>
      <div className='home-page-container'>
        <div
          className='centerWrapperWithBackground'
          style={{ backgroundImage: 'url(/static-imgs/helpee-home.jpeg)' }}
          title='Photo by Windows on Unsplash'
        >
          <div className='coverLeft'>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helpee_home_banner_title1')}
              </h1>
            </div>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helpee_home_banner_title2')}
              </h1>
            </div>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h2
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  marginBottom: '30px',
                  color: 'white',
                }}
              >
                {t('helpee_home_banner_subtitle1')} <br />
                {t('helpee_home_banner_subtitle2')}
              </h2>
            </div>
          </div>
          <div className='coverRight'>
            <div className='whiteWrapper'>
              <h3
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                {t('helpee_home_create_an_account')}
              </h3>

              <form action='' className='centerbox-landing'>
                <input
                  type='email'
                  className='form-control-landing'
                  placeholder={t('home_enter_email_placeholder')}
                  value={email}
                  onChange={handleEmailTyping}
                  ref={emailRef}
                />
                <ConfirmBtn
                  cta={t('home_free_sign_up')}
                  handleConfirm={handleConfirm}
                />
              </form>
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
              <div style={{ textAlign: 'center' }}>
                <Link to={`/${currentLanguage}/helpee/sign-in?refId=${refId}`}>
                  {t('home_have_account_sign_in')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <HelpeeMarketingSection />
        <FeaturedHelperPart isHelpee={true} />
      </div>
    </div>
  );
};

export default HelpeeSignUpPage;
