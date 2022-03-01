import '../App.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DangerIcon from '../components/Icons/DangerIcon';



const ErrorPage = () => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const navigate = useNavigate();
  function handleToHomepage(e) {
    e.preventDefault();
    navigate(`/${currentLanguage}/home`, { replace: true });
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
        <div style={{ margin: '50px auto' }}>
          <DangerIcon />
          <h1>{t('are_you_lost')}</h1>
          <h2 style={{ margin: '10px auto' }}>{t('page_not_exist')}</h2>
          <button
            className='btn-next'
            style={{ width: '200px' }}
            onClick={handleToHomepage}
          >
            {t('back_to_home')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
