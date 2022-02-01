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
  const [certificate, setCertificate] = useState();
  const [certificate2, setCertificate2] = useState();
  const [matchedDepartments, setMatchedDepartments] = useState([]);
  const [department, setdepartment] = useState('default');
  const [degree, setdegree] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);

  async function handlefileUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setCertificate(file);
  }
  async function handlefileUpload2(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setCertificate2(file);
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
    data.append('certificate', certificate2); // need to append file as last object
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
        Apply for becoming a helper
      </h1>

      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action='' method='post' encType='multipart/form-data'>
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
                  <input type='file' onChange={handlefileUpload} />
                </div>
              </div>
              <div className='form-row'>
                <div className='form-wrapper'>
                  <div
                    style={{
                      backgroundColor: 'pink',
                      textAlign: 'center',
                      padding: '30px',
                      margin: '20px auto 0px',
                      borderRadius: '50%',
                      width: '150px',
                      height: '150px',
                      display: 'flex',
                    }}
                  >
                    {' '}
                    <div style={{ margin: 'auto', cursor: 'pointer' }}>
                      <label>Profile Picture</label>
                      <input type='file' onChange={handlefileUpload2} />
                    </div>{' '}
                  </div>
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
