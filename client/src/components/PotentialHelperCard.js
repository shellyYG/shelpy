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
  degreeOptions,
  WFHOptions,
  yearsOptions,
} from '../store/options/service-options';
import AvatarIcon from './Icons/AvatarIcon';
import RatingPopUp from '../pages/RatingPopUp';
import ScoreStars from './ScoreStars';

const average = (arr) =>
  arr.map((el) => el.score).reduce((a, b) => a + b, 0) / arr.length;


function PotentialHelperCard(props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');
  const [showRating, setShowRating] = useState(false);
    const [averageScore, setAverageScore] = useState(0);
  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedFourthType, setTranslatedFourthType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedSpeakingLanguages, setTranslatedSpeakingLanguages] =
    useState('');
  const [details, setDetails] = useState('');
  const [duration, setDuration] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [shownIntroduction, setShownIntroduction] = useState('');
  const [shownSharingTopics, setShownSharingTopics] = useState('');

  useEffect(() => {
    if (props.duration) {
      if (props.duration) setDuration(props.duration.split(' ')[0]);
    }
  }, [props.duration]);
  
  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;
    let fourthTypeTranslationObj;
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
        fourthTypeTranslationObj = degreeOptions.filter(
          (o) => o.value === props.fourthType
        );
        if (
          props.fourthType &&
          fourthTypeTranslationObj &&
          fourthTypeTranslationObj[0]
        ) {
          setTranslatedFourthType(t(fourthTypeTranslationObj[0].label));
        }
        setDetails(t('degree') + ': ');
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
        fourthTypeTranslationObj = WFHOptions.filter(
          (o) => o.value === props.fourthType
        );
        if (
          props.fourthType &&
          fourthTypeTranslationObj &&
          fourthTypeTranslationObj[0]
        ) {
          setTranslatedFourthType(t(fourthTypeTranslationObj[0].label));
        }
        setDetails(t('wfh_status') + ': ');
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
        fourthTypeTranslationObj = yearsOptions.filter(
          (o) => o.value === props.fourthType
        );
        if (
          props.fourthType &&
          fourthTypeTranslationObj &&
          fourthTypeTranslationObj[0]
        ) {
          setTranslatedFourthType(t(fourthTypeTranslationObj[0].label));
        }
        setDetails(t('years_of_experience_you_have') + ': ');
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
  }, [
    t,
    props.mainType,
    props.secondType,
    props.thirdType,
    props.fourthType,
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
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}&profilePicPath=${props.profilePicPath}`
    );
  }
  async function handleBookHelper(e) {
    e.preventDefault();
    navigate(
      `/${currentLanguage}/helpee/update-booking?requestId=${props.requestId}&partnerName=${props.partnerName}` +
        `&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
        `&bookingStatus=${props.bookingStatus}` + // do not have booking ID
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.partnerName}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}&profilePicPath=${props.profilePicPath}`
    );
  }
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);
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

    function handleShowRatings(e) {
      e.preventDefault();
      setShowRating(true);
    }
    function handleClosePopUp(e) {
      e.preventDefault();
      setShowRating(false);
    }
    useEffect(() => {
      setAverageScore(average(props.helperRatingData));
    }, [props.helperRatingData]);

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
      {showRating && (
        <RatingPopUp
          onClick={handleClosePopUp}
          averageScore={averageScore}
          ratingData={props.helperRatingData}
        />
      )}
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
            <div
              className='pureFlexRowMarginAuto'
              style={{ cursor: 'pointer' }}
              onClick={handleShowRatings}
            >
              <ScoreStars averageScore={averageScore} />
              <p style={{ marginLeft: '3px', fontSize: '12px' }}>
                {props.helperRatingData.length}
                {t('comments_unit')}
                {t('comments')}
              </p>
            </div>
            <p style={{ fontSize: '14px' }}>
              {t('introduction')}: {shownIntroduction}
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

      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <p style={{ fontSize: '14px', padding: '6px' }}>
            {t('speaks')}: {translatedSpeakingLanguages}
          </p>
          <p style={{ fontSize: '14px', padding: '6px' }}>
            {details} {translatedFourthType}
          </p>
          <p style={{ fontSize: '14px', padding: '6px' }}>
            {t('helper_organization')} : {props.organization || t('na')}
          </p>
          <p
            style={{
              fontSize: '14px',
              padding: '6px',
              color: '#f47174',
              fontWeight: 'bold',
            }}
          >
            {t('price_per_duration_min', { price: props.price, duration })}
          </p>
          <button className='btn-contact' onClick={handleBookHelper}>
            {t('book_name', { name: props.partnerName })}
          </button>
        </div>
      </div>

      {
        <div className='checkBoxWidth'>
          <ChatIcon
            onClick={handleChat}
            partnerName={props.partnerName}
            isHelpee={true}
          />
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            {t('sharing_topics')}: {shownSharingTopics || t('na')}
          </p>
        </div>
      }
    </div>
  );
}
export default PotentialHelperCard;
