import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DropDown from '../components/Dropdown';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  workingCountryOptions,
  typeOptions,
  professionOptions,
  yearsOptions,
  durationOptions,
  anonymousAskOptions,
  anonymousAnswerOptions,
} from '../store/options/service-options';
import HalfLineTextBox from '../components/HalfLineTextBox';

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
import { useTranslation } from 'react-i18next';

const MySwal = withReactContent(Swal);

const SelfEmployedPage = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priceRef = useRef();
  const organizationRef = useRef();
  const typeRef = useRef();
  const professionRef = useRef();
  const countryRef = useRef();
  const yearsRef = useRef();
  const notesRef = useRef();
  const sharingTopicENRef = useRef();
  const durationRef = useRef();

  const [searchParams] = useSearchParams();
  const targetItemId = searchParams.get('targetItemId');

  const [showErrorSection, setShowErrorSection] = useState(false);
  const [mainType, setMainType] = useState('');
  const [type, setType] = useState('default');
  const [profession, setProfession] = useState('default');
  const [country, setCountry] = useState('default');
  const [years, setYears] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  const [typingPrice, setTypingPrice] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState('default');
  const [DBPrice, setDBPrice] = useState(0);
  const [organization, setOrganization] = useState('');
  const [sharingTopic, setSharingTopic] = useState('');
  const [sharingTopicEN, setSharingTopicEN] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState('default');

  const { requestStatus, requestStatusTitle, requestStatusMessage } =
    useSelector((state) => state.helpeeNotification);

  const { offerStatus, offerStatusTitle, offerStatusMessage } = useSelector(
    (state) => state.helperNotification
  );

  const { singleOffer } = useSelector((state) => state.helper);
  const { singleRequest } = useSelector((state) => state.helpee);

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
        sharingTopicEN,
        isAnonymous: isAnonymous === 'yes' ? true : false,
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
        duration,
        notes: notes || '',
        sharingTopicEN,
        isAnonymous: isAnonymous === 'yes' ? true : false,
        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
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

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

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
          country !== 'default' &&
            type !== 'default' &&
            profession !== 'default' &&
            years !== 'default' &&
            isAnonymous !== 'default'
        );
      } else {
        setEnableBtn(
          country !== 'default' &&
            type !== 'default' &&
            profession !== 'default' &&
            years !== 'default' &&
            duration !== 'default' &&
            typingPrice !== '' &&
            isInt(typingPrice) &&
            isAnonymous !== 'default'
        );
      }
    }
  }, [
    props.isEdited,
    props.isHelpee,
    type,
    profession,
    country,
    years,
    typingPrice,
    duration,
    isAnonymous,
  ]);

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
          setType(singleRequest[0].selfEmployedType);
          setProfession(singleRequest[0].profession);
          setYears(singleRequest[0].years);
          setOrganization(singleRequest[0].organization);
          setSharingTopic(singleRequest[0].notes);
          setSharingTopicEN(singleRequest[0].sharingTopicEN);
          if (singleRequest[0].isAnonymous) {
            setIsAnonymous('yes');
          } else {
            setIsAnonymous('no');
          }
        }
      } else {
        if (singleOffer && singleOffer[0]) {
          setMainType(singleOffer[0].mainType);
          setCountry(singleOffer[0].country);
          setType(singleOffer[0].selfEmployedType);
          setProfession(singleOffer[0].profession);
          setYears(singleOffer[0].years);
          setOrganization(singleOffer[0].organization);
          setDuration(singleOffer[0].duration);
          setDBPrice(singleOffer[0].price);
          setSharingTopic(singleOffer[0].notes);
          setSharingTopicEN(singleOffer[0].sharingTopicEN);
          if (singleOffer[0].isAnonymous) {
            setIsAnonymous('yes');
          } else {
            setIsAnonymous('no');
          }
        }
      }
    }
  }, [props.isHelpee, props.isEdited, singleOffer, singleRequest]);

  // when changing helper/helpee role, show error
  useEffect(() => {
    if (props.isEdited) {
      if (singleOffer.length === 0 && singleRequest.length === 0) {
        setShowErrorSection(true);
      } else if (mainType !== 'selfEmployed') {
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
              {props.isHelpee && t('helpee_self_employed_title')}
              {!props.isHelpee && t('helper_self_employed_title')}
            </h1>
          </div>
          <div className='container'>
            <div className='form-inner'>
              <form action=''>
                <div className='form-row'>
                  <DropDown
                    selected={type}
                    handleSelect={setType}
                    title={t('self_employed_type')}
                    selectRef={typeRef}
                    options={typeOptions}
                  />
                  <DropDown
                    selected={profession}
                    handleSelect={setProfession}
                    title={t('self_employed_profession')}
                    selectRef={professionRef}
                    options={professionOptions}
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

                  {!props.isHelpee && (
                    <DropDown
                      selected={years}
                      handleSelect={setYears}
                      title={t('self_employed_experience_years')}
                      selectRef={yearsRef}
                      options={yearsOptions}
                    />
                  )}
                  {props.isHelpee && (
                    <DropDown
                      selected={years}
                      handleSelect={setYears}
                      title={t('self_employed_experience_years')}
                      selectRef={yearsRef}
                      options={yearsOptions}
                    />
                  )}
                </div>
                <div className='form-row last'>
                  <DropDown
                    selected={isAnonymous}
                    handleSelect={setIsAnonymous}
                    title={
                      props.isHelpee
                        ? `${t('ask_anonymous')}`
                        : `${t('answer_anonymous')}`
                    }
                    details={t('ananymous_details')}
                    options={
                      props.isHelpee
                        ? anonymousAskOptions
                        : anonymousAnswerOptions
                    }
                  />
                </div>
                {props.isHelpee && (
                  <FullLineTextBox
                    defaultValue={organization || ''}
                    title={t('self_employed_goal')}
                    placeholder={t('self_employed_goal_placeholder')}
                    inputRef={organizationRef}
                  />
                )}
                {!props.isHelpee && (
                  <FullLineTextBox
                    defaultValue={organization || ''}
                    title={t('self_employed_organization')}
                    placeholder={t('self_employed_organization_placeholder')}
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
                      placeholder={t('sharing_topics_placeholder_selfEmployed')}
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
                      placeholder={t('sharing_topics_placeholder_selfEmployed')}
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
                      placeholder={t(
                        'sharing_topics_placeholder_selfEmployed_en'
                      )}
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

export default SelfEmployedPage;
