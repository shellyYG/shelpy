import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHelperUserData,
  getSingleOffer,
} from '../store/helper/helper-actions';
import OfferCard from '../components/OfferCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RefreshIcon from '../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';
import DangerIcon from '../components/Icons/DangerIcon';

const SingleOfferPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [helperName, setHelperName] = useState('');

  const [searchParams] = useSearchParams();
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const { singleOffer } = useSelector((state) => state.helper);
  const { helperData } = useSelector((state) => state.helper);

  useEffect(() => {
    dispatch(getHelperUserData({ helperUserId: providerId }));
  }, [providerId, dispatch]);

  useEffect(() => {
    if (helperData && helperData[0]) {
      setHelperName(helperData[0].username);
    }
  }, [helperData]);

  useEffect(() => {
    dispatch(getSingleOffer({ offerId }));
  }, [offerId, dispatch]);

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

  return (
    <div className='section-left-align'>
      {
        <>
          {singleOffer && (
            <div className='task-container'>
              {singleOffer.map((option) => (
                <OfferCard
                  key={option.id}
                  offerId={option.id}
                  type={option.type}
                  mainType={option.mainType}
                  secondType={option.secondType}
                  thirdType={option.thirdType}
                  fourthType={option.fourthType}
                  organization={option.organization}
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
                  isSingleOfferPage={true}
                  isHelpeeAuthenticated={props.isHelpeeAuthenticated}
                />
              ))}
            </div>
          )}
          {(!singleOffer || singleOffer.length === 0) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <DangerIcon />
              <h1>{t('oops')}</h1>
              <h2 style={{ margin: '10px auto' }}>{t('service_not_exist')}</h2>
              <div>
                <button
                  className='btn-next'
                  style={{ width: '200px' }}
                  onClick={handleToHomepage}
                >
                  {t('back_to_home')}
                </button>
              </div>
            </div>
          )}
        </>
      }
    </div>
  );
};

export default SingleOfferPage;
