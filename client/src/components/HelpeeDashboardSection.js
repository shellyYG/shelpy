import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { onClickUpdateHelpeeDashboardTarget } from '../store/helpee/helpee-actions';

function HelpeeDashboardSection(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  
  function handleOnClick(e) {
    e.preventDefault();
    const data = {
      helpeeDashboardTarget: props.value,
    };
    try {
      dispatch(onClickUpdateHelpeeDashboardTarget(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (props.helpeeDashboardTarget !== props.value) {
      setActive(false);
    }else {
      setActive(true);
    }
  }, [props.helpeeDashboardTarget, props.value]);

  return (
    <div className='dashboadTargetWrapper'>
      <button
        className={
          active ? 'activeSelectedOrderBtn' : 'nonActiveSelectedOrderBtn'
        }
        onClick={handleOnClick}
        style={{ color: props.color || ''}}
      >
        {props.title}
      </button>
    </div>
  );
}
export default HelpeeDashboardSection;
