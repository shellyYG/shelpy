import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOffers, getHelperUserData } from '../store/helper/helper-actions';
import DangerIcon from '../components/Icons/DangerIcon';
import OfferCard from '../components/OfferCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RefreshIcon from '../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';

const PersonalOfferPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [helperName, setHelperName] = useState('');

  const [searchParams] = useSearchParams();
  const providerId = searchParams.get('providerId');
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const { allOffers } = useSelector((state) => state.helper);
  const { helperData } = useSelector(
    (state) => state.helper
  );

  useEffect(() => {
    dispatch(getHelperUserData({ helperUserId: providerId }));
  }, [providerId, dispatch]);

  useEffect(() => {
      if(helperData && helperData[0]) {
        setHelperName(helperData[0].username);
      }
  },[helperData])

  useEffect(() => {
    dispatch(getAllOffers({ helperUserId: providerId }));
  }, [providerId, dispatch]);

  function handleRrefreshPage(e) {
    e.preventDefault(e);
    window.location.reload();
  }
  function handleToHomepage(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/home`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  function handleSignIn(e) {
    e.preventDefault();
    let path = '';
    path = `/${currentLanguage}/helpee/sign-in`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  function handleAddOffer(e) {
    e.preventDefault(e);
    let path = `/${currentLanguage}/helper/service-types`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }

  return (
    <div className='section-left-align'>
      {!props.isHelpeeAuthenticated && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <div style={{ margin: '50px auto' }}>
            <DangerIcon />
            <h2 style={{ margin: '10px auto' }}>{t('please')}</h2>
            <button
              className='btn-next'
              style={{ width: '180px' }}
              onClick={handleSignIn}
            >
              {t('sign_in')}
            </button>
            <h2 style={{ margin: '10px auto' }}>
              {t('mkt_offer_sign_in_as_helpee')}
            </h2>
            <h2 style={{ margin: '10px auto' }}>
              {t('dont_have_helpee_account')}
            </h2>
            <button
              className='btn-next'
              style={{ width: '180px' }}
              onClick={handleToHomepage}
            >
              {t('sign_up_here')}
            </button>
          </div>
        </div>
      )}
      {props.isHelpeeAuthenticated && (
        <>
          <div className='orderHistoryBtnWrapper'>
            <div
              style={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}
            >
              <div style={{ margin: 'auto' }}>{t('refresh_to_get_offers')}</div>
              <RefreshIcon onClick={handleRrefreshPage} />
            </div>
          </div>
          {allOffers && (
            <div className='task-container'>
              {allOffers.length === 0 && (
                  <>
                    <div
                      className='history-card'
                      style={{
                        boxShadow: 'none',
                        border: 'none',
                        paddingLeft: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div>
                        <p style={{ margin: 'auto' }}>
                          {t('no_matched_customers')}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 'auto',
                            textAlign: 'center',
                            marginTop: '10px',
                          }}
                        >
                          {t('you_need_to_create_offer_so_match')}
                        </p>
                      </div>
                    </div>
                    <div
                      className='history-card'
                      style={{ boxShadow: 'none', border: 'none' }}
                    >
                      <div style={{ margin: 'auto' }}>
                        <button
                          className='btn-contact'
                          onClick={handleAddOffer}
                        >
                          {t('add_a_offer')}
                        </button>
                      </div>
                    </div>
                  </>
                )}
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
                  helperUserId={providerId}
                  profilePicPath={option.profilePicPath}
                  helperName={option.helperName}
                  languages={option.languages}
                  isAnonymous={option.isAnonymous}
                  duration={option.duration}
                  introduction={option.introduction}
                  disableTrash={true}
                  showBookingBtn={true}
                  helpeeName={props.helpeeUsername}
                  helpeeId={props.helpeeId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalOfferPage;
