import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import DateForm from '../../components/DateForm';
import FullLineTextBox from '../../components/FullLineTextBox';
import ConfirmBtn from '../../components/ConfirmBtn';
import {
  meetTimeOptions,
} from '../../store/options/service-options';
import {
  clearRequestFormStatus,
  postHelpeeServiceRequestForm,
} from '../../store/helpee/helpee-actions';
const MySwal = withReactContent(Swal);

const BookingConfirmPage = (props) => {
  const dispatch = useDispatch();
  const { helpeeUserId } = useSelector((state) => state.helpee);
  const {
    requestFormStatus,
    requestFormStatusTitle,
    requestFormStatusMessage,
  } = useSelector((state) => state.helpeeNotification);
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('requestId');
  const price = searchParams.get('price');
  console.log(
    'requestId: ',
    requestId,
    'price: ',
    price,
    'helperUserId: ',
    props.helperUserId
  );
  const meetDateRef = useRef();
  const meetTimeRef = useRef();
  
  const notesRef = useRef();
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  async function handleConfirm(e) {
    e.preventDefault();
    // change DB & global state
    const meetTimeRange = meetTimeRef.current.value; // 8am-9am;
    const endMeetTime = meetTimeRange.split('-')[1]; // 9am;
    const timeAMPM =
      endMeetTime[endMeetTime.length - 2] + endMeetTime[endMeetTime.length - 1];
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
      helpeeUserId,
      
      meetDate: meetDateRef.current.value,
      meetTime: meetTimeRef.current.value,
      meetTimestamp: unixTime,
      
      notes: notesRef.current.value,
      step: 'booking_submitted',
      status: 'Not Fulfilled',
    };
    dispatch(postHelpeeServiceRequestForm(data));
    setIsLoading(true);
  }
  
  const [meetDate, setMeetDate] = useState('2021-11-12'); // display will be 2021/11/12 though
  const [meetTime, setMeetTime] = useState('8am-9am');
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
    if (requestFormStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'error',
        });
        dispatch(clearRequestFormStatus());
      }
      sweetAlertAndClearStatus(requestFormStatus, requestFormStatusMessage);
      return;
    } else if (requestFormStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
        let path = '/helpee/dashboard';
        navigate(path, { replace: true });
      }
      dispatch(clearRequestFormStatus());
      sweetAlertAndNavigate(requestFormStatus, requestFormStatusMessage);
    }
  }, [
    requestFormStatus,
    requestFormStatusTitle,
    requestFormStatusMessage,
    navigate,
    dispatch,
  ]);
  return (
    <div className='form-center-wrapper'>
      <div
        className='container'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ margin: '10px' }}>
          <h3>The order is only confirmed when helper accept it.</h3>
          <h3>We will refund you if the helper reject the order.</h3>
        </div>
        <div className='form-inner'>
          <form action=''>
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

            <ConfirmBtn
              cta='Book Appointment'
              disable={
                !meetDateRef.current.value ||
                !meetTimeRef.current.value
              }
              handleConfirm={handleConfirm}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmPage;
