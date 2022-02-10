import { useState, useEffect } from 'react';
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

  console.log(
    'emailToken: ',
    emailToken,
    'confirmHelperEmailStatus: ',
    confirmHelperEmailStatus
  );

  if (loading) {
    MySwal.fire({
      title: 'Confirming your email...',
      html: 'Please do not close the window.',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
  }
  if (props.isHelpee) {
    dispatch(confirmHelpeeEmail({ emailToken }));
  } else {
     dispatch(confirmHelperEmail({ emailToken }));
  }
  
  useEffect(() => {
    if (props.isHelpee) {
      if (confirmHelpeeEmailStatus === 'error') {
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
          navigate('/helpee/home', { replace: true });
        }
        sweetAlertAndClearStatus(
          confirmHelpeeEmailStatus,
          confirmHelpeeEmailStatusMessage
        );
        return;
      } else if (confirmHelpeeEmailStatus === 'success') {
        console.log('SUCCESS!');
        setIsLoading(false);
        async function sweetAlertAndNavigate(title, message) {
          await MySwal.fire({
            title: <strong>{title}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{message}</p>,
            icon: 'success',
          });
          navigate('/helpee/sign-in', { replace: true });
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
            title: <strong>{title}</strong>,
            html: (
              <p>
                Please contact our customer service for help:
                shelpyofficial@gmail.com
              </p>
            ),
            icon: 'error',
          });
          navigate('/helper/home', { replace: true });
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
            title: <strong>{title}</strong>,
            imageWIdth: 442,
            imageHeight: 293,
            html: <p>{message}</p>,
            icon: 'success',
          });
          navigate('/helper/sign-in', { replace: true });
        }
        sweetAlertAndNavigate(
          confirmHelperEmailStatus,
          confirmHelperEmailStatusMessage
        );
      }
    }
  }, [
    props.isHelpee,
    confirmHelpeeEmailStatus,
    confirmHelpeeEmailStatusTitle,
    confirmHelpeeEmailStatusMessage,
    confirmHelperEmailStatus,
    confirmHelperEmailStatusTitle,
    confirmHelperEmailStatusMessage,
    navigate,
    dispatch,
  ]);
  return (
    <div className={props.isHelpee? 'main-content-wrapper-homepage':'main-content-wrapper-homepage-helper'}>
      <div className='section-center-align-landing'>
        <div
          className='centerWrapper'
          style={{ textAlign: 'center', paddingTop: '28px' }}
        >
          <h2>Please wait...</h2>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmPage;
