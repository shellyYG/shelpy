import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import DangerIcon from '../components/Icons/DangerIcon';

const PreSignInPage = (props) => {
  const { t } = useTranslation();
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
    <div className='section-left-align'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div
          style={{ paddingTop: '5%', margin: '50px auto' }}
        >
          <DangerIcon />
          <h1
            style={{
              textAlign: 'center',
              marginTop: '30px',
              marginBottom: '30px',
            }}
          >
            {props.isHelpee && t('oops_helpee_not_sign_in')}
            {!props.isHelpee && t('oops_helper_not_sign_in')}
          </h1>
          <div style={{ textAlign: 'center' }}>
            <button className='btn-next' onClick={handleNext}>
              {t('sign_in')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSignInPage;
