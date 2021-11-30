// import { useHistory } from 'react-router-dom';
import CheckBox from '../components/CheckBox';
import ConfirmBtn from '../components/ConfirmBtn';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../App.css';

const MySwal = withReactContent(Swal);

const LandingPageHelper = () => {
  // const history = useHistory();
  const [dataHandoverChecked, setDataHandoverChecked] = useState(false);
  const dataHandoverCheckedRef = useRef();
  const history = useHistory();
  async function handleConfirm(e) {
    e.preventDefault();
    await MySwal.fire({
      title: <strong>Thank you!</strong>,
      html: <i>You are signed up successfully.</i>,
      icon: 'success',
    });
    let path = 'book-appointment-form';
    history.push(path);
  }
  return (
    <div className="main-content-wrapper-homepage-helper">
      <div className="section-center-align">
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          Tired of earning money with busy cycling?
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          Join us, help people, and get easy pay!
        </h2>
        <h5
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '10px',
            color: 'white',
          }}
        >
          Create an account to be a helper who accompany foreigners to their German meetings.
        </h5>
        <form action="" className="centerbox-landing">
          <input
            type="text"
            className="form-control-landing"
            placeholder="Email address"
          />
          <ConfirmBtn cta="Sign Up >" handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default LandingPageHelper;
