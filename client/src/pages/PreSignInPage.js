import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import DangerIcon from '../components/Icons/DangerIcon';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logLandOnPage } from '../store/general/general-actions';

const PreSignInPage = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  function handleToHomepage(e) {
    e.preventDefault();
    let path = '';
    if (props.isHelpee) {
      path = `/${currentLanguage}/home`;
      if (window.location.search) path += window.location.search;
    } else {
      path = `/${currentLanguage}/helper/home`;
      if (window.location.search) path += window.location.search;
    }
    navigate(path);
  }
  function handleSignIn(e) {
    e.preventDefault();
    let path = '';
    if (props.isHelpee) {
      path = `/${currentLanguage}/helpee/sign-in`;
      if (window.location.search) path += window.location.search;
    } else {
      path = `/${currentLanguage}/helper/sign-in`;
      if (window.location.search) path += window.location.search;
    }
    navigate(path);
  }

  useEffect(() => {
    const today = new Date();
    dispatch(
      logLandOnPage({
        currentPathname: window.location.href,
        providerId,
        offerId,
        refId,
        viewTimeStamp: Date.now(),
        viewTime:
          today.getHours() +
          ':' +
          today.getMinutes() +
          ':' +
          today.getSeconds(),
        viewDate: today.toISOString().slice(0, 10),
      })
    );
  }, [providerId, offerId, refId, dispatch]);

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
            <>
              <h2 style={{ margin: '10px auto' }}>{t('please')}</h2>
              <button
                className='btn-next'
                style={{ width: '180px' }}
                onClick={handleSignIn}
              >
                {t('sign_in')}
              </button>
              <h2 style={{ margin: '10px auto' }}>
                {t('service_types_sign_in_as_helpee')}
              </h2>
            </>
          )}
          {!props.isHelpee && (
            <>
              <h2 style={{ margin: '10px auto' }}>{t('please')}</h2>
              <button
                className='btn-next'
                style={{ width: '180px' }}
                onClick={handleSignIn}
              >
                {t('sign_in')}
              </button>
              <h2 style={{ margin: '10px auto' }}>
                {t('service_types_sign_in_as_helper')}
              </h2>
            </>
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
