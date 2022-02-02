import ConfirmBtn from '../../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../App.css';
import {
  getAuthStatus,
  clearSignUpPasswordStatus,
  postHelpeeSignUpPassword,
} from '../../store/helpee/helpee-actions';

const MySwal = withReactContent(Swal);

const HelpeeSignUpPasswordPage = () => {
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
  } = useSelector((state) => state.notification);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate('/home', { replace: true });
  };
  window.addEventListener('popstate', onBackButtonEvent, { once: true });
  if (loading) {
    MySwal.fire({
      title: 'Loading...',
      html: 'Please do not close the window.',
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
      isHelpee: true,
      password: passwordRef.current.value,
      status: 'password_created',
    };
    dispatch(postHelpeeSignUpPassword(data));
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
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'error',
        });
        dispatch(clearSignUpPasswordStatus());
      }
      sweetAlertAndClearStatus(
        signUpPasswordStatusTitle,
        signUpPasswordStatusMessage
      );
      navigate('/home', { replace: true });
      return;
    } else if (signUpPasswordStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'success',
        });
        dispatch(getAuthStatus());
        dispatch(clearSignUpPasswordStatus());
        // to perform navigate after await MySwal, we need to create extra async function sweetAlertAndNavigate to wrap MySwal.
        navigate('/helpee/book-a-helper', { replace: true });
      }
      sweetAlertAndNavigate(
        signUpPasswordStatusTitle,
        signUpPasswordStatusMessage
      );
    }
  }, [
    signUpPasswordStatus,
    signUpPasswordStatusMessage,
    signUpPasswordStatusTitle,
    navigate,
    dispatch,
  ]);

  return (
    <div className='main-content-wrapper-homepage'>
      <div className='section-center-align'>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          Create password to finish signing up
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          Take less than a minute!
        </h2>

        <form action='' className='centerbox-landing'>
          <input
            type='text'
            className='form-control-password'
            placeholder='Enter Email'
            value={email}
            ref={emailRef}
            disabled
          />
          <input
            type='text'
            className='form-control-password'
            placeholder='Enter Password'
            value={password}
            onChange={handlePasswordTyping}
            ref={passwordRef}
          />
          <div className='form-row-password' style={{ marginBottom: '20px' }}>
            <input
              type='checkbox'
              checked={hasGiveConsent}
              onChange={handleHasGiveConsent}
              style={{ marginRight: '20px ' }}
            />
            <div className='checkbox-text-password-page'>
              You agree to Shelpy's{' '}
              <a href='/privacy-policy' target='_blank'>
                privacy policy
              </a>{' '}
              and{' '}
              <a href='/terms-and-conditions' target='_blank'>
                terms and conditions
              </a>
              .
            </div>
          </div>
          <ConfirmBtn
            cta='Sign Up ❯'
            disable={!hasGiveConsent || password.length === 0}
            handleConfirm={handleConfirm}
          />
        </form>
      </div>
    </div>
  );
};

export default HelpeeSignUpPasswordPage;
