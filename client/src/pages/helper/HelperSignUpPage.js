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

  async function handleConfirm(e) {
    e.preventDefault();
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
      navigate(`/helper/sign-up-final-step?refId=${refId}`, { replace: true });
      dispatch(clearSignUpEmailStatus());
    }
  }, [
    t,
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
          style={{ backgroundImage: 'url(/helper-home.jpeg)' }}
          title='Photo by Humphrey Muleba on Unsplash'
        >
          <div className='coverLeft'>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title1')}
              </h1>
            </div>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title2')}
              </h1>
            </div>
            <div>
              <h2
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  marginBottom: '30px',
                  color: 'white',
                }}
              >
                {t('helper_home_banner_subtitle1')} <br />
                {t('helper_home_banner_subtitle2')}
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
              <div style={{ textAlign: 'center' }}>
                <Link to='/helper/sign-in'>
                  {t('home_have_account_sign_in')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <HelperMarketingSection />
      </div>
    </div>
  );
};

export default SignUpPageHelper;
