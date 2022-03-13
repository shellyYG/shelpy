import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOffers,
} from '../../store/helper/helper-actions';

import OfferCard from '../../components/OfferCard';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '../../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';

const HelperOffersPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const {
    allOffers,
  } = useSelector((state) => state.helper);

  useEffect(() => {
    dispatch(getAllOffers({ helperUserId: props.helperUserId }));
  }, [props.helperUserId, props.helpeeUserId, dispatch]);

  function handleAddOffer(e) {
    e.preventDefault(e);
    let path = `/${currentLanguage}/helper/service-types`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }

  function handleRrefreshPage(e) {
    e.preventDefault(e);
    window.location.reload();
  }

  return (
    <div className='section-left-align'>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.helperName && (
          <h2 style={{ margin: '15px auto 0px' }}>
            {t('welcome_name', { name: props.helperName })}!
          </h2>
        )}
        {!props.helperName && (
          <h2 style={{ margin: '15px auto 0px' }}>{t('welcome')}</h2>
        )}
      </div>
      <div className='orderHistoryBtnWrapper'>
        <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: 'auto' }}>{t('refresh_to_get_offers')}</div>
          <RefreshIcon onClick={handleRrefreshPage} />
        </div>
      </div>
      {allOffers && (
        <div className='task-container'>
          {(!allOffers || allOffers.length === 0) && (
            <div
              className='history-card'
              style={{
                boxShadow: 'none',
                border: 'none',
                paddingLeft: '18px',
                display: 'flex',
              }}
            >
              <p style={{ margin: 'auto' }}>{t('no_created_offers')}</p>
            </div>
          )}
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <div style={{ margin: 'auto' }}>
              <button className='btn-contact' onClick={handleAddOffer}>
                {t('add_a_offer')}
              </button>
            </div>
          </div>
          {allOffers.map((option) => (
            <OfferCard
              key={option.id}
              offerId={option.id}
              type={option.type}
              mainType={option.mainType}
              secondType={option.secondType}
              thirdType={option.thirdType}
              fourthType={option.fourthType}
              notes={option.notes}
              country={option.country}
              price={option.price}
              helperUserId={props.helperUserId}
              profilePicPath={option.profilePicPath}
              helperName={option.helperName}
              languages={option.languages}
              isAnonymous={option.isAnonymous}
              duration={option.duration}
              introduction={option.introduction}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelperOffersPage;
