import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PotentialCustomerCard from '../../components/PotentialCustomerCard';
import {
  getAllOffers,
  getAllBookings,
  getPotentialCustomers,
} from '../../store/helper/helper-actions';

import OfferCard from '../../components/OfferCard';
import { useNavigate } from 'react-router-dom';
import HelperDashboardSection from '../../components/HelperDashboardSection';
import BookingCard from '../../components/BookingCard';
import RefreshIcon from '../../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';


const HelperDashboardPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allOffers, allBookings, allPotentialCustomers, helperDashboardTarget } =
    useSelector((state) => state.helper);
  
  console.log('allBookings: ', allBookings);
  // console.log('allPotentialCustomers: ', allPotentialCustomers);
  useEffect(() => {
    dispatch(getAllOffers({ helperUserId: props.helperUserId }));
    dispatch(getAllBookings({ helperUserId: props.helperUserId }));
    dispatch(getPotentialCustomers({ helperUserId: props.helperUserId }));
  }, [props.helperUserId, props.helpeeUserId, dispatch]);

  function handleAddOffer(e) {
    e.preventDefault(e);
    navigate('/helper/service-types');
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
        <h2 style={{ margin: '15px auto 0px' }}>
          {t('please_click_below_to_show_section')}
        </h2>
      </div>
      <div className='orderHistoryBtnWrapper'>
        <HelperDashboardSection
          helperDashboardTarget={helperDashboardTarget}
          value='allOffers'
          title={t('my_offers')}
        />
        <HelperDashboardSection
          helperDashboardTarget={helperDashboardTarget}
          value='allBookings'
          title={t('my_bookings')}
          color='#f47174'
        />
        <HelperDashboardSection
          helperDashboardTarget={helperDashboardTarget}
          value='potentialCustomers'
          title={t('potential_customers')}
        />
        <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: 'auto' }}>{t('refresh')}</div>
          <RefreshIcon onClick={handleRrefreshPage} />
        </div>
      </div>
      {helperDashboardTarget === 'allBookings' && allBookings && (
        <div className='task-container'>
          {(!allBookings || allBookings.length === 0) && (
            <div
              className='history-card'
              style={{ boxShadow: 'none', border: 'none', paddingLeft: '18px' }}
            >
              <p style={{ margin: 'auto' }}>No bookings yet</p>
            </div>
          )}

          {allBookings.map(
            (
              option // TODO: changed to orders
            ) => (
              <BookingCard
                isHelpee={false}
                key={option.id}
                id={option.id}
                helperId={option.helperId}
                helpeeId={option.helpeeId}
                helpeeUsername={option.helpeeUsername}
                helperUsername={option.helperUsername}
                partnerName={
                  props.isHelpee ? option.helperUsername : option.helpeeUsername
                }
                mainType={option.mainType}
                secondType={option.secondType}
                thirdType={option.thirdType}
                profilePicPath={option.profilePicPath}
                country={option.country}
                requestId={option.requestId}
                offerId={option.offerId}
                price={option.price}
                bookingId={option.bookingId}
                bookingStatus={option.bookingStatus}
                appointmentDate={option.appointmentDate}
                appointmentTime={option.appointmentTime}
                languages={option.languages}
                isAnonymous={option.helpeeAnonymous}
                notes={option.notes}
              />
            )
          )}
        </div>
      )}
      {helperDashboardTarget === 'potentialCustomers' && allPotentialCustomers && (
        <div className='task-container'>
          {!allPotentialCustomers ||
            (allPotentialCustomers.length === 0 && (
              <div
                className='history-card'
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  paddingLeft: '18px',
                  display: 'flex',
                }}
              >
                <p style={{ margin: 'auto' }}>No matched customers yet</p>
              </div>
            ))}
          {allPotentialCustomers.map(
            (
              option // TODO: changed to orders
            ) => (
              <PotentialCustomerCard
                key={
                  option.bookingId || `${option.requestId}-${option.offerId}`
                }
                helperAnonymous={option.helperAnonymous}
                helpeeAnonymous={option.helpeeAnonymous}
                helperId={props.helperUserId}
                helpeeId={option.helpeeId}
                helpeeUsername={option.helpeeUsername}
                helperUsername={option.helperUsername}
                partnerName={option.helpeeUsername}
                mainType={option.mainType}
                secondType={option.secondType}
                thirdType={option.thirdType}
                fourthType={option.fourthType}
                profilePicPath={option.profilePicPath}
                country={option.country}
                requestId={option.requestId}
                offerId={option.offerId}
                price={option.price}
                bookingId={option.bookingId}
                bookingStatus={option.bookingStatus}
                organization={option.organization}
              />
            )
          )}
        </div>
      )}
      {helperDashboardTarget === 'allOffers' && allOffers && (
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
              <p style={{ margin: 'auto' }}>
                You haven't create any offers yet
              </p>
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelperDashboardPage;
