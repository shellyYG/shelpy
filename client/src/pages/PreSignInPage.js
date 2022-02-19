import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';

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
    <div className='main-content-wrapper-homepage-no-background'>
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
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
  );
};

export default PreSignInPage;
