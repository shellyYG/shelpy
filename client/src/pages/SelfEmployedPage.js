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
import { useTranslation } from 'react-i18next';

const MySwal = withReactContent(Swal);

const SelfEmployedPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const priceRef = useRef();
  const organizationRef = useRef();
  const typeRef = useRef();
  const professionRef = useRef();
  const countryRef = useRef();
  const yearsRef = useRef();
  const notesRef = useRef();
  const durationRef = useRef();

  const [type, setType] = useState('default');
  const [profession, setProfession] = useState('default');
  const [country, setCountry] = useState('default');
  const [years, setYears] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  const [typingPrice, setTypingPrice] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState('default');

  const { requestStatus, requestStatusTitle, requestStatusMessage } =
    useSelector((state) => state.helpeeNotification);

  const { offerStatus, offerStatusTitle, offerStatusMessage } = useSelector(
    (state) => state.helperNotification
  );

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
        duration,
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
        let path = `/${currentLanguage}/helpee/items`;
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
        let path = `/${currentLanguage}/helper/items`;
        if (window.location.search) path += window.location.search;
        navigate(path, { replace: true });
      }
      dispatch(clearOfferStatus());
      sweetAlertAndNavigate(offerStatus, offerStatusMessage);
    }
  }, [
    t,
    currentLanguage, offerStatus,
    offerStatusTitle,
    offerStatusMessage,
    navigate,
    dispatch,
  ]);
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
    if (props.isHelpee) {
      setEnableBtn(
        country !== 'default' &&
          type !== 'default' &&
          profession !== 'default' &&
          years !== 'default'
      );
    } else {
      setEnableBtn(
        country !== 'default' &&
          type !== 'default' &&
          profession !== 'default' &&
          years !== 'default' &&
          duration !== 'default' &&
          typingPrice !== '' &&
          isInt(typingPrice)
      );
    }
    
  }, [props.isHelpee, type, profession, country, years, typingPrice, duration]);
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'row' }}
    >
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
                  options={countryOptions}
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
              {props.isHelpee && (
                <FullLineTextBox
                  title={t('self_employed_goal')}
                  placeholder={t('self_employed_goal_placeholder')}
                  inputRef={organizationRef}
                />
              )}
              {!props.isHelpee && (
                <FullLineTextBox
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

export default SelfEmployedPage;
