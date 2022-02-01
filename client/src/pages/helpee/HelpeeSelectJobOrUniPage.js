import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jobUniOptions } from '../../store/options/navigate-options';
import '../../App.css';
import JobOrUniCard from '../../components/JobOrUniCard';
const HelpeeSelectJobOrUniPage = () => {
  const { globalJobOrUniTarget } = useSelector((state) => state.helpee);
  const navigate = useNavigate();
  console.log('globalJobOrUniTarget: ', globalJobOrUniTarget);
  function handleNext(e) {
    e.preventDefault();
    let path;
    switch (globalJobOrUniTarget) {
      case 'job':
        path = '/helpee/job-form';
        break;
      case 'university':
        path = '/helpee/uni-form';
        break;
      case 'selfEmployed':
        path = '/helpee/self-employed-form';
        break;
      default:
        path = '/helpee/job-form';
    }
    navigate(path, { replace: true });
  }
  return (
    <div className='main-content-wrapper-no-background'>
      <div className='section-center-align'>
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Welcome!</h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          What do you want to know?
        </h2>
        <div className='container'>
          {jobUniOptions.map((option) => (
            <JobOrUniCard
              imageSrc={option.imgPath}
              title={option.label}
              value={option.value}
              globalJobOrUniTarget={globalJobOrUniTarget}
              key={option.value}
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

export default HelpeeSelectJobOrUniPage;
