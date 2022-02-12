import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jobUniOptions, jobUniOptionsHelper } from '../store/options/navigate-options';
import '../App.css';
import JobOrUniCard from '../components/JobOrUniCard';
const SelectJobOrUniPage = (props) => {
  const { globalHelpeeJobOrUniTarget } = useSelector((state) => state.helpee);
  const { globalHelperJobOrUniTarget } = useSelector((state) => state.helper);
  const navigate = useNavigate();
  
  function handleNext(e) {
    e.preventDefault();
    const userType = props.isHelpee? 'helpee': 'helper';
    const jobOrUniTargetBase = props.isHelpee
      ? globalHelpeeJobOrUniTarget
      : globalHelperJobOrUniTarget;
    let path;
    switch (jobOrUniTargetBase) {
      case 'job':
        path = `/${userType}/job-form`;
        break;
      case 'university':
        path = `/${userType}/uni-form`;
        break;
      case 'selfEmployed':
        path = `/${userType}/self-employed-form`;
        break;
      default:
        path = `/${userType}/job-form`;
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
          {props.isHelpee && 'What is your next step?'}
          {!props.isHelpee && 'What experiences do you want to offer?'}
        </h2>
        <div className='container'>
          {props.isHelpee &&
            jobUniOptions.map((option) => (
              <JobOrUniCard
                imageSrc={option.imgPath}
                title={option.label}
                value={option.value}
                isHelpee={props.isHelpee}
                globalHelpeeJobOrUniTarget={globalHelpeeJobOrUniTarget}
                globalHelperJobOrUniTarget={globalHelperJobOrUniTarget}
                key={option.value}
              />
            ))}
          {!props.isHelpee &&
            jobUniOptionsHelper.map((option) => (
              <JobOrUniCard
                imageSrc={option.imgPath}
                title={option.label}
                value={option.value}
                isHelpee={props.isHelpee}
                globalHelpeeJobOrUniTarget={globalHelpeeJobOrUniTarget}
                globalHelperJobOrUniTarget={globalHelperJobOrUniTarget}
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

export default SelectJobOrUniPage;
