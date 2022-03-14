import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import ChatIcon from './Icons/ChatIcon';
import { postPayHelper, clearPayHelperStatus } from '../store/helpee/helpee-actions';
import { useRef } from 'react';
import { countryOptions, departmentOptions, industryOptions, jobOptions, professionOptions, schoolOptions, timeZoneOptions, typeOptions } from '../store/options/service-options';
import AvatarIcon from './Icons/AvatarIcon';


const MySwal = withReactContent(Swal);

function BookingCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paypal = useRef();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedTimeZone, setTranslatedTimeZone] = useState('');
  const [helpeeFilteredBookingStatus, setHelpeeFilteredBookingStatus] =
    useState('');
  const [helperFilteredBookingStatus, setHelperFilteredBookingStatus] =
    useState('');
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const [loading, setIsLoading] = useState(false);

  const [product] = useState({
    mainType: props.mainType,
    secondType: props.secondType,
    offerId: props.offerId,
    price: props.price,
  });

  console.log('timeZone: ', props.timeZone)

  const { payHelperStatus, payHelperStatusTitle, payHelperStatusMessage } =
    useSelector((state) => state.helpee);

  if (loading) {
    MySwal.fire({
      title: t('loading'),
      html: t('do_not_close_window'),
      allowOutsIdeClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }
  
  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/${currentLanguage}/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}` +
        `&userId=helper_${props.helperId}&partnerName=${props.partnerName}` +
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}`
    );
  }
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

  useEffect(() => {
    switch (props.bookingStatus) {
      case 'created':
        setHelpeeFilteredBookingStatus(
          t('booking_card_waiting_helper_confirm', {
            helperUsername: props.helperUsername,
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
            name: props.helperUsername,
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
    props.bookingStatus,
    props.helperUsername,
    props.appointmentDate,
    props.appointmentTime,
  ]);

  useEffect(() => {
    switch (props.bookingStatus) {
      case 'created':
        setHelperFilteredBookingStatus(
          t('booking_card_waiting_helper_confirm', {
            helperUsername: props.helperUsername,
            appointmentDate: props.appointmentDate,
            appointmentTime: props.appointmentTime,
          })
        );
        break;
      case 'helperConfirmed':
        setHelperFilteredBookingStatus(
          t('waiting_name_to_pay', {
            name: props.helpeeUsername,
          })
        );
        break;
      case 'paid':
        setHelperFilteredBookingStatus(
          t('booking_status_meet_at_when', {
            name: props.helperUsername,
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
  }
  function handleBookingConfirmation(e) {
    e.preventDefault(e);
    navigate(
      `/${currentLanguage}/helper/confirm-booking?roomId=${props.helperId}-${props.helpeeId}&userId=helper_${props.helperId}`+
      `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&partnerName=${props.partnerName}&bookingDate=${props.appointmentDate}&bookingTime=${props.appointmentTime}` +
        `&timeZone=${props.timeZone}`+
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}`+
        `&bookingNotes=${props.questions}&refId=${refId}`
    );
  }

  function handlePayHelper(token) {
    navigate(
      `/${currentLanguage}/pay?bookingId=${props.bookingId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}` +
        `&bookingDate=${props.appointmentDate}&bookingTime=${props.appointmentTime}` +
        `&helperUsername=${props.helperUsername}&refId=${refId}`
    );
    try {
      // const data = {
      //   bookingStatus: 'paid',
      //   bookingId: props.bookingId,
      //   token,
      //   product,
      // };
      // dispatch(postPayHelper(data));
      // setIsLoading(true);
      // Test Paypal:
      // window.paypal
      //   .Buttons({
      //     createOrder: function (data, actions) {
      //       // Set up the transaction
      //       return actions.order.create({
      //         purchase_units: [
      //           {
      //             description: 'Paying Helper',
      //             amount: {
      //               currency_code: 'EUR',
      //               value: '0.01',
      //             },
      //           },
      //         ],
      //       });
      //     },
      //     onApprove: async (data, actions) => {
      //       const order = await actions.order.capture();
      //       console.log('order: ', order);
      //     },
      //     onError: (err) => {
      //       console.log('err: ', err);
      //     },
      //   })
      //   .render(paypal.current);
    } catch (err) {
      console.error(err);
      // setIsLoading(false);
    }
  }

  useEffect(() => {
    if (payHelperStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearPayHelperStatus());
      }
      sweetAlertAndClearStatus(payHelperStatusTitle, payHelperStatusMessage);
      return;
    } else if (payHelperStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          imageWIdth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
      }
      dispatch(clearPayHelperStatus());
      sweetAlertAndNavigate(payHelperStatusTitle, payHelperStatusMessage);
    }
  }, [
    t,
    payHelperStatus,
    payHelperStatusTitle,
    payHelperStatusMessage,
    navigate,
    dispatch,
  ]);
  // <img src="/images/helper-profile-pictures/1644921329445-markus.jpeg" alt="Markus">
  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        {!props.isAnonymous && props.profilePicPath && (
          <div className='helper-ImgBx'>
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
          </div>
        )}
        {(props.isAnonymous || !props.profilePicPath) && (
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
              {props.partnerName}
            </h3>
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
            <button onClick={handleBookingConfirmation} className='btn-next'>
              {t('accept_name_booking', { name: props.partnerName })}
            </button>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_time')}: {props.appointmentDate} {t('at')}{' '}
              {props.appointmentTime} <br />
              {t('timeZone')} : {translatedTimeZone}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('helpee_questions')}: {props.questions}
            </p>

            <div>
              <ChatIcon
                onClick={handleChat}
                partnerName={props.partnerName}
                isHelpee={false}
                reArrangetime={true}
              />
            </div>
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
                {t('booking_status')}: {helperFilteredBookingStatus}
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
            {/* <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY}
              token={handlePayHelper}
              currency='eur'
              name={`Pay ${props.partnerName}`}
              amount={props.price * 100}
              email={props.helpeeEmail}
            >
              <button className='btn-next'>
                Pay {props.partnerName} ({props.price}€)
              </button>
            </StripeCheckout> */}
            <button className='btn-contact' onClick={handlePayHelper}>
              {t('pay_name', { name: props.partnerName, price: props.price })}
            </button>
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
          <button className='btn-green-border' onClick={handleBookHelper}>
            {t('propose_new_time_to_helper', { name: props.partnerName })}
          </button>
        </div>
      )}
      {props.isHelpee && props.bookingStatus === 'paid' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('booking_status')}: {helpeeFilteredBookingStatus}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('timeZone')} : {translatedTimeZone}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('my_questions')}: {props.questions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookingCard;
