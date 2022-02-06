import { useNavigate } from 'react-router-dom';
import '../App.css';

const PreSignInPage = (props) => {
  const navigate = useNavigate();
  function handleNext(e) {
    e.preventDefault();
    let path = '';
    if (props.isHelpee) {
      path = '/helpee/sign-in';
    } else {
      path = '/helper/sign-in';
    }
    navigate(path, { replace: true });
  }
  return (
    <div className='main-content-wrapper-homepage-no-background'>
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
          Oops! Seems like you are not signed in yet.
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          Please sign in to continue.
        </h2>
        <div style={{ textAlign: 'center' }}>
          <button className='btn-next' onClick={handleNext}>
            Sign-In ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreSignInPage;
