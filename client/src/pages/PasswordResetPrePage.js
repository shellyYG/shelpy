import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  confirmHelpeeCanChangePassword,
} from '../store/helpee/helpee-actions';

import {
  confirmHelperCanChangePassword,
} from '../store/helper/helper-actions';

const MySwal = withReactContent(Swal);

const PasswordResetPrePage = (props) => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const [loading, setIsLoading] =
    useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const originalEmail = searchParams.get('email');
  const refId = searchParams.get('refId');
  const passwordResetToken = searchParams.get('passwordResetToken');

  const filteredEmail = originalEmail.replace(/\+/g, '%2B');

  const {
    confirmHelpeeCanChangePasswordStatus,
    confirmHelpeeCanChangePasswordStatusTitle,
    confirmHelpeeCanChangePasswordStatusMessage,
  } = useSelector((state) => state.helpeeNotification);

  const {
    confirmHelperCanChangePasswordStatus,
    confirmHelperCanChangePasswordStatusTitle,
    confirmHelperCanChangePasswordStatusMessage,
  } = useSelector((state) => state.helperNotification);

  useEffect(() => {
    if (props.isHelpee) {
      dispatch(confirmHelpeeCanChangePassword({ passwordResetToken }));
    } else {
      dispatch(confirmHelperCanChangePassword({ passwordResetToken }));
    }
  }, [
    props.isHelpee,
    dispatch,
    passwordResetToken,
  ]);
  
  

  if (loading) {
    MySwal.fire({
      title: t('verify_email'),
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
      if (confirmHelpeeCanChangePasswordStatus === 'error') {
        setIsLoading(false);
        async function sweetAlertAndClearStatus(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            html: <p>{t('please_email_us_for_help')}</p>,
            icon: 'error',
          });
        }
        sweetAlertAndClearStatus(
          confirmHelpeeCanChangePasswordStatusTitle,
          confirmHelpeeCanChangePasswordStatusMessage
        );
        return;
      } else if (confirmHelpeeCanChangePasswordStatus === 'success') {
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{t(message)}</p>,
            icon: 'success',
          });
          navigate(
            `/${currentLanguage}/helpee/password/reset/${process.env.REACT_APP_PASS_RESET_URL}?email=${filteredEmail}&refId=${refId}&passwordResetToken=${passwordResetToken}`,
            { replace: true }
          );
        }
        sweetAlertAndNavigate(
          confirmHelpeeCanChangePasswordStatusTitle,
          confirmHelpeeCanChangePasswordStatusMessage
        );
      }
    } else {
      if (confirmHelperCanChangePasswordStatus === 'error') {
        setIsLoading(false);
        async function sweetAlertAndClearStatus(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            html: <p>{t('please_email_us_for_help')}</p>,
            icon: 'error',
          });
        }
        sweetAlertAndClearStatus(
          t(confirmHelperCanChangePasswordStatusTitle),
          t(confirmHelperCanChangePasswordStatusMessage)
        );
        return;
      } else if (confirmHelperCanChangePasswordStatus === 'success') {
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{t(message)}</p>,
            icon: 'success',
          });
          navigate(
            `/${currentLanguage}/helper/password/reset/${process.env.REACT_APP_PASS_RESET_URL}?email=${filteredEmail}&refId=${refId}&passwordResetToken=${passwordResetToken}`,
            { replace: true }
          );
        }
        sweetAlertAndNavigate(
          confirmHelperCanChangePasswordStatusTitle,
          confirmHelperCanChangePasswordStatusMessage
        );
      }
    }
  }, [
    t,
    currentLanguage,
    props.isHelpee,
    filteredEmail,
    confirmHelpeeCanChangePasswordStatus,
    confirmHelpeeCanChangePasswordStatusTitle,
    confirmHelpeeCanChangePasswordStatusMessage,
    confirmHelperCanChangePasswordStatus,
    confirmHelperCanChangePasswordStatusTitle,
    confirmHelperCanChangePasswordStatusMessage,
    navigate,
    dispatch,
    refId,
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
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          {t('verifying')}
        </h1>
      </div>
    </div>
  );
};

export default PasswordResetPrePage;
