import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  clearSetPayPalAccountStatus,
  getHelperUserData,
  setPayPalAccount,
} from '../store/helper/helper-actions';
import FullLineTextBox from '../components/FullLineTextBox';
import ConfirmBtn from '../components/ConfirmBtn';
import { getHelpeeUserData } from '../store/helpee/helpee-actions';
const MySwal = withReactContent(Swal);

const SetPayPalPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const payPalNameRef = useRef();
  const payPalEmailRef = useRef();
  const consentRef = useRef();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const { helperData } = useSelector((state) => state.helper);
  const { helpeeData } = useSelector((state) => state.helpee);

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
  const [originalPayPalAccount, setOriginalPayPalAccount] = useState('');
  const [showUpdateAccountPart, setShowUpdateAccountPart] = useState(true);

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
    if (payPalNameRef && payPalNameRef.current) {
      payPalName = payPalNameRef.current.value;
    }
    if (payPalEmailRef && payPalEmailRef.current) {
      payPalEmail = payPalEmailRef.current.value;
    }
    const data = {
      status: 'agreed_employment_contract',
      payPalReceiverName: payPalName,
      bankAccount: payPalEmail,
      id: props.isHelpee ? props.helpeeId : props.helperId,
      role: props.isHelpee ? 'helpee' : 'helper',
    };
    try {
      dispatch(setPayPalAccount(data));
      setIsLoading(true);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }
  function handleShowUpdateAccountPart(e) {
    e.preventDefault();
    setShowUpdateAccountPart(true);
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
        let path;
        path = props.isHelpee
          ? `/${currentLanguage}/helpee/bookings?refId=${refId}`
          : `/${currentLanguage}/helper/bookings?refId=${refId}`;
        navigate(path);
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
    props.isHelpee,
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

  useEffect(() => {
    if (props.isHelpee) {
      dispatch(getHelpeeUserData({ helpeeUserId: props.helpeeId }));
    } else {
      dispatch(getHelperUserData({ helperUserId: props.helperId }));
    }
  }, [props.helperId, props.isHelpee, props.helpeeId, dispatch]);

  useEffect(() => {
    if (
      !props.isHelpee &&
      helperData &&
      helperData[0] &&
      helperData[0].bankAccount
    ) {
      setOriginalPayPalAccount(helperData[0].bankAccount);
      setShowUpdateAccountPart(false);
    } else if (
      props.isHelpee &&
      helpeeData &&
      helpeeData[0] &&
      helpeeData[0].bankAccount
    ) {
      setOriginalPayPalAccount(helpeeData[0].bankAccount);
      setShowUpdateAccountPart(false);
    }
  }, [helperData, helpeeData, props.isHelpee]);


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
            {!showUpdateAccountPart && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ margin: 'auto' }}>
                  {t('your_current_paypal_account')}:
                </div>
                <div style={{ margin: 'auto' }}>{originalPayPalAccount}</div>
                <div style={{ margin: 'auto', marginTop: '10px' }}>
                  <ConfirmBtn
                    cta={t('change_paypal_account')}
                    disable={false}
                    handleConfirm={handleShowUpdateAccountPart}
                  />
                </div>
              </div>
            )}
            {!!showUpdateAccountPart && (
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
                        href={`/${currentLanguage}/contract-terms?refId=${refId}`}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPayPalPage;
