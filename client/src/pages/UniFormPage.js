
import { useTranslation } from 'react-i18next';
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
  workingCountryOptions,
  degreeOptions,
  durationOptions,
} from '../store/options/service-options';
import HalfLineTextBox from '../components/HalfLineTextBox';

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
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priceRef = useRef();
  const organizationRef = useRef();
  const schoolRef = useRef();
  const departmentRef = useRef();
  const countryRef = useRef();
  const degreeRef = useRef();
  const notesRef = useRef();
  const sharingTopicENRef = useRef();
  const durationRef = useRef();

  const [typingPrice, setTypingPrice] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState('default');
  const [currentLanguage, setCurrentLanguage] = useState('');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);
  
  function isInt(value) {
    return (
      !isNaN(value) &&
      parseInt(Number(value)) == value && // can not use ===
      !isNaN(parseInt(value, 10))
    );
  }

  function handlePriceTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setTypingPrice(typingInput);
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
        sharingTopicEN,
        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
      };
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
        duration,
        notes: notes || '',
        sharingTopicEN,
        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
      };
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
    currentLanguage,
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
          duration !== 'default' &&
          isInt(typingPrice)
      );
    }
  }, [props.isHelpee, school, department, country, degree, typingPrice, duration]);
  useEffect(() => {
    if (school) {
      const departments = departmentOptions[school];
      setMatchedDepartments(departments);
    }
  }, [school]);

  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'row' }}
    >
      <div className='form-center-wrapper'>
        <div>
          <h1 style={{ textAlign: 'center', margin: '30px 0' }}>
            {props.isHelpee && t('helpee_uni_form_title')}
            {!props.isHelpee && t('helper_uni_form_title')}
          </h1>
        </div>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <div className='form-row'>
                <DropDown
                  selected={school}
                  handleSelect={setSchool}
                  title={t('uni_form_school')}
                  selectRef={schoolRef}
                  options={schoolOptions}
                />
                <DropDown
                  selected={department}
                  handleSelect={setDepartment}
                  title={t('uni_form_department')}
                  selectRef={departmentRef}
                  options={matchedDepartments}
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
                  selected={degree}
                  handleSelect={setDegree}
                  title={t('uni_form_degree')}
                  selectRef={degreeRef}
                  options={degreeOptions}
                />
              </div>
              {props.isHelpee && (
                <FullLineTextBox
                  title={t('helpee_uni_form_organization')}
                  placeholder={t('helpee_uni_form_organization_placeholder')}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <FullLineTextBox
                  title={t('helper_uni_form_organization')}
                  placeholder={t('helper_uni_form_organization_placeholder')}
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
                    title={
                      props.isHelpee
                        ? `${t('topics_you_want_to_know')}${' '}${t(
                            'if_more_than_one_cut_by_comma'
                          )}`
                        : `${t('sharing_topics')}${' '}${t(
                            'if_more_than_one_cut_by_comma'
                          )}`
                    }
                    placeholder={t('sharing_topics_placeholder_study')}
                    inputRef={notesRef}
                  />
                </>
              )}
              {currentLanguage !== 'en' && (
                <>
                  <FullLineTextBox
                    title={
                      props.isHelpee
                        ? `${t('topics_you_want_to_know')}${' '}${t(
                            'if_more_than_one_cut_by_comma'
                          )}`
                        : `${t('sharing_topics')}${' '}${t(
                            'if_more_than_one_cut_by_comma'
                          )}`
                    }
                    placeholder={t('sharing_topics_placeholder_study')}
                    inputRef={notesRef}
                  />
                  <FullLineTextBox
                    title={
                      props.isHelpee
                        ? `${t('topics_you_want_to_know_en')}${' '}${t(
                            'if_more_than_one_cut_by_comma_en'
                          )}`
                        : `${t('sharing_topics_en')}${' '}${t(
                            'if_more_than_one_cut_by_comma_en'
                          )}`
                    }
                    placeholder={t('sharing_topics_placeholder_study_en')}
                    inputRef={sharingTopicENRef}
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
    </div>
  );
};

export default UniFormPage;
