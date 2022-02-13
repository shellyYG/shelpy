import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OfferCard from '../components/OfferCard';
import DropDown from '../components/Dropdown';
import { jobUniMarketingOptions } from '../store/options/navigate-options';
import { getAllMarketingOffers } from '../store/general/general-actions';
import MarketingCard from '../components/MarketingCard';

import { secondTypeOptions } from '../store/options/navigate-options';
import { countryOptions } from '../store/options/service-options';

const HelpeeDashboardPage = (props) => {
  const dispatch = useDispatch();
  const mainTypeRef = useRef();
  const secondTypeRef = useRef();
  const countryRef = useRef();

  const [mainType, setMainType] = useState('default');
  const [secondType, setSecondType] = useState('default');
  const [country, setCountry] = useState('default');
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [matchedSecondTypes, setMatchedSecondTypes] = useState([]);

  const { allMKTOffers } = useSelector((state) => state.general);

  console.log(
    'mainType: ',
    mainType,
    'secondType: ',
    secondType,
    'allMKTOffers: ', allMKTOffers,
    'filteredOffers: ',
    filteredOffers,
    'country: ',
    country
  );

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

  return (
    <div className='section-left-align'>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.helpeeName && (
          <h2 style={{ margin: 'auto' }}>Welcome, {props.helpeeName}!</h2>
        )}
        {!props.helpeeName && (
          <h2 style={{ margin: 'auto' }}>Welcome to Shelpy!</h2>
        )}
      </div>
      <div className='orderHistoryBtnWrapper'>
        <div className='mktFilterWrapper'>
          <DropDown
            selected={mainType}
            handleSelect={setMainType}
            selectRef={mainTypeRef}
            options={jobUniMarketingOptions}
            titleColor='black'
            titleSize='10px'
          />
        </div>
        <div className='mktFilterWrapper'>
          <DropDown
            selected={secondType}
            handleSelect={setSecondType}
            selectRef={secondTypeRef}
            options={matchedSecondTypes}
          />
        </div>
        <div className='mktFilterWrapper'>
          <DropDown
            selected={country}
            handleSelect={setCountry}
            selectRef={countryRef}
            options={countryOptions}
            titleColor='black'
            titleSize='10px'
          />
        </div>
      </div>
      <div className='task-container'>
        {(!filteredOffers || filteredOffers.length === 0) && (
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none', paddingLeft: '18px' }}
          >
            No Public Offers yet
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
            mainType={option.mainType}
            secondType={option.secondType}
            thirdType={option.thirdType}
            fourthType={option.fourthType}
            country={option.country}
            helpeeId={props.helpeeUserId}
            notes={option.notes}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpeeDashboardPage;
