import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import { postPayHelper, clearPayHelperStatus } from '../store/helpee/helpee-actions';

console.log(
  'process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY: ',
  process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY
);

const MySwal = withReactContent(Swal);

function BookingCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
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
      title: 'Loading...',
      html: 'Please do not close the window.',
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
        setImg('/university');
        setTitle('University');
        break;
      case 'job':
        setImg('/job');
        setTitle('Job');
        break;
      case 'selfEmployed':
        setImg('/mom');
        setTitle('Self Employed');
        break;
      default:
        setImg('/university');
    }
  }, [props.mainType]);

  useEffect(() => {
    switch (props.bookingStatus) {
      case 'created':
        setHelpeeFilteredBookingStatus(
          `Waiting for ${props.helperUsername} to confirm`
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
          `Waiting for ${props.helperUsername} to confirm`
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
    console.log(
      `/helpee/book-helper?requestId=${props.requestId}&partnerName=${props.partnerName}&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}`
    );
    navigate(
      `/helpee/book-helper?requestId=${props.requestId}&partnerName=${props.partnerName}&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}`,
      { replace: true }
    );
  }
  function handleBookingConfirmation(e) {
    e.preventDefault(e);
    navigate(
      `/helper/confirm-booking?roomId=${props.helperId}-${props.helpeeId}&userId=helper_${props.helperId}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}&partnerName=${props.partnerName}`
    );
  }
  
  function handlePayHeper(token) {
    console.log('handlePayHelper..., token: ', token);
    try {
      const data = {
        bookingStatus: 'paid',
        bookingId: props.bookingId,
        token,
        product,
      };
      dispatch(postPayHelper(data));
      setIsLoading(true);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
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
          {img && (
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
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
              Booking ID: {props.id}
            </p>
            <button onClick={handleBookingConfirmation} className='btn-next'>
              Confirm {props.partnerName}'s booking
            </button>
          </div>
        </div>
      )}
      {!props.isHelpee &&
        (props.bookingStatus === 'helperConfirmed' ||
          props.bookingStatus === 'paid') && (
          <div className='bookingStatusWidth'>
            <div className='contentBx'>
              <p style={{ fontWeight: '12px', padding: '6px' }}>
                Booking ID: {props.id}
              </p>
              <p style={{ fontWeight: '12px', padding: '6px' }}>
                Booking Status: {helperFilteredBookingStatus}
              </p>
            </div>
          </div>
        )}
      {props.isHelpee && props.bookingStatus === 'helperConfirmed' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              Booking ID: {props.id}
            </p>
            <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY}
              token={handlePayHeper}
              currency='eur'
              name={`Pay ${props.partnerName}`}
              amount={props.price * 100}
              email={props.helpeeEmail}
            >
              <button className='btn-next'>
                Pay {props.partnerName} ({props.price}€)
              </button>
            </StripeCheckout>
          </div>
        </div>
      )}

      {props.isHelpee && props.bookingStatus === 'created' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              Booking ID: {props.id}
            </p>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              Booking Status: {helpeeFilteredBookingStatus}
            </p>
          </div>
          <button className='btn-contact' onClick={handleBookHelper}>
            Propose new booking time to {props.partnerName}
          </button>
        </div>
      )}
      {props.isHelpee && props.bookingStatus === 'paid' && (
        <div className='bookingStatusWidth'>
          <div className='contentBx'>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              Booking ID: {props.id}
            </p>
            <p style={{ fontWeight: '12px', padding: '6px' }}>
              Booking Status: {helpeeFilteredBookingStatus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookingCard;
