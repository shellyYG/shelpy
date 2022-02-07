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
  const [isActiveOrderSelected, setIsActiveOrderSelected] = useState(true);
   const [liveOffers, setLiveOffers] = useState([]);
  console.log('helperID:', props.helperUserId);
  

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
            newObject.id = o.id;
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
            newObject.id = o.id;
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
            newObject.id = o.id;
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
    setIsActiveOrderSelected(true);
  }
  function handleSelectAllOffers(e) {
    e.preventDefault(e);
    setIsActiveOrderSelected(false);
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
            isActiveOrderSelected
              ? 'activeSelectedOrderBtn'
              : 'nonActiveSelectedOrderBtn'
          }
          onClick={handleSelectActiveOrders}
        >
          Potential Customers
        </button>
        <button
          className={
            !isActiveOrderSelected
              ? 'activeSelectedOrderBtn'
              : 'nonActiveSelectedOrderBtn'
          }
          onClick={handleSelectAllOffers}
        >
          Your Offers
        </button>
      </div>
      {isActiveOrderSelected && allPotentialCustomers && (
        <div className='task-container'>
          {allPotentialCustomers.map(
            (
              option // TODO: changed to orders
            ) => (
              <PotentialCustomerCard
                key={option.helpeeID}
                helperID={props.helperUserId}
                helpeeID={option.helpeeID}
                customerName={option.helpeeName}
                mainType={option.mainType}
                secondType={option.secondType}
                thirdType={option.thirdType}
                profilePicPath={option.profilePicPath}
                country={option.country}
              />
            )
          )}
        </div>
      )}
      {!isActiveOrderSelected && liveOffers && (
        <div className='task-container'>
          {liveOffers.map((option) => (
            <OfferCard
              key={option.id}
              offerId={option.id}
              type={option.type}
              mainCategory={option.mainCategory}
              subCategory={option.subCategory}
              country={option.country}
              price={option.price}
              helperUserId={props.helperUserId}
            />
          ))}
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <button className='btn-contact' onClick={handleAddOffer}>
              Add Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelperDashboardPage;
