import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChatIcon from './Icons/ChatIcon';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import {
  workingCountryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  nativeLanguageOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
  lifeSharingMainOptions,
  lifeSharingSubOptions,
} from '../store/options/service-options';
import AvatarIcon from './Icons/AvatarIcon';

function PotentialCustomerCard(props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedSpeakingLanguages, setTranslatedSpeakingLanguages] =
    useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [shownIntroduction, setShownIntroduction] = useState('');
  const [shownSharingTopics, setShownSharingTopics] = useState('');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;
    const countryTranslationObj = workingCountryOptions.filter(
      (o) => o.value === props.country
    );
    if (countryTranslationObj && countryTranslationObj[0]) {
      setTranslatedCountry(t(countryTranslationObj[0].label));
    }
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
      case 'life':
        setTitle(t('service_types_life'));
        secondTypeTranslationObj = lifeSharingMainOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        if (lifeSharingSubOptions && lifeSharingSubOptions[props.secondType]) {
          thirdTypeTranslationObj = lifeSharingSubOptions[
            props.secondType
          ].filter((o) => o.value === props.thirdType);
        }
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
  }, [t, props.mainType, props.secondType, props.thirdType, props.country]);
  
  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/${currentLanguage}/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}-${props.offerId}` +
        `&userId=helper_${props.helperId}&partnerName=${props.partnerName}` +
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}&profilePicPath=${props.profilePicPath}&currentPartnerAnonymous=${props.helpeeAnonymous}`
    );
  }
  useEffect(() => {
    let translatedSpeakingLanguagesString = '';
    const speakingLanguages = props.languages ? props.languages.split(' ') : [];
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

  useEffect(() => {
    if (currentLanguage === 'en') {
      if (props.introductionEN) {
        setShownIntroduction(props.introductionEN);
      } else {
        setShownIntroduction(props.introduction);
      }
      if (props.sharingTopicEN) {
        setShownSharingTopics(props.sharingTopicEN);
      } else {
        setShownSharingTopics(props.notes);
      }
    } else {
      setShownIntroduction(props.introduction);
      setShownSharingTopics(props.notes);
    }
  }, [
    currentLanguage,
    props.introduction,
    props.introductionEN,
    props.sharingTopicEN,
    props.notes,
  ]);
  
  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        {!props.helpeeAnonymous && !!props.profilePicPath && (
          <div className='helper-ImgBx'>
            <img
              src={`/images/${props.profilePicPath}`}
              alt='profile'
            ></img>
          </div>
        )}
        {(!!props.helpeeAnonymous || !props.profilePicPath) && (
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
              {props.helpeeAnonymous ? props.partnerName[0] : props.partnerName}
            </h3>
            {!props.helpeeAnonymous && (
              <p style={{ fontSize: '14px' }}>
                {t('introduction')}: {shownIntroduction}
              </p>
            )}
            {!!props.helpeeAnonymous && (
              <p style={{ fontSize: '14px' }}>{t('ask_anonymous')}</p>
            )}
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
                {t('helpee_want_to_know')}
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
          <p style={{ fontSize: '14px', padding: '6px' }}>
            {t('speaks')}: {translatedSpeakingLanguages}
          </p>
        </div>
        <div className='contentBx'>
          <p style={{ fontSize: '14px', padding: '6px' }}>
            {t('helpee_organization')} : {props.organization || t('na')}
          </p>
        </div>
      </div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <ChatIcon
                onClick={handleChat}
                partnerName={props.helpeeAnonymous ? props.partnerName[0]:props.partnerName}
                isHelpee={false}
              />
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                {t('topics_you_want_to_know')}: {shownSharingTopics || t('na')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PotentialCustomerCard;
