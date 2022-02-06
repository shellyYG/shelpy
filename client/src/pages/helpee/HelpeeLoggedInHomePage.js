import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { navigateOptions } from "../../store/options/navigate-options";
import "../../App.css";
import HomePageCard from '../../components/HomePageCard';

const HelpeeLoggedInHomePage = () => {
  const { globalNavigateTarget } = useSelector((state) => state.helpee);
  const navigate = useNavigate();
  function handleNext(e) {
    e.preventDefault();
    let path;
    switch (globalNavigateTarget) {
      case 'bookHelper':
        path = '/service-options';
        break;
      case 'viewOrderHistory':
        path = '/helpee/dashboard';
        break;
      default:
        path = '/service-options';
    }
    navigate(path, { replace: true });
  }
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate('/home', { replace: true });
  };
  window.addEventListener('popstate', onBackButtonEvent, { once: true });
  return (
    <div className='main-content-wrapper-no-background'>
      <div className='section-center-align'>
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Welcome back</h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          What can we offer you today?
        </h2>
        <div className='container'>
          {navigateOptions.map((option) => (
            <HomePageCard
              imageSrc={option.imgPath}
              title={option.label}
              value={option.value}
              globalNavigateTarget={globalNavigateTarget}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className='btn-next' onClick={handleNext}>
            Next ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpeeLoggedInHomePage;
