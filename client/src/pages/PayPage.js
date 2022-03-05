import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import CreditCardTextBox from '../components/CreditCardTextBox';
import {
  countryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
} from '../store/options/service-options';

const PayPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const price = searchParams.get('price');
  const duration = searchParams.get('duration');
  const country = searchParams.get('country');
  const mainType = searchParams.get('mainType');
  const secondType = searchParams.get('secondType');
  const thirdType = searchParams.get('thirdType');
  const bookingDate = searchParams.get('bookingDate');
  const bookingTime = searchParams.get('bookingTime');
  const helperName = searchParams.get('helperUsername');

  const cardNumberRef = useRef();

  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');

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
        'font-size': '16px'
      },
      // Styling expiration-date field
      'input.expiration-date': {
        'font-size': '16px'
      },
      // Styling card-number field
      'input.card-number': {
        'font-size': '16px'
      },
      // style focus state
      ':focus': {
        'color': 'black'
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

  function onSubmit(e) {
    e.preventDefault();
    console.log('onSubmit...');
    console.log('window.TPDirect: ', window.TPDirect);

    // 取得 TapPay Fields 的 status
    const tappayStatus = window.TPDirect.card.getTappayFieldsStatus();
    console.log('tappayStatus: ', tappayStatus);

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
      alert('get prime 成功，prime: ' + result.card.prime);

      // send prime to your server, to pay with Pay by Prime API .
      // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    });
  }

  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;
    const countryTranslationObj = countryOptions.filter(
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
                {t('pay')} {price}€
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
