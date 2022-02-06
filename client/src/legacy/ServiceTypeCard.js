import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  onClickUpdateActiveServiceType,
} from "../store/helpee/helpee-actions";

function ServiceTypeCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    // change global state for matching active service type for UI changes
    const data = {
      globalServiceType: props.value,
    };
    try {
      dispatch(onClickUpdateActiveServiceType(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }

  useEffect(() => {
    if (props.globalServiceType !== props.value) {
      setActive(false);
    }
  }, [props.globalServiceType, props.value]);

  return (
    <div className={active ? 'card-active' : 'card'} onClick={handleOnClick}>
      <div className='content'>
        <div className='imgBx'>
          <img src={props.imageSrc} alt={props.text}></img>
        </div>
        <div className='contentBx'>
          <div style={{ marginTop: '18px', display: 'flex' }}>
            <h3 style={{ margin: 'auto' }}>{props.title}</h3>
          </div>
          <div style={{ marginTop: '6px', display: 'flex' }}>
            <h3 style={{ margin: 'auto' }}>{props.price}</h3>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
export default ServiceTypeCard;
