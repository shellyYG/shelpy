import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { confirmCanAccessChatroom } from '../store/general/general-actions';


const MySwal = withReactContent(Swal);

const ChatroomPreLandingPage = (props) => {
  const { t } = useTranslation();
  const rawPath = window.location.href;
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  
  const accessChatRoomToken = searchParams.get('accessChatRoomToken');
  
  const urlForPartner = rawPath.split('urlForPartner=?')[1];

  const {
    confirmCanAccessChatRoomStatus,
    confirmCanAccessChatRoomStatusTitle,
    confirmCanAccessChatRoomStatusMessage,
  } = useSelector((state) => state.general);

  useEffect(()=>{
    dispatch(confirmCanAccessChatroom({ accessChatRoomToken }));
  },[dispatch, accessChatRoomToken]);
  
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
      if (confirmCanAccessChatRoomStatus === 'error') {
        setIsLoading(false);
        async function sweetAlertAndClearStatus(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            html: <p>{t('please_email_us_for_help')}</p>,
            icon: 'error',
          });
        }
        sweetAlertAndClearStatus(
          confirmCanAccessChatRoomStatusTitle,
          confirmCanAccessChatRoomStatusMessage
        );
        return;
      } else if (confirmCanAccessChatRoomStatus === 'success') {
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{t(message)}</p>,
            icon: 'success',
          });
          navigate(`/${currentLanguage}/helpee/chatroom?${urlForPartner}`, {
            replace: true,
          });
        }
        sweetAlertAndNavigate(
          confirmCanAccessChatRoomStatusTitle,
          confirmCanAccessChatRoomStatusMessage
        );
      }
    } else {
      if (confirmCanAccessChatRoomStatus === 'error') {
        setIsLoading(false);
        async function sweetAlertAndClearStatus(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            html: <p>{t('please_email_us_for_help')}</p>,
            icon: 'error',
          });
        }
        sweetAlertAndClearStatus(
          t(confirmCanAccessChatRoomStatusTitle),
          t(confirmCanAccessChatRoomStatusMessage)
        );
        return;
      } else if (confirmCanAccessChatRoomStatus === 'success') {
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{t(title)}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{t(message)}</p>,
            icon: 'success',
          });
          navigate(`/${currentLanguage}/helper/chatroom?${urlForPartner}`, {
            replace: true,
          });
        }
        sweetAlertAndNavigate(
          confirmCanAccessChatRoomStatusTitle,
          confirmCanAccessChatRoomStatusMessage
        );
      }
    }
  }, [
    t,
    urlForPartner,
    currentLanguage,
    props.isHelpee,
    confirmCanAccessChatRoomStatus,
    confirmCanAccessChatRoomStatusTitle,
    confirmCanAccessChatRoomStatusMessage,
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

export default ChatroomPreLandingPage;
