import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import  DropDown  from './Dropdown';
import CheckBox from './CheckBox';
import DateForm from './DateForm';
import FullLineTextBox from './FullLineTextBox';
import ConfirmBtn from './ConfirmBtn';
import {
  serviceOptions,
  genderOptions,
  meetCountryOptions,
  meetCityOptions,
  meetTimeOptions,
  nativeLanguageOptions,
  languageOptions,
  doYouSpeakEnglishOptions,
} from '../store/options/service-options';
import { clearRequestFormStatus, postHelpeeServiceRequestForm } from '../store/helpee/helpee-actions'
const MySwal = withReactContent(Swal);

const AppointmentForm = (props) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.helpee);
const { requestFormStatus, requestFormStatusTitle, requestFormStatusMessage } =
  useSelector((state) => state.notification);
const { globalServiceType } = useSelector((state) => state.helpee);
const serviceRef = useRef();
const genderRef = useRef();
const meetDateRef = useRef();
const meetTimeRef = useRef();
const meetCountryRef = useRef();
const meetCityRef = useRef();
const phoneRef = useRef();
const meetAddressRef = useRef();
const motherTongueRef = useRef();
const speakEnglishRef = useRef();
const otherLangRef = useRef();
const notesRef = useRef();
const [loading, setIsLoading] = useState(false);

const navigate = useNavigate();
  async function handleConfirm(e) {
    e.preventDefault();
    // change DB & global state
    const meetTimeRange = meetTimeRef.current.value; // 8am-9am;
    const endMeetTime = meetTimeRange.split('-')[1]; // 9am;
    const timeAMPM = endMeetTime[endMeetTime.length - 2] + endMeetTime[endMeetTime.length-1];
    let timeHour;
    if (timeAMPM === 'am') {
      timeHour = parseInt(endMeetTime.length > 3 ? endMeetTime[0] + endMeetTime[1]: endMeetTime[0]);
    } else {
      timeHour = parseInt(endMeetTime.length > 3 ? endMeetTime[0] + endMeetTime[1]: endMeetTime[0]) + 12;
    }
    if (meetCountryRef.current.value === 'germany') {
      timeHour = timeHour - 1;
    }
    const dates = meetDateRef.current.value.split('-');
    const [year, month, day] = dates;
    const unixTime = Date.UTC(parseInt(year), parseInt(month)-1 , parseInt(day), timeHour);
    const data = {
      userId,
      service: serviceRef.current.value,
      gender: genderRef.current.value,
      meetDate: meetDateRef.current.value,
      meetTime: meetTimeRef.current.value,
      meetTimestamp: unixTime,
      meetCountry: meetCountryRef.current.value,
      meetCity: meetCityRef.current.value,
      meetAddress: meetAddressRef.current.value,
      phone: phoneRef.current.value,
      motherTongue: motherTongueRef.current.value,
      speakEnglish: speakEnglishRef.current.value,
      otherLanguage: otherLangRef.current.value,
      notes: notesRef.current.value,
      step: 'request_submitted',
      status: 'Not Fulfilled',
    };
    dispatch(postHelpeeServiceRequestForm(data));
    setIsLoading(true);
  }
  const [service, setService] = useState(globalServiceType);
  const [gender, setGender] = useState('Male'); // 一般 dropdown 不用另外寫 handleInput or handleSelect function() 有內建
  const [meetDate, setMeetDate] = useState('2021-11-12'); // display will be 2021/11/12 though
  const [meetTime, setMeetTime] = useState('8am-9am');
  const [meetCountry, setMeetCountry] = useState('germany');
  const [meetCity, setMeetCity] = useState('berlin');
  const [motherTongue, setMotherTongue] = useState('chinese');
  const [speakEnglish, setSpeakEnglish] = useState('default yes');
  const [otherLang, setOtherLang] = useState('german');
  const [hasGiveConsent, setHasGiveConsent] = useState(false);
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
        let path = '/helpee/order-history';
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
    <div className='form-inner'>
      <form action=''>
        <div className='form-row'>
          <DropDown
            selected={service}
            handleSelect={setService}
            title={'Service *'}
            selectRef={serviceRef}
            options={serviceOptions}
          />
          <DropDown
            selected={gender}
            handleSelect={setGender}
            title={'Your Gender'}
            selectRef={genderRef}
            options={genderOptions}
          />
        </div>
        <div className='form-row last'>
          <DropDown
            selected={meetCountry}
            handleSelect={setMeetCountry}
            title={'Appointment Country *'}
            selectRef={meetCountryRef}
            options={meetCountryOptions}
          />
          <DropDown
            selected={meetCity}
            handleSelect={setMeetCity}
            title={'Appointment City *'}
            selectRef={meetCityRef}
            options={meetCityOptions}
          />
        </div>
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
          title={'Appointment Address *'}
          placeholder={
            'Bezirksamt Friedrichshain Frankfurter Allee 35/37, 10247 Berlin'
          }
          inputRef={meetAddressRef}
        />
        <div className='form-row last'>
          <div className='form-wrapper'>
            <label for=''>Your Phone Number *</label>
            <input
              type='text'
              className='form-control'
              placeholder='Phone'
              ref={phoneRef}
            />
          </div>
          <DropDown
            selected={motherTongue}
            handleSelect={setMotherTongue}
            title={'Your Native Language *'}
            selectRef={motherTongueRef}
            options={nativeLanguageOptions}
          />
        </div>
        <div className='form-row last'>
          <DropDown
            selected={speakEnglish}
            handleSelect={setSpeakEnglish}
            title={'Do you speak English? *'}
            selectRef={speakEnglishRef}
            options={doYouSpeakEnglishOptions}
          />
          <DropDown
            selected={otherLang}
            handleSelect={setOtherLang}
            title={'Other language that you speak?'}
            selectRef={otherLangRef}
            options={languageOptions}
          />
        </div>
        <FullLineTextBox
          title={'Notes'}
          placeholder={
            'If your language is not listed, please specify here. Any other comments is also welcome.'
          }
          inputRef={notesRef}
        />
        <CheckBox
          checked={hasGiveConsent}
          handleCheck={setHasGiveConsent}
          details='You agree to send above personal information to
            Shelpy so that we can best match a Helper for you.'
        />

        <ConfirmBtn
          cta='Book Appointment'
          disable={
            !hasGiveConsent ||
            !serviceRef.current.value ||
            !genderRef.current.value ||
            !meetDateRef.current.value ||
            !meetTimeRef.current.value ||
            !meetCountryRef.current.value ||
            !meetCityRef.current.value ||
            !meetAddressRef.current.value ||
            !phoneRef.current.value ||
            !motherTongueRef.current.value ||
            !speakEnglishRef.current.value
          }
          handleConfirm={handleConfirm}
        />
      </form>
    </div>
  );
}

export default AppointmentForm;
