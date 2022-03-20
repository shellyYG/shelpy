import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CreditCardTextBox from '../../components/CreditCardTextBox';
import {
  clearSetPayPalAccountStatus,
  setPayPalAccount,
} from '../../store/helper/helper-actions';
import FullLineTextBox from '../../components/FullLineTextBox';
const MySwal = withReactContent(Swal);

const HelperSetPayPalPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payPalNameRef = useRef();
  const payPalEmailRef = useRef();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const [searchParams] = useSearchParams();
  const helperName = searchParams.get('helperUsername');
  const refId = searchParams.get('refId');

  const {
    setPayPalAccountStatus,
    setPayPalAccountStatusTitle,
    setPayPalAccountStatusMessage,
  } = useSelector((state) => state.helper);

  const [title, setTitle] = useState('');
  const [loading, setIsLoading] = useState(false);

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
            <p style={{ textAlign: 'center', margin: '5px auto 5px', fontSize: '12px' }}>
              {t('payment_payments_notes')} <br />
            </p>
            <p style={{ textAlign: 'center', fontSize: '10px', marginBottom: '10px' }}>
              {t('apply_paypal_account')} <br />
            </p>
          </div>
          <div
            style={{
              marginTop: '10px',
            }}
          >
            <div>
              <FullLineTextBox
                title={`${t('paypal_receiver_name')} *`}
                placeholder={'Shelly Yang'}
                labelColor='black'
                inputRef={payPalNameRef}
                id='card-expiration-date'
              />
              <FullLineTextBox
                title={`${t('paypal_email')} *`}
                placeholder={'xxx@gmail.com'}
                labelColor='black'
                inputRef={payPalEmailRef}
                id='card-ccv'
              />
              <button className='btn-contact'>{t('confirm')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelperSetPayPalPage;
