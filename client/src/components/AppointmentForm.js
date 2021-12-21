import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-date-picker';
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
  languageOptions,
} from '../store/options/options';
import { postHelpeeServiceRequestForm } from '../store/helpee/helpee-actions'
const MySwal = withReactContent(Swal);

const AppointmentForm = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
const { DBHelpeeName, DBHelpeeLanguage, DBServiceType } = useSelector(
  (state) => state.helpee
);
const serviceRef = useRef();
const genderRef = useRef();
const meetDateRef = useRef();
const meetTimeRef = useRef();
const meetCountryRef = useRef();
const meetCityRef = useRef();
const phoneRef = useRef();
const motherTongueRef = useRef();
const firstLangRef = useRef();
const secondLangRef = useRef();
const notesRef = useRef();
const dataHandoverCheckedRef = useRef();

const navigate = useNavigate();
  async function handleConfirm(e) {
    e.preventDefault();
    const userId = 0; // placeholder
    // change DB & global state
    console.log("serviceRef: ", serviceRef.current.value);
    const data = {
      userId,
      service: serviceRef.current.value,
      gender: genderRef.current.value,
      meetDate: meetDateRef.current.value,
      meetTime: meetTimeRef.current.value,
      meetCountry: meetCountryRef.current.value,
      meetCity: meetCityRef.current.value,
      phone: phoneRef.current.value,
      motherTongue: motherTongueRef.current.value,
      firstLang: firstLangRef.current.value,
      secondLang: secondLangRef.current.value,
      notes: notesRef.current.value,
      dataHandoverChecked: dataHandoverCheckedRef.current.checked,
    };
    try {
      dispatch(postHelpeeServiceRequestForm(data));
    } catch (err) {
      console.error(err);
    }
    await MySwal.fire({
      title: <strong>Thank you!</strong>,
      imageUrl:
        "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80 876w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80 1176w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80 1476w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80 1752w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80 1776w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80 2076w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80 2352w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2376&q=80 2376w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2676&q=80 2676w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80 2952w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2976&q=80 2976w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3276&q=80 3276w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3552&q=80 3552w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3576&q=80 3576w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3876&q=80 3876w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4152&q=80 4152w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4176&q=80 4176w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4476&q=80 4476w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4752&q=80 4752w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4776&q=80 4776w, https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4928&q=80 4928w",
      imageWidth: 442,
      imageHeight: 293,
      html: <p>We will find you a helper / friend as soon as possible!</p>,
      icon: "success",
    });
    let path = "/"; // HERE: change to user appointment list section. (appointment, status)
    navigate(path);
  }
  const [service, setService] = useState(
    'Visum'
  );
  const [gender, setGender] = useState('Male'); // 一般 dropdown 不用另外寫 handleInput or handleSelect function() 有內建
  const [meetDate, setMeetDate] = useState('2021-11-12'); // display will be 2021/11/12 though
  const [meetTime, setMeetTime] = useState('8am-9am');
  const [meetCountry, setMeetCountry] = useState('germany');
  const [meetCity, setMeetCity] = useState('berlin');
  const [phone, setPhone] = useState('');
  const [motherTongue, setMotherTongue] = useState('chinese');
  const [firstLang, setFirstLang] = useState('english');
  const [secondLang, setSecondLang] = useState('german');
  const [note, setNote] = useState('');
  const [dataHandoverChecked, setDataHandoverChecked] = useState(false);
  const handleDateInput = (e) => {
    e.preventDefault();
    setMeetDate(e.target.value);
  };
  
  console.log(
    service,
    gender,
    meetDate,
    meetTime,
    meetCountry,
    meetCity,
    motherTongue,
    firstLang,
    secondLang,
    dataHandoverChecked
  );
  return (
    <div className="form-inner">
      <form action="">
        <div className="form-title">
          <h3 style={{ margin: "10 !important" }}>
            Find a Helper who speaks your language for your {DBServiceType}{" "}
          </h3>
        </div>
        <div className="form-row">
          <DropDown
            selected={service}
            handleSelect={setService}
            title={"Service"}
            selectRef={serviceRef}
            options={serviceOptions}
          />
          <DropDown
            selected={gender}
            handleSelect={setGender}
            title={"Gender"}
            selectRef={genderRef}
            options={genderOptions}
          />
        </div>
        <div className="form-row">
          <DateForm
            title={"Appointment Date *"}
            handleInput={handleDateInput}
            value={meetDate}
            dateFormRef={meetDateRef}
          />
          <DropDown
            selected={meetTime}
            handleSelect={setMeetTime}
            title={"Appointment Time*"}
            selectRef={meetTimeRef}
            options={meetTimeOptions}
          />
        </div>
        <div className="form-row last">
          <DropDown
            selected={meetCountry}
            handleSelect={setMeetCountry}
            title={"Appointment Country*"}
            selectRef={meetCountryRef}
            options={meetCountryOptions}
          />
          <DropDown
            selected={meetCity}
            handleSelect={setMeetCity}
            title={"Appointment City*"}
            selectRef={meetCityRef}
            options={meetCityOptions}
          />
        </div>
        <FullLineTextBox
          title={"Appointment Address*"}
          placeholder={
            "Bezirksamt Friedrichshain Frankfurter Allee 35/37, 10247 Berlin"
          }
        />
        <div className="form-row last">
          <div className="form-wrapper">
            <label for="">Phone *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              ref={phoneRef}
            />
          </div>
          <DropDown
            selected={motherTongue}
            handleSelect={setMotherTongue}
            title={"Native Language*"}
            selectRef={motherTongueRef}
            options={languageOptions}
          />
        </div>
        <div className="form-row last">
          <DropDown
            selected={firstLang}
            handleSelect={setFirstLang}
            title={"Your Best Foreign Language*"}
            selectRef={firstLangRef}
            options={languageOptions}
          />
          <DropDown
            selected={secondLang}
            handleSelect={setSecondLang}
            title={"Other language that you speak? *"}
            selectRef={secondLangRef}
            options={languageOptions}
          />
        </div>
        <FullLineTextBox
          title={"Notes"}
          placeholder={
            "If your language is not listed, please specify here. Any other comments is also welcome."
          }
          inputRef={notesRef}
        />
        <CheckBox
          checked={dataHandoverChecked}
          handleCheck={setDataHandoverChecked}
          details="By clicking
            Book Appointment, you consent to send your personal information to
            Shelpy."
          checkRef={dataHandoverCheckedRef}
        />
        <ConfirmBtn cta="Book Appointment" handleConfirm={handleConfirm} />
      </form>
    </div>
  );
}

export default AppointmentForm;
