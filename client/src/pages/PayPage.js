import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import FullLineTextBox from '../components/FullLineTextBox';
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
              <FullLineTextBox
                title={`${t('card_number')} *`}
                placeholder={'0000 0000 0000 0000'}
                labelColor='black'
                inputRef={cardNumberRef}
              />
              <FullLineTextBox
                title={`${t('expiration_date')} *`}
                placeholder={'MM/YY'}
                labelColor='black'
                inputRef={cardNumberRef}
              />
              <FullLineTextBox
                title={`${t('CVV')} *`}
                placeholder={`${t('CVV')}`}
                labelColor='black'
                inputRef={cardNumberRef}
              />
              <button className='btn-contact' style={{ width: '100%' }}>
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
