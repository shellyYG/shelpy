import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropDown from '../components/Dropdown';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  industryOptions,
  jobOptions,
  countryOptions,
  WFHOptions,
  companySizeOptions,
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

const JobFormPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priceRef = useRef();
  const organizationRef = useRef();
  const industryRef = useRef();
  const jobRef = useRef();
  const countryRef = useRef();
  const WFHRef = useRef();
  const companySizeRef = useRef();
  const yearsRef = useRef();
  const notesRef = useRef();

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
  const [industry, setIndustry] = useState('default');
  const [job, setJob] = useState('default');
  const [country, setCountry] = useState('default');
  const [WFH, setWFH] = useState('default');
  const [companySize, setCompanySize] = useState('default');
  const [years, setYears] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);

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
        mainType: 'job', // university, selfEmployed
        secondType: industry,
        thirdType: job,
        fourthType: WFH,
        organization,
        timestamp: Date.now(),
        industry,
        job,
        country,
        WFH,
        companySize,
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
        mainType: 'job',
        secondType: industry,
        thirdType: job,
        fourthType: WFH,
        organization,
        timestamp: Date.now(),
        industry,
        job,
        country,
        WFH,
        companySize,
        years,
        notes: notes || '',
        step: 'request_submitted',
        status: 'Not Fulfilled',
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
      industry !== 'default' &&
        job !== 'default' &&
        country !== 'default' &&
        WFH !== 'default' &&
        companySize !== 'default' &&
        years !== 'default'
    );
  }, [industry, job, country, WFH, companySize, years]);
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        {props.isHelpee && 'What kind of job are you searching?'}
        {!props.isHelpee && 'What kind of job did you have?'}
      </h1>
      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <div className='form-row'>
                <DropDown
                  selected={industry}
                  handleSelect={setIndustry}
                  title={'Industry *'}
                  selectRef={industryRef}
                  options={industryOptions}
                />
                <DropDown
                  selected={job}
                  handleSelect={setJob}
                  title={'Job *'}
                  selectRef={jobRef}
                  options={jobOptions}
                />
              </div>
              <div className='form-row last'>
                <DropDown
                  selected={country}
                  handleSelect={setCountry}
                  title={'Working Country *'}
                  selectRef={countryRef}
                  options={countryOptions}
                />
                <DropDown
                  selected={WFH}
                  handleSelect={setWFH}
                  title={'Working from home? *'}
                  selectRef={WFHRef}
                  options={WFHOptions}
                />
              </div>
              <div className='form-row'>
                <DropDown
                  selected={companySize}
                  handleSelect={setCompanySize}
                  title={'Company Size *'}
                  selectRef={companySizeRef}
                  options={companySizeOptions}
                />
                {!props.isHelpee &&<DropDown
                  selected={years}
                  handleSelect={setYears}
                  title={'Year of Experience on that job *'}
                  selectRef={yearsRef}
                  options={yearsOptions}
                />}
                {props.isHelpee && <DropDown
                  selected={years}
                  handleSelect={setYears}
                  title={'Year of experiences you have on similar jobs *'}
                  selectRef={yearsRef}
                  options={yearsOptions}
                />}
              </div>
              {props.isHelpee && (
                <FullLineTextBox
                  title={
                    'What is your desired company (if more than one, you can seperate by comma)? *'
                  }
                  placeholder={'Google, Facebook'}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <FullLineTextBox
                  title={
                    'What companies you work fits this experience? (if more than one, you can seperate by comma) *'
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

export default JobFormPage;
