import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { jobUniOptions } from '../store/options/navigate-options';
import '../App.css';
import JobOrUniCard from '../components/JobOrUniCard';
import { useState } from 'react';
import { useEffect } from 'react';
import ConfirmBtn from '../components/ConfirmBtn';

const SelectJobOrUniPage = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const [enableBtn, setEnableBtn] = useState(false);
  
  const { globalHelpeeJobOrUniTarget } = useSelector((state) => state.helpee);
  const { globalHelperJobOrUniTarget } = useSelector((state) => state.helper);

  useEffect(()=>{
    if (props.isHelpee && globalHelpeeJobOrUniTarget) {
      setEnableBtn(true);
    } else if (!props.isHelpee && globalHelperJobOrUniTarget){
      setEnableBtn(true);
    }
  }, [props.isHelpee, globalHelpeeJobOrUniTarget, globalHelperJobOrUniTarget])
  
  function handleNext(e) {
    e.preventDefault();
    const userType = props.isHelpee? 'helpee': 'helper';
    const jobOrUniTargetBase = props.isHelpee
      ? globalHelpeeJobOrUniTarget
      : globalHelperJobOrUniTarget;
    let path;
    switch (jobOrUniTargetBase) {
      case 'job':
        path = `/${currentLanguage}/${userType}/job-form`;
        if (window.location.search) path += window.location.search;
        break;
      case 'university':
        path = `/${currentLanguage}/${userType}/uni-form`;
        if (window.location.search) path += window.location.search;
        break;
      case 'selfEmployed':
        path = `/${currentLanguage}/${userType}/self-employed-form`;
        if (window.location.search) path += window.location.search;
        break;
      case 'life':
        path = `/${currentLanguage}/${userType}/life-form`;
        if (window.location.search) path += window.location.search;
        break;
      default:
        path = `/${currentLanguage}/${userType}/job-form`;
        if (window.location.search) path += window.location.search;
    }
    navigate(path); // do not have {replace: true} so user can click backward btn to go back to this page
  }
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
          {props.isHelpee && t('helpee_service_types_next_step')}
          {!props.isHelpee && t('helper_service_types_next_step')}
        </h2>
        <div className='container'>
          {props.isHelpee &&
            jobUniOptions.map((option) => (
              <JobOrUniCard
                imageSrc={option.imgPath}
                title={t(`${option.label}`)}
                value={option.value}
                isHelpee={props.isHelpee}
                globalHelpeeJobOrUniTarget={globalHelpeeJobOrUniTarget}
                globalHelperJobOrUniTarget={globalHelperJobOrUniTarget}
                key={option.value}
              />
            ))}
          {!props.isHelpee &&
            jobUniOptions.map((option) => (
              <JobOrUniCard
                imageSrc={option.imgPath}
                title={t(`${option.label}`)}
                value={option.value}
                isHelpee={props.isHelpee}
                globalHelpeeJobOrUniTarget={globalHelpeeJobOrUniTarget}
                globalHelperJobOrUniTarget={globalHelperJobOrUniTarget}
                key={option.value}
              />
            ))}
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

export default SelectJobOrUniPage;
