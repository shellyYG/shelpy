import '../App.css';
import { useNavigate } from 'react-router-dom';
import DangerIcon from '../components/Icons/DangerIcon';


const ErrorPage = () => {
  const navigate = useNavigate();
  function handleToHomepage(e) {
    e.preventDefault();
    navigate('/home', { replace: true });
  }
  return (
    <div className='section-left-align'>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <div style={{ margin: '50px auto' }}>
          <DangerIcon />
          <h1>Are you lost?</h1>
          <h2 style={{ margin: '10px auto' }}>This page does not exist.</h2>
          <button
            className='btn-next'
            style={{ width: '200px' }}
            onClick={handleToHomepage}
          >
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
