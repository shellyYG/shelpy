import ConfirmBtn from "../../components/ConfirmBtn";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../App.css";
import {
  clearSignInStatus,
  postHelpeeSignInData,
  getHelpeeAuthStatus,
} from '../../store/helpee/helpee-actions';
const MySwal = withReactContent(Swal);

const HelpeeSignInPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const {
    signInStatus,
    signInStatusTitle,
    signInStatusMessage,
  } = useSelector((state) => state.helpeeNotification);
  const { helpeeAccountStatus } = useSelector((state) => state.helpee);
  console.log('helpeeAccountStatus: ', helpeeAccountStatus);

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
    // change DB & global state
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      isHelpee: true,
    };
    dispatch(postHelpeeSignInData(data));
    setIsLoading(true);
  }
  useEffect(() => {
    if (signInStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'error',
        });
        dispatch(clearSignInStatus());
      }
      sweetAlertAndClearStatus(signInStatus, signInStatusMessage);
      return;
    } else if (signInStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'success',
        });
        dispatch(getHelpeeAuthStatus());
        dispatch(clearSignInStatus());
        if (helpeeAccountStatus === 'password_created') {
          navigate('/helpee/basic-form', { replace: true });
        } else {
          navigate('/helpee/service-types', { replace: true });
        }
      }
      sweetAlertAndNavigate(signInStatus, signInStatusMessage);
    }
  }, [
    helpeeAccountStatus,
    signInStatus,
    signInStatusMessage,
    signInStatusTitle,
    navigate,
    dispatch,
  ]);

  return (
    <div className='main-content-wrapper-homepage'>
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          Welcome back!
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          Please insert your username and password to sign in.
        </h2>

        <form action='' className='centerbox-landing'>
          <input
            type='email'
            className='form-control-password'
            placeholder='Enter Email Address'
            ref={emailRef}
          />
          <input
            type='text'
            className='form-control-password'
            placeholder='Enter Password'
            ref={passwordRef}
          />
          <div style={{ paddingBottom: '10px', fontSize: '12px' }}>
            <Link to='/helpee/forget-password' style={{ marginRight: '10px' }}>
              Forget Password
            </Link>
            <Link to='/home'>Don't have account yet? SIGN UP here!</Link>
          </div>

          <ConfirmBtn cta='Sign In ❯' handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default HelpeeSignInPage;
