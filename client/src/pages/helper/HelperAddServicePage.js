import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { helperAddServiceOptions } from '../../store/options/navigate-options';
import '../../App.css';
import HelperAddServiceCard from '../../components/HelperAddServiceCard';
import { useState } from 'react';

const HelperAddServicePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { offerTarget } = useSelector((state) => state.helper);
  const [enableBtn, setEnableBtn] = useState(false);
  
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  function handleNext(e) {
    e.preventDefault();
    let path;
    switch (offerTarget) {
      case 'addOffer':
        path = `/${currentLanguage}/helper/service-types`;
        break;
      case 'viewDashboard':
        path = `/${currentLanguage}/helper/dashboard`;
        break;
      default:
        path = `/${currentLanguage}/helper/service-types`;
    }
    navigate(path);
  }
  return (
    <div className='main-content-wrapper-no-background'>
      <div className='section-center-align'>
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
          {t('add_a_offer')}
        </h1>
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
          <button
            className='btn-next'
            disable={!enableBtn}
            onClick={handleNext}
          >
            Next ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelperAddServicePage;
