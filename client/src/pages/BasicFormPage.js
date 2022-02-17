import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DropDown from '../components/Dropdown';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  ageOptions,
} from '../store/options/service-options';
import {
  onUploadHelpeeProfilePicture,
  onSubmitUploadHelpeeData,
  clearApplyHelpeeStatus,
} from '../store/helpee/helpee-actions';

import {
  onUploadHelperProfilePicture,
  onSubmitUploadHelperData,
  clearApplyHelperStatus,
} from '../store/helper/helper-actions';

import LeftHalfLineTextBox from '../components/LeftHalfLineTextBox';
import CheckBox from '../components/CheckBox';
import { useTranslation } from 'react-i18next';

const MySwal = withReactContent(Swal);

const BasicFormPage = (props) => {
  console.log('helpeeId: ', props.helpeeUserId, 'helperId: ', props.helperUserId);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ageRef = useRef();
  const introductionRef = useRef();
  const notesRef = useRef();
  const usernameRef = useRef();
  const linkedInUrlRef = useRef();

  const [loading, setIsLoading] = useState(false);
  const [age, setAge] = useState('default');
  const [profilePic, setProfilePic] = useState();
  const [certificate, setCertificate] = useState();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);
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

  const { helpeeProfilePicPath } = useSelector((state) => state.helpee);
  const { helperProfilePicPath } = useSelector((state) => state.helper);

  const {
    applyHelpeeStatus,
    applyHelpeeStatusTitle,
    applyHelpeeStatusMessage,
  } = useSelector((state) => state.helpeeNotification);

  const {
    applyHelperStatus,
    applyHelperStatusTitle,
    applyHelperStatusMessage,
  } = useSelector((state) => state.helperNotification);

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
    console.log('languagesString: ', languagesString);
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
    const file = e.target.files[0];

    if (file && file.size > 1000000) {
      await MySwal.fire({
        title: <strong>Oops!</strong>,
        html: (
          <p>Max. File size is 1MB. Please choose a smaller file to upload.</p>
        ),
        icon: 'error',
      });
      return;
    }
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/jpg'
    ) {
      await MySwal.fire({
        title: <strong>Oops!</strong>,
        html: (
          <p>
            Only accepts .jpg, .jpeg or .png file. Please choose another file to
            upload.
          </p>
        ),
        icon: 'error',
      });
      return;
    }
    setProfilePic(file);
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
        title: <strong>Oops!</strong>,
        html: (
          <p>Max. File size is 1MB. Please choose a smaller file to upload.</p>
        ),
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
        title: <strong>Oops!</strong>,
        html: (
          <p>
            Only accepts .docx, .doc, .pdf, .ppt, .pptx, .jpg, .jpeg or .png
            file. Please choose another file to upload.
          </p>
        ),
        icon: 'error',
      });
      return;
    }
    setCertificate(file);
  }

  async function handleConfirm(e) {
    e.preventDefault();
    let introduction;
    let notes;
    let username;
    let linkedInUrl;
    if (introductionRef && introductionRef.current) {
      introduction = introductionRef.current.value;
    }
    if (notesRef && notesRef.current) {
      notes = notesRef.current.value;
    }
    if (usernameRef && usernameRef.current) {
      username = usernameRef.current.value;
    }
    if (linkedInUrlRef && linkedInUrlRef.current) {
      linkedInUrl = linkedInUrlRef.current.value;
    }
    let data;
    if (certificate) { // must be helper
      data = new FormData();
      data.append('userId', props.helperUserId);
      data.append('username', username);
      data.append('isAnonymous', isAnonymous);
      data.append('isMarketing', isMarketing);
      data.append('age', age);
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
      console.log('data to send: ', data); // console.log(data) // browser will be empty
    } else { // could be helpee or helper
      if (props.isHelpee) { // helpee
        data = {
          userId: props.helpeeUserId,
          isAnonymous,
          username,
          age,
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
          isAnonymous,
          isMarketing,
          username,
          age,
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

    console.log('data to dispatch: ', data);
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
    setEnableBtn(
      usernameRef && age !== 'default' && (linkedInUrlRef || certificate)
    );
  }, [usernameRef, linkedInUrlRef, age, certificate]);
  console.log('applyHelperStatus: ', applyHelperStatus);
  // is Helper:
  useEffect(() => {
    if (applyHelperStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
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
          title: <strong>{title}</strong>,
          imageWIdth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
        navigate('/helper/service-types');
      }
      dispatch(clearApplyHelperStatus());
      sweetAlertAndNavigate(applyHelperStatus, applyHelperStatusMessage);
    }
  }, [
    applyHelperStatus,
    applyHelperStatusTitle,
    applyHelperStatusMessage,
    navigate,
    dispatch,
  ]);

  // is Helpee:
  useEffect(() => {
    if (applyHelpeeStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
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
          title: <strong>{title}</strong>,
          imageWIdth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
        navigate('/helpee/service-types');
      }
      dispatch(clearApplyHelpeeStatus());
      sweetAlertAndNavigate(applyHelpeeStatus, applyHelpeeStatusMessage);
    }
  }, [
    applyHelpeeStatus,
    applyHelpeeStatusTitle,
    applyHelpeeStatusMessage,
    navigate,
    dispatch,
  ]);
  console.log('helpeeProfilePicPath: ', helpeeProfilePicPath);
  console.log('helperProfilePicPath: ', helperProfilePicPath);
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        {props.isHelpee && 'Update Basic Information'}
        {!props.isHelpee && 'Apply to be Helper'}
      </h1>

      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action='' method='post' encType='multipart/form-data'>
              <div className='form-row'>
                <div
                  className='form-wrapper'
                  style={{ width: '100%', margin: 'auto' }}
                >
                  {!isAnonymous && !profilePic && (
                    <div className='blankProfileImageBx'>
                      {' '}
                      <div className='uploadInnerDiv'>
                        <label
                          className='uploadLabel'
                          for='profilePic'
                          style={{ fontSize: '12px' }}
                        >
                          Upload Picture (Optional)
                        </label>
                        <input
                          type='file'
                          Id='profilePic'
                          onChange={handleProfilePicUpload}
                          hidden={true}
                        />
                      </div>{' '}
                    </div>
                  )}
                  {!isAnonymous &&
                    !props.isHelpee &&
                    profilePic &&
                    (!helperProfilePicPath ||
                      helperProfilePicPath.length < 1) && (
                      <div className='blankProfileImageBx'>
                        <div style={{ margin: 'auto' }}>
                          <p style={{ color: 'black' }}>{t('loading')}</p>
                        </div>
                      </div>
                    )}
                  {!isAnonymous &&
                    !props.isHelpee &&
                    profilePic &&
                    helperProfilePicPath &&
                    helperProfilePicPath.length > 1 && (
                      <div className='profileImageBx'>
                        <img src={helperProfilePicPath} alt='connection'></img>
                      </div>
                    )}
                  {!isAnonymous &&
                    props.isHelpee &&
                    profilePic &&
                    (!helpeeProfilePicPath ||
                      helpeeProfilePicPath.length < 1) && (
                      <div className='blankProfileImageBx'>
                        <div style={{ margin: 'auto' }}>
                          <p style={{ color: 'black' }}>{t('loading')}</p>
                        </div>
                      </div>
                    )}
                  {isAnonymous && (
                    <div className='blankProfileImageBx'>
                      <div style={{ margin: 'auto' }}>
                        <p style={{ color: 'black' }}>Anonymous</p>
                      </div>
                    </div>
                  )}
                  {!isAnonymous &&
                    props.isHelpee &&
                    profilePic &&
                    helpeeProfilePicPath &&
                    helpeeProfilePicPath.length > 1 && (
                      <div className='profileImageBx'>
                        <img src={helpeeProfilePicPath} alt='connection'></img>
                      </div>
                    )}
                </div>
              </div>
              <div className='form-row'>
                <LeftHalfLineTextBox
                  title={'Username (This will be shown publicly) *'}
                  placeholder={'Enter Username (e.g. Angela)'}
                  inputRef={usernameRef}
                />
                <DropDown
                  selected={age}
                  handleSelect={setAge}
                  title={'Age (This will not be shown publicly)*'}
                  selectRef={ageRef}
                  options={ageOptions}
                />
              </div>
              {!props.isHelpee && (
                <div className='form-row'>
                  <LeftHalfLineTextBox
                    title={
                      'LinkedIn Link (or upload Resume) (This will not be shown publicly)'
                    }
                    placeholder={
                      'https://www.linkedin.com/in/your-linkedin-profile'
                    }
                    inputRef={linkedInUrlRef}
                  />
                  <div className='form-wrapper' style={{ margin: 'auto' }}>
                    <label>
                      Resume/files (or linkedin link, this will not be shown
                      publicly)
                    </label>
                    {!certificate && (
                      <>
                        <label className='uploadLabel' for='resume'>
                          Upload a file
                        </label>
                        <input
                          type='file'
                          Id='resume'
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
                  details={
                    props.isHelpee
                      ? 'Ask question anonymously (your profile picture will be hide, but username will be shown).'
                      : 'Answer question anonymously (your profile picture will be hide, but username will be shown).'
                  }
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
                    details='Promote your offer on our marketing page (this will increase your chance to get hired!).'
                    paddingRight='10px'
                    marginBottom='5px'
                    fontSize='14px'
                  />
                </div>
              )}

              <p className='fontSize17Title' style={{ marginTop: '16px' }}>
                What days are you available? (Can choose multiple)
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
                  details='Monday - Friday'
                  paddingRight='10px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasWeekend}
                  handleCheck={setHasWeekend}
                  details='Saturday - Sunday'
                  paddingRight='10px'
                  fontSize='14px'
                />
              </div>
              <p className='fontSize17Title'>
                What time are you available? (Can choose multiple)
              </p>
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
                  details='Before 12:00pm (noon)'
                  paddingRight='10px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={has12To18}
                  handleCheck={setHas12To18}
                  details='12:00pm (noon) - 18:00'
                  paddingRight='10px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasAfter18}
                  handleCheck={setHasAfter18}
                  details='After 18:00'
                  paddingRight='10px'
                  fontSize='14px'
                />
              </div>

              <p className='fontSize17Title'>What languages do you speak?</p>
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
                  details='English'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasGerman}
                  handleCheck={setHasGerman}
                  details='German'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasFrench}
                  handleCheck={setHasFrench}
                  details='French'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasItalien}
                  handleCheck={setHasItalien}
                  details='Italian'
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
                  details='Chinese'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasCantonese}
                  handleCheck={setHasCantonese}
                  details='Cantonese'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasVietnamese}
                  handleCheck={setHasVietnamese}
                  details='Vietnamese'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasKorean}
                  handleCheck={setHasKorean}
                  details='Korean'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasJapanese}
                  handleCheck={setHasJapanese}
                  details='Japanese'
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
                  details='Turkish'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasUkrainian}
                  handleCheck={setHasUkrainian}
                  details='Ukrainian'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasArabic}
                  handleCheck={setHasArabic}
                  details='Arabic'
                  paddingRight='10px'
                  marginBottom='5px'
                  fontSize='14px'
                />
                <CheckBox
                  checked={hasOthers}
                  handleCheck={setHasOthers}
                  details='Others (Please specify in Notes below)'
                  paddingRight='10px'
                  marginBottom='25px'
                  fontSize='14px'
                />
              </div>
              {/* {!props.isHelpee && (
                <FullLineTextBox
                  title={'Price per 30 minute (in EUR)'}
                  placeholder={'e.g. 20'}
                  inputRef={priceRef}
                />
              )} */}
              <FullLineTextBox
                title={'Introduction'}
                placeholder={'Introduce yourself in one sentence!'}
                inputRef={introductionRef}
                marginTop='15px'
              />
              <FullLineTextBox
                title={'Notes'}
                placeholder={
                  'Please specify languages you speak (if you selected others above).'
                }
                inputRef={notesRef}
              />
              <ConfirmBtn
                cta='Confirm'
                disable={!enableBtn}
                handleConfirm={handleConfirm}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicFormPage;
