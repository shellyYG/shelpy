import ConfirmBtn from '../../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../App.css';
import {
  clearSignUpEmailStatus,
  postHelpeeSignUpEmail,
} from '../../store/helpee/helpee-actions';
import MktRow from '../../components/MktRow';

const MySwal = withReactContent(Swal);

const HelpeeSignUpPage = () => {
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
      navigate('/helpee/sign-up-final-step', { replace: true });
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
    <div className='main-content-wrapper-no-height'>
      <div className='home-page-container'>
        <div className='centerWrapperWithBackground'>
          <div className='coverLeft'>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                Thinking about your next step?
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
                Talk to an insider <br />
                before you make your decision!
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
                Create an account to find an insider.
              </h3>

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
                  padding: '5px 30px',
                }}
              >
                By providing your email address, you agree to receive offers
                from Shelpy, according to our{' '}
                <a href='/privacy-policy' target='_blank'>
                  privacy policy
                </a>
                . <br />
                You can{' '}
                <a href='/unsubscribe' target='_blank'>
                  unsubscribe
                </a>{' '}
                at any time.
              </p>
              <div style={{ textAlign: 'center' }}>
                <Link to='/helpee/sign-in'>
                  Alreave have an account? Sign In here!
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='centerWrapperMkt'>
          <div className='mktWrapper'>
            <MktRow
              title='MINIMIZE your risk'
              details1='Afraid of taking that big leap?'
              details2='Invest only 30 min and a few bucks before you make the final decision.'
              imagePath='/dinner.jpeg'
              lastChild={true}
            />
            <MktRow
              title='MEET role models'
              details1='Do not have the network?'
              details2='Come talk to people who have successfully gone through your dream path.'
              imagePath='/friends.jpeg'
              lastChild={false}
            />
            <MktRow
              title='CONTROL your privacy'
              details1="Still thinking about the adventure but don't want to let people know?"
              details2='You decide if you want to ask questions anonymously.'
              imagePath='/oneToOne.jpeg'
              lastChild={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpeeSignUpPage;
