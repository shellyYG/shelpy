import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import { postPayHelper, clearPayHelperStatus } from '../store/helpee/helpee-actions';
import { useRef } from 'react';


const MySwal = withReactContent(Swal);

function BookingCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paypal = useRef();
  const [title, setTitle] = useState('');
  const [helpeeFilteredBookingStatus, setHelpeeFilteredBookingStatus] = useState('');
  const [helperFilteredBookingStatus, setHelperFilteredBookingStatus] =
    useState('');
  const [loading, setIsLoading] = useState(false);
  const [product] = useState({
    mainType: props.mainType,
    secondType: props.secondType,
    offerId: props.offerId,
    price: props.price,
  })

  const { payHelperStatus, payHelperStatusTitle, payHelperStatusMessage } =
    useSelector((state) => state.helpee);
  console.log('payHelperStatus: ', payHelperStatus);

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

  useEffect(() => {
    switch (props.mainType) {
      case 'university':
        setTitle('University');
        break;
      case 'job':
        setTitle('Job');
        break;
      case 'selfEmployed':
        setTitle('Self Employed');
        break;
      default:
        setTitle('Job');
    }
  }, [props.mainType]);

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
          `Meet ${props.helperUsername} on ${props.appointmentDate} at ${props.appointmentTime}. We will send you a zoom link to your email 1 day before the meeting.`
        );
        break;
      case 'fulfilled':
        setHelpeeFilteredBookingStatus('');
        break;
      default:
        setHelpeeFilteredBookingStatus('');
    }
  }, [props.bookingStatus, props.helperUsername, props.appointmentDate, props.appointmentTime]);

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
          `Waiting for ${props.helpeeUsername} to pay`
        );
        break;
      case 'paid':
        setHelperFilteredBookingStatus(
          `Meet ${props.helperUsername} on ${props.appointmentDate} at ${props.appointmentTime}. We will send you a zoom link 1 day before the meeting.`
        );
        break;
      case 'fulfilled':
        setHelperFilteredBookingStatus('');
        break;
      default:
        setHelperFilteredBookingStatus('');
    }
  }, [props.bookingStatus, props.helperUsername, props.appointmentDate, props.appointmentTime, props.helpeeUsername]);

  async function handleBookHelper(e) {
    e.preventDefault();
    navigate(
      `/helpee/book-helper?requestId=${props.requestId}&partnerName=${props.partnerName}&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}`,
    );
  }
  function handleBookingConfirmation(e) {
    e.preventDefault(e);
    navigate(
      `/helper/confirm-booking?roomId=${props.helperId}-${props.helpeeId}&userId=helper_${props.helperId}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&partnerName=${props.partnerName}&bookingDate=${props.appointmentDate}&bookingTime=${props.appointmentTime}` +
        `&bookingNotes=${props.notes}`,
    );
  }
  
  function handlePayHelper(token) {
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
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
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
          title: <strong>{title}</strong>,
          imageWIdth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
      }
      dispatch(clearPayHelperStatus());
      sweetAlertAndNavigate(payHelperStatusTitle, payHelperStatusMessage);
    }
  }, [
    payHelperStatus,
    payHelperStatusTitle,
    payHelperStatusMessage,
    navigate,
    dispatch,
  ]);
  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {!props.isAnonymous && props.profilePicPath && (
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
          )}
          {(props.isAnonymous || !props.profilePicPath) && (
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
          )}
        </div>
      </div>
      <div className='smallWidth'>
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fonrWeight: 'bold', fontSize: '18px' }}>
              {props.partnerName}
            </h3>
          </div>
        </div>
      </div>
      <div className='smallFlexColumn'>
        <div className='content'>
          <div className='contentBx'>
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
              <div className='textDateTime'>{props.secondType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
              </div>
              <div className='textDateTime'>{props.thirdType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <EarthIcon color='#95a0ff' />
              </div>
              <div className='textDateTime'>{props.country}</div>
            </div>
          </div>
        </div>
      </div>
      {!props.isHelpee && props.bookingStatus === 'created' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
            </p>
            <button onClick={handleBookingConfirmation} className='btn-next'>
              Confirm {props.partnerName}'s booking
            </button>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              Booking time: {props.appointmentDate} at ${props.appointmentTime}
            </p>
          </div>
        </div>
      )}
      {!props.isHelpee &&
        (props.bookingStatus === 'helperConfirmed' ||
          props.bookingStatus === 'paid') && (
          <div className='bookingStatusWidth'>
            <div className='contentBx'>
              <p style={{ fontWeight: '12px', padding: '6px' }}>
                {t('booking_id')}: {props.id}
              </p>
              <p style={{ fontWeight: '12px', padding: '6px' }}>
                {t('booking_status')}: {helperFilteredBookingStatus}
              </p>
            </div>
          </div>
        )}
      {props.isHelpee && props.bookingStatus === 'helperConfirmed' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
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
              {t('pay_name', {name: props.partnerName, price: props.price})}
            </button>
            <div ref={paypal}> </div>
          </div>
        </div>
      )}

      {props.isHelpee && props.bookingStatus === 'created' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
            </p>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              {t('booking_status')}: {helpeeFilteredBookingStatus}
            </p>
          </div>
          <button className='btn-contact' onClick={handleBookHelper}>
            {t('propose_new_time_to_helper', { name: props.partnerName })}
          </button>
        </div>
      )}
      {props.isHelpee && props.bookingStatus === 'paid' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              {t('booking_id')}: {props.id}
            </p>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              {t('booking_status')}: {helpeeFilteredBookingStatus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookingCard;
