import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { helperAddServiceOptions } from '../../store/options/navigate-options';
import '../../App.css';
import HelperAddServiceCard from '../../components/HelperAddServiceCard';
import { useEffect, useState } from 'react';
import { logLandOnPage } from '../../store/general/general-actions';

const HelperAddServicePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');

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
        if (window.location.search) path += window.location.search;
        break;
      case 'viewDashboard':
        path = `/${currentLanguage}/helper/bookings`;
        if (window.location.search) path += window.location.search;
        break;
      default:
        path = `/${currentLanguage}/helper/service-types`;
        if (window.location.search) path += window.location.search;
    }
    navigate(path);
  }

  // Log Page Land
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
