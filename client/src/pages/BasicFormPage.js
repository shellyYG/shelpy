import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DropDown from '../components/Dropdown';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  ageOptions, countryOptions, webLanguagesOptions, yesOrNoOptions,
} from '../store/options/service-options';
import {
  onUploadHelpeeProfilePicture,
  onSubmitUploadHelpeeData,
  clearApplyHelpeeStatus,
  getHelpeeUserData,
} from '../store/helpee/helpee-actions';

import {
  onUploadHelperProfilePicture,
  onSubmitUploadHelperData,
  clearApplyHelperStatus,
  getHelperUserData,
} from '../store/helper/helper-actions';

import LeftHalfLineTextBox from '../components/LeftHalfLineTextBox';
import CheckBox from '../components/CheckBox';
import { useTranslation } from 'react-i18next';
import EditIcon from '../components/Icons/EditIcon';

const MySwal = withReactContent(Swal);

const BasicFormPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const usernameRef = useRef();
  const ageRef = useRef();
  const introductionRef = useRef();
  const notesRef = useRef();
  const linkedInUrlRef = useRef();
  const nationalityRef = useRef();
  const residenceCountryRef = useRef();
  const notificationLanguageRef = useRef();

  const [loading, setIsLoading] = useState(false);
  const [age, setAge] = useState('default');
  const [profilePic, setProfilePic] = useState();
  const [certificate, setCertificate] = useState();
  const [nationality, setNationality] = useState('default');
  const [notificationLanguage, setNotificationLanguage] = useState('default');
  const [residenceCountry, setResidenceCountry] = useState('default');
  
  const [introductionString, setIntroductionString] = useState('');
  const [linkedInLinkString, setLinkedInLinkString] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isMarketing, setIsMarketing] = useState(true);
  const [enableBtn, setEnableBtn] = useState(false);
  
  const [hasMonToFri, setHasMonToFri] = useState(false);
  const [hasWeekend, setHasWeekend] = useState(false);
  const [hasBefore12, setHasBefore12] = useState(false);
  const [has12To18, setHas12To18] = useState(false);
  const [hasAfter18, setHasAfter18] = useState(false);

  const [hasEnglish, setHasEnglish] = useState(false);
  const [hasGerman, setHasGerman] = useState(false);
  const [hasFrench, setHasFrench] = useState(false);
  const [hasItalien, setHasItalien] = useState(false);
  const [hasChinese, setHasChinese] = useState(false);
  const [hasCantonese, setHasCantonese] = useState(false);
  const [hasVietnamese, setHasVietnamese] = useState(false);
  const [hasKorean, setHasKorean] = useState(false);
  const [hasJapanese, setHasJapanese] = useState(false);
  const [hasTurkish, setHasTurkish] = useState(false);
  const [hasUkrainian, setHasUkrainian] = useState(false);
  const [hasArabic, setHasArabic] = useState(false);
  const [hasOthers, setHasOthers] = useState(false);

  const [languages, setLanguages] = useState('');

  const [allowUploadPic, setAllowUploadPic] = useState(false);
  const [isUploadingPic, setIsUploadingPic] = useState(false);

  const [defaultHelpeeProfilePicPath, setDefaultHelpeeProfilePicPath] = useState('');
  const [defaultHelperProfilePicPath, setDefaultHelperProfilePicPath] =
    useState('');
  const [defaultUsername, setDefaultUsername] = useState('');
  const [defaultLinkedIn, setDefaultLinkedIn] = useState('');
  const [defaultIntroduction, setDefaultIntroduction] = useState('');
  const [defaultNotes, setDefaultNotes] = useState('');
  const [disableClickEvent, setDisableClickEvent] = useState(false);

  const { helpeeProfilePicPath, helpeeData } = useSelector((state) => state.helpee);
  const { helperProfilePicPath, helperData } = useSelector((state) => state.helper);
  const {
    applyHelpeeStatus,
    applyHelpeeStatusTitle,
    applyHelpeeStatusMessage,
  } = useSelector((state) => state.helpeeNotification);

  useEffect(() => {
    if (props.isHelpee && helpeeProfilePicPath) {
      setIsUploadingPic(false);
      setDisableClickEvent(false);
    } else if (!props.isHelpee && helperProfilePicPath) {
      setIsUploadingPic(false);
      setDisableClickEvent(false);
    }
  }, [props.isHelpee, helpeeProfilePicPath, helperProfilePicPath]);

  const {
    applyHelperStatus,
    applyHelperStatusTitle,
    applyHelperStatusMessage,
  } = useSelector((state) => state.helperNotification);

  useEffect(() => {
    if (props.isHelpee) {
      dispatch(getHelpeeUserData({ helpeeUserId: props.helpeeUserId}));
    } else {
      dispatch(getHelperUserData({ helperUserId: props.helperUserId}));
    }
  }, [props.isHelpee, props.helpeeUserId, props.helperUserId, dispatch]);

  useEffect(() => {
    let languagesString = '';
    if (hasEnglish) languagesString = languagesString.concat('English');
    if (hasGerman) languagesString = languagesString.concat(' German');
    if (hasFrench) languagesString = languagesString.concat(' French');
    if (hasItalien) languagesString = languagesString.concat(' Italien');
    if (hasChinese) languagesString = languagesString.concat(' Chinese');
    if (hasCantonese) languagesString = languagesString.concat(' Cantonese');
    if (hasVietnamese) languagesString = languagesString.concat(' Vietnamese');
    if (hasKorean) languagesString = languagesString.concat(' Korean');
    if (hasJapanese) languagesString = languagesString.concat(' Japanese');
    if (hasTurkish) languagesString = languagesString.concat(' Turkish');
    if (hasUkrainian) languagesString = languagesString.concat(' Ukrainian');
    if (hasArabic) languagesString = languagesString.concat(' Arabic');
    setLanguages(languagesString);
  }, [
    hasEnglish,
    hasGerman,
    hasFrench,
    hasItalien,
    hasChinese,
    hasCantonese,
    hasVietnamese,
    hasKorean,
    hasJapanese,
    hasTurkish,
    hasUkrainian,
    hasArabic,
  ]);

  if (loading) {
    MySwal.fire({
      title: t('loading'),
      html: t('do_not_close_window'),
      allowOutsIdeClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }
  async function handleProfilePicUpload(e) {
    e.preventDefault();
    setIsUploadingPic(true);
    setDisableClickEvent(true);
    const file = e.target.files[0];

    if (file && file.size > 1000000) {
      await MySwal.fire({
        title: <strong>{t('oops')}!</strong>,
        html: <p>{t('error_file_too_big')}</p>,
        icon: 'error',
      });
      return;
    }
    if (
      file &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/jpg'
    ) {
      await MySwal.fire({
        title: <strong>{t('oops')}!</strong>,
        html: <p>{t('error_only_accept_picture_format')}</p>,
        icon: 'error',
      });
      return;
    }
    setProfilePic(file);
    setAllowUploadPic(false);
    const data = new FormData();
    if (props.isHelpee) {
      data.append('helpeeUserId', props.helpeeUserId);
      data.append('profilePic', file);
    } else {
      data.append('helperUserId', props.helperUserId);
      data.append('profilePic', file);
    }
    try {
      if (props.isHelpee) {
        dispatch(onUploadHelpeeProfilePicture(data));
      } else {
        dispatch(onUploadHelperProfilePicture(data));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleResumeUpload(e) {
    e.preventDefault();
    const file = e.target.files[0] || '';
    if (file && file.size > 1000000) {
      await MySwal.fire({
        title: <strong>{t('oops')}!</strong>,
        html: <p>{t('error_file_too_big')}</p>,
        icon: 'error',
      });
      return;
    }
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/jpg' &&
      file.type !== 'application/pdf' &&
      file.type !== 'application/msword' && // .doc
      file.type !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && // .docx
      file.type !== 'application/vnd.ms-powerpoint' && // .ppt
      file.type !==
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' // .pptx
    ) {
      await MySwal.fire({
        title: <strong>{t('oops')}!</strong>,
        html: <p>{t('error_only_accept_file_format')}</p>,
        icon: 'error',
      });
      return;
    }
    setCertificate(file);
  }

  async function handleConfirm(e) {
    e.preventDefault();
    let username;
    let introduction;
    let notes;
    let linkedInUrl;
    if (usernameRef && usernameRef.current) {
      username = usernameRef.current.value;
    }
    if (introductionRef && introductionRef.current) {
      introduction = introductionRef.current.value;
    }
    if (notesRef && notesRef.current) {
      notes = notesRef.current.value;
    }
    if (linkedInUrlRef && linkedInUrlRef.current) {
      linkedInUrl = linkedInUrlRef.current.value;
    } else {
      linkedInUrl = defaultLinkedIn;
    }
    let data;
    if (certificate) { // must be helper
      data = new FormData();
      data.append('userId', props.helperUserId);
      data.append('username', username);
      data.append('isAnonymous', isAnonymous);
      data.append('isMarketing', isMarketing);
      data.append('age', age);
      data.append('nationality', nationality);
      data.append('residenceCountry', residenceCountry);
      data.append('notificationLanguage', notificationLanguage);
      data.append('linkedInUrl', linkedInUrl);
      data.append('introduction', introduction);
      
      data.append('hasMonToFri', hasMonToFri);
      data.append('hasWeekend', hasWeekend);
      data.append('hasBefore12', hasBefore12);
      data.append('has12To18', has12To18);
      data.append('hasAfter18', hasAfter18);
      
      data.append('hasEnglish', hasEnglish);
      data.append('hasGerman', hasGerman);
      data.append('hasFrench', hasFrench);
      data.append('hasItalien', hasItalien);
      data.append('hasChinese', hasChinese);
      data.append('hasCantonese', hasCantonese);
      data.append('hasVietnamese', hasVietnamese);
      data.append('hasKorean', hasKorean);
      data.append('hasJapanese', hasJapanese);
      data.append('hasTurkish', hasTurkish);
      data.append('hasUkrainian', hasUkrainian);
      data.append('hasArabic', hasArabic);
      data.append('hasOthers', hasOthers);
      data.append('languages', languages);

      data.append('notes', notes);
      data.append('status', 'basic_info_updated');
      data.append('certificate', certificate); // need to append file as last object

    } else { // could be helpee or helper
      if (props.isHelpee) { // helpee
        data = {
          userId: props.helpeeUserId,
          username,
          isAnonymous,
          age,
          nationality,
          notificationLanguage,
          residenceCountry,
          introduction,

          hasMonToFri,
          hasWeekend,
          hasBefore12,
          has12To18,
          hasAfter18,
          hasEnglish,
          hasGerman,
          hasFrench,
          hasItalien,
          hasChinese,
          hasCantonese,
          hasVietnamese,
          hasKorean,
          hasJapanese,
          hasTurkish,
          hasUkrainian,
          hasArabic,
          hasOthers,

          languages,

          notes,
          status: 'basic_info_updated',
        };
      } else { // helper
        data = {
          userId: props.helperUserId,
          username,
          isAnonymous,
          isMarketing,
          age,
          nationality,
          residenceCountry,
          notificationLanguage,
          linkedInUrl,
          introduction,

          hasMonToFri,
          hasWeekend,
          hasBefore12,
          has12To18,
          hasAfter18,
          hasEnglish,
          hasGerman,
          hasFrench,
          hasItalien,
          hasChinese,
          hasCantonese,
          hasVietnamese,
          hasKorean,
          hasJapanese,
          hasTurkish,
          hasUkrainian,
          hasArabic,
          hasOthers,

          languages,

          notes,
          status: 'basic_info_updated',
        };
      }
    }

    try {
      if (props.isHelpee) {
        dispatch(onSubmitUploadHelpeeData(data));
      } else {
        dispatch(onSubmitUploadHelperData(data));
      }
      setIsLoading(true);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (props.isHelpee) {
      setEnableBtn(
        age !== 'default' &&
          nationality !== 'default' &&
          residenceCountry !== 'default' &&
          notificationLanguage !== 'default' &&
          (introductionString || defaultIntroduction)
      );
    } else {
      setEnableBtn(
        age !== 'default' &&
          nationality !== 'default' &&
          residenceCountry !== 'default' &&
          notificationLanguage !== 'default' &&
          (linkedInLinkString || defaultLinkedIn || certificate) &&
          (introductionString || defaultIntroduction)
      );
    }
  }, [
    props.isHelpee,
    linkedInUrlRef,
    age,
    nationality,
    linkedInLinkString,
    residenceCountry,
    certificate,
    introductionString,
    notificationLanguage,
    defaultIntroduction,
    defaultLinkedIn,
  ]);

  // is Helper:
  useEffect(() => {
    if (applyHelperStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearApplyHelperStatus());
      }
      sweetAlertAndClearStatus(applyHelperStatus, applyHelperStatusMessage);
      return;
    } else if (applyHelperStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          imageWIdth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        let path = `/${currentLanguage}/helper/service-types`;
        if (window.location.search) path += window.location.search;
        navigate(path);
      }
      dispatch(clearApplyHelperStatus());
      sweetAlertAndNavigate(applyHelperStatus, applyHelperStatusMessage);
    }
  }, [
    t,
    applyHelperStatus,
    applyHelperStatusTitle,
    applyHelperStatusMessage,
    navigate,
    dispatch,
    currentLanguage,
  ]);

  // is Helpee:
  useEffect(() => {
    if (applyHelpeeStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearApplyHelpeeStatus());
      }
      sweetAlertAndClearStatus(applyHelpeeStatus, applyHelpeeStatusMessage);
      return;
    } else if (applyHelpeeStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          imageWIdth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        let path = `/${currentLanguage}/helpee/service-types`;
        if (window.location.search) path += window.location.search;
        navigate(path);
      }
      dispatch(clearApplyHelpeeStatus());
      sweetAlertAndNavigate(applyHelpeeStatus, applyHelpeeStatusMessage);
    }
  }, [
    t,
    currentLanguage,
    applyHelpeeStatus,
    applyHelpeeStatusTitle,
    applyHelpeeStatusMessage,
    navigate,
    dispatch,
  ]);

  function haneldLinkedInLinkTyping(e){
    e.preventDefault();
    const typingInput = e.target.value;
    setLinkedInLinkString(typingInput);
  }
  
  function handleIntroductionTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setIntroductionString(typingInput);
  }

  function handleShowEditPic(e) {
    e.preventDefault();
    setAllowUploadPic(!allowUploadPic);
  }

  // handle pre-fill
  useEffect(() => {
    if (!props.isHelpee) {
      if (helperData && helperData[0]) {
        setDefaultHelperProfilePicPath('/images/'+helperData[0].profilePicPath);
        setDefaultUsername(helperData[0].username);
        setDefaultLinkedIn(helperData[0].linkedInUrl);
        setAge(helperData[0].age);
        setNotificationLanguage(helperData[0].notificationLanguage);
        setNationality(helperData[0].nationality);
        setResidenceCountry(helperData[0].residenceCountry);
        setIsAnonymous(!!helperData[0].isAnonymous);
        setHasMonToFri(!!helperData[0].hasMonToFri);
        setHasWeekend(!!helperData[0].hasWeekend);
        setHasBefore12(!!helperData[0].hasBefore12);
        setHas12To18(!!helperData[0].has12To18);
        setHasAfter18(!!helperData[0].hasAfter18);
        setHasEnglish(!!helperData[0].hasEnglish);
        setHasGerman(!!helperData[0].hasGerman);
        setHasFrench(!!helperData[0].hasFrench);
        setHasItalien(!!helperData[0].hasItalien);
        setHasChinese(!!helperData[0].hasChinese);
        setHasCantonese(!!helperData[0].hasCantonese);
        setHasVietnamese(!!helperData[0].hasVietnamese);
        setHasKorean(!!helperData[0].hasKorean);
        setHasJapanese(!!helperData[0].hasJapanese);
        setHasTurkish(!!helperData[0].hasTurkish);
        setHasUkrainian(!!helperData[0].hasUkrainian);
        setHasArabic(!!helperData[0].hasArabic);
        setHasOthers(!!helperData[0].hasOthers);
        setDefaultIntroduction(helperData[0].introduction);
        setDefaultNotes(helperData[0].notes);
      }
    } else {
      if (helpeeData && helpeeData[0]) {
        setDefaultHelpeeProfilePicPath('/images/'+helpeeData[0].profilePicPath);
        setDefaultUsername(helpeeData[0].username);
        setAge(helpeeData[0].age);
        setNotificationLanguage(helpeeData[0].notificationLanguage);
        setNationality(helpeeData[0].nationality);
        setResidenceCountry(helpeeData[0].residenceCountry);
        setIsAnonymous(!!helpeeData[0].isAnonymous);
        setHasMonToFri(!!helpeeData[0].hasMonToFri);
        setHasWeekend(!!helpeeData[0].hasWeekend);
        setHasBefore12(!!helpeeData[0].hasBefore12);
        setHas12To18(!!helpeeData[0].has12To18);
        setHasAfter18(!!helpeeData[0].hasAfter18);
        setHasEnglish(!!helpeeData[0].hasEnglish);
        setHasGerman(!!helpeeData[0].hasGerman);
        setHasFrench(!!helpeeData[0].hasFrench);
        setHasItalien(!!helpeeData[0].hasItalien);
        setHasChinese(!!helpeeData[0].hasChinese);
        setHasCantonese(!!helpeeData[0].hasCantonese);
        setHasVietnamese(!!helpeeData[0].hasVietnamese);
        setHasKorean(!!helpeeData[0].hasKorean);
        setHasJapanese(!!helpeeData[0].hasJapanese);
        setHasTurkish(!!helpeeData[0].hasTurkish);
        setHasUkrainian(!!helpeeData[0].hasUkrainian);
        setHasArabic(!!helpeeData[0].hasArabic);
        setHasOthers(!!helpeeData[0].hasOthers);
        setDefaultIntroduction(helpeeData[0].introduction);
        setDefaultNotes(helpeeData[0].notes);
      }
    }
  }, [props.isHelpee, helperData, helpeeData]);

  return (
    <div
      className='main-content-wrapper-homepage'
      style={{
        backgroundImage: props.isHelpee
          ? 'url(/static-imgs/helpee-home.jpeg)'
          : 'url(/static-imgs/helper-home.jpeg)',
      }}
    >
      <div className='form-center-wrapper'>
        <div>
          <h1
            style={{
              textAlign: 'center',
              marginTop: '30px',
              marginBottom: '30px',
              color: props.isHelpee ? 'black' : 'white',
            }}
          >
            {t('update_basic_information')}
          </h1>
        </div>
        <div className='container' style={{ width: '100%' }}>
          <div className='form-inner' style={{ display: 'flex' }}>
            <form
              action=''
              method='post'
              encType='multipart/form-data'
              className='form-most-inner'
            >
              <div className='form-row'>
                <div
                  className='form-wrapper'
                  style={{ width: '100%', margin: 'auto' }}
                >
                  {!!isAnonymous && (
                    <div className='blankProfileImageBx'>
                      <div style={{ margin: 'auto' }}>
                        <p style={{ color: 'black' }}>Anonymous</p>
                      </div>
                    </div>
                  )}
                  {!!allowUploadPic && !isUploadingPic && !isAnonymous && (
                    <>
                      <div className='blankProfileImageBx'>
                        {' '}
                        <div className='uploadInnerDiv'>
                          <label
                            className='uploadLabel'
                            for='profilePic'
                            style={{ fontSize: '9px' }}
                          >
                            {t('upload_profile_pic')}
                          </label>
                          <input
                            type='file'
                            id='profilePic'
                            onChange={handleProfilePicUpload}
                            hidden={true}
                          />
                        </div>{' '}
                      </div>
                      <div style={{ display: 'flex', marginTop: '-50px' }}>
                        <EditIcon
                          color='white'
                          onClick={handleShowEditPic}
                          disableClickEvent={disableClickEvent}
                        />
                      </div>
                    </>
                  )}
                  {!allowUploadPic && !!isUploadingPic && !isAnonymous && (
                    <>
                      <div className='blankProfileImageBx'>
                        <div style={{ margin: 'auto' }}>
                          <p style={{ color: 'black' }}>{t('loading')}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', marginTop: '-50px' }}>
                        <EditIcon
                          color='white'
                          onClick={handleShowEditPic}
                          disableClickEvent={disableClickEvent}
                        />
                      </div>
                    </>
                  )}
                  {!allowUploadPic &&
                    !isUploadingPic &&
                    !isAnonymous &&
                    !props.isHelpee &&
                    (profilePic ||
                      ((helperProfilePicPath || defaultHelperProfilePicPath) &&
                        (helperProfilePicPath.length > 1 ||
                          defaultHelperProfilePicPath.length > 1))) && (
                      <>
                        <div className='profileImageBx'>
                          <img
                            src={
                              helperProfilePicPath ||
                              defaultHelperProfilePicPath
                            }
                            alt='connection'
                          ></img>
                        </div>
                        <div style={{ display: 'flex', marginTop: '-50px' }}>
                          <EditIcon
                            color='white'
                            onClick={handleShowEditPic}
                            disableClickEvent={disableClickEvent}
                          />
                        </div>
                      </>
                    )}

                  {!allowUploadPic &&
                    !isUploadingPic &&
                    !isAnonymous &&
                    props.isHelpee &&
                    (profilePic ||
                      ((helpeeProfilePicPath || defaultHelpeeProfilePicPath) &&
                        (helpeeProfilePicPath.length > 1 ||
                          defaultHelpeeProfilePicPath.length > 1))) && (
                      <>
                        <div className='profileImageBx'>
                          <img
                            src={
                              helpeeProfilePicPath ||
                              defaultHelpeeProfilePicPath
                            }
                            alt='connection'
                          ></img>
                        </div>
                        <div style={{ display: 'flex', marginTop: '-50px' }}>
                          <EditIcon
                            color='white'
                            onClick={handleShowEditPic}
                            disableClickEvent={disableClickEvent}
                          />
                        </div>
                      </>
                    )}
                </div>
              </div>
              <div style={{ margin: 'auto', textAlign: 'center' }}>
                <label>{t('username_title')}</label>
              </div>

              <input
                defaultValue={defaultUsername}
                type='input'
                className='form-control-password'
                placeholder={t('username_placeholder')}
                maxLength={'11'}
                ref={usernameRef}
              />
              <div className='form-row'>
                <DropDown
                  selected={age}
                  handleSelect={setAge}
                  title={t('age_title')}
                  details={t('will_not_show_publicly')}
                  selectRef={ageRef}
                  options={ageOptions}
                />
                <DropDown
                  selected={notificationLanguage}
                  handleSelect={setNotificationLanguage}
                  title={`${t('notification_language_title')} *`}
                  details={t('notification_language_details')}
                  selectRef={notificationLanguageRef}
                  options={webLanguagesOptions}
                />
              </div>
              <div className='form-row'>
                <DropDown
                  selected={nationality}
                  handleSelect={setNationality}
                  title={t('nationality_title')}
                  details={t('will_not_show_publicly')}
                  selectRef={nationalityRef}
                  options={countryOptions}
                />
                <DropDown
                  selected={residenceCountry}
                  handleSelect={setResidenceCountry}
                  title={t('residence_country_title')}
                  details={t('will_not_show_publicly')}
                  selectRef={residenceCountryRef}
                  options={countryOptions}
                />
              </div>
              {!props.isHelpee && (
                <div className='form-row'>
                  <LeftHalfLineTextBox
                    defaultValue={defaultLinkedIn}
                    title={t('linkedin_link_title')}
                    details={t('linkedin_link_details')}
                    placeholder={
                      'https://www.linkedin.com/in/your-linkedin-profile'
                    }
                    inputRef={linkedInUrlRef}
                    marginBottom='10px'
                    onChange={haneldLinkedInLinkTyping}
                  />
                  <div
                    className='form-wrapper'
                    style={{ margin: 'auto', marginBottom: '10px' }}
                  >
                    <div>
                      <label>{t('resume_title')}</label>
                      <p style={{ fontSize: '9px', marginBottom: '10px' }}>
                        {t('resume_details')}
                      </p>
                    </div>
                    {!certificate && (
                      <>
                        <label className='uploadLabel' for='resume'>
                          {t('upload_a_file')}
                        </label>

                        <input
                          type='file'
                          id='resume'
                          onChange={handleResumeUpload}
                          hidden={true}
                        />
                      </>
                    )}
                    {certificate && (
                      <div style={{ padding: '10px 0' }}>
                        <p>{certificate.name || 'Uploaded'}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckBox
                  checked={isAnonymous}
                  handleCheck={setIsAnonymous}
                  title={
                    props.isHelpee ? `${t('ask_anonymous')} ${t('not_recommend')}` : `${t('answer_anonymous')} ${t('not_recommend')}`
                  }
                  details={t('ananymous_details')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
              </div>
              {!props.isHelpee && (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <CheckBox
                    checked={isMarketing}
                    handleCheck={setIsMarketing}
                    title={t('promote_your_offer_title')}
                    details={t('promote_your_offer_details')}
                    paddingRight='10px'
                    marginBottom='5px'
                    fontSize='14px'
                  />
                </div>
              )}

              <p className='fontSize17Title' style={{ marginTop: '16px' }}>
                {t('appointment_date_title')}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <CheckBox
                  checked={hasMonToFri}
                  handleCheck={setHasMonToFri}
                  title={t('monday_to_friday')}
                  paddingRight='10px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasWeekend}
                  handleCheck={setHasWeekend}
                  title={t('saturday_to_sunday')}
                  paddingRight='10px'
                  fontSize='14px'
                />
              </div>
              <p className='fontSize17Title'>{t('appointment_time_title')}</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <CheckBox
                  checked={hasBefore12}
                  handleCheck={setHasBefore12}
                  title={t('before12noon')}
                  paddingRight='10px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={has12To18}
                  handleCheck={setHas12To18}
                  title={t('12to18')}
                  paddingRight='10px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasAfter18}
                  handleCheck={setHasAfter18}
                  title={t('after18')}
                  paddingRight='10px'
                  fontSize='14px'
                />
              </div>

              <p className='fontSize17Title'>{t('what_languages_you_speak')}</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <CheckBox
                  checked={hasEnglish}
                  handleCheck={setHasEnglish}
                  title={t('languages_english')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasGerman}
                  handleCheck={setHasGerman}
                  title={t('languages_german')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasFrench}
                  handleCheck={setHasFrench}
                  title={t('languages_french')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasItalien}
                  handleCheck={setHasItalien}
                  title={t('languages_italien')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <CheckBox
                  checked={hasChinese}
                  handleCheck={setHasChinese}
                  title={t('languages_chinese')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasCantonese}
                  handleCheck={setHasCantonese}
                  title={t('languages_cantonese')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasVietnamese}
                  handleCheck={setHasVietnamese}
                  title={t('languages_vietnamese')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasKorean}
                  handleCheck={setHasKorean}
                  title={t('languages_korean')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasJapanese}
                  handleCheck={setHasJapanese}
                  title={t('languages_japanese')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <CheckBox
                  checked={hasTurkish}
                  handleCheck={setHasTurkish}
                  title={t('languages_turkish')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasUkrainian}
                  handleCheck={setHasUkrainian}
                  title={t('languages_ukrainian')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasArabic}
                  handleCheck={setHasArabic}
                  title={t('languages_arabic')}
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasOthers}
                  handleCheck={setHasOthers}
                  title={t('others_option')}
                  paddingRight='10px'
                  marginBottom='25px'
                  fontSize='14px'
                />
              </div>
              <FullLineTextBox
                defaultValue={defaultIntroduction}
                title={t('introduction_title')}
                details={t('introduction_details')}
                placeholder={`${t('introduction_placeholder')} *`}
                inputRef={introductionRef}
                onChange={handleIntroductionTyping}
                marginTop='15px'
              />

              <FullLineTextBox
                defaultValue={defaultNotes}
                title={t('notes')}
                placeholder={t('other_languages_specify_note_placeholder')}
                inputRef={notesRef}
              />
              <ConfirmBtn
                cta={t('confirm')}
                disable={!enableBtn}
                handleConfirm={handleConfirm}
              />
              <div style={{ marginTop: '10px' }}>
                <p
                  style={{
                    color: 'white',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  {props.isHelpee && t('what_partner_will_see_after_requests')}
                  {!props.isHelpee && t('what_partner_will_see_after_offers')}
                </p>
                {!props.isHelpee && currentLanguage === 'en' && !isAnonymous && (
                  <div style={{ width: '100%' }}>
                    <img
                      src='/static-imgs/Demo_Helper_Card_EN.png'
                      alt='helper_demo_picture'
                      style={{ width: '100%' }}
                    ></img>
                  </div>
                )}
                {!props.isHelpee &&
                  (currentLanguage === 'zh-TW' ||
                    currentLanguage === 'zh-CN') &&
                  !isAnonymous && (
                    <div style={{ width: '100%' }}>
                      <img
                        src='/static-imgs/Demo_Helper_Card_ZH.png'
                        alt='helper_demo_picture'
                        style={{ width: '100%' }}
                      ></img>
                    </div>
                  )}
                {!props.isHelpee && currentLanguage === 'en' && !!isAnonymous && (
                  <div style={{ width: '100%' }}>
                    <img
                      src='/static-imgs/Demo_Helper_Card_EN_Ano.png'
                      alt='helper_demo_picture'
                      style={{ width: '100%' }}
                    ></img>
                  </div>
                )}
                {!props.isHelpee &&
                  (currentLanguage === 'zh-TW' ||
                    currentLanguage === 'zh-CN') &&
                  !!isAnonymous && (
                    <div style={{ width: '100%' }}>
                      <img
                        src='/static-imgs/Demo_Helper_Card_ZH_Ano.png'
                        alt='helper_demo_picture'
                        style={{ width: '100%' }}
                      ></img>
                    </div>
                  )}
                {props.isHelpee && currentLanguage === 'en' && !isAnonymous && (
                  <div style={{ width: '100%' }}>
                    <img
                      src='/static-imgs/Demo_Helpee_Card_EN.png'
                      alt='helper_demo_picture'
                      style={{ width: '100%' }}
                    ></img>
                  </div>
                )}
                {props.isHelpee &&
                  (currentLanguage === 'zh-TW' ||
                    currentLanguage === 'zh-CN') &&
                  !isAnonymous && (
                    <div style={{ width: '100%' }}>
                      <img
                        src='/static-imgs/Demo_Helpee_Card_ZH.png'
                        alt='helper_demo_picture'
                        style={{ width: '100%' }}
                      ></img>
                    </div>
                  )}
                {props.isHelpee && currentLanguage === 'en' && !!isAnonymous && (
                  <div style={{ width: '100%' }}>
                    <img
                      src='/static-imgs/Demo_Helpee_Card_EN_Ano.png'
                      alt='helper_demo_picture'
                      style={{ width: '100%' }}
                    ></img>
                  </div>
                )}
                {props.isHelpee &&
                  (currentLanguage === 'zh-TW' ||
                    currentLanguage === 'zh-CN') &&
                  !!isAnonymous && (
                    <div style={{ width: '100%' }}>
                      <img
                        src='/static-imgs/Demo_Helpee_Card_ZH_Ano.png'
                        alt='helper_demo_picture'
                        style={{ width: '100%' }}
                      ></img>
                    </div>
                  )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicFormPage;
