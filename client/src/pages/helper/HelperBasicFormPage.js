import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import FullLineTextBox from '../../components/FullLineTextBox';
import ConfirmBtn from '../../components/ConfirmBtn';
import {
  ageOptions,
  departmentOptions,
  countryOptions,
  degreeOptions,
} from '../../store/options/service-options';

import { onSubmitUploadHelperData } from '../../store/helper/helper-actions';
import LeftHalfLineTextBox from '../../components/LeftHalfLineTextBox';
import axios from 'axios';

const HelperBasicFormPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ageRef = useRef();
  const nationalityRef = useRef();
  const degreeRef = useRef();
  const notesRef = useRef();
  const usernameRef = useRef();
  
  const [nationality, setNationality] = useState('default');
  const [age, setAge] = useState('default');
  const [profilePic, setProfilePic] = useState();
  const [certificate, setCertificate] = useState();
  
  const [matchedDepartments, setMatchedDepartments] = useState([]);
  const [department, setdepartment] = useState('default');
  const [degree, setdegree] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  
  async function handleProfilePicUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setProfilePic(file);
  }
  async function handleResumeUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
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
    data.append('document', profilePic); // need to append file as last object
    data.append('document', certificate); // need to append file as last object

    console.log('data to send: ', data); // console.log(data) // browser will be empty
    
    axios
      .post('https://httpbin.org/anything', data)
      .then((res) => console.log('binres', res))
      .catch((err) => console.log(err));
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
  useEffect(() => {
    if (age) {
      const departments = departmentOptions[age];
      setMatchedDepartments(departments);
    }
  }, [age]);
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
                  {profilePic && (
                    <div className='profileImageBx'>
                      <img src='/dinner.jpeg' alt='connection'></img>
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
                    <div style={{ padding: '10px 0'}}>
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
