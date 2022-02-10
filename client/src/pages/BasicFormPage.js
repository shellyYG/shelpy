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

const MySwal = withReactContent(Swal);

const BasicFormPage = (props) => {
  console.log('helpeeId: ', props.helpeeUserId, 'helperId: ', props.helperUserId, 'isHelpee?', props.isHelpee);
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

  if (loading) {
    MySwal.fire({
      title: 'Loading...',
      html: 'Please do not close the window.',
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

    if (file.size > 1000000) {
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
    if (file.size > 1000000) {
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
      data.append('helperUserId', props.helperUserId);
      data.append('username', username);
      data.append('isAnonymous', isAnonymous);
      data.append('isMarketing', isMarketing);
      data.append('age', age);
      data.append('linkedInUrl', linkedInUrl);
      data.append('introduction', introduction);
      data.append('notes', notes);
      data.append('certificate', certificate); // need to append file as last object
      console.log('data to send: ', data); // console.log(data) // browser will be empty
    } else { // could be helpee or helper
      if (props.isHelpee) {
        data = {
          helpeeUserId: props.helpeeUserId,
          isAnonymous,
          username,
          age,
          introduction,
          notes,
        };
      } else {
        data = {
          helperUserId: props.helperUserId,
          isAnonymous,
          isMarketing,
          username,
          age,
          linkedInUrl,
          introduction,
          notes,
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
    setEnableBtn(
      usernameRef && age !== 'default' && (linkedInUrlRef || certificate)
    );
  }, [usernameRef, linkedInUrlRef, age, certificate]);

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
        navigate('/helper/add-service', { replace: true });
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
        navigate('/helpee/service-types', { replace: true });
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
                        <label className='uploadLabel' for='profilePic'>
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
                          <p style={{ color: 'black' }}>Loading...</p>
                        </div>
                      </div>
                    )}
                  {!isAnonymous &&
                    !props.isHelpee &&
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
                          <p style={{ color: 'black' }}>Loading...</p>
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
                  title={'Nickname *'}
                  placeholder={'Enter Nickname (e.g. Angela)'}
                  inputRef={usernameRef}
                />
                <DropDown
                  selected={age}
                  handleSelect={setAge}
                  title={'Age *'}
                  selectRef={ageRef}
                  options={ageOptions}
                />
              </div>
              {!props.isHelpee && (
                <div className='form-row'>
                  <LeftHalfLineTextBox
                    title={'LinkedIn Link (or upload Resume)'}
                    placeholder={
                      'https://www.linkedin.com/in/your-linkedin-profile'
                    }
                    inputRef={linkedInUrlRef}
                  />
                  <div className='form-wrapper' style={{ margin: 'auto' }}>
                    <label>Resume/files (or linkedin link)</label>
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
                      ? 'Ask question anonymously (your profile picture will be hIde).'
                      : 'Answer question anonymously (your profile picture will be hIde).'
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
              <FullLineTextBox
                title={'Introduction'}
                placeholder={'Introduce yourself in one sentence!'}
                inputRef={introductionRef}
                marginTop='15px'
              />
              <FullLineTextBox
                title={'Notes'}
                placeholder={'If you choose others, please specify here.'}
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
