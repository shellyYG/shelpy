import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  workingCountryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
  timeZoneOptions,
  lifeSharingMainOptions,
  lifeSharingSubOptions,
  scoreOptions,
} from '../store/options/service-options';
import {
  getBookingDetails,
} from '../store/helpee/helpee-actions';

import {
  postPartnerScore,
  clearPostRatingStatus,
} from '../store/general/general-actions';

import DropDown from '../components/Dropdown';
import LongTextBox from '../components/LongTextBox';
import ConfirmBtn from '../components/ConfirmBtn';

const MySwal = withReactContent(Swal);

const RatePartnerPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [offerId, setOfferId] = useState('');
  const [price, setPrice] = useState('');
  const [NTDPrice, setNTDPrice] = useState('');
  const [bookingDate, setAppointmentDate] = useState('');
  const [bookingTime, setAppointmentTime] = useState('');
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState('');
  const [mainType, setMainType] = useState('');
  const [secondType, setSecondType] = useState('');
  const [thirdType, setThirdType] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [helperName, setHelperName] = useState('');
  const [translatedTimeZone, setTranslatedTimeZone] = useState('');
  const [helpeeId, setHelpeeId] = useState('');
  const [helperId, setHelperId] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [writerName, setWriterName] = useState('');
  const [score, setScore] = useState('default');
  const [commentsString, setCommentsString] = useState('');
  const [enableBtn, setEnableBtn] = useState(false);

  const refId = searchParams.get('refId');

  const scoreRef = useRef();
  const commentsRef = useRef();

  const {
    ratingNotificationStatus,
    ratingNotificationStatusTitle,
    ratingNotificationStatusMessage,
  } = useSelector((state) => state.general);

  const {
    booking,
  } = useSelector((state) => state.helpee);

  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getBookingDetails({ bookingId }));
  }, [bookingId, dispatch]);

  useEffect(()=>{
      if (booking && booking.length && booking[0])
        if (props.isHelpee) {
          setPartnerName(booking[0].helperUsername);
          setWriterName(booking[0].helpeeUsername);
        } else {
          setPartnerName(booking[0].helpeeUsername);
          setWriterName(booking[0].helperUsername);
        }
  },[booking, props.isHelpee])

  useEffect(() => {
    if (booking && booking.length && booking[0]) {
      const bookingToPay = booking[0];
      if (!bookingToPay) return;
      const {
        appointmentDate,
        appointmentTime,
        country,
        duration,
        mainType,
        price,
        offerId,
        secondType,
        thirdType,
        timeZone,
        helperUsername,
        helpeeId,
        helperId,
      } = bookingToPay;
      setAppointmentDate(appointmentDate);
      setAppointmentTime(appointmentTime);
      setCountry(country);
      setDuration(duration);
      setMainType(mainType);
      setSecondType(secondType);
      setThirdType(thirdType);
      setTimeZone(timeZone);
      setOfferId(offerId);
      setPrice(price);

      setHelperName(helperUsername);
      setHelpeeId(helpeeId);
      setHelperId(helperId);
    }
  }, [booking]);

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


  function onSubmit(e) {
    e.preventDefault();
    const data = {
      bookingId: parseInt(bookingId),
      writerRole: props.isHelpee ? 'helpee' : 'helper',
      ratedPartnerId: props.isHelpee ? parseInt(helperId) : parseInt(helpeeId),
      score: parseInt(score),
      comments: commentsString,
      writerId: props.isHelpee ? parseInt(helpeeId) : parseInt(helperId),
      writerUsername: writerName,
    };
    dispatch(postPartnerScore(data))
    setIsLoading(true);
  }

  function handleCommentsTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setCommentsString(typingInput);
  }

  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;

    const countryTranslationObj = workingCountryOptions.filter(
      (o) => o.value === country
    );
    if (countryTranslationObj && countryTranslationObj[0]) {
      setTranslatedCountry(t(countryTranslationObj[0].label));
    }
    const timeZoneObj = timeZoneOptions.filter((o) => o.value === timeZone);
    if (timeZoneObj && timeZoneObj[0])
      setTranslatedTimeZone(t(timeZoneObj[0].label));

    switch (mainType) {
      case 'university':
        setTitle(t('service_types_uni'));
        secondTypeTranslationObj = schoolOptions.filter(
          (o) => o.value === secondType
        );
        if (
          secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = departmentOptions[secondType].filter(
          (o) => o.value === thirdType
        );
        if (
          thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'job':
        setTitle(t('service_types_job'));
        secondTypeTranslationObj = industryOptions.filter(
          (o) => o.value === secondType
        );
        if (
          secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        if (jobOptions && jobOptions[secondType]) {
          thirdTypeTranslationObj = jobOptions[secondType].filter(
            (o) => o.value === thirdType
          );
        }
        if (
          thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'selfEmployed':
        setTitle(t('service_types_self_employed'));
        secondTypeTranslationObj = typeOptions.filter(
          (o) => o.value === secondType
        );
        if (
          secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = professionOptions.filter(
          (o) => o.value === thirdType
        );
        if (
          thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'life':
        setTitle(t('service_types_life'));
        secondTypeTranslationObj = lifeSharingMainOptions.filter(
          (o) => o.value === secondType
        );
        if (
          secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        if (lifeSharingSubOptions && lifeSharingSubOptions[secondType]) {
          thirdTypeTranslationObj = lifeSharingSubOptions[secondType].filter(
            (o) => o.value === thirdType
          );
        }
        if (
          thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      default:
        setTitle(t('service_types_job'));
    }
  }, [t, mainType, secondType, thirdType, country, timeZone]);

  useEffect(() => {
    if (ratingNotificationStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearPostRatingStatus());
        window.location.reload();
      }
      sweetAlertAndClearStatus(
        ratingNotificationStatusTitle,
        ratingNotificationStatusMessage
      );
      return;
    } else if (ratingNotificationStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        const path = props.isHelpee
          ? `/${currentLanguage}/helpee/bookings?refId=${refId}`
          : `/${currentLanguage}/helper/bookings?refId=${refId}`;
        navigate(path);
      }
      dispatch(clearPostRatingStatus());
      sweetAlertAndNavigate(
        ratingNotificationStatus,
        ratingNotificationStatusMessage
      );
    }
  }, [
    t,
    navigate,
    props.isHelpee,
    ratingNotificationStatus,
    ratingNotificationStatusTitle,
    ratingNotificationStatusMessage,
    dispatch,
    currentLanguage,
    refId,
  ]);
  
  useEffect(()=>{
    setEnableBtn(
      score !== 'default'
    );
  },[score])

  return (
    <div
      className='main-content-wrapper-homepage'
      style={{ backgroundImage: 'url(/static-imgs/helpee-home.jpeg)' }}
    >
      <div className='section-center-align-landing'>
        <div className='centerWrapper' style={{ flexDirection: 'column' }}>
          <div>
            <h2 style={{ textAlign: 'center' }}>
              {props.isHelpee && t('how_was_helper', { name: partnerName })}
              {!props.isHelpee && t('how_was_helpee', { name: partnerName })}
            </h2>
            <br />
            <h3 style={{ textAlign: 'center' }}>
              {props.isHelpee && `${t('helper_big')}: ${partnerName}`}
              {!props.isHelpee && `${t('helpee_big')}: ${partnerName}`}
              <br />
            </h3>
            <p style={{ textAlign: 'center' }}>
              {t('type')}: {title} | {translatedSecondType} |{' '}
              {translatedThirdType}
            </p>
            <p style={{ textAlign: 'center' }}>
              {t('service_start_time')}: {bookingDate} {bookingTime}
            </p>
            <p style={{ textAlign: 'center' }}>
              {t('timeZone')} : {translatedTimeZone}
            </p>
            <p style={{ textAlign: 'center' }}>
              {t('duration')}: {duration} {t('minutes')}
            </p>
          </div>
          <div
            style={{
              marginTop: '10px',
            }}
          >
            <div>
              <DropDown
                selected={score}
                handleSelect={setScore}
                title={t('score')}
                selectRef={scoreRef}
                options={scoreOptions}
                titleColor='black'
              />
              <div style={{ marginTop: '10px' }}>
                <LongTextBox
                  title={t('comments')}
                  placeholder={
                    props.isHelpee
                      ? t('comments_placeholder_helper')
                      : t('comments_placeholder_helpee')
                  }
                  inputRef={commentsRef}
                  onChange={handleCommentsTyping}
                  labelColor='black'
                />
              </div>

              <ConfirmBtn
                cta={t('confirm')}
                disable={!enableBtn}
                handleConfirm={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatePartnerPage;
