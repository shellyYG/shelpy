import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onClickUpdateHelpeeActiveJobOrUniTarget } from '../store/helpee/helpee-actions';
import { onClickUpdateHelperActiveJobOrUniTarget } from '../store/helper/helper-actions';

function JobOrUniCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    let data;
    if (props.isHelpee) {
      data = {
        globalHelpeeJobOrUniTarget: props.value,
      };
    } else {
      data = {
        globalHelperJobOrUniTarget: props.value,
      };
    }
    
    try {
      if (props.isHelpee) {
        dispatch(onClickUpdateHelpeeActiveJobOrUniTarget(data));
      } else {
        dispatch(onClickUpdateHelperActiveJobOrUniTarget(data));
      }
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (props.isHelpee) {
      if (props.globalHelpeeJobOrUniTarget !== props.value) {
        setActive(false);
      }
    } else {
      if (props.globalHelperJobOrUniTarget !== props.value) {
        setActive(false);
      }
    }
    
  }, [props.globalHelpeeJobOrUniTarget, props.globalHelperJobOrUniTarget, props.value, props.isHelpee]);

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
