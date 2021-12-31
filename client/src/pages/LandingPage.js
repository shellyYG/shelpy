import CheckBox from '../components/CheckBox';
import ConfirmBtn from '../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../App.css';
import { postHelpeeSignUpEmail } from '../store/helpee/helpee-actions'

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { DBHelpeeEmail }= useSelector((state) => state.helpee);
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [goBack, setGoBack] = useState('');
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.removeEventListener("popstate", onBackButtonEvent);
    navigate(-1);
  };
  const { globalServiceType } = useSelector((state) => state.helpee);
  console.log('globalServiceType: ', globalServiceType);
  useEffect(() => {
    console.log("window.location.pathname: ", window.location.pathname);
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent, { once: true });
  }, []);
  async function handleConfirm(e) {
    e.preventDefault();
    // change DB & global state
    const data = {
      helpeeEmail: emailRef.current.value,
    };
    try {
      dispatch(postHelpeeSignUpEmail(data));
    } catch (err) {
      console.error(err);
    }
    let path = '/sign-up-final-step';
    navigate(path, { replace: true });
  }
  function handleEmailTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    console.log('typingInput: ', typingInput);
    setEmail(typingInput);
  }
  useEffect(() => {
    setEmail(DBHelpeeEmail);
  }, [DBHelpeeEmail]);
  return (
    <div className="main-content-wrapper-homepage">
      <div className="section-center-align-landing">
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
          Afraid of speaking in German?
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          Don't worry. We speak for you.
        </h2>
        <h5
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          Create an account to find a helper who goes with you to your German
          meetings!
        </h5>

        <form action="" className="centerbox-landing">
          <input
            type="text"
            className="form-control-landing"
            placeholder="Email address"
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

export default LandingPage;
