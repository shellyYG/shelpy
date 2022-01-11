import CheckBox from "../components/CheckBox";
import ConfirmBtn from "../components/ConfirmBtn";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../App.css";
import { postHelpeeSignInData } from '../store/helpee/helpee-actions';

const MySwal = withReactContent(Swal);

const SignInPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const DBHelpeePassword = useSelector((state) => state.helpee);

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
      password: passwordRef.current.value,
    };
    console.log('postHelpeeSignInData -> data: ', data);
    try {
      dispatch(postHelpeeSignInData(data));
    } catch (err) {
      console.error(err);
    }
    await MySwal.fire({
      title: <strong>Thank you!</strong>,
      html: <p>Successfully signed-in.</p>,
      icon: "success",
    });
    let path = "/service-options";
    navigate(path, { replace: true });
  }

  return (
    <div className="main-content-wrapper-homepage-no-background">
      <div className="section-center-align" style={{ paddingTop: "5%" }}>
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>
          Welcome back!
        </h1>
        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          Please insert your username and password to sign in.
        </h2>

        <form action="" className="centerbox-landing">
          <input
            type="text"
            className="form-control-password"
            placeholder="Enter Email Address"
            ref={emailRef}
          />
          <input
            type="text"
            className="form-control-password"
            placeholder="Enter Password"
            ref={passwordRef}
          />
          <div style={{ paddingBottom: '10px', fontSize: '12px'}}>
            <Link
              to="/about"
            >
              Forget Password
            </Link>
          </div>

          <ConfirmBtn cta="Sign In ❯" handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
