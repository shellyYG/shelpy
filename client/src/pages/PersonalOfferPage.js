import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOffers,
  getHelperUserData,
} from '../store/helper/helper-actions';
import OfferCard from '../components/OfferCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RefreshIcon from '../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';
import { logLandOnPage } from '../store/general/general-actions';

const PersonalOfferPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [helperName, setHelperName] = useState('');

  const [searchParams] = useSearchParams();
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');
  const refId = searchParams.get('refId');

  const { allOffers } = useSelector((state) => state.helper);
  const { helperData } = useSelector(
    (state) => state.helper
  );

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
  
  

  return (
    <div className='section-left-align'>
      {
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
                  sharingTopicEN={option.sharingTopicEN}
                  country={option.country}
                  price={option.price}
                  helperUserId={providerId}
                  profilePicPath={option.profilePicPath}
                  helperName={option.helperName}
                  languages={option.languages}
                  isAnonymous={option.isAnonymous}
                  duration={option.duration}
                  introduction={option.introduction}
                  introductionEN={option.introductionEN}
                  disableTrash={true}
                  showBookingBtn={true}
                  helpeeName={props.helpeeUsername}
                  helpeeId={props.helpeeId}
                  isPersonalOfferPage={true}
                  isHelpeeAuthenticated={props.isHelpeeAuthenticated}
                />
              ))}
            </div>
          )}
        </>
      }
    </div>
  );
};

export default PersonalOfferPage;
