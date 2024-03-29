import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { onClickUpdateChatroomRoom } from '../store/general/general-actions';
import {
  workingCountryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
  lifeSharingMainOptions,
  lifeSharingSubOptions,
} from '../store/options/service-options';
import AvatarIcon from './Icons/AvatarIcon';
import BellIcon from './Icons/BellIcon';

function ChatRoomCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const [active, setActive] = useState(false);
  const [showBell, setShowBell] = useState(false);
  const [isPartnerAnonymous, setIsPartnerAnonymous] = useState(true);
  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const { targetChatroomId } = useSelector((state) => state.general);
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  
  useEffect(() => {
    if (props.currentRoom === props.roomId)
      setShowBell(true);
  }, [props.currentRoom, props.roomId, props.triggerChangeOfShowBell]);

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
    const countryTranslationObj = workingCountryOptions.filter(
      (o) => o.value === props.country
    );
    if (countryTranslationObj && countryTranslationObj[0]) {
      setTranslatedCountry(t(countryTranslationObj[0].label));
    }
      
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
      case 'life':
        setTitle(t('service_types_life'));
        secondTypeTranslationObj = lifeSharingMainOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        if (lifeSharingSubOptions && lifeSharingSubOptions[props.secondType]) {
          thirdTypeTranslationObj = lifeSharingSubOptions[
            props.secondType
          ].filter((o) => o.value === props.thirdType);
        }
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
    setShowBell(false);
    if (!props.isHelpee) {
      navigate(
        `/${currentLanguage}/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}-${props.offerId}` +
          `&userId=helper_${props.helperId}&partnerName=${props.partnerName}` +
          `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
          `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
          `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
          `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
          `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
          `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}&currentPartnerAnonymous=${isPartnerAnonymous}`
      );
    } else {
      navigate(
        `/${currentLanguage}/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}-${props.offerId}` +
          `&userId=helpee_${props.helpeeId}&partnerName=${props.partnerName}` +
          `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}` +
          `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
          `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
          `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
          `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
          `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}&currentPartnerAnonymous=${isPartnerAnonymous}`
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
  useEffect(()=>{
    if (props.isHelpee) {
      if (!props.helperAnonymous || props.helperAnonymous === '0') {
        setIsPartnerAnonymous(false);
      } else {
        setIsPartnerAnonymous(true);
      }
    } else {
       if (!props.helpeeAnonymous || props.helpeeAnonymous === '0') {
         setIsPartnerAnonymous(false);
       } else {
         setIsPartnerAnonymous(true);
       }
    }
  },[props.helpeeAnonymous, props.helperAnonymous, props.isHelpee])
  
  return (
    <>
      <div className={showBell ? 'bell' : 'noShow'}>
        <BellIcon color='white' />
      </div>

      <div
        className={active ? 'task-card-active' : 'task-card'}
        style={{ marginBottom: '30px' }}
        onClick={handleOnClick}
        ref={buttonRef}
      >
        <div className='chatRoomContent'>
          {props.isHelpee &&
            !isPartnerAnonymous && // helperAnonymous from per offer level
            props.profilePicPath !== null &&
            props.profilePicPath !== 'null' && (
              <div className='helper-ImgBx'>
                {!!props.profilePicPath && (
                  <img
                    src={`/images/${props.profilePicPath}`}
                    alt='profile'
                  ></img>
                )}
              </div>
            )}
          {!props.isHelpee &&
            !isPartnerAnonymous && // helpeeAnonymous from per user level
            !!props.profilePicPath &&
            props.profilePicPath !== null &&
            props.profilePicPath !== 'null' && (
              <div className='helper-ImgBx'>
                <img
                  src={`/images/${props.profilePicPath}`}
                  alt='profile'
                ></img>
              </div>
            )}
          {props.isHelpee &&
            (!!isPartnerAnonymous || // helperAnonymous from per offer level
              !props.profilePicPath ||
              props.profilePicPath === null ||
              props.profilePicPath === 'null') && (
              <div className='defaultAvatar-ImgBx'>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <AvatarIcon />
                </div>
              </div>
            )}
          {!props.isHelpee &&
            (!!isPartnerAnonymous || // helpeeAnonymous from per user level
              !props.profilePicPath ||
              props.profilePicPath === null ||
              props.profilePicPath === 'null') && (
              <div className='defaultAvatar-ImgBx'>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <AvatarIcon />
                </div>
              </div>
            )}

          <div className='nameBx'>
            <h5 style={{ lineBreak: 'anywhere' }}>
              {isPartnerAnonymous ? props.partnerName[0] : props.partnerName}
            </h5>
            <span style={{ fontSize: '10px', fontWeight: 'normal' }}>
              {t('sharing_topics')}: {' '}{translatedSecondType}
            </span>
            <br />
            <span style={{ fontSize: '10px', fontWeight: 'normal' }}>
              {t('sharing_topics_sub')}: {' '}{translatedThirdType}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatRoomCard;
