import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../components/Dropdown';
import { jobUniWithDefaultOptions } from '../store/options/navigate-options';
import {
  getAllMarketingOffers,
  logLandOnPage,
  onClickUpdatePage,
  onClickUpdateFilterSecondType,
} from '../store/general/general-actions';
import MarketingCard from '../components/MarketingCard';

import { secondTypeOptions } from '../store/options/navigate-options';
import { workingCountryOptions } from '../store/options/service-options';
import DangerIcon from '../components/Icons/DangerIcon';
import { useTranslation } from 'react-i18next';
import PaginationItems from '../components/PaginationItems';

const HelpeeDashboardPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const mainTypeRef = useRef();
  const secondTypeRef = useRef();
  const countryRef = useRef();

  const [mainType, setMainType] = useState('default');
  const [secondType, setSecondType] = useState('default');
  const [country, setCountry] = useState('default');
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [matchedSecondTypes, setMatchedSecondTypes] = useState([]);

  const {
    allOffersCount,
    allMKTOffers,
    allMKTHelperRatings,
    page,
    filterCountry,
    filterMainType,
    filterSecondType,
  } = useSelector((state) => state.general);

  const pageNumbers = parseInt(allOffersCount/20)+1

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
    if (currentLanguage === 'en') {
      const filteredOffers = allMKTOffers.filter(
        (offer) => offer.introductionEN
      );
      setFilteredOffers(filteredOffers);
      
    } else {
      setFilteredOffers(allMKTOffers);
    }

  }, [allMKTOffers, mainType, secondType, country, currentLanguage]);

  useEffect(() => {
    dispatch(getAllMarketingOffers({
      filterCountry,
      filterMainType,
      filterSecondType,
      page
    }));
  }, [dispatch, filterCountry, filterMainType, filterSecondType, page]);

  useEffect(() => {
    if (mainType) {
      const secondTypes = secondTypeOptions[mainType];
      setMatchedSecondTypes(secondTypes);
      setSecondType('default');
      const data = {
        filterSecondType: '',
      };
      dispatch(onClickUpdateFilterSecondType(data));
      dispatch(onClickUpdatePage({page: 1}));
    }
  }, [mainType, dispatch]);


  return (
    <div className='section-left-align' style={{ paddingTop: '0px' }}>
      {
        <>
          <div
            style={{
              top: '0px',
              position: 'sticky',
              zIndex: '3',
              backgroundColor: 'white',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ margin: '15px auto 0px' }}>{t('top_offers')}</h2>
            </div>
            <div className='orderHistoryBtnWrapper'>
              <div className='mktFilterWrapper'>
                <DropDown
                  selected={country}
                  handleSelect={setCountry}
                  title={t('mkt_select_country')}
                  selectRef={countryRef}
                  options={workingCountryOptions}
                  titleColor='black'
                  titleMarginLeft='8px'
                  setGlobalValue={true}
                  globalValueType='country'
                />
              </div>
              <div className='mktFilterWrapper'>
                <DropDown
                  selected={mainType}
                  handleSelect={setMainType}
                  title={t('mkt_select_main_category')}
                  selectRef={mainTypeRef}
                  options={jobUniWithDefaultOptions}
                  titleColor='black'
                  titleMarginLeft='8px'
                  setGlobalValue={true}
                  globalValueType='mainType'
                />
              </div>
              <div className='mktFilterWrapper'>
                <DropDown
                  selected={secondType}
                  handleSelect={setSecondType}
                  title={t('mkt_select_sub_category')}
                  selectRef={secondTypeRef}
                  options={matchedSecondTypes}
                  titleColor='black'
                  titleMarginLeft='8px'
                  setGlobalValue={true}
                  globalValueType='secondType'
                />
              </div>
            </div>
            <div
              style={{
                marginTop: '10px',
              }}
            >
              <PaginationItems pages={pageNumbers} />
            </div>
          </div>
          <div className='task-container'>
            {(!filteredOffers || filteredOffers.length === 0) && (
              <div
                className='history-card'
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  paddingLeft: '18px',
                }}
              >
                <p style={{ margin: 'auto' }}>{t('no_offers')}</p>
              </div>
            )}
            <div
              className='history-card'
              style={{ boxShadow: 'none', border: 'none' }}
            ></div>
            {filteredOffers.map((option) => (
              <MarketingCard
                key={option.id}
                id={option.id}
                offerId={option.id}
                mainType={option.mainType}
                secondType={option.secondType}
                thirdType={option.thirdType}
                fourthType={option.fourthType}
                country={option.country}
                notes={option.notes}
                sharingTopicEN={option.sharingTopicEN}
                introduction={option.introduction}
                introductionEN={option.introductionEN}
                profilePicPath={option.profilePicPath}
                username={option.username}
                price={option.price}
                duration={option.duration}
                helpeeId={props.helpeeId}
                helperId={option.userId}
                helpeeUsername={props.helpeeUsername}
                helperUsername={option.username}
                languages={option.languages}
                isAnonymous={option.isAnonymous}
                organization={option.organization}
                helperRatingData={allMKTHelperRatings.filter(
                  (item) => item.ratedPartnerId === option.userId
                )}
                isHelpeeAuthenticated={props.isHelpeeAuthenticated}
              />
            ))}
          </div>
        </>
      }
    </div>
  );
};

export default HelpeeDashboardPage;
