import ConfirmBtn from '../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../App.css';
import {
  clearSignUpEmailStatus,
  postHelpeeSignUpEmail,
} from '../store/helpee/helpee-actions';

const MySwal = withReactContent(Swal);

const SignUpPageHelpee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { DBHelpeeEmail } = useSelector((state) => state.helpee);
  const {
    signUpEmailStatus,
    signUpEmailStatusTitle,
    signUpEmailStatusMessage,
  } = useSelector((state) => state.notification);
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };
  window.addEventListener("popstate", onBackButtonEvent, { once: true });
  async function handleConfirm(e) {
    e.preventDefault();
    // change DB & global state
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
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
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
      navigate('/sign-up-final-step', { replace: true });
      dispatch(clearSignUpEmailStatus());
    }
  }, [
    signUpEmailStatus,
    signUpEmailStatusMessage,
    signUpEmailStatusTitle,
    navigate,
    dispatch,
  ]);
  return (
    <div className='main-content-wrapper-homepage'>
      <div className='section-center-align-landing'>
        <div className='centerWrapper'>
          <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
            Change job or apply for university?
          </h2>
          <h3
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '30px',
            }}
          >
            Talk to insider before you make your decision!
          </h3>
          <h5
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            Create an account to find an insider.
          </h5>

          <form action='' className='centerbox-landing'>
            <input
              type='text'
              className='form-control-landing'
              placeholder='Enter Email Address'
              value={email}
              onChange={handleEmailTyping}
              ref={emailRef}
            />
            <ConfirmBtn cta='Sign Up ❯' handleConfirm={handleConfirm} />
          </form>
          <p
            style={{
              textAlign: 'center',
              marginTop: '5px',
              marginBottom: '10px',
              fontSize: '10px',
            }}
          >
            By providing your email address, you agree to receive offers from
            Shelpy, according to our{' '}
            <a href='/privacy-policy' target='_blank'>
              privacy policy
            </a>
            . <br />
            You can unsubscribe at any time.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link to='/sign-in'>Alreave have an account? Sign In here!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPageHelpee;
