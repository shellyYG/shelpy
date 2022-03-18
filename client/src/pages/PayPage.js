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
} from '../store/options/service-options';
import { clearPayHelperStatus, postPayViaTapPay } from '../store/helpee/helpee-actions';
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
  const offerId = searchParams.get('offerId');
  const price = searchParams.get('price');
  const duration = searchParams.get('duration');
  const country = searchParams.get('country');
  const mainType = searchParams.get('mainType');
  const secondType = searchParams.get('secondType');
  const thirdType = searchParams.get('thirdType');
  const bookingDate = searchParams.get('bookingDate');
  const bookingTime = searchParams.get('bookingTime');
  const helperName = searchParams.get('helperUsername');
  const helpeeId = searchParams.get('helpeeId');
  const helperId = searchParams.get('helperId');
  const refId = searchParams.get('refId');

  const cardNumberRef = useRef();

  const { payHelperStatus, payHelperStatusTitle, payHelperStatusMessage } =
    useSelector((state) => state.helpee);

  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [loading, setIsLoading] = useState(false);

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
      123621,
      'app_vsHw4uRU9DospZCvWWitSYtgfv5xovLG3xh6LWnqcOj2ATuXRx9ilNdcuj8P',
      'sandbox'
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
    console.log('onSubmit...');
    console.log('window.TPDirect: ', window.TPDirect);

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
        merchant_id: process.env.REACT_APP_TAPPAY_MERCHANT_ID,
        details: 'TapPay Test',
        helpeeId,
        helperId,
        bookingId,
        currentLanguage,
        offerId,
        appointmentDate: bookingDate,
        appointmentTime: bookingTime,
        amount: 100,
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789',
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
    setTranslatedCountry(t(countryTranslationObj[0].label));
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
  }, [t, mainType, secondType, thirdType, country]);

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
              {t('duration')}: {duration}
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
                inputRef={cardNumberRef}
                id='card-expiration-date'
              />
              <CreditCardTextBox
                title={`${t('CVV')} *`}
                placeholder={`${t('CVV')}`}
                labelColor='black'
                inputRef={cardNumberRef}
                id='card-ccv'
              />
              <button
                className='btn-contact'
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                {t('pay')} {price} {t('usd')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
