import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropDown from '../components/Dropdown';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  countryOptions,
  typeOptions,
  professionOptions,
  yearsOptions,
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

const SelfEmployedPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priceRef = useRef();
  const organizationRef = useRef();
  const typeRef = useRef();
  const professionRef = useRef();
  const countryRef = useRef();
  const yearsRef = useRef();
  const notesRef = useRef();

  const [type, setType] = useState('default');
  const [profession, setProfession] = useState('default');
  const [country, setCountry] = useState('default');
  const [years, setYears] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const { requestStatus, requestStatusTitle, requestStatusMessage } =
    useSelector((state) => state.helpeeNotification);

  const { offerStatus, offerStatusTitle, offerStatusMessage } = useSelector(
    (state) => state.helperNotification
  );

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
      const data = {
        userId: props.helpeeUserId,
        mainType: 'selfEmployed',
        secondType: type,
        thirdType: profession,
        fourthType: years,
        organization,
        timestamp: Date.now(),
        selfEmployedType: type,
        profession,
        country,
        years,
        notes: notes || '',
        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
      };
      setIsLoading(true);
      dispatch(postHelpeeRequestForm(data));
    } else {
      // helper
      const data = {
        userId: props.helperUserId,
        price,
        mainType: 'selfEmployed',
        secondType: type,
        thirdType: profession,
        fourthType: years,
        organization,
        timestamp: Date.now(),
        selfEmployedType: type,
        profession,
        country,
        years,
        notes: notes || '',
        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
      };
      setIsLoading(true);
      dispatch(postHelperOfferForm(data));
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
    setEnableBtn(
      country !== 'default' &&
        type !== 'default' &&
        profession !== 'default' &&
        years !== 'default'
    );
  }, [type, profession, country, years]);
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        {props.isHelpee && 'What kind of experiences do you want to know?'}
        {!props.isHelpee && 'What experiences did you have?'}
      </h1>
      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <div className='form-row'>
                <DropDown
                  selected={type}
                  handleSelect={setType}
                  title={'Type *'}
                  selectRef={typeRef}
                  options={typeOptions}
                />
                <DropDown
                  selected={profession}
                  handleSelect={setProfession}
                  title={'Profession *'}
                  selectRef={professionRef}
                  options={professionOptions}
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

                {!props.isHelpee && (
                  <DropDown
                    selected={years}
                    handleSelect={setYears}
                    title={'Year of Experience on that profession *'}
                    selectRef={yearsRef}
                    options={yearsOptions}
                  />
                )}
                {props.isHelpee && (
                  <DropDown
                    selected={years}
                    handleSelect={setYears}
                    title={
                      'Year of experiences you have on similar profession *'
                    }
                    selectRef={yearsRef}
                    options={yearsOptions}
                  />
                )}
              </div>
              {props.isHelpee && (
                <FullLineTextBox
                  title={
                    'What is your goal to be self-employed (if more than one, you can seperate by comma)? *'
                  }
                  placeholder={'Financial freedom, become rich'}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <FullLineTextBox
                  title={
                    'What companies did you set up (if any)? (if more than one, you can seperate by comma) *'
                  }
                  placeholder={'Google, Facebook'}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <FullLineTextBox
                  title={'Price'}
                  placeholder={'(In Euro €)'}
                  inputRef={priceRef}
                />
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

export default SelfEmployedPage;
