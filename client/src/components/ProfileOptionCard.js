import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onClickUpdateActiveProfileTarget } from '../store/helper/helper-actions';

function ProfileOptionCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    const data = {
      profileTarget: props.value,
    };
    try {
      dispatch(onClickUpdateActiveProfileTarget(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (props.profileTarget !== props.value) {
      setActive(false);
    }
  }, [props.profileTarget, props.value]);

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
export default ProfileOptionCard;
