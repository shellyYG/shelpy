import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import StripeCheckout from 'react-stripe-checkout';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import ChatIcon from './Icons/ChatIcon';
import { useRef } from 'react';
import {
  workingCountryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  timeZoneOptions,
  typeOptions,
  lifeSharingMainOptions,
  lifeSharingSubOptions,
} from '../store/options/service-options';
import AvatarIcon from './Icons/AvatarIcon';

function BookingCard(props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const paypal = useRef();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const [isExpiredBooking, setIsExpiredBooking] = useState(false);
  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedTimeZone, setTranslatedTimeZone] = useState('');
  const [helpeeFilteredBookingStatus, setHelpeeFilteredBookingStatus] =
    useState('');
  const [helperFilteredBookingStatus, setHelperFilteredBookingStatus] =
    useState('');
  const [showMeetingLink, setShowMeetingLink] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [shownIntroduction, setShownIntroduction] = useState('');
  const [shownSharingTopics, setShownSharingTopics] = useState('');

   useEffect(() => {
     setCurrentLanguage(i18n.language);
   }, [i18n.language]);
   useEffect(() => {
     if (currentLanguage === 'en') {
       if (props.introductionEN) {
         setShownIntroduction(props.introductionEN);
       } else {
         setShownIntroduction(props.introduction);
       }
       if (props.sharingTopicEN) {
         setShownSharingTopics(props.sharingTopicEN);
       } else {
         setShownSharingTopics(props.notes);
       }
     } else {
       setShownIntroduction(props.introduction);
       setShownSharingTopics(props.notes);
     }
   }, [currentLanguage, props.introduction, props.introductionEN, props.notes, props.sharingTopicEN]);

  const [product] = useState({
    mainType: props.mainType,
    secondType: props.secondType,
    offerId: props.offerId,
    price: props.price,
  });

  
  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/${currentLanguage}/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}-${props.offerId}` +
        `&userId=helper_${props.helperId}&partnerName=${props.partnerName}` +
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}&currentPartnerAnonymous=${props.isAnonymous}`
    );
  }

  useEffect(() => {
    if (props.appointmentTimeStamp < Date.now()) {
      setIsExpiredBooking(true);
    }
  }, [props.appointmentTimeStamp]);

  useEffect(()=>{
    const timeZoneObj = timeZoneOptions.filter(
      (o) => o.value === props.timeZone
    );
    if (timeZoneObj && timeZoneObj[0])
      setTranslatedTimeZone(t(timeZoneObj[0].label));
  },[props.timeZone, t])

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

  useEffect(() => {
    const shownPartnerName = props.isAnonymous
      ? props.helperUsername[0]
      : props.helperUsername;
    switch (props.bookingStatus) {
      case 'created':
        setHelpeeFilteredBookingStatus(
          t('booking_card_waiting_helper_confirm', {
            helperUsername: shownPartnerName,
            appointmentDate: props.appointmentDate,
            appointmentTime: props.appointmentTime,
          })
        );
        break;
      case 'helperConfirmed':
        setHelpeeFilteredBookingStatus(`Waiting for  paying.`);
        break;
      case 'paid':
        setHelpeeFilteredBookingStatus(
          t('booking_status_meet_at_when', {
            name: shownPartnerName,
            date: props.appointmentDate,
            time: props.appointmentTime,
          })
        );
        break;
      case 'fulfilled':
        setHelpeeFilteredBookingStatus('');
        break;
      default:
        setHelpeeFilteredBookingStatus('');
    }
  }, [
    t,
    props.isAnonymous,
    props.bookingStatus,
    props.helperUsername,
    props.appointmentDate,
    props.appointmentTime,
  ]);

  useEffect(() => {
    const shownPartnerName = props.isAnonymous
      ? props.helpeeUsername[0]
      : props.helpeeUsername;
    switch (props.bookingStatus) {
      case 'created':
        setHelperFilteredBookingStatus(
          t('booking_card_waiting_helper_confirm', {
            helperUsername: shownPartnerName,
            appointmentDate: props.appointmentDate,
            appointmentTime: props.appointmentTime,
          })
        );
        break;
      case 'helperConfirmed':
        setHelperFilteredBookingStatus(
          t('waiting_name_to_pay', {
            name: shownPartnerName,
          })
        );
        break;
      case 'paid':
        setHelperFilteredBookingStatus(
          t('booking_status_meet_at_when', {
            name: shownPartnerName,
            date: props.appointmentDate,
            time: props.appointmentTime,
          })
        );
        break;
      case 'fulfilled':
        setHelperFilteredBookingStatus('');
        break;
      default:
        setHelperFilteredBookingStatus('');
    }
  }, [
    t,
    props.bookingStatus,
    props.helperUsername,
    props.appointmentDate,
    props.appointmentTime,
    props.helpeeUsername,
    props.isAnonymous
  ]);

  async function handleBookHelper(e) {
    e.preventDefault();
    navigate(
      `/${currentLanguage}/helpee/update-booking?requestId=${props.requestId}&partnerName=${props.partnerName}` +
        `&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
        `&bookingStatus=${props.bookingStatus}` +
        `&bookingId=${props.bookingId}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}`
    );
  };

  async function handleRateHelper(e) {
    e.preventDefault();
    navigate(`/${currentLanguage}/helpee/rate-partner?&bookingId=${props.bookingId}&refId=${refId}`)
  }
  async function handleRateHelpee(e) {
     e.preventDefault();
     navigate(
       `/${currentLanguage}/helper/rate-partner?&bookingId=${props.bookingId}&refId=${refId}`
     );
  }
  function handleBookingConfirmation(e) {
    e.preventDefault(e);
    navigate(
      `/${currentLanguage}/helper/confirm-booking?roomId=${props.helperId}-${props.helpeeId}-${props.offerId}&userId=helper_${props.helperId}` +
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&partnerName=${props.partnerName}&bookingDate=${props.appointmentDate}&bookingTime=${props.appointmentTime}` +
        `&timeZone=${props.timeZone}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&bookingNotes=${props.questions}&refId=${refId}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}&currentPartnerAnonymous=${props.isAnonymous}&profilePicPath=${props.profilePicPath}`
    );
  }

  async function handlePayHelper() {
    navigate(
      `/${currentLanguage}/pay?bookingId=${props.bookingId}&refId=${refId}`
    );
  }
  
  function handleShowMeetingLink(e) {
    e.preventDefault();
    setShowMeetingLink(!showMeetingLink);
  }

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        {!props.isAnonymous && props.profilePicPath && (
          <div className='helper-ImgBx'>
            <img src={`/images/${props.profilePicPath}`} alt='profile'></img>
          </div>
        )}
        {(!!props.isAnonymous || !props.profilePicPath) && (
          <div className='defaultAvatar-ImgBx'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <AvatarIcon />
            </div>
          </div>
        )}
      </div>

      <div className='smallWidth'>
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {props.isAnonymous ? props.partnerName[0] : props.partnerName}
            </h3>
            {!props.isAnonymous && (
              <p style={{ fontSize: '14px' }}>
                {t('introduction')}: {shownIntroduction || t('na')}
              </p>
            )}
            {!!props.isAnonymous && (
              <p style={{ fontSize: '14px' }}>
                {props.isHelpee ? t('answer_anonymous') : t('ask_anonymous')}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='smallFlexColumn'>
        <div className='content'>
          <div className='contentBx'>
            <div className='pureFlexRow'>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginBottom: '10px',
                }}
              >
                {props.isHelpee && t('helper_offers')}
                {!props.isHelpee && t('helpee_want_to_know')}
              </p>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='orange' />
              </div>
              <div className='textDateTime'>{title}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
              </div>
              <div className='textDateTime'>{translatedSecondType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
              </div>
              <div className='textDateTime'>{translatedThirdType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <EarthIcon color='#95a0ff' />
              </div>
              <div className='textDateTime'>{translatedCountry}</div>
            </div>
          </div>
        </div>
      </div>
      {!props.isHelpee && props.bookingStatus === 'created' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
            </p>
            {!isExpiredBooking && (
              <button onClick={handleBookingConfirmation} className='btn-next'>
                {props.isAnonymous
                  ? t('accept_name_booking', { name: props.partnerName[0] })
                  : t('accept_name_booking', { name: props.partnerName })}
              </button>
            )}
            {!!isExpiredBooking && (
              <p style={{ padding: '6px', fontSize: '14px' }}>
                {t('booking_status')}: {t('this_meeting_expired')}
              </p>
            )}

            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_time')}: {props.appointmentDate} {t('at')}{' '}
              {props.appointmentTime} <br />
              {t('timeZone')} : {translatedTimeZone}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('helpee_questions')}: {props.questions}
            </p>

            {!isExpiredBooking && (
              <div>
                <ChatIcon
                  onClick={handleChat}
                  partnerName={
                    props.isAnonymous ? props.partnerName[0] : props.partnerName
                  }
                  isHelpee={false}
                  reArrangetime={true}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {!props.isHelpee &&
        (props.bookingStatus === 'helperConfirmed' ||
          props.bookingStatus === 'paid') && (
          <div className='bookingStatusWidth'>
            <div className='contentBx'>
              <p style={{ fontSize: '14px', padding: '6px' }}>
                {t('booking_id')}: {props.id}
              </p>
              <p style={{ fontSize: '14px', padding: '6px' }}>
                {!isExpiredBooking &&
                  `${t('booking_status')}: ${helperFilteredBookingStatus}`}
                {!!isExpiredBooking &&
                  `${t('booking_status')}: ${t('this_meeting_expired')}`}
                <br />
                {t('booking_time')}: {props.appointmentDate} {t('at')}{' '}
                {props.appointmentTime}
                <br />
                {t('timeZone')} : {translatedTimeZone}
              </p>
              <p style={{ fontSize: '14px', padding: '6px' }}>
                {t('helpee_questions')}: {props.questions}
              </p>
            </div>
            {!!isExpiredBooking && (
              <button className='btn-green-border' onClick={handleRateHelpee}>
                {props.isAnonymous
                  ? t('rate_helpee', {
                      name: props.partnerName[0],
                    })
                  : t('rate_helpee', {
                      name: props.partnerName,
                    })}
              </button>
            )}
            {!isExpiredBooking &&
              props.bookingStatus === 'paid' &&
              props.joinUrl && (
                <button className='btn-next' onClick={handleShowMeetingLink}>
                  {t('show_meeting_link')}
                </button>
              )}
            {showMeetingLink && (
              <div className='contentBx'>
                <p className='meetingLinkWrapper'>{props.joinUrl}</p>
              </div>
            )}
          </div>
        )}
      {props.isHelpee && props.bookingStatus === 'helperConfirmed' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_time')}: {props.appointmentDate} {t('at')}{' '}
              {props.appointmentTime}
              <br />
              {t('timeZone')} : {translatedTimeZone}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('my_questions')}: {props.questions}
            </p>
            {!isExpiredBooking && (
              <button className='btn-contact' onClick={handlePayHelper}>
                {props.isAnonymous
                  ? t('pay_name', {
                      name: props.partnerName[0],
                      price: props.price,
                    })
                  : t('pay_name', {
                      name: props.partnerName,
                      price: props.price,
                    })}
              </button>
            )}
            {!!isExpiredBooking && (
              <p style={{ padding: '6px', fontSize: '14px' }}>
                {t('this_meeting_expired')}
              </p>
            )}
            <div ref={paypal}> </div>
          </div>
        </div>
      )}

      {props.isHelpee && props.bookingStatus === 'created' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_status')}: {helpeeFilteredBookingStatus}
              <br />
              {t('timeZone')} : {translatedTimeZone}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('my_questions')}: {props.questions}
            </p>
          </div>
          {!!isExpiredBooking && (
            <p style={{ padding: '6px', fontSize: '14px' }}>
              {t('this_meeting_expired')}
            </p>
          )}
          {
            <button className='btn-green-border' onClick={handleBookHelper}>
              {t('propose_new_time_to_helper')}
            </button>
          }
        </div>
      )}
      {props.isHelpee && props.bookingStatus === 'paid' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
            </p>
            {!!isExpiredBooking && (
              <p style={{ fontSize: '14px', padding: '6px' }}>
                {t('booking_status')}: {t('this_meeting_expired')}
              </p>
            )}
            {!isExpiredBooking && (
              <p style={{ fontSize: '14px', padding: '6px' }}>
                {t('booking_status')}: {helpeeFilteredBookingStatus}
              </p>
            )}
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('timeZone')} : {translatedTimeZone}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('my_questions')}: {props.questions}
            </p>
          </div>
          {!!isExpiredBooking && (
            <button className='btn-green-border' onClick={handleRateHelper}>
              {props.isAnonymous
                ? t('rate_helper', { name: props.partnerName[0] })
                : t('rate_helper', { name: props.partnerName })}
            </button>
          )}
          {!isExpiredBooking &&
            props.bookingStatus === 'paid' &&
            props.joinUrl && (
              <button className='btn-next' onClick={handleShowMeetingLink}>
                {t('show_meeting_link')}
              </button>
            )}
          {showMeetingLink && (
            <div className='contentBx'>
              <p className='meetingLinkWrapper'>{props.joinUrl}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default BookingCard;
