import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatRoomCard(props) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  console.log('props.bookingStatus: ', props.bookingStatus);

  function handleOnClick(e) {
    e.preventDefault();
    if (!props.isHelpee) {
      navigate(
        `/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}&userId=${props.helperId}&partnerName=${props.partnerName}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}`
      );
    } else {
      navigate(
        `/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}&userId=${props.helpeeId}&partnerName=${props.partnerName}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}`
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
