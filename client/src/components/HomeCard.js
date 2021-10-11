import { useRef, useContext, useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function HomeCard(props) {
  const [active, setActive] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    setActive(true);
  }
  return (
    <div className="card" onClick={handleClick}>
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
      <ul className="sci">
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
      </ul>
    </div>
  );
}
export default HomeCard;
