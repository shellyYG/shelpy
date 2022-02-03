import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DropDown from '../../components/Dropdown';
import FullLineTextBox from '../../components/FullLineTextBox';
import ConfirmBtn from '../../components/ConfirmBtn';
import {
  ageOptions,
} from '../../store/options/service-options';

import { onUploadProfilePicture, onSubmitUploadHelperData } from '../../store/helper/helper-actions';
import LeftHalfLineTextBox from '../../components/LeftHalfLineTextBox';

const MySwal = withReactContent(Swal);

const HelperBasicFormPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ageRef = useRef();
  const notesRef = useRef();
  const usernameRef = useRef();
  
  const [age, setAge] = useState('default');
  const [profilePic, setProfilePic] = useState();
  const [certificate, setCertificate] = useState();
  const [profilePicSource, setProfilePicSource] = useState('')
  const [enableBtn, setEnableBtn] = useState(false);

  const { profilePicPath } = useSelector((state) => state.helper);
  
  async function handleProfilePicUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    
    if (file.size > 1000000) {
      await MySwal.fire({
        title: <strong>Oops!</strong>,
        html: <p>Max. File size is 1MB. Please choose a smaller file to upload.</p>,
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
        html: <p>Only accepts .jpg, .jpeg or .png file. Please choose another file to upload.</p>,
        icon: 'error',
      });
      return;
    }
    setProfilePic(file);
    const data = new FormData();
    data.append('profilePic', file);
    try {
      dispatch(onUploadProfilePicture(data));
      // navigate('/helpee/final-form', { replace: true });
    } catch (err) {
      console.error(err);
    }
  }
  async function handleResumeUpload(e) {
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
    let notes;
    let username;
    if (notesRef && notesRef.current) {
      notes = notesRef.current.value;
    }
    if (usernameRef && usernameRef.current) {
      username = usernameRef.current.value;
    }
    const data = new FormData();
    data.append('username', username);
    data.append('age', age);
    data.append('notes', notes);
    data.append('certificate', certificate); // need to append file as last object

    console.log('data to send: ', data); // console.log(data) // browser will be empty
    try {
      dispatch(onSubmitUploadHelperData(data));
      // navigate('/helpee/final-form', { replace: true });
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    setEnableBtn(usernameRef && age !== 'default' && certificate);
  }, [usernameRef, age, certificate]);
  
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        Apply to be a helper
      </h1>

      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action='' method='post' encType='multipart/form-data'>
              <div className='form-row'>
                <div
                  className='form-wrapper'
                  style={{ width: '100%', margin: '0px' }}
                >
                  {!profilePic && (
                    <div className='blankProfileImageBx'>
                      {' '}
                      <div className='uploadInnerDiv'>
                        <label className='uploadLabel' for='profilePic'>
                          Upload Picture
                        </label>
                        <input
                          type='file'
                          id='profilePic'
                          onChange={handleProfilePicUpload}
                          hidden={true}
                        />
                      </div>{' '}
                    </div>
                  )}
                  {profilePic && (!profilePicPath || profilePicPath.length < 1) && 
                    <div className='blankProfileImageBx'>
                      <div style={{ margin: 'auto'}}>
                        <p style={{ color: 'black'}}>  
                          Loading...
                        </p>
                      </div>
                    </div>
                  }
                  {profilePicPath && profilePicPath.length > 1 && (
                    <div className='profileImageBx'>
                      <img src={profilePicPath} alt='connection'></img>
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
              <div className='form-row'>
                <LeftHalfLineTextBox
                  title={'LinkedIn Link'}
                  placeholder={
                    'https://www.linkedin.com/in/your-linkedin-profile'
                  }
                  inputRef={notesRef}
                />
                <div className='form-wrapper'>
                  <label>Reseme/files</label>
                  {!certificate && (
                    <>
                      <label className='uploadLabel' for='resume'>
                        Upload a file
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

export default HelperBasicFormPage;
