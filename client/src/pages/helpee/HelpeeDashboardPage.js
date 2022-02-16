import { useEffect } from 'react';
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
import RefreshIcon from '../../components/Icons/RefreshIcon';

const HelpeeDashboardPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { allOrders, allPotentialHelpers, helpeeDashboardTarget, allBookings } =
    useSelector((state) => state.helpee);
  
  console.log('allBookings: ', allBookings);
  // console.log('allOrders: ', allOrders);
  console.log('allPotentialHelpers: ', allPotentialHelpers);

  useEffect(() => {
    dispatch(getAllOrders({ helpeeUserId: props.helpeeUserId }));
    dispatch(getAllBookings({ helpeeUserId: props.helpeeUserId }));
    dispatch(getPotentialHelpers({ helpeeUserId: props.helpeeUserId }));
  }, [props.helpeeUserId, dispatch]);

  function handleAddRequest(e) {
    e.preventDefault(e);
    navigate('/helpee/service-types');
  }

  function handleSearchHelpers(e) {
    e.preventDefault(e);
    navigate('/marketing/offers');
  }

  function handleRrefreshPage(e) {
    e.preventDefault(e);
    window.location.reload();
  }
  
  return (
    <div className='section-left-align'>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.helpeeName && (
          <h2 style={{ margin: 'auto' }}>
            {props.i18n.t('welcome_name', {name: props.helpeeName})}!
          </h2>
        )}
        {!props.helpeeName && (
          <h2 style={{ margin: 'auto' }}>Welcome to Shelpy</h2>
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
        <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: 'auto' }}>Refresh to get latest status</div>
          <RefreshIcon onClick={handleRrefreshPage} />
        </div>
      </div>
      <div className='task-container'></div>

      {helpeeDashboardTarget === 'allRequests' && allOrders && (
        <div className='task-container'>
          {(!allOrders || allOrders.length === 0) && (
            <div
              className='history-card'
              style={{ boxShadow: 'none', border: 'none', paddingLeft: '18px' }}
            >
              <p style={{ margin: 'auto' }}>
                You haven't created any requests yet
              </p>
            </div>
          )}
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <div style={{ margin: 'auto' }}>
              <button className='btn-contact' onClick={handleAddRequest}>
                Add a Request
              </button>
            </div>
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
              helpeeName={option.helpeeName}
              notes={option.notes}
              profilePicPath={option.profilePicPath}
              languages={option.languages}
              isAnonymous={option.isAnonymous}
            />
          ))}
        </div>
      )}
      {helpeeDashboardTarget === 'allBookings' && allBookings && (
        <div className='task-container'>
          {(!allBookings || allBookings.length === 0) && (
            <>
              <div
                className='history-card'
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  paddingLeft: '18px',
                }}
              >
                <p style={{ margin: 'auto' }}>No bookings yet</p>
              </div>
              <div style={{ margin: 'auto' }}>
                <button className='btn-contact' onClick={handleSearchHelpers}>
                  Book a Helper
                </button>
              </div>
            </>
          )}

          {allBookings.map(
            (
              option // TODO: changed to orders
            ) => (
              <BookingCard
                isHelpee={true}
                key={option.id}
                id={option.id}
                helpeeEmail={option.helpeeEmail}
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
                isAnonymous={option.helperAnonymous}
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
              <p style={{ margin: 'auto' }}>No matched helpers yet</p>
            </div>
          )}
          {!allPotentialHelpers ||
            (allPotentialHelpers.length === 0 && (
              <div
                className='history-card'
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  paddingLeft: '18px',
                  display: 'flex',
                }}
              >
                <p style={{ margin: 'auto' }}>No matched helpers yet</p>
              </div>
            ))}
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <div style={{ margin: 'auto' }}>
              <button className='btn-contact' onClick={handleSearchHelpers}>
                Search Helpers
              </button>
            </div>
          </div>

          {allPotentialHelpers.map((option) => (
            <PotentialHelperCard
              key={option.bookingId || `${option.requestId}-${option.offerId}`}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpeeDashboardPage;
