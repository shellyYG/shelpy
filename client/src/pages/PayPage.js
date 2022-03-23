import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CreditCardTextBox from '../components/CreditCardTextBox';
import {
  workingCountryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
  timeZoneOptions,
} from '../store/options/service-options';
import {
  clearPayHelperStatus,
  postPayViaTapPay,
  getBookingDetails,
} from '../store/helpee/helpee-actions';

const isDeveloping = 0; // TODO before push to ec2
const environment = isDeveloping ? 'sandbox' : 'production';
const merchantId = isDeveloping
  ? process.env.REACT_APP_TAPPAY_MERCHANT_ID_SANDBOX
  : process.env.REACT_APP_TAPPAY_MERCHANT_ID_PRODUCTION;

const usdToNtd = 29;

const MySwal = withReactContent(Swal);

const PayPage = () => {
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
  
  const refId = searchParams.get('refId');

  const cardNumberRef = useRef();
  const cardExpireDateRef = useRef();
  const cardCVVRef = useRef();

  const {
    payHelperStatus,
    payHelperStatusTitle,
    payHelperStatusMessage,
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
      setNTDPrice(price * usdToNtd);
      setHelperName(helperUsername);
      setHelpeeId(helpeeId);
      setHelperId(helperId);
    }
  },[booking])

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

  // prevent css re-render
  useEffect(()=>{
    window.TPDirect.setupSDK(
      parseInt(process.env.REACT_APP_APP_ID),
      process.env.REACT_APP_APP_KEY,
      environment
    );
    let fields = {
      number: {
        // css selector
        element: '#card-number',
        placeholder: '**** **** **** ****',
      },
      expirationDate: {
        // DOM object
        element: document.getElementById('card-expiration-date'),
        placeholder: 'MM / YY',
      },
      ccv: {
        element: '#card-ccv',
        placeholder: 'ccv',
      },
    };
    window.TPDirect.card.setup({
      fields,
      styles: {
        // Style all elements
        input: {
          color: 'gray',
        },
        // Styling ccv field
        'input.ccv': {
          'font-size': '16px',
        },
        // Styling expiration-date field
        'input.expiration-date': {
          'font-size': '16px',
        },
        // Styling card-number field
        'input.card-number': {
          'font-size': '16px',
        },
        'input.card-holder-name': {
          'font-size': '16px',
        },
        // style focus state
        ':focus': {
          color: 'black',
        },
        // style valid state
        '.valid': {
          color: 'green',
        },
        // style invalid state
        '.invalid': {
          color: 'red',
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
          input: {
            color: 'orange',
          },
        },
      },
    });
  },[])

  function onSubmit(e) {
    e.preventDefault();

    // 取得 TapPay Fields 的 status
    const tappayStatus = window.TPDirect.card.getTappayFieldsStatus();

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert('can not get prime');
      return;
    }

    // Get prime
    window.TPDirect.card.getPrime((result) => {
      if (result && result.status !== 0) {
        alert('get prime error ' + result.msg);
        return;
      }
      setIsLoading(true);

      // send prime to your server, to pay with Pay by Prime API .
      // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
      
      const data = {
        prime: result.card.prime,
        partner_key: process.env.REACT_APP_TAPPAY_PARTNER_KEY,
        merchant_id: merchantId,
        details: 'TapPay Test',
        helpeeId,
        helperId,
        bookingId,
        currentLanguage,
        offerId,
        appointmentDate: bookingDate,
        appointmentTime: bookingTime,
        amount: parseInt(NTDPrice),
        cardholder: {
          phone_number: '',
          name: '',
          email: '',
          zip_code: '',
          address: '',
          national_id: '',
        },
        remember: true,
      };
      dispatch(postPayViaTapPay(data));
    });
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
    const timeZoneObj = timeZoneOptions.filter(
      (o) => o.value === timeZone
    );
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
      default:
        setTitle(t('service_types_job'));
    }
  }, [t, mainType, secondType, thirdType, country, timeZone]);

  useEffect(() => {
    if (payHelperStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearPayHelperStatus());
      }
      sweetAlertAndClearStatus(payHelperStatusTitle, payHelperStatusMessage);
      return;
    } else if (payHelperStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        navigate(`/${currentLanguage}/helpee/bookings?refId=${refId}`);
      }
      dispatch(clearPayHelperStatus());
      sweetAlertAndNavigate(payHelperStatus, payHelperStatusMessage);
    }
  }, [
    t,
    navigate,
    payHelperStatus,
    payHelperStatusTitle,
    payHelperStatusMessage,
    dispatch,
    currentLanguage,
    refId,
  ]);

  return (
    <div
      className='main-content-wrapper-homepage'
      style={{ backgroundImage: 'url(/static-imgs/helpee-home.jpeg)' }}
    >
      <div className='section-center-align-landing'>
        <div className='centerWrapper' style={{ flexDirection: 'column' }}>
          <div>
            <h2 style={{ textAlign: 'center' }}>{t('payment')}</h2>
            <p style={{ marginTop: '5px', textAlign: 'center' }}>
              {t('booking_id')}: {bookingId}
            </p>
            <br />
            <h3 style={{ textAlign: 'center' }}>
              {t('helper')}: {helperName} <br />
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
              <CreditCardTextBox
                title={`${t('card_number')} *`}
                placeholder={'0000 0000 0000 0000'}
                labelColor='black'
                inputRef={cardNumberRef}
                id='card-number'
              />
              <CreditCardTextBox
                title={`${t('expiration_date')} *`}
                placeholder={'MM/YY'}
                labelColor='black'
                inputRef={cardExpireDateRef}
                id='card-expiration-date'
              />
              <CreditCardTextBox
                title={`${t('CVV')} *`}
                placeholder={`${t('CVV')}`}
                labelColor='black'
                inputRef={cardCVVRef}
                id='card-ccv'
              />
              <button
                className='btn-contact'
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                {t('pay')} {price} {t('usd')} <br/>
                ({NTDPrice}{' '}
                {t('ntd')})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
