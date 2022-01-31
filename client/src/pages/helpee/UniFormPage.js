import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import FullLineTextBox from '../../components/FullLineTextBox';
import ConfirmBtn from '../../components/ConfirmBtn';
import {
  schoolOptions,
  departmentOptions,
  countryOptions,
  degreeOptions,
} from '../../store/options/service-options';

import { onSubmitUpdateUniData } from '../../store/helpee/helpee-actions';

const UniFormPage = (props) => {
  const dispatch = useDispatch();
  const schoolRef = useRef();
  const departmentRef = useRef();
  const countryRef = useRef();
  const degreeRef = useRef();
  const notesRef = useRef();
  const navigate = useNavigate();
  async function handleConfirm(e) {
    e.preventDefault();
    let notes;
    if (notesRef && notesRef.current) {
      notes = notesRef.current.value;
    }
    const data = {
      school,
      department,
      country,
      degree,
      notes: notes || '',
    };
    try {
      dispatch(onSubmitUpdateUniData(data));
      navigate('/final-form', { replace: true });
    } catch (err) {
      console.error(err);
    }
  }
  const [country, setCountry] = useState('default');
  const [school, setschool] = useState('default');
  const [matchedDepartments, setMatchedDepartments] = useState([]);
  const [department, setdepartment] = useState('default');
  const [degree, setdegree] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  useEffect(() => {
    setEnableBtn(country !== 'default' && school !== 'default' && department !== 'default' && degree !== 'default')
  }, [school, department, country, degree]);
  useEffect(() => {
    if(school) {
        const departments = departmentOptions[school];
        setMatchedDepartments(departments);
    }
  },[school])
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        What do you want to study?
      </h1>
      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <div className='form-row'>
                <DropDown
                  selected={school}
                  handleSelect={setschool}
                  title={'School *'}
                  selectRef={schoolRef}
                  options={schoolOptions}
                />
                <DropDown
                  selected={department}
                  handleSelect={setdepartment}
                  title={'Department *'}
                  selectRef={departmentRef}
                  options={matchedDepartments}
                />
              </div>
              <div className='form-row last'>
                <DropDown
                  selected={country}
                  handleSelect={setCountry}
                  title={'Country *'}
                  selectRef={countryRef}
                  options={countryOptions}
                />
                <DropDown
                  selected={degree}
                  handleSelect={setdegree}
                  title={'Degree *'}
                  selectRef={degreeRef}
                  options={degreeOptions}
                />
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

export default UniFormPage;
