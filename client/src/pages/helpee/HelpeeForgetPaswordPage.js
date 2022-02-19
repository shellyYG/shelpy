import ConfirmBtn from '../../components/ConfirmBtn';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../App.css';
import { useDispatch } from 'react-redux';

import { sendHelpeePasswordResetLink } from '../../store/helpee/helpee-actions';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
const MySwal = withReactContent(Swal);
const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const HelpeeForgetPasswordPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [enableBtn, setEnableBtn] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [email, setEmail] = useState('')
  
  const emailRef = useRef();

   function handleEmailTyping(e) {
     e.preventDefault();
     const typingInput = e.target.value;
     setEmail(typingInput);
   }
  useEffect(() => {
    if (!email || !regex.test(email)) {
      setEnableBtn(false);
      setIsEmailInvalid(true)
    } else if (email && regex.test(email)){
      setEnableBtn(true);
      setIsEmailInvalid(false);
    }
  },[email])
  
  async function handleConfirm(e) {
    e.preventDefault();
    try {
        dispatch(sendHelpeePasswordResetLink({ email: emailRef.current.value }));
        MySwal.fire({
          title: <strong>{t('forget_password_email_has_been_sent')}</strong>,
          html: <p>{t('forget_password_please_click_link')}</p>,
        });
    } catch (error) {
        console.error(error);
    }
    
  }

  return (
    <div className='main-content-wrapper-homepage'>
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          {t('forget_password_title')}
        </h1>
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
            <p style={{ color: 'red', marginBottom: '10px' }}>{t('form_email_warning')}</p>
          )}
          <ConfirmBtn
            cta={t('get_password_cta')}
            disable={!enableBtn}
            handleConfirm={handleConfirm}
          />
        </form>
      </div>
    </div>
  );
};

export default HelpeeForgetPasswordPage;
