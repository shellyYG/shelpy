import '../../App.css';
import HelperSignUpPage from './HelperSignUpPage';
import HelperLoggedInHomePage from '../helper/HelperLoggedInHomePage';

const HelperHomePage = (props) => {
  return (
    <HelperSignUpPage />
    // <>
    //   {props.isHelpeeAuthenticated && <HelperLoggedInHomePage />}
    //   {!props.isHelpeeAuthenticated && <HelperSignUpPage />}
    // </>
  );
};

export default HelperHomePage;
