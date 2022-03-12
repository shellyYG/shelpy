import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { confirmCanAccessDashboard } from '../store/general/general-actions';

const MySwal = withReactContent(Swal);

const DashboardPreLandingPage = (props) => {
  const { t } = useTranslation();
  const rawPath = window.location.href;
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const accessDashboardToken = searchParams.get('accessDashboardToken');

  const urlForPartner = rawPath.split('urlForPartner=?')[1];

  const {
    confirmCanAccessDashboardStatus,
    confirmCanAccessDashboardStatusTitle,
    confirmCanAccessDashboardStatusMessage,
  } = useSelector((state) => state.general);

  useEffect(() => {
    dispatch(confirmCanAccessDashboard({ accessDashboardToken }));
  }, [dispatch, accessDashboardToken]);

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
      if (confirmCanAccessDashboardStatus === 'error') {
        setIsLoading(false);
        async function sweetAlertAndClearStatus(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            html: <p>{t('please_email_us_for_help')}</p>,
            icon: 'error',
          });
        }
        sweetAlertAndClearStatus(
          confirmCanAccessDashboardStatusTitle,
          confirmCanAccessDashboardStatusMessage
        );
        return;
      } else if (confirmCanAccessDashboardStatus === 'success') {
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{t(message)}</p>,
            icon: 'success',
          });
          navigate(`/${currentLanguage}/helpee/dashboard`, {
            replace: true,
          });
        }
        sweetAlertAndNavigate(
          confirmCanAccessDashboardStatusTitle,
          confirmCanAccessDashboardStatusMessage
        );
      }
    } else {
      if (confirmCanAccessDashboardStatus === 'error') {
        setIsLoading(false);
        async function sweetAlertAndClearStatus(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            html: <p>{t('please_email_us_for_help')}</p>,
            icon: 'error',
          });
        }
        sweetAlertAndClearStatus(
          t(confirmCanAccessDashboardStatusTitle),
          t(confirmCanAccessDashboardStatusMessage)
        );
        return;
      } else if (confirmCanAccessDashboardStatus === 'success') {
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{t(message)}</p>,
            icon: 'success',
          });
          navigate(`/${currentLanguage}/helper/dashboard`, {
            replace: true,
          });
        }
        sweetAlertAndNavigate(
          confirmCanAccessDashboardStatusTitle,
          confirmCanAccessDashboardStatusMessage
        );
      }
    }
  }, [
    t,
    urlForPartner,
    currentLanguage,
    props.isHelpee,
    confirmCanAccessDashboardStatus,
    confirmCanAccessDashboardStatusTitle,
    confirmCanAccessDashboardStatusMessage,
    navigate,
    dispatch,
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

export default DashboardPreLandingPage;
