import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PotentialHelperCard from '../../components/PotentialHelperCard';
import {
  getAllOrders,
  getAllBookings,
  getPotentialHelpers,
} from '../../store/helpee/helpee-actions';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../../components/RequestCard';
import HelpeeDashboardSection from '../../components/HelpeeDashboardSection';
import BookingCard from '../../components/BookingCard';

const HelpeeDashboardPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { allOrders, allPotentialHelpers, helpeeDashboardTarget, allBookings } =
    useSelector((state) => state.helpee);
  
  console.log('allBookings: ', allBookings);

  useEffect(() => {
    dispatch(getAllOrders({ helpeeUserId: props.helpeeUserId }));
    dispatch(getAllBookings({ helpeeUserId: props.helpeeUserId }));
    dispatch(getPotentialHelpers({ helpeeUserId: props.helpeeUserId }));
  }, [props.helpeeUserId, dispatch]);

  function handleAddRequest(e) {
    e.preventDefault(e);
    navigate('/helpee/service-types', { replace: true });
  }

  function handleSearchHelpers(e) {
    e.preventDefault(e);
    navigate('/helper-lists', { replace: true });
  }
  console.log('~allPotentialHelpers: ', allPotentialHelpers);
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
        <HelpeeDashboardSection
          helpeeDashboardTarget={helpeeDashboardTarget}
          value='allRequests'
          title='My Requests'
        />
        <HelpeeDashboardSection
          helpeeDashboardTarget={helpeeDashboardTarget}
          value='allBookings'
          title='My Bookings'
        />
        <HelpeeDashboardSection
          helpeeDashboardTarget={helpeeDashboardTarget}
          value='potentialHelpers'
          title='Potential Helpers'
        />
      </div>
      <div className='task-container'></div>

      {helpeeDashboardTarget === 'allRequests' && allOrders && (
        <div className='task-container'>
          {(!allOrders || allOrders.length === 0) && (
            <div
              className='history-card'
              style={{ boxShadow: 'none', border: 'none', paddingLeft: '18px' }}
            >
              No Requests yet
            </div>
          )}
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <button className='btn-contact' onClick={handleAddRequest}>
              Add a Request
            </button>
          </div>
          {allOrders.map((option) => (
            <RequestCard
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
      )}
      {helpeeDashboardTarget === 'allBookings' && allBookings && (
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
                isHelpee={true}
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
              />
            )
          )}
        </div>
      )}
      {helpeeDashboardTarget === 'potentialHelpers' && allPotentialHelpers && (
        <div className='task-container'>
          {(!allOrders || allOrders.length === 0) && (
            <div
              className='history-card'
              style={{ boxShadow: 'none', border: 'none', paddingLeft: '18px' }}
            >
              No matched helpers yet
            </div>
          )}
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <button className='btn-contact' onClick={handleSearchHelpers}>
              Search Helpers
            </button>
          </div>
          {allPotentialHelpers.map(
            (
              option // TODO: changed to orders
            ) => (
              <PotentialHelperCard
                key={
                  option.bookingId || `${option.requestId}-${option.offerId}`
                }
                helperAnonymous={option.helperAnonymous}
                helpeeAnonymous={option.helpeeAnonymous}
                helpeeId={props.helpeeUserId}
                helperId={option.helperId}
                helpeeUsername={option.helpeeUsername}
                helperUsername={option.helperUsername}
                partnerName={option.helperUsername}
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
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default HelpeeDashboardPage;
