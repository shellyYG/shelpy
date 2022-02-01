import '../../App.css';
import HelperSignUpPage from './HelperSignUpPage';
import HelperLoggedInHomePage from '../helper/HelperLoggedInHomePage';

const HelperHomePage = (props) => {
  return (
    <HelperSignUpPage />
    // <>
    //   {props.isAuthenticated && <HelperLoggedInHomePage />}
    //   {!props.isAuthenticated && <HelperSignUpPage />}
    // </>
  );
};

export default HelperHomePage;
