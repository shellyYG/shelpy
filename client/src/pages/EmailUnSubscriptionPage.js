import ConfirmBtn from '../components/ConfirmBtn';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSearchParams } from 'react-router-dom';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';

import { unsubEmail } from '../store/general/general-actions';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
const MySwal = withReactContent(Swal);
const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const EmailUnSubscriptionPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setIsLoading] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [email, setEmail] = useState('');
  const [isHelpee, setIsHelpee] = useState('');
  const [searchParams] = useSearchParams();
  const isHelpeeString = searchParams.get('isHelpee');
  
  useEffect(()=>{
    if(isHelpeeString === 'true') {
      setIsHelpee(true);
    }else {
      setIsHelpee(false);
    }
  }, [isHelpeeString])

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

  const {
    unSubEmailStatus,
    unSubEmailStatusTitle,
    unSubEmailStatusMessage,
  } = useSelector((state) => state.general);

  const emailRef = useRef();

  function handleEmailTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setEmail(typingInput);
  }
  useEffect(() => {
    if (!email || !regex.test(email)) {
      setEnableBtn(false);
      setIsEmailInvalid(true);
    } else if (email && regex.test(email)) {
      setEnableBtn(true);
      setIsEmailInvalid(false);
    }
  }, [email]);
  
  async function handleConfirm(e) {
    e.preventDefault();
    try {
      dispatch(
        unsubEmail({ email: emailRef.current.value, isHelpee: isHelpee })
      );
      setIsLoading(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (unSubEmailStatus === 'error') {
      setIsLoading(false);
      MySwal.fire({
        title: <strong>{t(unSubEmailStatusTitle)}</strong>,
        html: <p>{t(unSubEmailStatusMessage)}</p>,
        icon: 'error',
      });
      return;
    } else if (unSubEmailStatus === 'success') {
      setIsLoading(false);
      MySwal.fire({
        title: <strong>{t(unSubEmailStatusTitle)}</strong>,
        imageWIdth: 442,
        imageHeight: 293,
        html: <p>{t(unSubEmailStatusMessage)}</p>,
        icon: 'success',
      });
    }
  }, [
    t,
    unSubEmailStatus,
    unSubEmailStatusTitle,
    unSubEmailStatusMessage,
    dispatch,
  ]);

  return (
    <div
      className='main-content-wrapper-homepage'
      style={{
        backgroundImage: isHelpee
          ? 'url(/images/assets/helpee-home.jpeg)'
          : 'url(/images/assets/helper-home.jpeg)',
      }}
      title='Photo by Windows on Unsplash'
    >
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          {t('please_enter_your_email')}
        </h2>

        <form action='' className='centerbox-landing'>
          <input
            type='email'
            className='form-control-password'
            placeholder={t('home_enter_email_placeholder')}
            ref={emailRef}
            onChange={handleEmailTyping}
          />
          {isEmailInvalid && (
            <p style={{ color: 'red', marginBottom: '10px' }}>
              {t('form_email_warning')}
            </p>
          )}
          <ConfirmBtn
            cta={t('unsubscribe_cta')}
            disable={!enableBtn}
            handleConfirm={handleConfirm}
          />
        </form>
      </div>
    </div>
  );
};

export default EmailUnSubscriptionPage;
