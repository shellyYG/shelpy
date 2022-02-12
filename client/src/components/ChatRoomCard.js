import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onClickUpdateChatroomRoom } from '../store/general/general-actions';

function ChatRoomCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { targetChatroomId } = useSelector((state) => state.general);
  console.log('helperAnonymous? ', props.helperAnonymous, 'helpee?', props.helpeeAnonymous);
  function handleOnClick(e) {
    e.preventDefault();
    if (!props.isHelpee) {
      navigate(
        `/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}&userId=helper${props.helperId}&partnerName=${props.partnerName}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}`
      );
    } else {
      navigate(
        `/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}&userId=helpee${props.helpeeId}&partnerName=${props.partnerName}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}`
      );
    }
    const data = {
      targetChatroomId: props.roomId,
    };
    try {
      dispatch(onClickUpdateChatroomRoom(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (targetChatroomId !== props.roomId) {
      setActive(false);
    }
  }, [targetChatroomId, props.roomId]);
  console.log('helpeeUserName: ', props.helpeeUsername, 'helperUsername: ', props.helperUsername, 'props.isHelpee: ', props.isHelpee, 'props.helperAnonymous: ', props.helperAnonymous);
  return (
    <div
      className={active ? 'task-card-active' : 'task-card'}
      onClick={handleOnClick}
    >
      <div className='chatRoomContent'>
        {props.isHelpee && !props.helperAnonymous && (
          <div className='helper-ImgBx'>
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
          </div>
        )}
        {!props.isHelpee && !props.helpeeAnonymous && (
          <div className='helper-ImgBx'>
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
          </div>
        )}
        {props.isHelpee && !!props.helperAnonymous && (
          <div className='smallBlankProfileImageBx'>
            <div style={{ margin: 'auto' }}>
              <p style={{ color: 'black', fontSize: '10px' }}>Anonymous</p>
            </div>
          </div>
        )}
        {!props.isHelpee && !!props.helpeeAnonymous && (
          <div className='smallBlankProfileImageBx'>
            <div style={{ margin: 'auto' }}>
              <p style={{ color: 'black', fontSize: '10px' }}>Anonymous</p>
            </div>
          </div>
        )}

        <div className='nameBx'>
          <h5 style={{ lineBreak: 'anywhere' }}>{props.partnerName}</h5>
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
