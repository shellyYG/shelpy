
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  onClickUpdateHelperDashboardTarget,
} from '../store/helper/helper-actions';

function HelperDashboardSection(props) {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    function handleOnClick(e) {
      e.preventDefault();
      const data = {
        helperDashboardTarget: props.value,
      };
      try {
        dispatch(onClickUpdateHelperDashboardTarget(data));
      } catch (err) {
        console.error(err);
      }
      setActive(!active);
    }
    useEffect(() => {
      if (props.helperDashboardTarget !== props.value) {
        setActive(false);
      }
    }, [props.helperDashboardTarget, props.value]);
  
    return (
    <div className='dashboadTargetWrapper'>
        <button
          className={
            active ? 'activeSelectedOrderBtn' : 'nonActiveSelectedOrderBtn'
          }
          onClick={handleOnClick}
        >{props.title}</button>
    </div>
  );
}
export default HelperDashboardSection;