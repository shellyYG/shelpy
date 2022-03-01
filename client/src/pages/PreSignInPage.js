import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import DangerIcon from '../components/Icons/DangerIcon';

const PreSignInPage = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  function handleToHomepage(e) {
    e.preventDefault();
    let path = '';
    if (props.isHelpee) {
      path = `/${currentLanguage}/home`;
    } else {
      path = `/${currentLanguage}/helper/home`;
    }
    navigate(path);
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
          {props.isHelpee && (
            <h2 style={{ margin: 'auto' }}>
              {t('please')}{' '}
              <Link to={`/${currentLanguage}/helpee/sign-in`}>
                {t('sign_in')}
              </Link>{' '}
              {t('service_types_sign_in_as_helpee')}
            </h2>
          )}
          {!props.isHelpee && (
            <h2 style={{ margin: 'auto' }}>
              {t('please')}{' '}
              <Link to={`/${currentLanguage}/helper/sign-in`}>
                {t('sign_in')}
              </Link>{' '}
              {t('service_types_sign_in_as_helper')}
            </h2>
          )}
          {props.isHelpee && (
            <h2 style={{ margin: '10px auto' }}>
              {t('dont_have_helpee_account')}
            </h2>
          )}
          {!props.isHelpee && (
            <h2 style={{ margin: '10px auto' }}>
              {t('dont_have_helper_account')}
            </h2>
          )}
          <button
            className='btn-next'
            style={{ width: '180px' }}
            onClick={handleToHomepage}
          >
            {t('sign_up_here')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreSignInPage;
