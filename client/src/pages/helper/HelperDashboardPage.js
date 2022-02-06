import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PastOrderCard from '../../components/PastOrderCard';
import ActiveOrderCard from '../../components/ActiveOrderCard';
import { getAllOrders } from '../../store/helpee/helpee-actions';

const HelperDashboardPage = (props) => {
  const dispatch = useDispatch();
  const [isActiveOrderSelected, setIsActiveOrderSelected] = useState(true);
  const [activeOrders, setActiveOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders({ helpeeUserId: props.helpeeUserId }));
  }, [props.helpeeUserId, dispatch]);

  const { allOrders } = useSelector((state) => state.helpee);
  console.log('allOrders: ', allOrders);
  useEffect(() => {
    const activeOrdersArr = [];
    const pastOrdersArr = [];
    allOrders.forEach((o) => {
      if (o.status === 'Fulfilled') {
        switch (o.mainType) {
          case 'university': {
            const newObject = {};
            newObject.type = 'University';
            newObject.mainCategory = o.school;
            newObject.subCategory = o.department;
            newObject.country = o.country;
            newObject.id = o.id;
            pastOrdersArr.push(newObject);
            break;
          }
          case 'job': {
            const newObject = {};
            newObject.type = 'Job';
            newObject.mainCategory = o.industry;
            newObject.subCategory = o.job;
            newObject.country = o.country;
            newObject.id = o.id;
            pastOrdersArr.push(newObject);
            break;
          }
          case 'selfEmployed': {
            const newObject = {};
            newObject.type = 'Self-Employed';
            newObject.mainCategory = o.type;
            newObject.subCategory = o.profession;
            newObject.country = o.country;
            newObject.id = o.id;
            pastOrdersArr.push(newObject);
            break;
          }
          default:
            break;
        }
      } else {
        switch (o.mainType) {
          case 'university': {
            const newObject = {};
            newObject.type = 'University';
            newObject.mainCategory = o.school;
            newObject.subCategory = o.department;
            newObject.country = o.country;
            newObject.id = o.id;
            activeOrdersArr.push(newObject);
            break;
          }
          case 'job': {
            const newObject = {};
            newObject.type = 'Job';
            newObject.mainCategory = o.industry;
            newObject.subCategory = o.job;
            newObject.country = o.country;
            newObject.id = o.id;
            activeOrdersArr.push(newObject);
            break;
          }
          case 'selfEmployed': {
            const newObject = {};
            newObject.type = 'Self-Employed';
            newObject.mainCategory = o.type;
            newObject.subCategory = o.profession;
            newObject.country = o.country;
            newObject.id = o.id;
            activeOrdersArr.push(newObject);
            break;
          }
          default:
            break;
        }
      }
    });

    setActiveOrders(activeOrdersArr);
    setPastOrders(pastOrdersArr);
  }, [allOrders]);

  function handleSelectActiveOrders(e) {
    e.preventDefault(e);
    setIsActiveOrderSelected(true);
  }
  function handleSelectpastOrders(e) {
    e.preventDefault(e);
    setIsActiveOrderSelected(false);
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
          Active Orders
        </button>
        <button
          className={
            !isActiveOrderSelected
              ? 'activeSelectedOrderBtn'
              : 'nonActiveSelectedOrderBtn'
          }
          onClick={handleSelectpastOrders}
        >
          Past Orders
        </button>
      </div>
      {isActiveOrderSelected && (
        <div className='task-container'>
          {activeOrders.map((option) => (
            <ActiveOrderCard
              key={option.id}
              orderId={option.id}
              type={option.type}
              mainCategory={option.mainCategory}
              subCategory={option.subCategory}
              country={option.country}
            />
          ))}
        </div>
      )}
      {!isActiveOrderSelected && (
        <div className='task-container'>
          {pastOrders.map((option) => (
            <PastOrderCard
              key={option.id}
              orderId={option.id}
              type={option.type}
              mainCategory={option.mainCategory}
              subCategory={option.subCategory}
              country={option.country}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelperDashboardPage;
