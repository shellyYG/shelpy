import "../../App.css";
import HelpeeSignUpPage from './HelpeeSignUpPage';
import HelpeeLoggedInHomePage from './HelpeeLoggedInHomePage';

const HelpeeHomePage = (props) => {
  return (
    <HelpeeSignUpPage />
    // <>
    //   {props.isAuthenticated && <HelpeeLoggedInHomePage />}
    //   {!props.isAuthenticated && <HelpeeSignUpPage />}
    // </>
  );
};

export default HelpeeHomePage;
