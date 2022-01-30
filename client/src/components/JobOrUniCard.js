import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onClickUpdateActiveJobOrUniTarget } from '../store/helpee/helpee-actions';

function JobOrUniCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    const data = {
      globalJobOrUniTarget: props.value,
    };
    try {
      dispatch(onClickUpdateActiveJobOrUniTarget(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (props.globalJobOrUniTarget !== props.value) {
      setActive(false);
    }
  }, [props.globalJobOrUniTarget, props.value]);

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
export default JobOrUniCard;
