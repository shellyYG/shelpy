import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import FullLineTextBox from '../../components/FullLineTextBox';
import ConfirmBtn from '../../components/ConfirmBtn';
import {
  countryOptions,
  typeOptions,
  professionOptions,
  yearsOptions,
} from '../../store/options/service-options';

import { onSubmitUpdateSelfEmployedData } from '../../store/helpee/helpee-actions';

const HelpeeSelfEmployedPage = (props) => {
  const dispatch = useDispatch();
  const typeRef = useRef();
  const professionRef = useRef();
  const countryRef = useRef();
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
      type,
      profession,
      country,
      years,
      notes: notes || '',
    };
    try {
      dispatch(onSubmitUpdateSelfEmployedData(data));
      navigate('/helpee/final-form', { replace: true });
    } catch (err) {
      console.error(err);
    }
  }
  
  const [type, setType] = useState('default');
  const [profession, setProfession] = useState('default');
  const [country, setCountry] = useState('default');
  const [years, setYears] = useState('default');
  const [enableBtn, setEnableBtn] = useState(false);
  console.log(
    'type: ',
    type,
    'profession: ',
    profession
  );
  useEffect(() => {
    setEnableBtn(
      country !== 'default' &&
        type !== 'default' &&
        profession !== 'default' &&
        years !== 'default'
    );
  }, [type, profession, country, years]);
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
                  selected={type}
                  handleSelect={setType}
                  title={'Type *'}
                  selectRef={typeRef}
                  options={typeOptions}
                />
                <DropDown
                  selected={profession}
                  handleSelect={setProfession}
                  title={'Profession *'}
                  selectRef={professionRef}
                  options={professionOptions}
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
                  selected={years}
                  handleSelect={setYears}
                  title={'Year of Experience on that profession *'}
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

export default HelpeeSelfEmployedPage;
