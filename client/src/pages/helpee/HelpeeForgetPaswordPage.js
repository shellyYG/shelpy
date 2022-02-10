import ConfirmBtn from '../../components/ConfirmBtn';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../App.css';
import { useDispatch } from 'react-redux';

import { sendHelpeePasswordResetLink } from '../../store/helpee/helpee-actions';
const MySwal = withReactContent(Swal);

const HelpeeForgetPasswordPage = () => {
    console.log('HelpeeForgetPasswordPage...');
  const dispatch = useDispatch();
  const emailRef = useRef();
  
  async function handleConfirm(e) {
    e.preventDefault();
    try {
        dispatch(sendHelpeePasswordResetLink({ email: emailRef.current.value }));
        MySwal.fire({
          title: <strong>An email has been sent to your mailbox.</strong>,
          html: <p>Click on the link of your email to reset your password.</p>,
        });
    } catch (error) {
        console.error(error);
    }
    
  }

  return (
    <div className='main-content-wrapper-homepage'>
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          Don't worry, we got you covered.
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          Please enter your email
        </h2>

        <form action='' className='centerbox-landing'>
          <input
            type='email'
            className='form-control-password'
            placeholder='Enter Email Address'
            ref={emailRef}
          />
          <ConfirmBtn cta='Get password reset link' handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default HelpeeForgetPasswordPage;
