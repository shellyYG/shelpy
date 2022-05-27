import '../App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import HelpIcon from '../components/Icons/HelpIcon';
import {
  getBookingDetails,
  updateBookingStatusToPaidAndReceiptMeetLink,
  changeBookingStatusToAlreadyPaid,
} from '../store/helpee/helpee-actions';

const MySwal = withReactContent(Swal);

const PaymentSuccessPage = () => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const bookingId = searchParams.get('bookingId');
  const refId = searchParams.get('refId');

  const [bookingStatusChanged, setBookingStatusChanged] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    paymentStep,
    paymentStepTitle,
    paymentStepMessage,
    booking,
  } = useSelector((state) => state.helpee);

  console.log('loading: ', loading);

  if (loading) {
    MySwal.fire({
      title: t('loading'),
      html: t('do_not_close_window'),
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }

  // get latest booking status
  useEffect(() => {
    dispatch(getBookingDetails({ bookingId }));
  }, [bookingId, dispatch]);

  // update booking status, generate meet link & receipt
  useEffect(() => {
    console.log('booking: ', booking);
    if (booking && booking.length && booking[0]) {
      const bookingPaid = booking[0];
      if (!bookingPaid || bookingPaid.bookingStatus === 'paid') {
        dispatch(changeBookingStatusToAlreadyPaid());
        return;
      }
      
      if(!bookingStatusChanged) {
        const {
          appointmentDate,
          appointmentTime,
          appointmentTimestamp,
          duration,
          price,
          offerId,
          timeZone,
          helperUsername,
          helpeeUsername,
          helpeeId,
          helperId,
          helperEmail,
          helpeeEmail,
          isAnonymous, // TODO for anonymous email
          bookingStatus, // just for debug
          helpeeNotificationLanguage,
          helperNotificationLanguage,
        } = bookingPaid;
        const data = {
          details: `bookingId: ${bookingId}`,
          duration,
          helpeeId,
          helperId,
          bookingId,
          helpeeNotificationLanguage,
          helperNotificationLanguage,
          helperName: helperUsername,
          helpeeName: helpeeUsername,
          offerId,
          appointmentDate,
          appointmentTime,
          helperEmail,
          helpeeEmail,
          appointmentTimestamp,
          amount: price * parseInt(process.env.REACT_APP_USD_TO_NTD),
          timeZone,
          cardholder: {
            phone_number: '',
            name: '',
            email: '',
            zip_code: '',
            address: '',
            national_id: '',
          },
          remember: true,
        };
        dispatch(updateBookingStatusToPaidAndReceiptMeetLink(data));
        setBookingStatusChanged(true); // prevent re-render twice
      }
    }
  }, [
    dispatch,
    bookingId,
    booking,
    bookingStatusChanged
  ]);

  useEffect(()=>{
    console.log('paymentStep: ', paymentStep);
    async function sweetAlert(title, message) {
      await MySwal.fire({
        title: <strong>{t(title)}</strong>,
        imageWIdth: 442,
        imageHeight: 293,
        html: <p>{t(message)}</p>,
        icon: 'success',
      });
    }
     if (paymentStep === 'success') {
        setIsLoading(false);
        sweetAlert(paymentStepTitle, paymentStepMessage);
        setShowSuccess(true);
     } else if (paymentStep === 'oops') {
       setIsLoading(false);
       async function sweetAlertAndNavigate(title, message) {
         await MySwal.fire({
           title: <strong>{t(title)}</strong>,
           imageWIdth: 442,
           imageHeight: 293,
           html: <p>{t(message)}</p>,
           icon: 'success',
         });
         navigate(
           `/${currentLanguage}/pay/failed?bookingId=${bookingId}&refId=${refId}`,
           {
             replace: true,
           }
         );
       }
       sweetAlertAndNavigate(paymentStepTitle, paymentStepMessage);
     }
  },[paymentStep, paymentStepTitle, paymentStepMessage, t, bookingId, currentLanguage, navigate, refId])

  useEffect(()=>{
    if(!bookingId) {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          imageWIdth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        navigate(
          `/${currentLanguage}/helpee/bookings?refId=${refId}`,
          {
            replace: true,
          }
        );
      }
      sweetAlertAndNavigate(t('oops'), t('pure_something_went_wrong'));
    }
  },[bookingId, currentLanguage, t, refId, navigate])

  function handleToBookingPage(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helpee/bookings`;
    if (window.location.search) path += window.location.search;
    navigate(path, { replace: true });
  }
  return (
    <div className='section-left-align'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div style={{ margin: '50px auto' }}>
          <HelpIcon color='#04AA6D' />
          <h1>
            {showSuccess ? t('thank_you') : t('loading')}
          </h1>
          <h2 style={{ margin: '10px auto' }}>
            {showSuccess ? t('successfully_paid') : t('loading')}
          </h2>
          <p style={{ margin: '10px auto' }}>
            {t('booking_id')}: {bookingId}
          </p>
          <button
            className='btn-next'
            style={{ width: 'fit-content' }}
            onClick={handleToBookingPage}
          >
            {t('back_to_bookings_page')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
