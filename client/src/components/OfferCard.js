import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import EditIcon from '../components/Icons/EditIcon';
import {
  workingCountryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
  nativeLanguageOptions,
  lifeSharingMainOptions,
  lifeSharingSubOptions,
  degreeOptions,
  WFHOptions,
  yearsOptions,
} from '../store/options/service-options';
import AvatarIcon from './Icons/AvatarIcon';
import { useDispatch, useSelector } from 'react-redux';
import TrashIcon from './Icons/TrashIcon';
import { clearDeleteOfferStatus, deleteHelperOffer } from '../store/helper/helper-actions';
import SignUpPopUp from '../pages/SignUpPopUp';
import { clickOnBookHelper, clickOnToHomePage } from '../service/fbPixelsHelper';

const MySwal = withReactContent(Swal);

function OfferCard(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const [loading, setIsLoading] = useState(false);
  const [showSignUpPopUp, setShowSignUpPopUp] =  useState(false);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedFourthType, setTranslatedFourthType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  const [translatedSpeakingLanguages, setTranslatedSpeakingLanguages] =
    useState('');
  const [details, setDetails] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [shownIntroduction, setShownIntroduction] = useState('');
  const [shownSharingTopics, setShownSharingTopics] = useState('');
  const [shownHelperName, setShownHelperName] = useState('')

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

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
    let fourthTypeTranslationObj;
    const countryTranslationObj = workingCountryOptions.filter(
      (o) => o.value === props.country
    );
    if (countryTranslationObj && countryTranslationObj[0]){
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
        setDetails(t('years_of_experience_you_have') + ': ' );
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
    props.fourthType,
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
    dispatch(deleteHelperOffer(data));
    setIsLoading(true);
  }
  function handleToHomepage(e) {
    e.preventDefault();
    clickOnToHomePage(props.helperUserId, props.offerId);
    let path = `/${currentLanguage}/home`;
    if (window.location.search) path += window.location.search;
    navigate(path);
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

  function handleClosePopUp(e) {
    e.preventDefault();
    setShowSignUpPopUp(false);
  }

  async function handleBookHelperMarketingClick(e) {
    e.preventDefault();
    clickOnBookHelper(props.helperUserId, props.offerId);
    if ((props.isSingleOfferPage || props.isPersonalOfferPage) && !props.isHelpeeAuthenticated) {
      // sign up helpee here
      setShowSignUpPopUp(!showSignUpPopUp);
    } else {
      // allow to book
      if (!props.helpeeId) {
        await MySwal.fire({
          title: <strong>{t('oops')}</strong>,
          html: <p>{t('please_sign_in_first')}</p>,
          icon: 'error',
        });
      } else {
        navigate(
          `/${currentLanguage}/helpee/update-booking?requestId=&partnerName=${props.helpeeName}` +
            `&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}&duration=${props.duration}` +
            `&bookingStatus=&bookingId=` +
            `&helpeeId=${props.helpeeId}&helperId=${props.helperUserId}` +
            `&helpeeUsername=${props.helpeeName}&helperUsername=${props.helperName}` +
            `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
            `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&refId=${refId}`
        );
      }
    }
  }

  function handleUpdateOffer(e) {
    e.preventDefault();
    let mainTypeFormPath = '';
    switch (props.mainType) {
      case 'university':
        mainTypeFormPath = 'uni-form';
        break;
      case 'job':
        mainTypeFormPath = 'job-form';
        break;
      case 'selfEmployed':
        mainTypeFormPath = 'self-employed-form';
        break;
      case 'life':
        mainTypeFormPath = 'life-form';
        break;
      default:
        mainTypeFormPath = 'uni-form';
        break;
    }
    let path = `/${currentLanguage}/helper/${mainTypeFormPath}/edit?targetItemId=${props.offerId}&refId=${refId}`;
    navigate(path);
  }

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
  }, [currentLanguage, props.introduction, props.introductionEN, props.sharingTopicEN, props.notes]);

  useEffect(()=> {
    if (props.isAnonymous) {
      setShownHelperName(props.helperName[0])
    } else {
      setShownHelperName(props.helperName);
    }
  }, [props.isAnonymous, props.helperName])

  return (
    <div className='history-card'>
      {showSignUpPopUp && (
        <SignUpPopUp
          onClick={handleClosePopUp}
          providerId={props.helperUserId}
          offerId={props.offerId}
        />
      )}
      <div className='profilePicWidth'>
        {!props.isAnonymous && props.profilePicPath && (
          <div className='helper-ImgBx'>
            <img src={`/images/${props.profilePicPath}`} alt={'visa'}></img>
          </div>
        )}
        {(!!props.isAnonymous || !props.profilePicPath) && (
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
              {shownHelperName}
            </h3>

            {!props.isAnonymous && (
              <p style={{ fontSize: '14px' }}>
                {t('introduction')}: {shownIntroduction}
              </p>
            )}
            {!!props.isAnonymous && (
              <p style={{ fontSize: '14px' }}>{t('answer_anonymous')}</p>
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
          <p style={{ fontSize: '14px', padding: '6px' }}>
            {details} {translatedFourthType}
          </p>
          <p style={{ fontSize: '14px', padding: '6px' }}>
            {t('helper_organization')}: {props.organization || t('na')}
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
            {t('sharing_topics')}: {shownSharingTopics || t('na')}
          </p>
        </div>
      </div>
      {props.showBookingBtn && (
        <div className='fullWidth'>
          <button className='btn-next' onClick={handleBookHelperMarketingClick}>
            {props.isSingleOfferPage && !props.isHelpeeAuthenticated
              ? t('free_sign_up', { name: shownHelperName })
              : t('book_name', { name: shownHelperName })}
          </button>
          {props.isSingleOfferPage && (
            <button className='btn-next' onClick={handleToHomepage}>
              {t('learn_at_homepage')}
            </button>
          )}
        </div>
      )}
      {!props.disableTrash && (
        <>
          <div>
            <EditIcon color='#04AA6D' onClick={handleUpdateOffer} />
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <TrashIcon onClick={handleDeleteOffer} />
          </div>
        </>
      )}
    </div>
  );
}
export default OfferCard;
