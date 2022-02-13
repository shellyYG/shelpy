import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../components/Dropdown';
import { jobUniMarketingOptions } from '../store/options/navigate-options';
import { getAllMarketingOffers } from '../store/general/general-actions';
import MarketingCard from '../components/MarketingCard';

import { secondTypeOptions } from '../store/options/navigate-options';
import { countryOptions } from '../store/options/service-options';
import DangerIcon from '../components/Icons/DangerIcon';

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
      {!props.isHelpeeAuthenticated && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: '50px auto' }}>
            <DangerIcon />
          </div>
          <h2 style={{ margin: 'auto' }}>
            Please sign in as Helpee to view our top offers.
          </h2>
        </div>
      )}
      {props.isHelpeeAuthenticated && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: 'auto' }}>Top Offers</h2>
          </div>
          <div className='orderHistoryBtnWrapper'>
            <div className='mktFilterWrapper'>
              <DropDown
                selected={mainType}
                handleSelect={setMainType}
                title='Select Main-Category'
                selectRef={mainTypeRef}
                options={jobUniMarketingOptions}
                titleColor='black'
                titleMarginLeft='8px'
              />
            </div>
            <div className='mktFilterWrapper'>
              <DropDown
                selected={secondType}
                handleSelect={setSecondType}
                title='Select Sub-Category'
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
                title='Select Country'
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
                <p style={{ margin: 'auto' }}>No Public Offers yet</p>
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
                notes={option.notes}
                profilePicPath={option.profilePicPath}
                username={option.username}
                price={option.price}
                helperId={option.userId}
                helpeeId={props.helpeeId}
                helpeeUsername={props.helpeeUsername}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HelpeeDashboardPage;
