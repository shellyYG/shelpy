import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onClickUpdateChatroomRoom } from '../store/general/general-actions';
import { countryOptions, departmentOptions, industryOptions, jobOptions, professionOptions, schoolOptions, typeOptions } from '../store/options/service-options';

function ChatRoomCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
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
  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;
    const countryTranslationObj = countryOptions.filter(
      (o) => o.value === props.country
    );
    setTranslatedCountry(t(countryTranslationObj[0].label));
    switch (props.mainType) {
      case 'university':
        setTitle(t('service_types_uni'));
        secondTypeTranslationObj = schoolOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = departmentOptions[props.secondType].filter(
          (o) => o.value === props.thirdType
        );
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'job':
        setTitle(t('service_types_job'));
        secondTypeTranslationObj = industryOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        if (jobOptions && jobOptions[props.secondType]) {
          thirdTypeTranslationObj = jobOptions[props.secondType].filter(
            (o) => o.value === props.thirdType
          );
        }
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'selfEmployed':
        setTitle(t('service_types_self_employed'));
        secondTypeTranslationObj = typeOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = professionOptions.filter(
          (o) => o.value === props.thirdType
        );
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      default:
        setTitle(t('service_types_job'));
    }
  }, [t, props.mainType, props.secondType, props.thirdType, props.country]);
  
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
                  src={`/defaultAvatar.jpg`}
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
                  src={`/defaultAvatar.jpg`}
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
            {translatedSecondType}
          </span>
          <br />
          <span style={{ fontSize: '10px', fontWeight: 'normal' }}>
            {translatedThirdType}
          </span>
        </div>
      </div>
    </div>
  );
}
export default ChatRoomCard;
