// import { useHistory } from 'react-router-dom';
import CheckBox from '../components/CheckBox';
import ConfirmBtn from '../components/ConfirmBtn';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../App.css';
import { postHelpeeSignUpEmail } from '../store/helpee/helpee-actions';

const MySwal = withReactContent(Swal);

const SignUpPasswordPage = () => {
  const history = useHistory();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const DBHelpeePassword = useSelector((state) => state.helpeeAccount);
  const [email, setEmail] = useState('shellyyangtw@gmail.com');
  const [password, setPassword] = useState('');
  async function handleConfirm(e) {
    e.preventDefault();
    // change DB & global state
    const data = {
      helpeePassword: passwordRef.current.value,
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
    let path = 'service-options';
    history.push(path);
  }
  function handlePasswordTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    console.log('typingInput: ', typingInput);
    setPassword(typingInput);
  }
  useEffect(() => {
    setPassword(DBHelpeePassword);
  }, [DBHelpeePassword]);
  return (
    <div className="main-content-wrapper-homepage">
      <div className="section-center-align">
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
          Create Password to finish signing up
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          Take less than a minute!
        </h2>

        <form action="" className="centerbox-landing">
          <input
            type="text"
            className="form-control-password"
            placeholder="Email address"
            value={email}
          />
          <input
            type="text"
            className="form-control-password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordTyping}
            ref={passwordRef}
          />
         
          <div className="form-row-password">
            <input
              type="checkbox"
              // checked={props.checked}
              // onChange={handleCheck}
              // ref={props.checkRef}
              style={{ marginRight: '20px '}}
            />
            <div
              className="checkbox-text-password-page"
            >
              Yes, please email me Shelpy's special offers.
            </div>
          </div>
         
          <ConfirmBtn cta="Sign Up ❯" handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default SignUpPasswordPage;
