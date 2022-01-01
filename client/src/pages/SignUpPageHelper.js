import CheckBox from '../components/CheckBox';
import ConfirmBtn from '../components/ConfirmBtn';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../App.css';

const MySwal = withReactContent(Swal);

const SignUpPageHelper = () => {
  const [dataHandoverChecked, setDataHandoverChecked] = useState(false);
  const dataHandoverCheckedRef = useRef();
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };
  window.addEventListener("popstate", onBackButtonEvent, { once: true });
  async function handleConfirm(e) {
    e.preventDefault();
    await MySwal.fire({
      title: <strong>Thank you!</strong>,
      html: <i>You are signed up successfully.</i>,
      icon: "success",
    });
    let path = "/book-appointment-form";
    navigate(path, { replace: true });
  }
  return (
    <div className="main-content-wrapper-homepage-helper">
      <div className="section-center-align-landing">
        <h1 style={{ textAlign: "center", marginTop: "30px", color: "white" }}>
          Tired of earning money with busy cycling?
        </h1>
        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
            color: "white",
          }}
        >
          Join us, help people, and get easy pay!
        </h2>
        <h5
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
            color: "white",
          }}
        >
          Create an account to be a helper who accompany foreigners to their
          German meetings.
        </h5>
        <form action="" className="centerbox-landing">
          <input
            type="text"
            className="form-control-landing"
            placeholder="Enter Email Address"
          />
          <ConfirmBtn cta="Sign Up ❯" handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default SignUpPageHelper;
