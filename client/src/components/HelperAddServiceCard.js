import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onClickUpdateActiveOfferTarget } from '../store/helper/helper-actions';

function HelperAddServiceCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    const data = {
      offerTarget: props.value,
    };
    try {
      dispatch(onClickUpdateActiveOfferTarget(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (props.offerTarget !== props.value) {
      setActive(false);
    }
  }, [props.offerTarget, props.value]);

  return (
    <div className={active ? 'card-active' : 'card'} onClick={handleOnClick}>
      <div className='content'>
        <div className='imgBxHomePage'>
          <img src={props.imageSrc} alt={props.text}></img>
        </div>
        <div className='contentBx'>
          <h3>{props.title}</h3>
        </div>
      </div>
    </div>
  );
}
export default HelperAddServiceCard;
