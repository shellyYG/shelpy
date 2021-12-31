import CheckBox from "../components/CheckBox";
import ConfirmBtn from "../components/ConfirmBtn";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { postHelpeeSignUpEmail } from "../store/helpee/helpee-actions";
import SignUpPageHelpee from "./SignUpPageHelpee";
import LoggedInHelpeeHomePage from "./LoggedInHelpeeHomePage";

const HomePage = () => {
  const [ loggedIn, setLoggedIn ] = useState(true);
  return (
    <>
      {loggedIn && <LoggedInHelpeeHomePage />}
      {!loggedIn && <SignUpPageHelpee />}
    </>
  );
};

export default HomePage;
