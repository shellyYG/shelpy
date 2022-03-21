import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  clearSetPayPalAccountStatus,
  setPayPalAccount,
} from '../../store/helper/helper-actions';
import FullLineTextBox from '../../components/FullLineTextBox';
import ConfirmBtn from '../../components/ConfirmBtn';
const MySwal = withReactContent(Swal);

const HelpersetPayPalPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payPalNameRef = useRef();
  const payPalEmailRef = useRef();
  const consentRef = useRef();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const {
    setPayPalAccountStatus,
    setPayPalAccountStatusTitle,
    setPayPalAccountStatusMessage,
  } = useSelector((state) => state.helper);

  const [loading, setIsLoading] = useState(false);
  const [hasGiveConsent, setHasGiveConsent] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);
  const [payPalNameString, setPayPalNameString] = useState('');
  const [payPalAccountString, setPayPalAccountString] = useState('');

  if (loading) {
    MySwal.fire({
      title: t('loading'),
      html: t('do_not_close_window'),
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }
  function handleHasGiveConsent() {
    setHasGiveConsent(!hasGiveConsent);
  }
  function handlePayPalNameTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setPayPalNameString(typingInput);
  }
  function handlePayPalAccountTyping(e) {
    e.preventDefault();
    const typingInput = e.target.value;
    setPayPalAccountString(typingInput);
  }
  function handleConfirm(e) {
    e.preventDefault();
    let payPalName;
    let payPalEmail;
    if (payPalNameRef && payPalNameRef.current){
      payPalName = payPalNameRef.current.value;
    }
    if (payPalEmailRef && payPalEmailRef.current){
      payPalEmail = payPalEmailRef.current.value;
    }
    const data = {
      status: 'agreed_employment_contract',
      payPalReceiverName: payPalName,
      bankAccount: payPalEmail,
      id: props.helperId,
    };
    try {
      dispatch(setPayPalAccount(data));
      setIsLoading(true);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
    
  }

  useEffect(() => {
    if (setPayPalAccountStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          html: <p>{t(message)}</p>,
          icon: 'error',
        });
        dispatch(clearSetPayPalAccountStatus());
      }
      sweetAlertAndClearStatus(
        setPayPalAccountStatusTitle,
        setPayPalAccountStatus,
        setPayPalAccountStatusMessage
      );
      return;
    } else if (setPayPalAccountStatus === 'success') {
      setIsLoading(false);
      async function sweetAlertAndNavigate(title, message) {
        await MySwal.fire({
          title: <strong>{t(title)}</strong>,
          imageWidth: 442,
          imageHeight: 293,
          html: <p>{t(message)}</p>,
          icon: 'success',
        });
        navigate(`/${currentLanguage}/helpee/bookings?refId=${refId}`);
      }
      dispatch(clearSetPayPalAccountStatus());
      sweetAlertAndNavigate(
        setPayPalAccountStatus,
        setPayPalAccountStatusMessage
      );
    }
  }, [
    t,
    navigate,
    setPayPalAccountStatus,
    setPayPalAccountStatusTitle,
    setPayPalAccountStatusMessage,
    dispatch,
    currentLanguage,
    refId,
  ]);

  useEffect(() => {
    setEnableBtn(payPalNameString && payPalAccountString && hasGiveConsent);
  }, [payPalNameString, payPalAccountString, hasGiveConsent]);

  return (
    <div
      className='main-content-wrapper-homepage'
      style={{ backgroundImage: 'url(/static-imgs/helper-home.jpeg)' }}
    >
      <div className='section-center-align-landing'>
        <div className='centerWrapper' style={{ flexDirection: 'column' }}>
          <div>
            <h2 style={{ textAlign: 'center' }}>
              {t('payment_receive_account')}
            </h2>
            <p
              style={{
                textAlign: 'center',
                margin: '5px auto 5px',
                fontSize: '12px',
              }}
            >
              {t('payment_payments_notes')} <br />
            </p>
            <p
              style={{
                textAlign: 'center',
                fontSize: '10px',
                marginBottom: '10px',
              }}
            >
              {t('apply_paypal_account')} <br />
            </p>
          </div>
          <div
            style={{
              marginTop: '10px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FullLineTextBox
                title={`${t('paypal_receiver_name')} *`}
                placeholder={'Shelly Yang'}
                labelColor='black'
                inputRef={payPalNameRef}
                id='paypal-name'
                onChange={handlePayPalNameTyping}
              />
              <FullLineTextBox
                title={`${t('paypal_email')} *`}
                placeholder={'xxx@gmail.com'}
                labelColor='black'
                inputRef={payPalEmailRef}
                id='paypal-acc'
                onChange={handlePayPalAccountTyping}
              />
              <div
                className='form-row'
                style={{ marginRight: 'auto', marginBottom: '20px' }}
              >
                <input
                  type='checkbox'
                  checked={hasGiveConsent}
                  onChange={handleHasGiveConsent}
                  style={{
                    cursor: 'pointer',
                    marginBottom: 'auto',
                    width: '30px',
                  }}
                  ref={consentRef}
                />
                <div className='checkbox-text-password-page'>
                  <p
                    style={{
                      textAlign: 'start',
                      marginBottom: '10px',
                      fontSize: '14px',
                      color: 'black',
                    }}
                  >
                    {t('helper_sign_contract_introduction')}{' '}
                    <a
                      href={`/${currentLanguage}/helper-terms?refId=${refId}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {t('helper_home_employee_contract')}
                    </a>
                    {t('home_ending')} <br />
                  </p>
                </div>
              </div>
              <ConfirmBtn
                cta={t('confirm')}
                disable={!enableBtn}
                handleConfirm={handleConfirm}
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpersetPayPalPage;
