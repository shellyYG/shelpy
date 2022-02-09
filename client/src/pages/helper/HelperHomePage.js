import '../../App.css';
import HelperSignUpPage from './HelperSignUpPage';
import HelperLoggedInHomePage from '../helper/HelperLoggedInHomePage';

const HelperHomePage = (props) => {
  return (
    <>
      {props.isHelperAuthenticated && <HelperLoggedInHomePage />}
      {!props.isHelperAuthenticated && <HelperSignUpPage />}
    </>
  );
};

export default HelperHomePage;
