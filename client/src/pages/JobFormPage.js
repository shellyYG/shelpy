import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
  function isInt(value) {
    return (
      !isNaN(value) &&
      parseInt(Number(value)) == value && // can not use ===
      !isNaN(parseInt(value, 10))
    );
  }

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
  const [industry, setIndustry] = useState('default');
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [job, setJob] = useState('default');
  const [country, setCountry] = useState('default');
  const [WFH, setWFH] = useState('default');
  const [companySize, setCompanySize] = useState('default');
  const [years, setYears] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  const [typingPrice, setTypingPrice] = useState('');

  useEffect(() => {
    if (industry) {
      const jobs = jobOptions[industry];
      console.log('jobs: ', jobs);
      setMatchedJobs(jobs);
    }
  }, [industry]);

  function handlePriceTyping(e) {
    console.log('handlePriceTyping...');
    e.preventDefault();
    const typingInput = e.target.value;
    setTypingPrice(typingInput);
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
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
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
          title: <strong>{t(title)}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        let path = '/helpee/dashboard';
        navigate(path, { replace: true });
      }
      dispatch(clearRequestStatus());
      sweetAlertAndNavigate(requestStatus, requestStatusMessage);
    }
  }, [
    t,
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
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
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
          title: <strong>{t(title)}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        let path = '/helper/dashboard';
        navigate(path, { replace: true });
      }
      dispatch(clearOfferStatus());
      sweetAlertAndNavigate(offerStatus, offerStatusMessage);
    }
  }, [t, offerStatus, offerStatusTitle, offerStatusMessage, navigate, dispatch]);

  useEffect(() => {
    if (props.isHelpee) {
      setEnableBtn(
        industry !== 'default' &&
          job !== 'default' &&
          country !== 'default' &&
          WFH !== 'default' &&
          companySize !== 'default' &&
          years !== 'default'
      );
    } else {
      setEnableBtn(
        industry !== 'default' &&
          job !== 'default' &&
          country !== 'default' &&
          WFH !== 'default' &&
          companySize !== 'default' &&
          years !== 'default' &&
          typingPrice !== '' &&
          isInt(typingPrice)
      );
    }
    
  }, [props.isHelpee, industry, job, country, WFH, companySize, years, typingPrice]);
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        {props.isHelpee && t('helpee_job_form_title')}
        {!props.isHelpee && t('helper_job_form_title')}
      </h1>
      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <div className='form-row'>
                <DropDown
                  selected={industry}
                  handleSelect={setIndustry}
                  title={t('job_form_industry')}
                  selectRef={industryRef}
                  options={industryOptions}
                />
                <DropDown
                  selected={job}
                  handleSelect={setJob}
                  title={t('job_form_job')}
                  selectRef={jobRef}
                  options={matchedJobs}
                />
              </div>
              <div className='form-row last'>
                <DropDown
                  selected={country}
                  handleSelect={setCountry}
                  title={t('form_country')}
                  selectRef={countryRef}
                  options={countryOptions}
                />
                <DropDown
                  selected={WFH}
                  handleSelect={setWFH}
                  title={t('job_form_wfh')}
                  selectRef={WFHRef}
                  options={WFHOptions}
                />
              </div>
              <div className='form-row'>
                <DropDown
                  selected={companySize}
                  handleSelect={setCompanySize}
                  title={t('job_form_company_size')}
                  selectRef={companySizeRef}
                  options={companySizeOptions}
                />
                {!props.isHelpee && (
                  <DropDown
                    selected={years}
                    handleSelect={setYears}
                    title={t('job_form_experience_years')}
                    selectRef={yearsRef}
                    options={yearsOptions}
                  />
                )}
                {props.isHelpee && (
                  <DropDown
                    selected={years}
                    handleSelect={setYears}
                    title={t('job_form_experience_years')}
                    selectRef={yearsRef}
                    options={yearsOptions}
                  />
                )}
              </div>
              {props.isHelpee && (
                <FullLineTextBox
                  title={t('job_form_desired_company')}
                  placeholder={t('job_form_desired_company_placeholder')}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <FullLineTextBox
                  title={t('job_form_worked_company')}
                  placeholder={t('job_form_desired_company_placeholder')}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <>
                  <FullLineTextBox
                    title={t('form_price')}
                    placeholder={t('form_price_unit')}
                    inputRef={priceRef}
                    onChange={handlePriceTyping}
                    marginBottom='0px'
                  />
                  {!isInt(typingPrice) && (
                    <p style={{ color: 'red' }}>{t('form_price_warning')}</p>
                  )}
                </>
              )}
              <FullLineTextBox
                title={t('notes')}
                placeholder={t('notes_placeholder')}
                inputRef={notesRef}
                marginTop='10px'
              />

              <ConfirmBtn
                cta={t('confirm')}
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
