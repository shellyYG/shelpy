import "../../App.css";
import HelpeeSignUpPage from './HelpeeSignUpPage';
import HelpeeLoggedInHomePage from './HelpeeLoggedInHomePage';

const HelpeeHomePage = (props) => {
  return (
    <HelpeeSignUpPage />
    // <>
    //   {props.isHelpeeAuthenticated && <HelpeeLoggedInHomePage />}
    //   {!props.isHelpeeAuthenticated && <HelpeeSignUpPage />}
    // </>
  );
};

export default HelpeeHomePage;
