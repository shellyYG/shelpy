import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { serviceOptions } from '../store/options/service-options';
import PastOrderCard from '../components/PastOrderCard';
import ActiveOrderCard from '../components/ActiveOrderCard';
import { getAllOrders } from '../store/helpee/helpee-actions';

const OrderHistoryPage = (props) => {
  const [isActiveOrderSelected, setIsActiveOrderSelected] = useState(true);
  const { activeOrders, pastOrders } = useSelector((state) => state.helpee);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders({ userId: props.userId }));
  }, [props.userId, dispatch]);

  function handleSelectActiveOrders(e) {
    e.preventDefault(e);
    setIsActiveOrderSelected(true);
  }
  function handleSelectPastOrders(e) {
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
          onClick={handleSelectPastOrders}
        >
          Past Orders
        </button>
      </div>

      {!isActiveOrderSelected && (
        <div className='task-container'>
          {serviceOptions.map((option) => (
            <PastOrderCard title={option.label} valueProps1={option.price} />
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
