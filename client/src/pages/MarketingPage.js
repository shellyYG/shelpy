import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../components/Dropdown';
import { jobUniOptions } from '../store/options/navigate-options';
import { getAllMarketingOffers } from '../store/general/general-actions';
import MarketingCard from '../components/MarketingCard';

import { secondTypeOptions } from '../store/options/navigate-options';
import { countryOptions } from '../store/options/service-options';
import DangerIcon from '../components/Icons/DangerIcon';
import { useTranslation } from 'react-i18next';

const HelpeeDashboardPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainTypeRef = useRef();
  const secondTypeRef = useRef();
  const countryRef = useRef();

  const [mainType, setMainType] = useState('default');
  const [secondType, setSecondType] = useState('default');
  const [country, setCountry] = useState('default');
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [matchedSecondTypes, setMatchedSecondTypes] = useState([]);

  const { allMKTOffers } = useSelector((state) => state.general);

  useEffect(() => {
    if (mainType === 'default') {
      setFilteredOffers(allMKTOffers);
    }
    if (mainType !== 'default') {
      const filteredOffers = allMKTOffers.filter(
        (offer) => offer.mainType === mainType
      );
      setFilteredOffers(filteredOffers);
    }
    if (mainType && secondType !== 'default') {
      const filteredOffers = allMKTOffers.filter(
        (offer) =>
          offer.mainType === mainType && offer.secondType === secondType
      );
      setFilteredOffers(filteredOffers);
    }
    if (mainType && secondType !== 'default' && country !== 'default') {
      const filteredOffers = allMKTOffers.filter(
        (offer) =>
          offer.mainType === mainType &&
          offer.secondType === secondType &&
          offer.country === country
      );
      setFilteredOffers(filteredOffers);
    }
  }, [allMKTOffers, mainType, secondType, country]);

  useEffect(() => {
    dispatch(getAllMarketingOffers());
  }, [dispatch]);

  useEffect(() => {
    if (mainType) {
      const secondTypes = secondTypeOptions[mainType];
      setMatchedSecondTypes(secondTypes);
      setSecondType('default');
    }
  }, [mainType]);

  useEffect(() => { // clear out country options when secondType is selected
    if (secondType) {
      setCountry('default');
    }
  }, [secondType]);
  function handleToHomepage(e) {
    e.preventDefault();
    navigate('/home');
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
            <h2 style={{ margin: 'auto' }}>
              {t('please')} <Link to='/helpee/sign-in'>{t('sign_in')}</Link>{' '}
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '15px auto 0px' }}>{t('top_offers')}</h2>
          </div>
          <div className='orderHistoryBtnWrapper'>
            <div className='mktFilterWrapper'>
              <DropDown
                selected={mainType}
                handleSelect={setMainType}
                title={t('mkt_select_main_category')}
                selectRef={mainTypeRef}
                options={jobUniOptions}
                titleColor='black'
                titleMarginLeft='8px'
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
              />
            </div>
            <div className='mktFilterWrapper'>
              <DropDown
                selected={country}
                handleSelect={setCountry}
                title={t('mkt_select_country')}
                selectRef={countryRef}
                options={countryOptions}
                titleColor='black'
                titleMarginLeft='8px'
              />
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
                introduction={option.introduction}
                profilePicPath={option.profilePicPath}
                username={option.username}
                price={option.price}
                helpeeId={props.helpeeId}
                helperId={option.userId}
                helpeeUsername={props.helpeeUsername}
                helperUsername={option.username}
                languages={option.languages}
                isAnonymous={option.isAnonymous}
                organization={option.organization}
                duration={option.duration}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HelpeeDashboardPage;
