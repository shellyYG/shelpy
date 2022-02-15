import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onClickUpdateChatroomRoom } from '../store/general/general-actions';

function ChatRoomCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const [active, setActive] = useState(false);
  const { targetChatroomId } = useSelector((state) => state.general);
  
  useEffect(() => {
    if (props.roomId === props.pageRoomId && props.offerId === props.pageOfferId) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [props.roomId, props.pageRoomId, props.offerId, props.pageOfferId]);
  useEffect(() => {
    if (targetChatroomId && targetChatroomId !== props.roomId) {
      setActive(false);
    }
  }, [targetChatroomId, props.roomId]);
  
  function handleOnClick(e) {
    e.preventDefault();
    if (!props.isHelpee) {
      navigate(
        `/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}`+
        `&userId=helper_${props.helperId}&partnerName=${props.partnerName}`+
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}`+
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}`+
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}`+
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}`+
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}`+
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}`
      );
    } else {
      navigate(
        `/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}`+
        `&userId=helpee_${props.helpeeId}&partnerName=${props.partnerName}`+
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}`+
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}`+
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}`+
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}`+
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}`+
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}`
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
  }
  
  return (
    <div
      className={active ? 'task-card-active' : 'task-card'}
      onClick={handleOnClick}
      ref={buttonRef}
    >
      <div className='chatRoomContent'>
        {props.isHelpee &&
          !props.helperAnonymous &&
          props.profilePicPath !== null &&
          props.profilePicPath !== 'null' && (
            <div className='helper-ImgBx'>
              {!!props.profilePicPath && (
                <img
                  src={`/images/${props.profilePicPath}`}
                  alt={props.partnerName}
                ></img>
              )}
            </div>
          )}
        {!props.isHelpee &&
          !props.helpeeAnonymous &&
          !!props.profilePicPath &&
          props.profilePicPath !== null &&
          props.profilePicPath !== 'null' && (
            <div className='helper-ImgBx'>
              <img
                src={`/images/${props.profilePicPath}`}
                alt={props.partnerName}
              ></img>
            </div>
          )}
        {props.isHelpee &&
          (!!props.helperAnonymous ||
            !props.profilePicPath ||
            props.profilePicPath === null ||
            props.profilePicPath === 'null') && (
            <div className='helper-ImgBx'>
              <a
                href='https://www.vecteezy.com/free-vector/default-avatar'
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src={`/images/assets/defaultAvatar.jpg`}
                  alt={
                    'Default Avatar Vectors by Vecteezy:https://www.vecteezy.com/free-vector/default-avatar'
                  }
                ></img>
              </a>
            </div>
          )}
        {!props.isHelpee &&
          (!!props.helpeeAnonymous ||
            !props.profilePicPath ||
            props.profilePicPath === null ||
            props.profilePicPath === 'null') && (
            <div className='helper-ImgBx'>
              <a
                href='https://www.vecteezy.com/free-vector/default-avatar'
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src={`/images/assets/defaultAvatar.jpg`}
                  alt={
                    'Default Avatar Vectors by Vecteezy:https://www.vecteezy.com/free-vector/default-avatar'
                  }
                ></img>
              </a>
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
