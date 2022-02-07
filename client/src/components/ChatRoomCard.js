import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchHelpeeData } from '../store/helpee/helpee-actions';
import { helpeeActions } from '../store/helpee/helpee-slice';

function ChatRoomCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    if (!props.isHelpee) {
      navigate(
        `/helper/chatroom?roomId=${props.helperID}-${props.helpeeID}&userId=${props.helperID}&partnerName=${props.partnerName}`
      );
    } else {
      navigate(
        `/helpee/chatroom?roomId=${props.helperID}-${props.helpeeID}&userId=${props.helpeeID}&partnerName=${props.partnerName}`
      );
    }
    
  }

  return (
    <div
      className={active ? 'task-card-active' : 'task-card'}
      onClick={handleOnClick}
    >
      <div className='chatRoomContent'>
        <div className='helper-ImgBx'>
          <img
            src={`/images/${props.profilePicPath}`}
            alt={props.partnerName}
          ></img>
        </div>

        <div className='contentBx'>
          <h5>{props.partnerName}</h5>
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
