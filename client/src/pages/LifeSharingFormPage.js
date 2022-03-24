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
  lifeSharingMainOptions,
  lifeSharingSubOptions,
  workingCountryOptions,
  yearsOptions,
  durationOptions,
} from '../store/options/service-options';

import {
  clearRequestStatus,
  postHelpeeRequestForm,
} from '../store/helpee/helpee-actions';
import {
  clearOfferStatus,
  postHelperOfferForm,
} from '../store/helper/helper-actions';
import HalfLineTextBox from '../components/HalfLineTextBox';

const MySwal = withReactContent(Swal);

const LifeSharingFormPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const priceRef = useRef();
  const organizationRef = useRef();
  const lifeSharingMainTypeRef = useRef();
  const lifeSharingSubTypeRef = useRef();
  const countryRef = useRef();
  const yearsRef = useRef();
  const notesRef = useRef();
  const durationRef = useRef();

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
  const [lifeSharingMainType, setLifeSharingMainType] = useState('default');
  const [matchedSubTypes, setMatchedSubTypes] = useState([]);
  const [lifeSharingSubType, setLifeSharingSubType] = useState('default');
  const [country, setCountry] = useState('default');
  const [years, setYears] = useState('default');
  const [duration, setDuration] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  const [typingPrice, setTypingPrice] = useState('');

  useEffect(() => {
    if (lifeSharingMainType) {
      const lifeSharingSubTypes = lifeSharingSubOptions[lifeSharingMainType];
      setMatchedSubTypes(lifeSharingSubTypes);
    }
  }, [lifeSharingMainType]);

  function handlePriceTyping(e) {
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
        mainType: 'life', // university, selfEmployed
        secondType: lifeSharingMainType,
        thirdType: lifeSharingSubType,
        fourthType: years,
        organization,
        timestamp: Date.now(),
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
        mainType: 'life',
        secondType: lifeSharingMainType,
        thirdType: lifeSharingSubType,
        fourthType: years,
        organization,
        timestamp: Date.now(),
        country,
        years,
        duration,
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
    if (props.isHelpee) {
      setEnableBtn(
        lifeSharingMainType !== 'default' &&
          lifeSharingSubType !== 'default' &&
          country !== 'default' &&
          years !== 'default'
      );
    } else {
      setEnableBtn(
        lifeSharingMainType !== 'default' &&
          lifeSharingSubType !== 'default' &&
          country !== 'default' &&
          years !== 'default' &&
          duration !== 'default' &&
          typingPrice !== '' &&
          isInt(typingPrice)
      );
    }
  }, [
    props.isHelpee,
    lifeSharingMainType,
    lifeSharingSubType,
    country,
    years,
    typingPrice,
    duration,
  ]);
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'row' }}
    >
      <div className='form-center-wrapper'>
        <div>
          <h1 style={{ textAlign: 'center', margin: '30px 0' }}>
            {props.isHelpee && t('helpee_life_form_title')}
            {!props.isHelpee && t('helper_life_form_title')}
          </h1>
        </div>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <div className='form-row'>
                <DropDown
                  selected={lifeSharingMainType}
                  handleSelect={setLifeSharingMainType}
                  title={t('life_form_main_type')}
                  selectRef={lifeSharingMainTypeRef}
                  options={lifeSharingMainOptions}
                />
                <DropDown
                  selected={lifeSharingSubType}
                  handleSelect={setLifeSharingSubType}
                  title={t('life_form_sub_type')}
                  selectRef={lifeSharingSubTypeRef}
                  options={matchedSubTypes}
                />
              </div>
              <div className='form-row'>
                <DropDown
                  selected={country}
                  handleSelect={setCountry}
                  title={t('form_helper_country')}
                  selectRef={countryRef}
                  options={workingCountryOptions}
                />
                {!props.isHelpee && (
                  <DropDown
                    selected={years}
                    handleSelect={setYears}
                    title={t('life_form_experience_years')}
                    selectRef={yearsRef}
                    options={yearsOptions}
                  />
                )}
                {props.isHelpee && (
                  <DropDown
                    selected={years}
                    handleSelect={setYears}
                    title={t('life_form_experience_years')}
                    selectRef={yearsRef}
                    options={yearsOptions}
                  />
                )}
              </div>

              {props.isHelpee && (
                <FullLineTextBox
                  title={t('life_form_organization_helpee')}
                  placeholder={t('life_form_organization_placeholder')}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <FullLineTextBox
                  title={t('life_form_organization_helper')}
                  placeholder={t('life_form_organization_placeholder')}
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
                placeholder={t('life_form_topics_placeholder')}
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

export default LifeSharingFormPage;
