import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import {
  countryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
  nativeLanguageOptions,
  degreeOptions,
  WFHOptions,
  yearsOptions,
} from '../store/options/service-options';

function RequestCard(props) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedFourthType, setTranslatedFourthType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedSpeakingLanguages, setTranslatedSpeakingLanguages] =
    useState('');
  const [details, setDetails] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('');

  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;
    let fourthTypeTranslationObj;
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
        setDetails(t('degree')+': ');
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
        setDetails('Years of experience you have: ');
        break;
      default:
        setTitle(t('service_types_job'));
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
        setDetails('');
    }
  }, [t, props.mainType, props.secondType, props.thirdType, props.fourthType, props.country]);
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
  console.log('props.profilePicPath: ', props.profilePicPath);
  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {!props.isAnonymous && !!props.profilePicPath && (
            <img src={`/images/${props.profilePicPath}`} alt={'avatar'}></img>
          )}
          {(props.isAnonymous || !props.profilePicPath) && (
            <a
              href='https://www.vecteezy.com/free-vector/default-avatar'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src={`/images/assets/defaultAvatar.jpg`}
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
            <h3 style={{ fonrWeight: 'bold', fontSize: '16px', margin: '8px' }}>
              {props.helpeeName}
            </h3>
          </div>
        </div>
      </div>
      <div className='smallFlexColumn'>
        <div className='content'>
          <div className='contentBx'>
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
            {t('request_id')}: {props.id || t('na')}
          </p>
        </div>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            {details} {translatedFourthType}
          </p>
        </div>
        <p style={{ fontWeight: '12px', padding: '6px' }}>
          {t('speaks')}: {translatedSpeakingLanguages}
        </p>
      </div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
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
      <div className='statusWidth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>{filteredStatus}</p>
        </div>
      </div>
      <div className='btnWidth'></div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          {/* <button className='btn-red' onClick={handleDeleteRequest}>
            Delete Request
          </button> */}
        </div>
      </div>
    </div>
  );
}
export default RequestCard;
