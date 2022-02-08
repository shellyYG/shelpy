import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import { useEffect } from 'react';
import CheckBox from '../components/CheckBox';
import {
  clearRequestStatus,
  postHelpeeRequestForm,
} from '../store/helpee/helpee-actions';
import {
  clearOfferStatus,
  postHelperOfferForm,
} from '../store/helper/helper-actions';

const MySwal = withReactContent(Swal);

const FinalFormPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notesRef = useRef();
  const priceRef = useRef();

  const [loading, setIsLoading] = useState(false);

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

  const {
    helpeeUserId,

    globalHelpeeJobOrUniTarget,
    globalHelpeeUniSchool,
    globalHelpeeUniDepartment,
    globalHelpeeUniCountry,
    globalHelpeeUniDegree,
    globalHelpeeUniNotes,

    globalHelpeeJobIndustry,
    globalHelpeeJobJob,
    globalHelpeeJobCountry,
    globalHelpeeJobWFH,
    globalHelpeeJobCompanySize,
    globalHelpeeJobYears,
    globalHelpeeJobNotes,

    globalHelpeeSelfEmployedType,
    globalHelpeeSelfEmployedProfession,
    globalHelpeeSelfEmployedCountry,
    globalHelpeeSelfEmployedYears,
    globalHelpeeSelfEmployedNotes,
  } = useSelector((state) => state.helpee);

  const {
    helperUserId,

    globalHelperJobOrUniTarget,
    globalHelperUniSchool,
    globalHelperUniDepartment,
    globalHelperUniCountry,
    globalHelperUniDegree,
    globalHelperUniNotes,

    globalHelperJobIndustry,
    globalHelperJobJob,
    globalHelperJobCountry,
    globalHelperJobWFH,
    globalHelperJobCompanySize,
    globalHelperJobYears,
    globalHelperJobNotes,

    globalHelperSelfEmployedType,
    globalHelperSelfEmployedProfession,
    globalHelperSelfEmployedCountry,
    globalHelperSelfEmployedYears,
    globalHelperSelfEmployedNotes,
  } = useSelector((state) => state.helper);

  const { requestStatus, requestStatusTitle, requestStatusMessage } =
    useSelector((state) => state.helpeeNotification);

  const { offerStatus, offerStatusTitle, offerStatusMessage } = useSelector(
    (state) => state.helperNotification
  );

  if (loading) {
    MySwal.fire({
      title: 'Loading...',
      html: 'Please do not close the window.',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }
  async function handleConfirm(e) {
    e.preventDefault();
    let notes;
    let price;
    let data;
    if (notesRef && notesRef.current) {
      notes = notesRef.current.value;
    }
    if (priceRef && priceRef.current) {
      price = priceRef.current.value;
    }

    if (props.isHelpee) {
      data = {
        helpeeUserId,
        type: globalHelpeeJobOrUniTarget,
        globalHelpeeUniSchool,
        globalHelpeeUniDepartment,
        globalHelpeeUniCountry,
        globalHelpeeUniDegree,
        globalHelpeeUniNotes,

        globalHelpeeJobIndustry,
        globalHelpeeJobJob,
        globalHelpeeJobCountry,
        globalHelpeeJobWFH,
        globalHelpeeJobCompanySize,
        globalHelpeeJobYears,
        globalHelpeeJobNotes,

        globalHelpeeSelfEmployedType,
        globalHelpeeSelfEmployedProfession,
        globalHelpeeSelfEmployedCountry,
        globalHelpeeSelfEmployedYears,
        globalHelpeeSelfEmployedNotes,

        helpeeHasMonToFri: hasMonToFri,
        helpeeHasWeekend: hasWeekend,

        helpeeHasBefore12: hasBefore12,
        helpeeHas12To18: has12To18,
        helpeeHasAfter18: hasAfter18,

        helpeeHasEnglish: hasEnglish,
        helpeeHasGerman: hasGerman,
        helpeeHasFrench: hasFrench,
        helpeeHasItalien: hasItalien,
        helpeeHasChinese: hasChinese,
        helpeeHasCantonese: hasCantonese,
        helpeeHasVietnamese: hasVietnamese,
        helpeeHasKorean: hasKorean,
        helpeeHasJapanese: hasJapanese,
        helpeeHasTurkish: hasTurkish,
        helpeeHasUkrainian: hasUkrainian,
        helpeeHasArabic: hasArabic,
        helpeeHasOthers: hasOthers,

        finalNotes: notes,

        step: 'request_submitted',
        status: 'Not Fulfilled', // Not Fulfilled or Fulfilled
      };
      console.log('data to post: ', data);
      dispatch(postHelpeeRequestForm(data));
      setIsLoading(true);
    } else {
      data = {
        helperUserId,
        type: globalHelperJobOrUniTarget,
        globalHelperUniSchool,
        globalHelperUniDepartment,
        globalHelperUniCountry,
        globalHelperUniDegree,
        globalHelperUniNotes,

        globalHelperJobIndustry,
        globalHelperJobJob,
        globalHelperJobCountry,
        globalHelperJobWFH,
        globalHelperJobCompanySize,
        globalHelperJobYears,
        globalHelperJobNotes,

        globalHelperSelfEmployedType,
        globalHelperSelfEmployedProfession,
        globalHelperSelfEmployedCountry,
        globalHelperSelfEmployedYears,
        globalHelperSelfEmployedNotes,

        helperHasMonToFri: hasMonToFri,
        helperHasWeekend: hasWeekend,

        helperHasBefore12: hasBefore12,
        helperHas12To18: has12To18,
        helperHasAfter18: hasAfter18,

        helperHasEnglish: hasEnglish,
        helperHasGerman: hasGerman,
        helperHasFrench: hasFrench,
        helperHasItalien: hasItalien,
        helperHasChinese: hasChinese,
        helperHasCantonese: hasCantonese,
        helperHasVietnamese: hasVietnamese,
        helperHasKorean: hasKorean,
        helperHasJapanese: hasJapanese,
        helperHasTurkish: hasTurkish,
        helperHasUkrainian: hasUkrainian,
        helperHasArabic: hasArabic,
        helperHasOthers: hasOthers,

        price,

        finalNotes: notes,

        step: 'first_offer_submitted',
        status: 'created',
      };
      dispatch(postHelperOfferForm(data));
      setIsLoading(true);
    }
    console.log('data to dispatch: ', data);
  }
  // Is Helpee:
  useEffect(() => {
    if (requestStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'error',
        });
        dispatch(clearRequestStatus());
      }
      sweetAlertAndClearStatus(requestStatus, requestStatusMessage);
      return;
    } else if (requestStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
        let path = '/helpee/dashboard';
        navigate(path, { replace: true });
      }
      dispatch(clearRequestStatus());
      sweetAlertAndNavigate(requestStatus, requestStatusMessage);
    }
  }, [
    requestStatus,
    requestStatusTitle,
    requestStatusMessage,
    navigate,
    dispatch,
  ]);

  // Is Helper:
  useEffect(() => {
    if (offerStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>{message}</p>,
          icon: 'error',
        });
        dispatch(clearOfferStatus());
      }
      sweetAlertAndClearStatus(offerStatus, offerStatusMessage);
      return;
    } else if (offerStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
        let path = '/helper/dashboard';
        navigate(path, { replace: true });
      }
      dispatch(clearOfferStatus());
      sweetAlertAndNavigate(offerStatus, offerStatusMessage);
    }
  }, [offerStatus, offerStatusTitle, offerStatusMessage, navigate, dispatch]);

  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        What time and languages best suits you?
      </h1>
      <div className='form-center-wrapper'>
        <div className='container'>
          <div className='form-inner'>
            <form action=''>
              <p className='fontSize17Title'>
                What days are you available? (Can choose multiple)
              </p>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
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
              <div style={{ display: 'flex', flexDirection: 'row' }}>
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
              <div style={{ display: 'flex', flexDirection: 'row' }}>
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
              <div style={{ display: 'flex', flexDirection: 'row' }}>
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
              <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                  details='Others (Please specify below)'
                  paddingRight='10px'
                  marginBottom='25px'
                  fontSize='14px'
                />
              </div>
              {!props.isHelpee && (
                <FullLineTextBox
                  title={'Price per 30 minute (in EUR)'}
                  placeholder={'e.g. 20'}
                  inputRef={priceRef}
                />
              )}
              <FullLineTextBox
                title={'Notes'}
                placeholder={'Please specify languages you speak.'}
                inputRef={notesRef}
              />
              <ConfirmBtn
                cta='Confirm'
                disable={false}
                handleConfirm={handleConfirm}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalFormPage;
