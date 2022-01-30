import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onClickUpdateActiveNavigateTarget } from "../store/helpee/helpee-actions";

function HomePageCard(props) {
    
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
    
  function handleOnClick(e) {
    e.preventDefault();
    const data = {
      globalNavigateTarget: props.value,
    };
    try {
      dispatch(onClickUpdateActiveNavigateTarget(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (props.globalNavigateTarget !== props.value) {
      setActive(false);
    }
  }, [props.globalNavigateTarget, props.value]);

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
export default HomePageCard;
