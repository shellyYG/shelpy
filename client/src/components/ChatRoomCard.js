import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHelpeeData } from '../store/helpee/helpee-actions';
import { helpeeActions } from '../store/helpee/helpee-slice';

function ChatRoomCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  return (
    <div className={active ? 'task-card-active' : 'task-card'}>
      <div className='chatRoomContent'>
        <div className='helper-ImgBx'>
          <img
            src={`/images/${props.profilePicPath}`}
            alt={props.customerName}
          ></img>
        </div>

        <div className='contentBx'>
          <h5>{props.customerName}</h5>
          <span style={{ fontSize: '10px', fontWeight: 'normal' }}>
            {props.secondType}
          </span>
          <br />
          <span style={{ fontSize: '10px', fontWeight: 'normal' }}>
            {props.thirdType}
          </span>
        </div>
      </div>
    </div>
  );
}
export default ChatRoomCard;
