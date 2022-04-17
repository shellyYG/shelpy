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

const ReferralPage = (props) => {
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
  const { helpeeData } = useSelector(
    (state) => state.helpee
  );
  const { helperData } = useSelector(
    (state) => state.helper
  );

  const [loading, setIsLoading] = useState(false);
  const [hasGiveConsent, setHasGiveConsent] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);
  const [payPalNameString, setPayPalNameString] = useState('');
  const [payPalAccountString, setPayPalAccountString] = useState('');
  const [enableEditPaypal, setEnableEditPaypal] = useState(true);

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
      id: props.isHelpee? props.helpeeId: props.helperId,
      role: props.isHelpee? 'helpee': 'helper',
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

  function handleShowPayPalSection(e){
    e.preventDefault();
    let path = props.isHelpee
      ? `/${currentLanguage}/helpee/paypal-account`
      : `/${currentLanguage}/helper/paypal-account`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }

  useEffect(() => {
    setEnableBtn(payPalNameString && payPalAccountString && hasGiveConsent);
  }, [payPalNameString, payPalAccountString, hasGiveConsent]);

  useEffect(() => {
    if (props.isHelpee) {
      dispatch(getHelpeeUserData({ helpeeUserId: props.helpeeId }));
    } else {
      dispatch(getHelperUserData({ helperUserId: props.helperId }));
    }
  }, [props.isHelpee, props.helpeeId, props.helperId, dispatch]);

  useEffect(()=>{
    if (props.isHelpee) {
      if (helpeeData && helpeeData[0] && helpeeData[0].payPalReceiverName) {
        setEnableEditPaypal(false);
      }
    } else {
      if (helperData && helperData[0] && helperData[0].payPalReceiverName) {
        setEnableEditPaypal(false);
      }
    }
  },[helpeeData, helperData, props.isHelpee])

  return (
    <div
      className='main-content-wrapper-homepage'
      style={{
        backgroundImage: props.isHelpee
          ? 'url(/static-imgs/helpee-home.jpeg)'
          : 'url(/static-imgs/helper-home.jpeg)',
      }}
    >
      <div className='section-center-align-landing'>
        <div className='centerWrapper' style={{ flexDirection: 'column' }}>
          <div>
            <h2 style={{ textAlign: 'center' }}>{t('referral_terms')}</h2>
            <h3 style={{ textAlign: 'center' }}>{t('referral_intro1')}</h3>
            <h3 style={{ textAlign: 'center' }}>{t('referral_intro2')}</h3>
            <h3 style={{ textAlign: 'center', color: 'red' }}>
              {t('your_referral_link_title')}:
            </h3>

            <div className='personalLinkWrapper'>
              <p style={{ lineBreak: 'anywhere' }}>
                {props.isHelpee &&
                  `https://shelpy.co/${currentLanguage}/helpee/home?refId=helpee${props.helpeeId}`}
                {!props.isHelpee &&
                  `https://shelpy.co/${currentLanguage}/helpee/home?refId=helper${props.helperId}`}
              </p>
            </div>
            <>
              <h2 style={{ textAlign: 'center' }}>
                {t('payment_receive_account')}
              </h2>
              <h4 style={{ textAlign: 'center', color: 'red' }}>
                {t('you_must_enter_payment')}
              </h4>
              <p
                style={{
                  textAlign: 'center',
                  margin: '5px auto 5px',
                  fontSize: '12px',
                }}
              >
                {t('payment_payments_notes')} <br />
              </p>
            </>
            <div style={{ textAlign: 'center' }}>
              <ConfirmBtn
                cta={t('update_paypal_account')}
                disable={false}
                handleConfirm={handleShowPayPalSection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
