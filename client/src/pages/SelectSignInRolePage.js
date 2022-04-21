import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { jobUniOptions } from '../store/options/navigate-options';
import '../App.css';
import JobOrUniCard from '../components/JobOrUniCard';
import { useState } from 'react';
import { useEffect } from 'react';
import ConfirmBtn from '../components/ConfirmBtn';
import SignInRoleCard from '../components/SignInRoleCard';
import { logLandOnPage } from '../store/general/general-actions';

const SelectSignInRolePage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const [enableBtn, setEnableBtn] = useState(false);

  const { signInRole } = useSelector((state) => state.general);

  function handleNext(e) {
    e.preventDefault();
    let path;
    switch (signInRole) {
      case 'helpee':
        path = `/${currentLanguage}/${signInRole}/sign-in`;
        if (window.location.search) {
          path += window.location.search;
          path += '&isAfterRole=1';
        } else {
          path += '?isAfterRole=1';
        }
        break;
      case 'helper':
        path = `/${currentLanguage}/${signInRole}/sign-in`;
        if (window.location.search) {
          path += window.location.search;
          path += '&isAfterRole=1';
        } else {
          path += '?isAfterRole=1';
        }
        break;
      default:
        path = `/${currentLanguage}/helpee/sign-in`;
        if (window.location.search) {
          path += window.location.search;
          path += '&isAfterRole=1';
        } else {
          path += '?isAfterRole=1';
        }
    }
    navigate(path);
  }

  useEffect(() => {
    if (signInRole) {
      setEnableBtn(true);
    }
  }, [signInRole]);

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
    <div className='main-content-wrapper-no-background'>
      <div className='section-center-align'>
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
          {t('welcome')}
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          {t('what_role_do_you_sign_in')}
        </h2>
        <div className='container'>
          <SignInRoleCard
            imageSrc={'/static-imgs/helpee-home.jpeg'}
            title={t('helpee_big')}
            signInRole='helpee'
            key='helpee'
          />
          <SignInRoleCard
            imageSrc={'/static-imgs/helper-home.jpeg'}
            title={t('helper_big')}
            signInRole='helper'
            key='helper'
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <ConfirmBtn
            cta={t('next')}
            disable={!enableBtn}
            handleConfirm={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectSignInRolePage;
