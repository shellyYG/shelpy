import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import {
  workingCountryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
  nativeLanguageOptions,
} from '../store/options/service-options';
import AvatarIcon from './Icons/AvatarIcon';
import { useDispatch, useSelector } from 'react-redux';
import TrashIcon from './Icons/TrashIcon';
import { clearDeleteOfferStatus, deleteHelperOffer } from '../store/helper/helper-actions';

const MySwal = withReactContent(Swal);

function OfferCard(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedSpeakingLanguages, setTranslatedSpeakingLanguages] =
    useState('');
  const [details, setDetails] = useState('');

  const {
    deleteOfferStatus,
    deleteOfferStatusTitle,
    deleteOfferStatusMessage,
  } = useSelector((state) => state.helper);

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

  useEffect(() => {
    if (props.duration) {
      setDuration(props.duration.split(' ')[0])
    }
  },[props.duration])
  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;
    const countryTranslationObj = workingCountryOptions.filter(
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
        setDetails(t('years_of_experience_you_have'));
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
        setDetails('');
    }
  }, [
    t,
    props.mainType,
    props.secondType,
    props.thirdType,
    props.country,
  ]);
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

  function handleDeleteOffer(e) {
    e.preventDefault(e);
    const data = {
      offerId: props.offerId,
    };
    console.log('data to dispatch: ', data);
    dispatch(deleteHelperOffer(data));
    setIsLoading(true);
  }
  useEffect(() => {
    if (deleteOfferStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearDeleteOfferStatus());
      }
      sweetAlertAndClearStatus(deleteOfferStatus, deleteOfferStatusMessage);
      return;
    } else if (deleteOfferStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        window.location.reload();
      }
      dispatch(clearDeleteOfferStatus());
      sweetAlertAndNavigate(deleteOfferStatus, deleteOfferStatusMessage);
      
    }
  }, [
    t,
    deleteOfferStatus,
    deleteOfferStatusTitle,
    deleteOfferStatusMessage,
    dispatch,
  ]);

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        {!props.isAnonymous && props.profilePicPath && (
          <div className='helper-ImgBx'>
            <img src={`/images/${props.profilePicPath}`} alt={'visa'}></img>
          </div>
        )}
        {(props.isAnonymous || !props.profilePicPath) && (
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
              {props.helperName}
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
                {t('your_offer_is')}
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
            {t('offer_id')}: {props.offerId}
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
          <p style={{ fontSize: '14px', padding: '6px' }}>
            {t('speaks')}: {translatedSpeakingLanguages}
          </p>
        </div>
      </div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <p
            style={{
              fontSize: '14px',
              padding: '6px',
            }}
          >
            {t('sharing_topics')}: {props.notes || t('na')}
          </p>
        </div>
      </div>
      <TrashIcon onClick={handleDeleteOffer} />
    </div>
  );
}
export default OfferCard;
