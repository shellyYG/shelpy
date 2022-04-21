import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  nativeLanguageOptions,
} from '../store/options/service-options';
import {
  getHelpeeUserData,
  // getHelpeeRatingData,
} from '../store/helpee/helpee-actions';

import {
  getHelperUserData,
  getHelperRatingData,
} from '../store/helper/helper-actions';

import { useTranslation } from 'react-i18next';
import AvatarIcon from '../components/Icons/AvatarIcon';
import ScoreStars from '../components/ScoreStars';
import RatingPopUp from './RatingPopUp';
import { logLandOnPage } from '../store/general/general-actions';

const average = (arr) =>
  arr.map((el) => el.score).reduce((a, b) => a + b, 0) / arr.length;

const ProfilePage = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');

  const [isAnonymous, setIsAnonymous] = useState(false);
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
  const [averageScore, setAverageScore] = useState(0);
  const [showRating, setShowRating] = useState(false);

  const [translatedSpeakingLanguages, setTranslatedSpeakingLanguages] =
    useState('');
  const [translatedYesOrNo, setTranslatedYesOrNo] = useState('');

  const [languages, setLanguages] = useState('');

  const [defaultHelpeeProfilePicPath, setDefaultHelpeeProfilePicPath] =
    useState('');
  const [defaultHelperProfilePicPath, setDefaultHelperProfilePicPath] =
    useState('');
  const [defaultUsername, setDefaultUsername] = useState('');
  const [defaultIntroduction, setDefaultIntroduction] = useState('');
  const [defaultENIntroduction, setDefaultENIntroduction] = useState('');
  const [imageBoxStatus, setImageBoxStatus] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');

  const { helpeeData, helpeeRatingData } = useSelector((state) => state.helpee);
  const { helperData, helperRatingData } = useSelector((state) => state.helper);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    if (props.isHelpee) {
      dispatch(getHelpeeUserData({ helpeeUserId: props.helpeeUserId }));
      // TODO: Add rating data for helpee as well
      //   dispatch(getHelpeeRatingData({ helpeeUserId: props.helpeeUserId }));
    } else {
      dispatch(getHelperUserData({ helperUserId: props.helperUserId }));
      dispatch(getHelperRatingData({ helperUserId: props.helperUserId }));
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

  // handle pre-fill
  useEffect(() => {
    if (!props.isHelpee) {
      if (helperData && helperData[0]) {
        if (helperData[0].profilePicPath) {
          setDefaultHelperProfilePicPath(
            '/images/' + helperData[0].profilePicPath
          );
        }
        setDefaultUsername(helperData[0].username);
        setIsAnonymous(!!helperData[0].isAnonymous);
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
        if (helperData[0] && helperData[0].introductionEN) {
          setDefaultENIntroduction(helperData[0].introductionEN);
        } else {
          setDefaultENIntroduction(t('you_dont_have_en_intro_pls_add'));
        }
      }
    } else {
      if (helpeeData && helpeeData[0]) {
        if (helpeeData[0].profilePicPath) {
          setDefaultHelpeeProfilePicPath(
            '/images/' + helpeeData[0].profilePicPath
          );
        }
        setDefaultUsername(helpeeData[0].username);
        setIsAnonymous(!!helpeeData[0].isAnonymous);
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
        if (helpeeData[0] && helpeeData[0].introductionEN) {
          setDefaultENIntroduction(helpeeData[0].introductionEN);
        } else {
          setDefaultENIntroduction(t('you_dont_have_en_intro_pls_add'));
        }
      }
    }
  }, [props.isHelpee, helperData, helpeeData, t]);

  useEffect(() => {
    let translatedSpeakingLanguagesString = '';
    const speakingLanguages = languages ? languages.split(' ') : [];
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
  }, [t, languages]);

  useEffect(() => {
    if (isAnonymous) {
      setTranslatedYesOrNo(t('yes_option'));
    } else {
      setTranslatedYesOrNo(t('no_option'));
    }
  }, [t, isAnonymous]);

  useEffect(() => {
    if (props.isHelpee) {
      // TODO: Add rating data for helpee as well
      //   setAverageScore(average(helpeeRatingData));
    } else {
      setAverageScore(average(helperRatingData));
    }
  }, [props.isHelpee, helperRatingData]);

  // set image box status
  useEffect(() => {
    if (!!isAnonymous) {
      setImageBoxStatus('showAnonymousBox');
    } else if (!props.isHelpee && !isAnonymous && defaultHelperProfilePicPath) {
      setImageBoxStatus('showHelperImage');
    } else if (props.isHelpee && !isAnonymous && defaultHelpeeProfilePicPath) {
      setImageBoxStatus('showHelpeeImage');
    } else if (
      !props.isHelpee &&
      !isAnonymous &&
      !defaultHelperProfilePicPath
    ) {
      setImageBoxStatus('showNoPicture');
    } else if (props.isHelpee && !isAnonymous && !defaultHelpeeProfilePicPath) {
      setImageBoxStatus('showNoPicture');
    }
  }, [
    props.isHelpee,
    isAnonymous,
    defaultHelpeeProfilePicPath,
    defaultHelperProfilePicPath,
  ]);

  function handleConfirm(e) {
    e.preventDefault();
    let path = props.isHelpee
      ? `/${currentLanguage}/helpee/basic-form`
      : `/${currentLanguage}/helper/basic-form`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }

  function handleShowRatings(e) {
    e.preventDefault();
    setShowRating(true);
  }

  function handleClosePopUp(e) {
    e.preventDefault();
    setShowRating(false);
  }

  // Log Page Land
  useEffect(() => {
    const today = new Date();
    dispatch(
      logLandOnPage({
        currentPathname: window.location.href,
        providerId,
        offerId,
        refId,
        viewTimeStamp: Date.now(),
        viewTime:
          today.getHours() +
          ':' +
          today.getMinutes() +
          ':' +
          today.getSeconds(),
        viewDate: today.toISOString().slice(0, 10),
      })
    );
  }, [providerId, offerId, refId, dispatch]);

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
            {t('your_profile')}
          </h1>
        </div>
        {showRating && !props.isHelpee && (
          <RatingPopUp
            onClick={handleClosePopUp}
            averageScore={averageScore}
            ratingData={props.isHelpee ? helpeeRatingData : helperRatingData}
          />
        )}
        <div style={{ width: '100%', display: 'flex' }}>
          <div className='profile-inner'>
            <div className='pure-row' style={{ marginBottom: '0px' }}>
              <div
                className='form-wrapper'
                style={{ width: '100%', margin: 'auto' }}
              >
                {imageBoxStatus === 'showAnonymousBox' && (
                  <div className='defaultProfileImageBx'>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <AvatarIcon size='90' />
                    </div>
                  </div>
                )}
                {imageBoxStatus === 'showNoPicture' && (
                  <div className='blankProfileImageBxBlack'>
                    <div style={{ margin: 'auto' }}>
                      <p style={{ fontSize: '10px' }}>
                        {t('no_picture_please_update')}
                      </p>
                    </div>
                  </div>
                )}
                {imageBoxStatus === 'showHelperImage' && (
                  <>
                    <div className='profileImageBx'>
                      <img src={defaultHelperProfilePicPath} alt=''></img>
                    </div>
                  </>
                )}

                {imageBoxStatus === 'showHelpeeImage' && (
                  <>
                    <div className='profileImageBx'>
                      <img src={defaultHelpeeProfilePicPath} alt=''></img>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='pure-row'>
              <div className='pureFlexRowMarginAuto'>
                <p style={{ marginRight: '10px' }}>
                  {t('username')}: {defaultUsername}
                </p>
              </div>
            </div>
            <div className='pure-row'>
              <div className='pureFlexRowMarginAuto'>
                <p style={{ marginRight: '10px' }}>
                  {t('role')}:{' '}
                  {props.isHelpee ? t('helpee_big') : t('helper_big')}
                </p>
              </div>
            </div>
            {!props.isHelpee && (
              <div className='pure-row'>
                <div
                  className='pureFlexRowMarginAuto'
                  style={{ cursor: 'pointer' }}
                  onClick={handleShowRatings}
                >
                  <ScoreStars averageScore={averageScore} />
                  <p style={{ marginLeft: '5px' }}>
                    {props.isHelpee
                      ? helpeeRatingData.length
                      : helperRatingData.length}
                    {t('comments_unit')}
                    {t('comments')}
                  </p>
                </div>
              </div>
            )}
            <div className='pure-row'>
              <div style={{ margin: 'auto' }}>
                <p>
                  {props.isHelpee ? t('ask_anonymous') : t('answer_anonymous')}:{' '}
                  {translatedYesOrNo}
                </p>
              </div>
            </div>
            {currentLanguage === 'en' && (
              <div className='pure-row'>
                <div className='pureFlexColumn'>
                  <p style={{ margin: 'auto' }}>{t('introduction')}:</p>
                  <p className='introductionWrapper'>{defaultENIntroduction}</p>
                </div>
              </div>
            )}

            {currentLanguage !== 'en' && (
              <>
                <div className='pure-row'>
                  <div className='pureFlexColumn'>
                    <p style={{ margin: 'auto' }}>{t('introduction')}:</p>
                    <p className='introductionWrapper'>{defaultIntroduction}</p>
                  </div>
                </div>
                <div className='pure-row'>
                  <div className='pureFlexColumn'>
                    <p style={{ margin: 'auto' }}>{t('introduction_EN')}:</p>
                    <p className='introductionWrapper'>
                      {defaultENIntroduction}
                    </p>
                  </div>
                </div>
              </>
            )}
            <div className='pure-row'>
              <div className='pureFlexColumn'>
                <p style={{ margin: 'auto' }}>{t('speaks')}:</p>
                <p style={{ margin: 'auto' }}>{translatedSpeakingLanguages}</p>
              </div>
            </div>
            {!props.isHelpee && (
              <>
                <h3 style={{ textAlign: 'center', color: 'red' }}>
                  {t('your_personal_offer_link')}:
                </h3>
                <div style={{ textAlign: 'center', color: 'red' }}>
                  <p>{t('send_this_to_helpee')}:</p>
                </div>

                <div className='personalLinkWrapper'>
                  <p style={{ lineBreak: 'anywhere' }}>
                    {!props.isHelpee &&
                      `https://shelpy.co/${currentLanguage}/personal/offers?providerId=${props.helperUserId}&refId=helper${props.helperUserId}`}
                  </p>
                </div>
              </>
            )}

            <ConfirmBtn
              cta={`${t('update_profile')} >> `}
              disable={false}
              handleConfirm={handleConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
