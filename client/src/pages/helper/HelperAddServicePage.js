import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { helperAddServiceOptions } from '../../store/options/navigate-options';
import '../../App.css';
import HelperAddServiceCard from '../../components/HelperAddServiceCard';

const HelperAddServicePage = () => {
  const { offerTarget } = useSelector((state) => state.helper);
  const navigate = useNavigate();
  function handleNext(e) {
    e.preventDefault();
    let path;
    switch (offerTarget) {
      case 'addOffer':
        path = '/helper/service-types';
        break;
      case 'viewDashboard':
        path = '/helper/dashboard';
        break;
      default:
        path = '/helper/service-types';
    }
    navigate(path, { replace: true });
  }
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
          Add you first offer!
        </h2>
        <div className='container'>
          {helperAddServiceOptions.map((option) => (
            <HelperAddServiceCard
              imageSrc={option.imgPath}
              title={option.label}
              value={option.value}
              offerTarget={offerTarget}
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

export default HelperAddServicePage;
