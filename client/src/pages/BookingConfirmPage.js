import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import DropDown from '../components/Dropdown';
import DateForm from '../components/DateForm';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  meetTimeOptions,
} from '../store/options/service-options';
import {
  postBookingStatus,
  clearBookingNotificationStatus,
  getBookingStatus,
} from '../store/general/general-actions';
const MySwal = withReactContent(Swal);

const BookingConfirmPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meetDateRef = useRef();
  const meetTimeRef = useRef();
  const notesRef = useRef();

  const [searchParams] = useSearchParams();

  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const partnerName = searchParams.get('partnerName');
  const requestId = searchParams.get('requestId');
  const offerId = searchParams.get('offerId');
  const price = parseInt(searchParams.get('price')); // parseInt?

  const helpeeId = parseInt(searchParams.get('helpeeId'));
  const helperId = parseInt(searchParams.get('helperId'));
  const helpeeUsername = searchParams.get('helpeeUsername');
  const helperUsername = searchParams.get('helperUsername');
  const country = searchParams.get('country');
  const mainType = searchParams.get('mainType');
  const secondType = searchParams.get('secondType');
  const thirdType = searchParams.get('thirdType');
  const fourthType = searchParams.get('fourthType');

  const {
    bookingStatus,
    bookingTime,
    bookingDate,
    bookingNotes,
    bookingNotificationStatus,
    bookingNotificationStatusTitle,
    bookingNotificationStatusMessage,
  } = useSelector((state) => state.general);

  const [enableBtn, setEnableBtn] = useState(false);
  const [loading, setIsLoading] = useState(false);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;
  console.log('today: ', today);
  const [meetDate, setMeetDate] = useState(today); // display will be 2021/11/12 though
  const [meetTime, setMeetTime] = useState('8am-9am');

  useEffect(() => {
    dispatch(
      getBookingStatus({ isHelpee: props.isHelpee, requestId, offerId })
    );
  }, [dispatch, offerId, props.isHelpee, requestId]);
 
  async function handleChangeBooking(e) {
    e.preventDefault();
    const data = {
      requestId,
      offerId,
      bookingStatus: 'helperAskChange',
    };
    dispatch(postBookingStatus(data));
    setIsLoading(true);
    navigate(
      `/helper/chatroom?roomId=${roomId}&userId=helper${userId}&partnerName=${partnerName}&requestId=${requestId}&offerId=${offerId}&bookingStatus=${bookingStatus}`
    );
  }
  async function handleConfirm(e) {
    e.preventDefault();
    if (props.isHelpee) {
      const meetTimeRange = meetTimeRef.current.value; // 8am-9am;
      const endMeetTime = meetTimeRange.split('-')[1]; // 9am;
      const timeAMPM =
        endMeetTime[endMeetTime.length - 2] +
        endMeetTime[endMeetTime.length - 1];
      let timeHour;
      if (timeAMPM === 'am') {
        timeHour = parseInt(
          endMeetTime.length > 3
            ? endMeetTime[0] + endMeetTime[1]
            : endMeetTime[0]
        );
      } else {
        timeHour =
          parseInt(
            endMeetTime.length > 3
              ? endMeetTime[0] + endMeetTime[1]
              : endMeetTime[0]
          ) + 12;
      }

      const dates = meetDateRef.current.value.split('-');
      const [year, month, day] = dates;
      const unixTime = Date.UTC(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        timeHour
      );
      const data = {
        appointmentDate: meetDateRef.current.value,
        appointmentTime: meetTimeRef.current.value,
        appointmentTimestamp: unixTime,
        notes: notesRef.current.value,
        bookingStatus: 'created',
        requestId,
        offerId,
        helpeeId,
        helperId,
        helpeeUsername,
        helperUsername,
        country,
        price,
        mainType,
        secondType,
        thirdType,
        fourthType,
      };
      console.log('@BookingCOnfirmPage create booking ->data: ', data);
      dispatch(postBookingStatus(data));
    } else {
      const data = {
        requestId,
        offerId,
        bookingStatus: 'helperConfirmed',
      };
      dispatch(postBookingStatus(data));
    }
    setIsLoading(true);
  }

  useEffect(() => {
    setEnableBtn(meetDateRef && meetTimeRef);
  }, [meetDateRef, meetTimeRef]);

  const handleDateInput = (e) => {
    e.preventDefault();
    setMeetDate(e.target.value);
  };
  if (loading) {
    MySwal.fire({
      title: 'Loading...',
      html: 'Please do not close the window.',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }
  useEffect(() => {
    if (bookingNotificationStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'error',
        });
        dispatch(clearBookingNotificationStatus());
      }
      sweetAlertAndClearStatus(
        bookingNotificationStatusTitle,
        bookingNotificationStatusMessage
      );
      return;
    } else if (bookingNotificationStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
        const path = props.isHelpee ? '/helpee/dashboard' : '/helper/dashboard';
        navigate(path, { replace: true });
      }
      dispatch(clearBookingNotificationStatus());
      sweetAlertAndNavigate(bookingStatus, bookingNotificationStatusMessage);
    }
  }, [
    navigate,
    props.isHelpee,
    bookingStatus,
    bookingNotificationStatus,
    bookingNotificationStatusTitle,
    bookingNotificationStatusMessage,
    dispatch,
  ]);
  return (
    <div className='form-center-wrapper'>
      <div
        className='container'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ margin: '10px' }}>
          {props.isHelpee && (
            <>
              <h3>The order is only confirmed when helper accept it.</h3>
              <h3>We will refund you if the helper reject the order.</h3>
            </>
          )}
          {!props.isHelpee && (
            <>
              <h3>The order is only confirmed when you accept it.</h3>
              <h3>If you do not agree with the time, </h3>
              <h3>please chat with the Helpee to set up a time.</h3>
            </>
          )}
        </div>
        <div className='form-inner'>
          <form action=''>
            {props.isHelpee && (
              <>
                <div className='form-row'>
                  <DateForm
                    title={'Appointment Date *'}
                    handleInput={handleDateInput}
                    value={meetDate}
                    dateFormRef={meetDateRef}
                  />
                  <DropDown
                    selected={meetTime}
                    handleSelect={setMeetTime}
                    title={'Appointment Time *'}
                    selectRef={meetTimeRef}
                    options={meetTimeOptions}
                  />
                </div>
                <FullLineTextBox
                  title={'Notes'}
                  placeholder={'Feel free to leave some notes for the helper.'}
                  inputRef={notesRef}
                />
                <div className='form-row'>Price: {price} € (30 minutes)</div>
              </>
            )}

            {!props.isHelpee && (
              <>
                <div className='form-wrapper'>
                  <label style={{ fontWeight: 'bold' }}>
                    Appointment Date (YYYY-MM-DD)
                  </label>
                  <div style={{ fontSize: '14px' }}> {bookingDate} </div>
                </div>
                <div className='form-wrapper'>
                  <label style={{ fontWeight: 'bold' }}>Appointment Time</label>
                  <div style={{ fontSize: '14px' }}> {bookingTime} </div>
                </div>
                <div className='form-wrapper'>
                  <label style={{ fontWeight: 'bold' }}>Customer Notes</label>
                  <div style={{ fontSize: '14px' }}> {bookingNotes} </div>
                </div>
              </>
            )}

            <ConfirmBtn
              cta={props.isHelpee ? 'Book Appointment' : 'Confirm Booking'}
              disable={!enableBtn}
              handleConfirm={handleConfirm}
            />
            {!props.isHelpee && (
              <ConfirmBtn
                cta='Chat to change booking'
                disable={!enableBtn}
                backgroundColor={'#f47174'}
                handleConfirm={handleChangeBooking}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};;

export default BookingConfirmPage;
