import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  confirmHelpeeCanChangePassword,
} from '../store/helpee/helpee-actions';

const MySwal = withReactContent(Swal);

const PasswordResetPrePage = (props) => {
  console.log('props.isHelpee@PasswordResetPage: ', props.isHelpee);
  const [loading, setIsLoading] =
    useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  
  const originalEmail = searchParams.get('email');
  const filteredEmail = originalEmail.replace(/\+/g, '%2B');

  const passwordResetToken = searchParams.get('passwordResetToken');

  const {
    confirmHelpeeCanChangePasswordStatus,
    confirmHelpeeCanChangePasswordStatusTitle,
    confirmHelpeeCanChangePasswordStatusMessage,
  } = useSelector((state) => state.helpeeNotification);

  console.log(
    'originalEmail: ',
    originalEmail,
    'filteredEmail: ',
    filteredEmail
  );
  dispatch(confirmHelpeeCanChangePassword({ passwordResetToken }));

  if (loading) {
    MySwal.fire({
      title: 'Verifying your email...',
      html: 'Please do not close the window.',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }

  useEffect(() => {
    if (confirmHelpeeCanChangePasswordStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: (
            <p>
              Please contact our customer service for help:
              shelpyofficial@gmail.com
            </p>
          ),
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
          title: <strong>{title}</strong>,
          imageWIdth: 442,
          imageHeight: 293,
          html: <p>{message}</p>,
          icon: 'success',
        });
        console.log('...should navigate');
        navigate(
          `/helpee/password/reset/28099a64d7454485ab06a8b1c0080d43738b85dce1d82f13e7a620255?email=${filteredEmail}`,
          { replace: true }
        );
      }
      sweetAlertAndNavigate(
        confirmHelpeeCanChangePasswordStatusTitle,
        confirmHelpeeCanChangePasswordStatusMessage
      );
    }
  }, [
    filteredEmail,
    confirmHelpeeCanChangePasswordStatus,
    confirmHelpeeCanChangePasswordStatusTitle,
    confirmHelpeeCanChangePasswordStatusMessage,
    navigate,
    dispatch,
  ]);
  return (
    <div className='main-content-wrapper-homepage'>
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          Verifying...
        </h1>
      </div>
    </div>
  );
};

export default PasswordResetPrePage;
