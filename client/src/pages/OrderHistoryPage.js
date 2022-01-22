import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PastOrderCard from '../components/PastOrderCard';
import ActiveOrderCard from '../components/ActiveOrderCard';
import { getAllOrders } from '../store/helpee/helpee-actions';

const OrderHistoryPage = (props) => {
  const [isActiveOrderSelected, setIsActiveOrderSelected] = useState(true);
  const [activeOrders, setActiveOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const { allOrders } = useSelector((state) => state.helpee);
  useEffect(()=>{
    const activeOrdersArr = [];
    const pastOrdersArr = [];
    allOrders.forEach((o)=>{
      if (o.meetTimestamp > Date.now()) {
        activeOrdersArr.push(o);
      } else {
        pastOrdersArr.push(o);
      }
    })
    setActiveOrders(activeOrdersArr);
    setPastOrders(pastOrdersArr);
  }, [allOrders]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders({ userId: props.userId }));
  }, [props.userId, dispatch]);

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

      {!isActiveOrderSelected && (
        <div className='task-container'>
          {pastOrders.map((option) => (
            <PastOrderCard
              service={option.service}
              meetDate={option.meetDate}
              meetTime={option.meetTime}
              orderStatus={option.status}
            />
          ))}
        </div>
      )}
      {isActiveOrderSelected && (
        <div className='task-container'>
          {activeOrders.map((option) => (
            <ActiveOrderCard
              service={option.service}
              meetDate={option.meetDate}
              meetTime={option.meetTime}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
