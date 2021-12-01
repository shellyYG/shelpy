// import { useHistory } from 'react-router-dom';
import CheckBox from '../components/CheckBox';
import ConfirmBtn from '../components/ConfirmBtn';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { postHelpeeSignUpEmail } from '../store/helpee/helpee-actions'

const MySwal = withReactContent(Swal);

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const DBHelpeeEmail  = useSelector((state) => state.helpeeAccount);
  const emailRef = useRef();
  const [email, setEmail] = useState(DBHelpeeEmail);
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
    await MySwal.fire({
      title: <strong>Thank you!</strong>,
      html: <i>You are signed up successfully.</i>,
      icon: 'success',
    });
    let path = 'book-appointment-form';
    history.push(path);
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
      <div className="section-center-align">
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
