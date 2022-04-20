import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DropDown from '../components/Dropdown';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  industryOptions,
  jobOptions,
  workingCountryOptions,
  WFHOptions,
  companySizeOptions,
  yearsOptions,
  durationOptions,
} from '../store/options/service-options';

import {
  clearRequestStatus,
  getSingleRequest,
  postHelpeeRequestForm,
} from '../store/helpee/helpee-actions';
import {
  clearOfferStatus,
  getSingleOffer,
  postHelperOfferForm,
} from '../store/helper/helper-actions';
import HalfLineTextBox from '../components/HalfLineTextBox';

const MySwal = withReactContent(Swal);

const JobFormPage = (props) => {
  const { t, i18n } = useTranslation();
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
  const sharingTopicENRef = useRef();
  const durationRef = useRef();

  const [searchParams] = useSearchParams();
  const targetItemId = searchParams.get('targetItemId');

  const [showErrorSection, setShowErrorSection] = useState(false);
  const [mainType, setMainType] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [industry, setIndustry] = useState('default');
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [job, setJob] = useState('default');
  const [country, setCountry] = useState('default');
  const [WFH, setWFH] = useState('default');
  const [companySize, setCompanySize] = useState('default');
  const [years, setYears] = useState('default');
  const [duration, setDuration] = useState('default');
  const [DBPrice, setDBPrice] = useState(0);
  const [organization, setOrganization] = useState('');
  const [sharingTopic, setSharingTopic] = useState('');
  const [sharingTopicEN, setSharingTopicEN] = useState('');
  const [enableBtn, setEnableBtn] = useState(false);
  const [typingPrice, setTypingPrice] = useState('');

  const { singleOffer } = useSelector((state) => state.helper);
  const { singleRequest } = useSelector((state) => state.helpee);

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

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    if (industry) {
      const jobs = jobOptions[industry];
      setMatchedJobs(jobs);
    }
  }, [industry]);

  useEffect(() => {
    if (props.isHelpee) {
      dispatch(getSingleRequest({ requestId: targetItemId }));
    } else {
      dispatch(getSingleOffer({ offerId: targetItemId }));
    }
  }, [props.isHelpee, targetItemId, dispatch]);

  useEffect(() => {
    if (props.isEdited) {
      if (props.isHelpee) {
        if (singleRequest && singleRequest[0]) {
          setMainType(singleRequest[0].mainType);
          setCountry(singleRequest[0].country);
          setIndustry(singleRequest[0].industry);
          setJob(singleRequest[0].job);
          setWFH(singleRequest[0].WFH);
          setCompanySize(singleRequest[0].companySize);
          setYears(singleRequest[0].years);
          setOrganization(singleRequest[0].organization);
          setSharingTopic(singleRequest[0].notes);
          setSharingTopicEN(singleRequest[0].sharingTopicEN);
        }
      } else {
        if (singleOffer && singleOffer[0]) {
          setMainType(singleOffer[0].mainType);
          setCountry(singleOffer[0].country);
          setIndustry(singleOffer[0].industry);
          setJob(singleOffer[0].job);
          setWFH(singleOffer[0].WFH);
          setCompanySize(singleOffer[0].companySize);
          setYears(singleOffer[0].years);
          setOrganization(singleOffer[0].organization);
          setDuration(singleOffer[0].duration);
          setDBPrice(singleOffer[0].price);
          setSharingTopic(singleOffer[0].notes);
          setSharingTopicEN(singleOffer[0].sharingTopicEN);
        }
      }
    }
  }, [props.isHelpee, props.isEdited, singleOffer, singleRequest]);

  function handlePriceTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setTypingPrice(typingInput);
  }

  async function handleConfirm(e) {
    e.preventDefault();
    let notes;
    let sharingTopicEN;
    let price;
    let organization;
    if (currentLanguage === 'en') {
      if (notesRef && notesRef.current) {
        notes = notesRef.current.value;
        sharingTopicEN = notesRef.current.value;
      }
    } else {
      if (notesRef && notesRef.current) {
        notes = notesRef.current.value;
        if (sharingTopicENRef && sharingTopicENRef.current) {
          sharingTopicEN = sharingTopicENRef.current.value;
        }
      }
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
        sharingTopicEN,
        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
      };
      if (props.isEdited) {
        data.isEdited = true;
        data.itemId = targetItemId;
      }
      dispatch(postHelpeeRequestForm(data));
      setIsLoading(true);
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
        duration,
        notes: notes || '',
        sharingTopicEN,
        step: 'request_submitted',
        status: 'Not Fulfilled',
      };
      if (props.isEdited) {
        data.isEdited = true;
        data.itemId = targetItemId;
      }
      dispatch(postHelperOfferForm(data));
      setIsLoading(true);
    }
  }

  function handleToHomepage(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/home`;
    if (window.location.search) path += window.location.search;
    navigate(path);
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
        let path = `/${currentLanguage}/helpee/partners`;
        if (window.location.search) path += window.location.search;
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
    currentLanguage,
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
        let path = `/${currentLanguage}/helper/partners`;
        if (window.location.search) path += window.location.search;
        navigate(path, { replace: true });
      }
      dispatch(clearOfferStatus());
      sweetAlertAndNavigate(offerStatus, offerStatusMessage);
    }
  }, [
    t,
    currentLanguage,
    offerStatus,
    offerStatusTitle,
    offerStatusMessage,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    if (props.isEdited) {
      setEnableBtn(true);
    } else {
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
            duration !== 'default' &&
            typingPrice !== '' &&
            isInt(typingPrice)
        );
      }
    }
  }, [
    props.isEdited,
    props.isHelpee,
    industry,
    job,
    country,
    WFH,
    companySize,
    years,
    typingPrice,
    duration,
  ]);

  // when changing helper/helpee role, show error
  useEffect(() => {
    if (props.isEdited) {
      if (singleOffer.length === 0 && singleRequest.length === 0) {
        setShowErrorSection(true);
      } else if (mainType !== 'job') {
        setShowErrorSection(true);
      } else {
        setShowErrorSection(false);
      }
    }
  }, [props.isHelpee, props.isEdited, singleOffer, singleRequest, mainType]);

  return (
    <div
      className={
        showErrorSection ? 'section-left-align' : 'main-content-wrapper'
      }
      style={
        showErrorSection
          ? {}
          : { height: 500, backgroundImage: 'none', flexDirection: 'row' }
      }
    >
      {!!showErrorSection && (
        <div className='task-container'>
          <div
            className='history-card'
            style={{
              boxShadow: 'none',
              border: 'none',
              paddingLeft: '18px',
              display: 'flex',
            }}
          >
            <p style={{ margin: 'auto' }}>{t('no_item_found')}</p>
          </div>
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <div style={{ margin: 'auto' }}>
              <button className='btn-contact' onClick={handleToHomepage}>
                {t('back_to_home')}
              </button>
            </div>
          </div>
        </div>
      )}
      {!showErrorSection && (
        <div className='form-center-wrapper'>
          <div>
            <h1 style={{ textAlign: 'center', margin: '30px 0' }}>
              {props.isHelpee && t('helpee_job_form_title')}
              {!props.isHelpee && t('helper_job_form_title')}
            </h1>
          </div>
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
                    title={
                      props.isHelpee
                        ? t('form_country')
                        : t('form_helper_country')
                    }
                    selectRef={countryRef}
                    options={workingCountryOptions}
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
                    defaultValue={organization || ''}
                    title={t('job_form_desired_company')}
                    placeholder={t('job_form_desired_company_placeholder')}
                    inputRef={organizationRef}
                  />
                )}
                {!props.isHelpee && (
                  <FullLineTextBox
                    defaultValue={organization || ''}
                    title={t('job_form_worked_company')}
                    placeholder={t('job_form_desired_company_placeholder')}
                    inputRef={organizationRef}
                  />
                )}
                {!props.isHelpee && (
                  <div className='form-row'>
                    <DropDown
                      selected={duration}
                      handleSelect={setDuration}
                      title={t('form_duration')}
                      selectRef={durationRef}
                      options={durationOptions}
                    />
                    <HalfLineTextBox
                      title={t('form_price')}
                      defaultValue={DBPrice || ''}
                      placeholder={t('form_price_unit')}
                      inputRef={priceRef}
                      onChange={handlePriceTyping}
                      marginBottom='0px'
                      typingPrice={typingPrice}
                    />
                  </div>
                )}
                {currentLanguage === 'en' && (
                  <>
                    <FullLineTextBox
                      defaultValue={sharingTopic || ''}
                      title={
                        props.isHelpee
                          ? `${t('topics_you_want_to_know')}${' '}${t(
                              'if_more_than_one_cut_by_comma'
                            )}`
                          : `${t('sharing_topics')}${' '}${t(
                              'if_more_than_one_cut_by_comma'
                            )}`
                      }
                      placeholder={t('sharing_topics_placeholder_job')}
                      inputRef={notesRef}
                      marginTop='10px'
                    />
                  </>
                )}
                {currentLanguage !== 'en' && (
                  <>
                    <FullLineTextBox
                      defaultValue={sharingTopic || ''}
                      title={
                        props.isHelpee
                          ? `${t('topics_you_want_to_know')}${' '}${t(
                              'if_more_than_one_cut_by_comma'
                            )}`
                          : `${t('sharing_topics')}${' '}${t(
                              'if_more_than_one_cut_by_comma'
                            )}`
                      }
                      placeholder={t('sharing_topics_placeholder_job')}
                      inputRef={notesRef}
                      marginTop='10px'
                    />
                    <FullLineTextBox
                      defaultValue={sharingTopicEN || ''}
                      title={
                        props.isHelpee
                          ? `${t('topics_you_want_to_know_en')}${' '}${t(
                              'if_more_than_one_cut_by_comma_en'
                            )}`
                          : `${t('sharing_topics_en')}${' '}${t(
                              'if_more_than_one_cut_by_comma_en'
                            )}`
                      }
                      placeholder={t('sharing_topics_placeholder_job_en')}
                      inputRef={sharingTopicENRef}
                      marginTop='10px'
                    />
                  </>
                )}

                <ConfirmBtn
                  cta={t('confirm')}
                  disable={!enableBtn}
                  handleConfirm={handleConfirm}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFormPage;
