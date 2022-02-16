import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropDown from '../components/Dropdown';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  schoolOptions,
  departmentOptions,
  countryOptions,
  degreeOptions,
} from '../store/options/service-options';

import {
  clearRequestStatus,
  postHelpeeRequestForm,
} from '../store/helpee/helpee-actions';
import {
  clearOfferStatus,
  postHelperOfferForm,
} from '../store/helper/helper-actions';

const MySwal = withReactContent(Swal);

const UniFormPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const priceRef = useRef();
  const organizationRef = useRef();
  const schoolRef = useRef();
  const departmentRef = useRef();
  const countryRef = useRef();
  const degreeRef = useRef();
  const notesRef = useRef();
   const [typingPrice, setTypingPrice] = useState('');
  const [loading, setIsLoading] = useState(false);
  
  function isInt(value) {
    return (
      !isNaN(value) &&
      parseInt(Number(value)) === value &&
      !isNaN(parseInt(value, 10))
    );
  }

  function handlePriceTyping(e) {
    console.log('handlePriceTyping...');
    e.preventDefault();
    const typingInput = e.target.value;
    setTypingPrice(typingInput);
  }
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
  
  const [country, setCountry] = useState('default');
  const [school, setSchool] = useState('default');
  const [matchedDepartments, setMatchedDepartments] = useState([]);
  const [department, setDepartment] = useState('default');
  const [degree, setDegree] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);

  const { requestStatus, requestStatusTitle, requestStatusMessage } =
    useSelector((state) => state.helpeeNotification);

  const { offerStatus, offerStatusTitle, offerStatusMessage } = useSelector(
    (state) => state.helperNotification
  );

  async function handleConfirm(e) {
    e.preventDefault();
    
    let notes;
    let price;
    let organization;
    if (notesRef && notesRef.current) {
      notes = notesRef.current.value;
    }
    if (priceRef && priceRef.current) {
      price = priceRef.current.value;
    }
    if (organizationRef && organizationRef.current) {
      organization = organizationRef.current.value;
    }
    if (props.isHelpee) {
      console.log('isHelpee!');
      const data = {
        userId: props.helpeeUserId,
        mainType: 'university',
        secondType: school,
        thirdType: department,
        fourthType: degree,
        organization,
        timestamp: Date.now(),
        school,
        department,
        degree,
        country,
        notes: notes || '',
        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
      };
      console.log('data to post to postHelpeeRequestForm: ', data);
      dispatch(postHelpeeRequestForm(data));
      setIsLoading(true);
    } else { // helper
      const data = {
        userId: props.helperUserId,
        price,
        mainType: 'university',
        secondType: school,
        thirdType: department,
        fourthType: degree,
        organization,
        timestamp: Date.now(),
        school,
        department,
        degree,
        country,
        notes: notes || '',
        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
      };
      console.log('data: ', data)
      dispatch(postHelperOfferForm(data));
      setIsLoading(true);
    }
  }

  // Is Helpee:
  useEffect(() => {
    if (requestStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'error',
        });
        dispatch(clearRequestStatus());
      }
      sweetAlertAndClearStatus(requestStatus, requestStatusMessage);
      return;
    } else if (requestStatus === 'success') {
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
      dispatch(clearRequestStatus());
      sweetAlertAndNavigate(requestStatus, requestStatusMessage);
    }
  }, [
    requestStatus,
    requestStatusTitle,
    requestStatusMessage,
    navigate,
    dispatch,
  ]);
  // Is Helper:
  useEffect(() => {
    if (offerStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'error',
        });
        dispatch(clearOfferStatus());
      }
      sweetAlertAndClearStatus(offerStatus, offerStatusMessage);
      return;
    } else if (offerStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
        let path = '/helper/dashboard';
        navigate(path, { replace: true });
      }
      dispatch(clearOfferStatus());
      sweetAlertAndNavigate(offerStatus, offerStatusMessage);
    }
  }, [offerStatus, offerStatusTitle, offerStatusMessage, navigate, dispatch]);

  useEffect(() => {
    if (props.isHelpee) {
      setEnableBtn(
        country !== 'default' &&
          school !== 'default' &&
          department !== 'default' &&
          degree !== 'default'
      );
    } else {
      setEnableBtn(
        country !== 'default' &&
          school !== 'default' &&
          department !== 'default' &&
          degree !== 'default' &&
          typingPrice !== '' &&
          isInt(typingPrice)
      );
    }
  }, [props.isHelpee, school, department, country, degree, typingPrice]);
  useEffect(() => {
    if (school) {
      const departments = departmentOptions[school];
      console.log('departments: ', departments);
      setMatchedDepartments(departments);
    }
  }, [school]);

  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        {props.isHelpee && 'What do you want to study?'}
        {!props.isHelpee && 'What did you study?'}
      </h1>
      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <div className='form-row'>
                <DropDown
                  selected={school}
                  handleSelect={setSchool}
                  title={'School *'}
                  selectRef={schoolRef}
                  options={schoolOptions}
                />
                <DropDown
                  selected={department}
                  handleSelect={setDepartment}
                  title={'Department *'}
                  selectRef={departmentRef}
                  options={matchedDepartments}
                />
              </div>
              <div className='form-row last'>
                <DropDown
                  selected={country}
                  handleSelect={setCountry}
                  title={'Country *'}
                  selectRef={countryRef}
                  options={countryOptions}
                />
                <DropDown
                  selected={degree}
                  handleSelect={setDegree}
                  title={'Degree *'}
                  selectRef={degreeRef}
                  options={degreeOptions}
                />
              </div>
              {props.isHelpee && (
                <FullLineTextBox
                  title={
                    'What is your desired university (if more than one, you can seperate by comma)? *'
                  }
                  placeholder={
                    'London Business School, WHU Otto Beisheim School of Management'
                  }
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <FullLineTextBox
                  title={'What universities did you study the degree? *'}
                  placeholder={'London Business School'}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <>
                  <FullLineTextBox
                    title={'Price (per 30 minutes)'}
                    placeholder={'(In Euro €)'}
                    inputRef={priceRef}
                    onChange={handlePriceTyping}
                    marginBottom='0px'
                  />
                  {!isInt(typingPrice) && (
                    <p style={{ color: 'red' }}>
                      Price need to be an integer e.g. 20 is allowed. 20.1 is
                      not allowed
                    </p>
                  )}
                </>
              )}
              <FullLineTextBox
                title={'Notes'}
                placeholder={'Leave any additional details'}
                inputRef={notesRef}
              />
              <ConfirmBtn
                cta='Confirm'
                disable={!enableBtn}
                handleConfirm={handleConfirm}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniFormPage;
