import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  fetchHelpeeData,
  sendHelpeeData,
} from '../store/helpee/helpee-actions';
import { helpeeActions } from '../store/helpee/helpee-slice';

function HomeCard(props) {
  const dispatch = useDispatch();
  const { pageFirstTimeLoaded, DBServiceType, activeServiceType } = useSelector(
    (state) => state.helpee
  );
  // console.log('pageFirstTimeLoaded: ', pageFirstTimeLoaded);
  const [serviceType, setServiceType] = useState(DBServiceType);
  const [active, setActive] = useState(false);
  
  console.log(
    `---${props.value} is active? ${active}, activeServiceType: ${activeServiceType}`
  );
  function handleOnClick(e) {
    e.preventDefault();
    setServiceType(props.value); // set local service type state
    // should change DB when click "next"
    // dispatch(sendHelpeeData({ // change DB
      // helpeeName: '',
      // helpeeLanguage: '',
      // serviceType: props.value,
    // }));
    // change active service type
    dispatch(
      helpeeActions.setActiveServiceType({
        activeServiceType: props.value,
      })
    );
    dispatch(fetchHelpeeData()); // change local state

    setActive(!active);
  }
  // actually serviceType should NOT be local state because it should be used at global level
  console.log(`ServiceType DB: ${DBServiceType} | local: ${serviceType}`);

  // 不能有下面這段，否則load頁面時會每個 component loop 一次導致最後的 serviceType 是 Others
  // useEffect(() => {
  //   dispatch(fetchHelpeeData());
  // }, [dispatch]);

  useEffect(() => {
    if (activeServiceType !== props.value) {
      setActive(false);
    }
  }, [activeServiceType, props.value]);

  // useEffect(() => {
  //   if (!pageFirstTimeLoaded) {
  //     dispatch(
  //       sendHelpeeData({
  //         helpeeName: '',
  //         helpeeLanguage: '',
  //         serviceType: props.value,
  //       })
  //     );
  //   }
  // }, [props.value, pageFirstTimeLoaded, dispatch]);

  return (
    <div className={active? "card-active": "card"} onClick={handleOnClick}>
      <div className="content">
        <div className="imgBx">
          <img src={props.imageSrc} alt={props.text}></img>
        </div>
        <div className="contentBx">
          <h3>
            {props.title}
            <br />
            <span>{props.valueProps1}</span>
            <br />
            <span>{props.valueProps2}</span>
          </h3>
        </div>
      </div>
      {/* <ul className="sci">
        <li style={{ ['--i']: 1 }}>
          <a href="#">
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </a>
        </li>
        <li style={{ ['--i']: 2 }}>
          <a href="#">
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </a>
        </li>
        <li style={{ ['--i']: 3 }}>
          <a href="#">
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </a>
        </li>
      </ul> */}
    </div>
  );
}
export default HomeCard;
