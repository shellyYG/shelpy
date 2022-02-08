import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PotentialCustomerCard from '../../components/PotentialCustomerCard';
import {
  getAllOffers,
  getPotentialCustomers,
} from '../../store/helper/helper-actions';
import OfferCard from '../../components/OfferCard';
import { useNavigate } from 'react-router-dom';

const HelperDashboardPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPotentialCustomersSelected, setIsPotentialCustomersSelected] = useState(true);
   const [liveOffers, setLiveOffers] = useState([]);
  console.log('helperId:', props.helperUserId);
  useEffect(() => {
    dispatch(getAllOffers({ helperUserId: props.helperUserId }));
    dispatch(getPotentialCustomers({ helperUserId: props.helperUserId }));
  }, [props.helperUserId, dispatch]);

  const { allOffers, allPotentialCustomers } = useSelector((state) => state.helper);
  console.log('allPotentialCustomers: ', allPotentialCustomers);
  useEffect(() => {
    const liveOffersArr = [];
    if (allOffers) {
      allOffers.forEach((o) => {
        switch (o.mainType) {
          case 'university': {
            const newObject = {};
            newObject.type = 'University';
            newObject.mainCategory = o.school;
            newObject.subCategory = o.department;
            newObject.country = o.country;
            newObject.Id = o.Id;
            newObject.price = o.price;
            liveOffersArr.push(newObject);
            break;
          }
          case 'job': {
            const newObject = {};
            newObject.type = 'Job';
            newObject.mainCategory = o.industry;
            newObject.subCategory = o.job;
            newObject.country = o.country;
            newObject.Id = o.Id;
            newObject.price = o.price;
            liveOffersArr.push(newObject);
            break;
          }
          case 'selfEmployed': {
            const newObject = {};
            newObject.type = 'Self-Employed';
            newObject.mainCategory = o.type;
            newObject.subCategory = o.profession;
            newObject.country = o.country;
            newObject.Id = o.Id;
            newObject.price = o.price;
            liveOffersArr.push(newObject);
            break;
          }
          default:
            break;
        }
      });
    }
    setLiveOffers(liveOffersArr);
  }, [allOffers]);
  
  function handleSelectActiveOrders(e) {
    e.preventDefault(e);
    setIsPotentialCustomersSelected(true);
  }
  function handleSelectAllOffers(e) {
    e.preventDefault(e);
    setIsPotentialCustomersSelected(false);
  }

  function handleAddOffer(e) {
    e.preventDefault(e);
    navigate('/helper/service-types', { replace: true });
  }

  return (
    <div className='section-left-align'>
      <div className='orderHistoryBtnWrapper'>
        <button
          className={
            isPotentialCustomersSelected
              ? 'activeSelectedOrderBtn'
              : 'nonActiveSelectedOrderBtn'
          }
          onClick={handleSelectActiveOrders}
        >
          Potential Customers
        </button>
        <button
          className={
            !isPotentialCustomersSelected
              ? 'activeSelectedOrderBtn'
              : 'nonActiveSelectedOrderBtn'
          }
          onClick={handleSelectAllOffers}
        >
          Your Offers
        </button>
      </div>
      <div className='task-container'></div>
      {isPotentialCustomersSelected && allPotentialCustomers && (
        <div className='task-container'>
          {allPotentialCustomers.map(
            (
              option // TODO: changed to orders
            ) => (
              <PotentialCustomerCard
                key={option.requestId}
                helperId={props.helperUserId}
                helpeeId={option.helpeeId}
                partnerName={option.helpeeName}
                mainType={option.mainType}
                secondType={option.secondType}
                thirdType={option.thirdType}
                profilePicPath={option.profilePicPath}
                country={option.country}
                requestId={option.requestId}
                price={option.price}
                bookingStatus={option.bookingStatus}
              />
            )
          )}
        </div>
      )}
      {!isPotentialCustomersSelected && liveOffers && (
        <div className='task-container'>
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <button className='btn-contact' onClick={handleAddOffer}>
              Add another Offer
            </button>
          </div>
          {liveOffers.map((option) => (
            <OfferCard
              key={option.Id}
              offerId={option.Id}
              type={option.type}
              mainCategory={option.mainCategory}
              subCategory={option.subCategory}
              country={option.country}
              price={option.price}
              helperUserId={props.helperUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelperDashboardPage;
