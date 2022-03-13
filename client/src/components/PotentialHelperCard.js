import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChatIcon from './Icons/ChatIcon';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import {
  countryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  nativeLanguageOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
} from '../store/options/service-options';
import AvatarIcon from './Icons/AvatarIcon';

function PotentialHelperCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedSpeakingLanguages, setTranslatedSpeakingLanguages] =
    useState('');
  const [duration, setDuration] = useState('');
  useEffect(() => {
    if (props.duration) {
      setDuration(props.duration.split(' ')[0]);
    }
  }, [props.duration]);
  
  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;
    const countryTranslationObj = countryOptions.filter(
      (o) => o.value === props.country
    );
    setTranslatedCountry(t(countryTranslationObj[0].label));
    switch (props.mainType) {
      case 'university':
        setTitle(t('service_types_uni'));
        secondTypeTranslationObj = schoolOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = departmentOptions[props.secondType].filter(
          (o) => o.value === props.thirdType
        );
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'job':
        setTitle(t('service_types_job'));
        secondTypeTranslationObj = industryOptions.filter(
          (o) => o.value === props.secondType
        );
        console.log('secondTypeTranslationObj: ', secondTypeTranslationObj);
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        if (jobOptions && jobOptions[props.secondType]) {
          thirdTypeTranslationObj = jobOptions[props.secondType].filter(
            (o) => o.value === props.thirdType
          );
        }
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'selfEmployed':
        setTitle(t('service_types_self_employed'));
        secondTypeTranslationObj = typeOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = professionOptions.filter(
          (o) => o.value === props.thirdType
        );
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      default:
        setTitle(t('service_types_job'));
    }
  }, [
    t,
    props.mainType,
    props.secondType,
    props.thirdType,
    props.country,
  ]);

  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/${currentLanguage}/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}` +
        `&userId=helpee_${props.helpeeId}&partnerName=${props.partnerName}` +
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}`
    );
  }
  async function handleBookHelper(e) {
    e.preventDefault();
    navigate(
      `/${currentLanguage}/helpee/update-booking?requestId=${props.requestId}&partnerName=${props.partnerName}` +
        `&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.partnerName}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}`
    );
  }
  useEffect(() => {
    let translatedSpeakingLanguagesString = '';
    const speakingLanguages = props.languages.split(' ');
    speakingLanguages.forEach((speakingLanguage) => {
      const speakingLanguageTranslationObj = nativeLanguageOptions.filter(
        (o) => o.value === speakingLanguage
      );
      if (speakingLanguageTranslationObj && speakingLanguageTranslationObj[0]) {
        translatedSpeakingLanguagesString =
          translatedSpeakingLanguagesString.concat(
            t(speakingLanguageTranslationObj[0].label) + ' '
          );
      }
    });
    setTranslatedSpeakingLanguages(translatedSpeakingLanguagesString);
  }, [t, props.languages]);

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        {!props.helperAnonymous && props.profilePicPath && (
          <div className='helper-ImgBx'>
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
          </div>
        )}
        {(!!props.helperAnonymous || !props.profilePicPath) && (
          <div className='defaultAvatar-ImgBx'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <AvatarIcon />
            </div>
          </div>
        )}
      </div>
      <div className='nameWidth'>
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fonrWeight: 'bold', fontSize: '18px' }}>
              {props.partnerName}
            </h3>
            <p style={{ fontSize: '14px' }}>
              {t('introduction')}: {props.introduction}
            </p>
          </div>
        </div>
      </div>
      <div className='smallFlexColumn'>
        <div className='content'>
          <div className='contentBx'>
            <div className='pureFlexRow'>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginBottom: '10px',
                }}
              >
                {t('helper_offers')}
              </p>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='orange' />
              </div>
              <div className='textDateTime'>{title}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
              </div>
              <div className='textDateTime'>{translatedSecondType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
              </div>
              <div className='textDateTime'>{translatedThirdType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <EarthIcon color='#95a0ff' />
              </div>
              <div className='textDateTime'>{translatedCountry}</div>
            </div>
          </div>
        </div>
      </div>

      {!props.bookingStatus && (
        <div className='checkBoxWidth'>
          <div className='contentBx'>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('speaks')}: {translatedSpeakingLanguages}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('helper_organization')} : {props.organization || t('na')}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('price_per_duration_min', { price: props.price, duration })}
            </p>
            <button className='btn-contact' onClick={handleBookHelper}>
              {t('book_name', { name: props.partnerName })}
            </button>
          </div>
        </div>
      )}
      {props.bookingStatus && (
        <div className='checkBoxWidth'>
          <div className='contentBx'>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('speaks')}: {translatedSpeakingLanguages}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('helper_organization')} : {props.organization || t('na')}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('price_per_duration_min', { price: props.price, duration })}
            </p>
            <p style={{ fontSize: '14px', padding: '6px' }}>
              {t('in_booking_process_with_name', { name: props.partnerName })}
            </p>
          </div>
        </div>
      )}

      {
        <div className='checkBoxWidth'>
          <ChatIcon
            onClick={handleChat}
            partnerName={props.partnerName}
            isHelpee={true}
          />
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            {t('offers')} {t('notes')}: {props.notes}
          </p>
        </div>
      }
    </div>
  );
}
export default PotentialHelperCard;
