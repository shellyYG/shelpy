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
    <div className='main-content-wrapper-no-height'>
      <div className='home-page-container'>
        <div className='centerWrapperWithBackground'>
          <div className='coverLeft'>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                Thinking about changing your life ?
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
                <Link to='/sign-in'>
                  Alreave have an account? Sign In here!
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='centerWrapperMkt'>
          <div className='mktWrapper'>
            <MktRow
              title='What if...my life could be totally different ?'
              details1='We understand. Everyone has that moment of doubt in life.'
              details2='And we believe, everyone has the power to change their own life.'
              imagePath='/what-if.jpeg'
              lastChild={false}
            />
            <MktRow
              title='Feeling lonely on your way to your dream ?'
              details1='Come talk to people who have successfully gone through your dream path.'
              details2='You are not alone.'
              imagePath='/yeah-that-way.jpeg'
              lastChild={false}
            />
            <MktRow
              title='Lacking of friends/role models with similar experience ?'
              details1="Don't worry."
              details2='Come search insiders from our database.'
              imagePath='/friends.jpeg'
              lastChild={false}
            />
            <MktRow
              title='Still afraid of starting ?'
              details1='Buy us a drink, we share with you.'
              details2='Invest only 30 min and a few bucks before you make that big leap.'
              imagePath='/dinner.jpeg'
              lastChild={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPageHelpee;
