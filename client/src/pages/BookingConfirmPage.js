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
import { useTranslation } from 'react-i18next';
const MySwal = withReactContent(Swal);

const BookingConfirmPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meetDateRef = useRef();
  const meetTimeRef = useRef();
  const notesRef = useRef();

  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const userIdNumber = parseInt(userId.split('_')[1]);
  
  const partnerName = searchParams.get('partnerName');
  const requestId = searchParams.get('requestId');
  const offerId = searchParams.get('offerId');
  const price = parseInt(searchParams.get('price'));

  const helpeeId = parseInt(searchParams.get('helpeeId'));
  const helperId = parseInt(searchParams.get('helperId'));
  const helpeeUsername = searchParams.get('helpeeUsername');
  const helperUsername = searchParams.get('helperUsername');
  const country = searchParams.get('country');
  const mainType = searchParams.get('mainType');
  const secondType = searchParams.get('secondType');
  const thirdType = searchParams.get('thirdType');
  const fourthType = searchParams.get('fourthType');
  const bookingDate = searchParams.get('bookingDate');
  const bookingTime = searchParams.get('bookingTime');
  const bookingNotes = searchParams.get('bookingNotes');

  const {
    bookingStatus,
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
  const [meetDate, setMeetDate] = useState(today); // display will be 2021/11/12 though
  const [meetTime, setMeetTime] = useState('8am-9am');

  async function handleChangeBooking(e) {
    e.preventDefault();
    navigate(
      `/helper/chatroom?roomId=${roomId}&userId=helper_${userIdNumber}&partnerName=${partnerName}` +
        `&requestId=${requestId}&offerId=${offerId}&bookingStatus=${bookingStatus}&bookingId=${bookingId}` +
        `&helpeeId=${helpeeId}&helperId=${helperId}` +
        `&helpeeUsername=${helpeeUsername}&helperUsername=${helperUsername}` +
        `&country=${country}&mainType=${mainType}&secondType=${secondType}` +
        `&thirdType=${thirdType}&fourthType=${fourthType}`
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
        bookingStatus: 'created', // should NOT have bookingId here as inserted data
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
      dispatch(postBookingStatus(data));
    } else {
      const data = {
        requestId,
        offerId,
        bookingId,
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
      title: t('loading'),
      html: t('do_not_close_window'),
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
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
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
          title: <strong>{t(title)}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        const path = props.isHelpee ? '/helpee/dashboard' : '/helper/dashboard';
        navigate(path);
      }
      dispatch(clearBookingNotificationStatus());
      sweetAlertAndNavigate(bookingStatus, bookingNotificationStatusMessage);
    }
  }, [
    t,
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
        <div style={{ margin: '10px', textAlign: 'center' }}>
          {props.isHelpee && (
            <>
              <h3>
                {t(
                  'helpee_booking_confirm_the_order_is_only_confirmed_condition'
                )}
              </h3>
            </>
          )}
          {!props.isHelpee && (
            <>
              <h3>
                {t(
                  'helper_booking_confirm_the_order_is_only_confirmed_condition'
                )}
              </h3>
              <h3>{t('helper_dont_agree_with_time')} </h3>
              <h3>{t('helper_please_chat_with_helpee_to_change_time')}</h3>
            </>
          )}
        </div>
        <div className='form-inner'>
          <form action=''>
            {props.isHelpee && (
              <>
                <div className='form-row'>
                  <DateForm
                    title={`${t('appointment_date')} *`}
                    handleInput={handleDateInput}
                    value={meetDate}
                    dateFormRef={meetDateRef}
                  />
                  <DropDown
                    selected={meetTime}
                    handleSelect={setMeetTime}
                    title={`${t('appointment_time')} *`}
                    selectRef={meetTimeRef}
                    options={meetTimeOptions}
                    isTime={true}
                  />
                </div>
                <FullLineTextBox
                  title={t('notes')}
                  placeholder={t('leave_notes_to_helper')}
                  inputRef={notesRef}
                />
                <div className='form-row'>
                  {t('price_per_45_min', { price })}
                </div>
              </>
            )}

            {!props.isHelpee && (
              <>
                <div className='form-wrapper'>
                  <label style={{ fontWeight: 'bold' }}>
                    {t('appointment_date')} (YYYY-MM-DD)
                  </label>
                  <div style={{ fontSize: '14px' }}> {bookingDate} </div>
                </div>
                <div className='form-wrapper' style={{ marginTop: '15px' }}>
                  <label style={{ fontWeight: 'bold' }}>
                    {t('appointment_time')}
                  </label>
                  <div style={{ fontSize: '14px' }}> {bookingTime} </div>
                </div>
                <div className='form-wrapper' style={{ marginTop: '15px' }}>
                  <label style={{ fontWeight: 'bold' }}>{`${t('customer')}${t(
                    'notes'
                  )}`}</label>
                  <div style={{ fontSize: '14px' }}> {bookingNotes} </div>
                </div>
              </>
            )}
            <div style={{ marginTop: '20px' }}>
              <ConfirmBtn
                cta={
                  props.isHelpee ? t('book_appointment') : t('confirm_booking')
                }
                disable={!enableBtn}
                handleConfirm={handleConfirm}
              />
              {!props.isHelpee && (
                <ConfirmBtn
                  cta={t('chat_to_change_booking')}
                  disable={!enableBtn}
                  backgroundColor={'#f47174'}
                  handleConfirm={handleChangeBooking}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};;

export default BookingConfirmPage;
