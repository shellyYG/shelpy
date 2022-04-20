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
  lifeSharingMainOptions,
  lifeSharingSubOptions,
  workingCountryOptions,
  yearsOptions,
  durationOptions,
} from '../store/options/service-options';

import {
  clearRequestStatus,
  getHelpeeUserData,
  getSingleRequest,
  postHelpeeRequestForm,
} from '../store/helpee/helpee-actions';
import {
  clearOfferStatus,
  getHelperUserData,
  getSingleOffer,
  postHelperOfferForm,
} from '../store/helper/helper-actions';
import HalfLineTextBox from '../components/HalfLineTextBox';

const MySwal = withReactContent(Swal);

const LifeSharingFormPage = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priceRef = useRef();
  const organizationRef = useRef();
  const lifeSharingMainTypeRef = useRef();
  const lifeSharingSubTypeRef = useRef();
  const countryRef = useRef();
  const yearsRef = useRef();
  const notesRef = useRef();
  const sharingTopicENRef = useRef();
  const durationRef = useRef();

  const [searchParams] = useSearchParams();
  const targetItemId = searchParams.get('targetItemId');

  const [loading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');

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

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

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
  const [showErrorSection, setShowErrorSection] = useState(false);
  const [mainType, setMainType] = useState('');
  const [lifeSharingMainType, setLifeSharingMainType] = useState('default');
  const [matchedSubTypes, setMatchedSubTypes] = useState([]);
  const [lifeSharingSubType, setLifeSharingSubType] = useState('default');
  const [country, setCountry] = useState('default');
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
        mainType: 'life', // university, selfEmployed
        secondType: lifeSharingMainType,
        thirdType: lifeSharingSubType,
        fourthType: years,
        organization,
        timestamp: Date.now(),
        country,
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
    }
  }, [
    props.isEdited,
    props.isHelpee,
    lifeSharingMainType,
    lifeSharingSubType,
    country,
    years,
    typingPrice,
    duration,
  ]);

  useEffect(() => {
    if (props.isHelpee) {
      dispatch(getSingleRequest({ requestId: targetItemId }));
      dispatch(getHelpeeUserData({ helpeeUserId: props.helpeeUserId }));
    } else {
      dispatch(getSingleOffer({ offerId: targetItemId }));
      dispatch(getHelperUserData({ helperUserId: props.helperUserId }));
    }
  }, [
    props.helpeeUserId,
    props.helperUserId,
    props.isHelpee,
    targetItemId,
    dispatch,
  ]);

  useEffect(() => {
    if (props.isEdited) {
      if (props.isHelpee) {
        if (singleRequest && singleRequest[0]) {
          setMainType(singleRequest[0].mainType);
          setCountry(singleRequest[0].country);
          setLifeSharingMainType(singleRequest[0].secondType);
          setLifeSharingSubType(singleRequest[0].thirdType);
          setYears(singleRequest[0].years);
          setOrganization(singleRequest[0].organization);
          setSharingTopic(singleRequest[0].notes);
          setSharingTopicEN(singleRequest[0].sharingTopicEN);
        }
      } else {
        if (singleOffer && singleOffer[0]) {
          setMainType(singleOffer[0].mainType);
          setCountry(singleOffer[0].country);
          setLifeSharingMainType(singleOffer[0].secondType);
          setLifeSharingSubType(singleOffer[0].thirdType);
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

  // when changing helper/helpee role, show error
  useEffect(() => {
    if (props.isEdited) {
      if (singleOffer.length === 0 && singleRequest.length === 0) {
        setShowErrorSection(true);
      } else if (mainType !== 'life') {
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
                    defaultValue={organization || ''}
                    title={t('life_form_organization_helpee')}
                    placeholder={t('life_form_organization_placeholder')}
                    inputRef={organizationRef}
                  />
                )}
                {!props.isHelpee && (
                  <FullLineTextBox
                    defaultValue={organization || ''}
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
                      defaultValue={DBPrice || ''}
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
                      placeholder={t('life_form_topics_placeholder')}
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
                      placeholder={t('life_form_topics_placeholder')}
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
                      placeholder={t('life_form_topics_placeholder_en')}
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

export default LifeSharingFormPage;
