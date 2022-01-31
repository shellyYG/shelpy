import "../../App.css";
import SignUpPageHelpee from "./SignUpPageHelpee";
import LoggedInHelpeeHomePage from "./LoggedInHelpeeHomePage";

const HomePage = (props) => {
  return (
    <SignUpPageHelpee />
    // <>
    //   {props.isAuthenticated && <LoggedInHelpeeHomePage />}
    //   {!props.isAuthenticated && <SignUpPageHelpee />}
    // </>
  );
};

export default HomePage;
