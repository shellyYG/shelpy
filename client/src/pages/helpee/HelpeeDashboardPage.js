import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PotentialHelperCard from '../../components/PotentialHelperCard';
import {
  getAllOrders,
  getPotentialHelpers,
} from '../../store/helpee/helpee-actions';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../../components/RequestCard';

const HelpeeDashboardPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPotentialHelpersSelected, setIsPotentialHelpersSelected] =
    useState(true);
  const [allRequests, setAllRequests] = useState([]);
  console.log('props.helpeeUserId:', props.helpeeUserId);
  console.log('allRequests: ', allRequests);
  useEffect(() => {
    dispatch(getAllOrders({ helpeeUserId: props.helpeeUserId }));
    dispatch(getPotentialHelpers({ helpeeUserId: props.helpeeUserId }));
  }, [props.helpeeUserId, dispatch]);

  const { allOrders, allPotentialHelpers } = useSelector(
    (state) => state.helpee
  );
  console.log('allPotentialHelpers: ', allPotentialHelpers);
  useEffect(() => {
    const allRequestsArr = [];
    if (allOrders) {
      allOrders.forEach((o) => {
        switch (o.mainType) {
          case 'university': {
            const newObject = {};
            newObject.id = o.id;
            newObject.type = 'University';
            newObject.mainCategory = o.school;
            newObject.subCategory = o.department;
            newObject.country = o.country;
            newObject.id = o.id;
            newObject.price = o.price;
            allRequestsArr.push(newObject);
            break;
          }
          case 'job': {
            const newObject = {};
            newObject.id = o.id;
            newObject.type = 'Job';
            newObject.mainCategory = o.industry;
            newObject.subCategory = o.job;
            newObject.country = o.country;
            newObject.id = o.id;
            newObject.price = o.price;
            allRequestsArr.push(newObject);
            break;
          }
          case 'selfEmployed': {
            const newObject = {};
            newObject.id = o.id;
            newObject.type = 'Self-Employed';
            newObject.mainCategory = o.type;
            newObject.subCategory = o.profession;
            newObject.country = o.country;
            newObject.id = o.id;
            newObject.price = o.price;
            allRequestsArr.push(newObject);
            break;
          }
          default:
            break;
        }
      });
    }
    setAllRequests(allRequestsArr);
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

  return (
    <div className='section-left-align'>
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
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <button className='btn-contact' onClick={handleAddRequest}>
              Add another Request
            </button>
          </div>
          {allRequests.map((option) => (
            <RequestCard
              key={option.id}
              requestId={option.id}
              type={option.type}
              mainCategory={option.mainCategory}
              subCategory={option.subCategory}
              country={option.country}
              price={option.price}
              helpeeUserId={props.helpeeUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpeeDashboardPage;
