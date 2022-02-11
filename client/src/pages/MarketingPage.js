import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PotentialHelperCard from '../components/PotentialHelperCard';
import {
  getAllOrders,
  getPotentialHelpers,
} from '../store/helpee/helpee-actions';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../components/RequestCard';

const MarketingPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPotentialHelpersSelected, setIsPotentialHelpersSelected] =
    useState(true);
  const [allRequests, setAllRequests] = useState([]);

  console.log('You are now: ', props.helpeeUserId, props.helpeeName);
  useEffect(() => {
    dispatch(getAllOrders({ helpeeUserId: props.helpeeUserId }));
    dispatch(getPotentialHelpers({ helpeeUserId: props.helpeeUserId }));
  }, [props.helpeeUserId, dispatch]);

  const { allOrders, allPotentialHelpers } = useSelector(
    (state) => state.helpee
  );
  console.log('allOrders: ', allOrders);

  useEffect(() => {
    if (allOrders) {
      setAllRequests(allOrders);
    }
  }, [allOrders]);

  function handleSelectActiveOrders(e) {
    e.preventDefault(e);
    setIsPotentialHelpersSelected(true);
  }
  function handleSelectallOrders(e) {
    e.preventDefault(e);
    setIsPotentialHelpersSelected(false);
  }

  function handleAddRequest(e) {
    e.preventDefault(e);
    navigate('/helpee/service-types', { replace: true });
  }

  function handleSearchHelpers(e) {
    e.preventDefault(e);
    navigate('/helper-lists', { replace: true });
  }

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
        <button
          className={
            isPotentialHelpersSelected
              ? 'activeSelectedOrderBtn'
              : 'nonActiveSelectedOrderBtn'
          }
          onClick={handleSelectActiveOrders}
        >
          Potential Helpers
        </button>
        <button
          className={
            !isPotentialHelpersSelected
              ? 'activeSelectedOrderBtn'
              : 'nonActiveSelectedOrderBtn'
          }
          onClick={handleSelectallOrders}
        >
          Your Requests
        </button>
      </div>
      <div className='task-container'></div>
      {isPotentialHelpersSelected && allPotentialHelpers && (
        <div className='task-container'>
          {(!allRequests || allRequests.length === 0) && (
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
                helperId={option.helperId}
                helpeeId={props.helpeeUserId}
                partnerName={option.helperName}
                mainType={option.mainType}
                secondType={option.secondType}
                thirdType={option.thirdType}
                profilePicPath={option.profilePicPath}
                country={option.country}
                requestId={option.requestId}
                offerId={option.offerId}
                price={option.price}
                bookingStatus={option.bookingStatus}
              />
            )
          )}
        </div>
      )}
      {!isPotentialHelpersSelected && allRequests && (
        <div className='task-container'>
          {(!allRequests || allRequests.length === 0) && (
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
          {allRequests.map((option) => (
            <RequestCard
              key={option.id}
              requestId={option.id}
              mainType={option.mainType}
              secondType={option.secondType}
              thirdType={option.thirdType}
              country={option.country}
              bookingStatus={option.bookingStatus}
              helpeeId={props.helpeeUserId}
              appointmentDate={option.appointmentDate}
              appointmentTime={option.appointmentTime}
              offerId={option.offerId}
              price={option.price}
              helperId={option.helperId}
              helperName={option.helperName}
              bookingId={option.bookingId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketingPage;
