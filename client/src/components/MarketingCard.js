import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import ChatIcon from './Icons/ChatIcon';
import {
  schoolOptions,
  industryOptions,
  typeOptions,
  countryOptions,
  departmentOptions,
  jobOptions,
  professionOptions,
  nativeLanguageOptions,
} from '../store/options/service-options';


const MySwal = withReactContent(Swal);

function MarketingCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedSpeakingLanguages, setTranslatedSpeakingLanguages] =
    useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  useEffect(() => {
    if (props.duration) {
      setDuration(props.duration.split(' ')[0]);
    }
  }, [props.duration]);

  useEffect(()=>{
    const matchedTranslation = schoolOptions.filter(
      (o) => o.value === props.secondType
    );
    if (props.secondType && matchedTranslation && matchedTranslation[0]) {
      setTranslatedSecondType(t(matchedTranslation[0].label));
    }
  },[props.secondType, t, translatedSecondType]);
  
  
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
        setTitle(t('na'));
    }
  }, [t, props.mainType, props.secondType, props.thirdType, props.country]);

  useEffect(()=>{
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
  },[t, props.languages])

  async function handleBookHelperMarketingClick(e) {
    e.preventDefault();
    if (!props.helpeeId) {
      await MySwal.fire({
        title: <strong>{t('oops')}</strong>,
        html: <p>{t('please_sign_in_firce')}</p>,
        icon: 'error',
      });
    } else {
      navigate(
        `/${currentLanguage}/helpee/update-booking?requestId=&partnerName=${props.username}` +
          `&userId=${props.helpeeId}&offerId=${props.id}&price=${props.price}&duration=${props.duration}` +
          `&bookingStatus=&bookingId=` +
          `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
          `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.username}` +
          `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
          `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}`
      );
    }
  }
  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/${currentLanguage}/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}` +
        `&userId=helpee_${props.helpeeId}&partnerName=${props.username}` +
        `&requestId=&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}&bookingStatus=&bookingId=` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&profilePicPath=${props.profilePicPath}` +
        `&refId=${refId}`
    );
  }

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {!props.isAnonymous && props.profilePicPath && (
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.username}
            ></img>
          )}
          {(props.isAnonymous || !props.profilePicPath) && (
            <a
              href='https://www.vecteezy.com/free-vector/default-avatar'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src={`/static-imgs/defaultAvatar.jpg`}
                alt={
                  'Default Avatar Vectors by Vecteezy:https://www.vecteezy.com/free-vector/default-avatar'
                }
              ></img>
            </a>
          )}
        </div>
      </div>
      <div className='smallWidth'>
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fonrWeight: 'bold', fontSize: '18px' }}>
              {props.username}
            </h3>
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
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            {t('offer_id')}: {props.id}
          </p>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            {t('helper_organization')}: {props.organization || t('na')}
          </p>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            {t('price_per_duration_min', { price: props.price, duration })}
          </p>
        </div>
      </div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            {t('speaks')}: {translatedSpeakingLanguages}
          </p>
          <p
            style={{
              fontWeight: '12px',
              padding: '6px',
              lineBreak: 'anywhere',
            }}
          >
            {t('introduction')}: {props.introduction || t('na')}
          </p>
          <p
            style={{
              fontWeight: '12px',
              padding: '6px',
              lineBreak: 'anywhere',
            }}
          >
            {t('notes')}: {props.notes || t('na')}
          </p>
        </div>
      </div>
      <div className='fullWidth'>
        <button className='btn-next' onClick={handleBookHelperMarketingClick}>
          {t('book_name', { name: props.username })}
        </button>
      </div>
      <div className='fullWidth'>
        <ChatIcon
          onClick={handleChat}
          partnerName={props.username}
          isHelpee={false}
        />
      </div>
    </div>
  );
}
export default MarketingCard;
