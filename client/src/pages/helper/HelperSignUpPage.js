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
import MktRow from '../../components/MktRow';
import HelperMarketingSection from '../../components/HelperMarketingSection';
import { useTranslation } from 'react-i18next';
import JobOrUniCard from '../../components/JobOrUniCard';
import FeaturedHelperPart from '../../components/FeaturedHelperPart';
import { signUpOnHelperHomePage } from '../../service/fbPixelsHelper';


const MySwal = withReactContent(Swal);

const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const SignUpPageHelper = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { DBHelpeeEmail } = useSelector((state) => state.helpee);
  const {
    signUpEmailStatus,
    signUpEmailStatusTitle,
    signUpEmailStatusMessage,
  } = useSelector((state) => state.helperNotification);
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  async function handleConfirm(e) {
    e.preventDefault();
    signUpOnHelperHomePage(providerId, offerId);
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
      isHelpee: false,
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
      let path = `/${currentLanguage}/helper/sign-up-final-step`;
      if (window.location.search) path += window.location.search;
      navigate(path, { replace: true });
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
          className='centerWrapperWithBackgroundHelper'
          style={{ backgroundImage: 'url(/static-imgs/helper-home.jpeg)' }}
          title='Photo by Humphrey Muleba on Unsplash'
        >
          <div className='coverLeft'>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title1')}
              </h1>
            </div>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h3 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title2')}
              </h3>
              <h3 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title3')}
              </h3>
              <h3 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title4')}
              </h3>
            </div>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h4
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  marginBottom: '30px',
                  color: 'white',
                }}
              >
                {t('helper_home_banner_subtitle1')}
                {t('helper_home_banner_subtitle2')}
              </h4>
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
                {t('helper_home_create_an_account_helpee')}
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
                {t('helper_home_terms_and_condition_introduction')}{' '}
                <a
                  href={`/${currentLanguage}/contract-terms?refId=${refId}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {t('helper_home_employee_contract')}
                </a>
                {t('comman_and')}
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
              <div style={{ textAlign: 'center' }}>
                <Link to={`/${currentLanguage}/helper/sign-in?refId=${refId}`}>
                  {t('home_have_account_sign_in')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <HelperMarketingSection />
        <FeaturedHelperPart isHelpee={false} />
      </div>
    </div>
  );
};

export default SignUpPageHelper;
