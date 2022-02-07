import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropDown from '../components/Dropdown';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  industryOptions,
  jobOptions,
  countryOptions,
  WFHOptions,
  companySizeOptions,
  yearsOptions,
} from '../store/options/service-options';

import { onSubmitUpdateHelpeeJobData } from '../store/helpee/helpee-actions';
import { onSubmitUpdateHelperJobData } from '../store/helper/helper-actions';

const JobFormPage = (props) => {
  const dispatch = useDispatch();
  const industryRef = useRef();
  const jobRef = useRef();
  const countryRef = useRef();
  const WFHRef = useRef();
  const companySizeRef = useRef();
  const yearsRef = useRef();
  const notesRef = useRef();
  const navigate = useNavigate();
  async function handleConfirm(e) {
    e.preventDefault();
    let notes;
    if (notesRef && notesRef.current) {
      notes = notesRef.current.value;
    }
    const data = {
      industry,
      job,
      country,
      WFH,
      companySize,
      years,
      notes: notes || '',
    };
    try {
      if (props.isHelpee) {
        dispatch(onSubmitUpdateHelpeeJobData(data));
        navigate('/helpee/final-form', { replace: true });
      } else {
        dispatch(onSubmitUpdateHelperJobData(data));
        navigate('/helper/final-form', { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }
  const [industry, setIndustry] = useState('default');
  const [job, setJob] = useState('default');
  const [country, setCountry] = useState('default');
  const [WFH, setWFH] = useState('default');
  const [companySize, setCompanySize] = useState('default');
  const [years, setYears] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  useEffect(() => {
    setEnableBtn(
      industry !== 'default' &&
        job !== 'default' &&
        country !== 'default' &&
        WFH !== 'default' &&
        companySize !== 'default' &&
        years !== 'default'
    );
  }, [industry, job, country, WFH, companySize, years]);
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        {props.isHelpee && 'What kind of job are you searching?'}
        {!props.isHelpee && 'What kind of job did you have?'}
      </h1>
      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <div className='form-row'>
                <DropDown
                  selected={industry}
                  handleSelect={setIndustry}
                  title={'Industry *'}
                  selectRef={industryRef}
                  options={industryOptions}
                />
                <DropDown
                  selected={job}
                  handleSelect={setJob}
                  title={'Job *'}
                  selectRef={jobRef}
                  options={jobOptions}
                />
              </div>
              <div className='form-row last'>
                <DropDown
                  selected={country}
                  handleSelect={setCountry}
                  title={'Working Country *'}
                  selectRef={countryRef}
                  options={countryOptions}
                />
                <DropDown
                  selected={WFH}
                  handleSelect={setWFH}
                  title={'Working from home? *'}
                  selectRef={WFHRef}
                  options={WFHOptions}
                />
              </div>
              <div className='form-row'>
                <DropDown
                  selected={companySize}
                  handleSelect={setCompanySize}
                  title={'Company Size *'}
                  selectRef={companySizeRef}
                  options={companySizeOptions}
                />
                <DropDown
                  selected={years}
                  handleSelect={setYears}
                  title={'Year of Experience on that job *'}
                  selectRef={yearsRef}
                  options={yearsOptions}
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

export default JobFormPage;
