import CheckBox from '../components/CheckBox';
import ConfirmBtn from '../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
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
    dispatch(postHelpeeSignUpEmail(data)); // can't await useDispatch(), hence, use useEffect for status happening afterwards
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
      // need to create sweetAlert function inside useEffect or it will rerender everytime
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'success',
        });
        dispatch(clearSignUpEmailStatus());
        // to perform navigate after await MySwal, we need to create extra async function sweetAlertAndNavigate to wrap MySwal.
        navigate('/sign-up-final-step', { replace: true });
      }
      sweetAlertAndNavigate(signUpEmailStatusTitle, signUpEmailStatusMessage);
    }
  }, [
    signUpEmailStatus,
    signUpEmailStatusMessage,
    signUpEmailStatusTitle,
    navigate,
    dispatch,
  ]);
  return (
    <div className="main-content-wrapper-homepage">
      <div className="section-center-align-landing">
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>
          Afraid of speaking in German?
        </h1>
        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          Don't worry. We speak for you.
        </h2>
        <h5
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Create an account to find a helper who goes with you to your German
          meetings!
        </h5>

        <form action="" className="centerbox-landing">
          <input
            type="text"
            className="form-control-landing"
            placeholder="Enter Email Address"
            value={email}
            onChange={handleEmailTyping}
            ref={emailRef}
          />
          <ConfirmBtn cta="Sign Up ❯" handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default SignUpPageHelpee;
