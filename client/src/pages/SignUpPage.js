// import { useHistory } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import '../App.css';

const SignUpPage = () => {
  // const history = useHistory();
  return (
    <div className="main-content-wrapper" style={{ height: 500 }}>
      <div className="section-left-align">
        <div></div>
      </div>
      <div className="section-center-align">
        <div className="container">
          <SignUpForm />
        </div>
      </div>
      <div className="section-right-align">
      </div>
    </div>
  );
};

export default SignUpPage;
