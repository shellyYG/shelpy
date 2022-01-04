import CheckBox from '../components/CheckBox';
import ConfirmBtn from '../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../App.css';
import { postHelpeeSignUpEmail } from '../store/helpee/helpee-actions'

const SignUpPageHelpee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { DBHelpeeEmail } = useSelector((state) => state.helpee);
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
      helpeeEmail: emailRef.current.value,
    };
    try {
      dispatch(postHelpeeSignUpEmail(data));
    } catch (err) {
      console.error(err);
    }
    navigate("/sign-up-final-step", { replace: true });
  }
  function handleEmailTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setEmail(typingInput);
  }
  useEffect(() => {
    setEmail(DBHelpeeEmail);
  }, [DBHelpeeEmail]);
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
