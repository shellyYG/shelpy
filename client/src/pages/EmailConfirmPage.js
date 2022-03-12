import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  confirmHelpeeEmail,
} from '../store/helpee/helpee-actions';
import {
  confirmHelperEmail,
} from '../store/helper/helper-actions';

const MySwal = withReactContent(Swal);

const EmailConfirmPage = (props) => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const emailToken = searchParams.get('emailToken');
  
  const { confirmHelpeeEmailStatus, confirmHelpeeEmailStatusTitle, confirmHelpeeEmailStatusMessage } =
    useSelector((state) => state.helpeeNotification);
  const {
    confirmHelperEmailStatus,
    confirmHelperEmailStatusTitle,
    confirmHelperEmailStatusMessage,
  } = useSelector((state) => state.helperNotification);

  if (loading) {
    MySwal.fire({
      title: 'Confirming your email...',
      html: t('do_not_close_window'),
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }
  useEffect(() => {
    if (props.isHelpee) {
      dispatch(confirmHelpeeEmail({ emailToken }));
    } else {
      dispatch(confirmHelperEmail({ emailToken }));
    }
  }, [dispatch, emailToken, props.isHelpee]);
  
  
  useEffect(() => {
    if (props.isHelpee) {
      if (confirmHelpeeEmailStatus === 'error') {
        setIsLoading(false);
        async function sweetAlertAndClearStatus(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            html: <p>{t('please_email_us_for_help')}</p>,
            icon: 'error',
          });
          let path = `/${currentLanguage}/helpee/home`
          if (window.location.search) path += window.location.search;
          navigate(path, { replace: true }); // replace: true: do not want to let user come back to this page
        }
        sweetAlertAndClearStatus(
          confirmHelpeeEmailStatus,
          confirmHelpeeEmailStatusMessage
        );
        return;
      } else if (confirmHelpeeEmailStatus === 'success') {
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{t(message)}</p>,
            icon: 'success',
          });
          let path = `/${currentLanguage}/helpee/sign-in`;
          if (window.location.search) path += window.location.search;
          navigate(path, { replace: true });
        }
        sweetAlertAndNavigate(
          confirmHelpeeEmailStatus,
          confirmHelpeeEmailStatusMessage
        );
      }
    } else {
      if (confirmHelperEmailStatus === 'error') {
        setIsLoading(false);
        async function sweetAlertAndClearStatus(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            html: <p>{t('please_email_us_for_help')}</p>,
            icon: 'error',
          });
          let path = `/${currentLanguage}/helper/home`;
          if (window.location.search) path += window.location.search;
          navigate(path, { replace: true });
        }
        sweetAlertAndClearStatus(
          confirmHelperEmailStatus,
          confirmHelperEmailStatusMessage
        );
        return;
      } else if (confirmHelperEmailStatus === 'success') {
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{t(message)}</p>,
            icon: 'success',
          });
          let path = `/${currentLanguage}/helper/sign-in`;
          if (window.location.search) path += window.location.search;
          navigate(path, { replace: true });
        }
        sweetAlertAndNavigate(
          confirmHelperEmailStatus,
          confirmHelperEmailStatusMessage
        );
      }
    }
  }, [
    t,
    props.isHelpee,
    confirmHelpeeEmailStatus,
    confirmHelpeeEmailStatusTitle,
    confirmHelpeeEmailStatusMessage,
    confirmHelperEmailStatus,
    confirmHelperEmailStatusTitle,
    confirmHelperEmailStatusMessage,
    navigate,
    dispatch,
    currentLanguage
  ]);
  return (
    <div
      className={
        props.isHelpee
          ? 'main-content-wrapper-homepage'
          : 'main-content-wrapper-homepage-helper'
      }
      style={{
        backgroundImage: props.isHelpee
          ? 'url(/static-imgs/helpee-home.jpeg)'
          : 'url(/static-imgs/helper-home.jpeg)',
      }}
    >
      <div className='section-center-align-landing'>
        <div
          className='centerWrapper'
          style={{ textAlign: 'center', paddingTop: '28px' }}
        >
          <h2>{t('please_wait')}</h2>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmPage;
