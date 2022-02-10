import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  confirmHelpeeEmail,
  clearHelpeeEmailConfirmationStatus,
} from '../store/helpee/helpee-actions';

const MySwal = withReactContent(Swal);

const EmailConfirmPage = () => {
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const emailToken = searchParams.get('emailToken');
  
  

const { confirmHelpeeEmailStatus, confirmHelpeeEmailStatusTitle, confirmHelpeeEmailStatusMessage } =
  useSelector((state) => state.helpeeNotification);

  console.log(
    'emailToken: ',
    emailToken,
    'confirmHelpeeEmailStatus: ',
    confirmHelpeeEmailStatus
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


  dispatch(confirmHelpeeEmail({ emailToken }));
  useEffect(() => {
    if (confirmHelpeeEmailStatus === 'error') {
      setIsLoading(false);
      async function sweetAlertAndClearStatus(title, message) {
        await MySwal.fire({
          title: <strong>{title}</strong>,
          html: <p>Please contact our customer service for help: shelpyofficial@gmail.com</p>,
          icon: 'error',
        });
        navigate('/helpee/home', { replace: true });
      }
      sweetAlertAndClearStatus(confirmHelpeeEmailStatus, confirmHelpeeEmailStatusMessage);
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
      sweetAlertAndNavigate(confirmHelpeeEmailStatus, confirmHelpeeEmailStatusMessage);
    }
  }, [
    confirmHelpeeEmailStatus,
    confirmHelpeeEmailStatusTitle,
    confirmHelpeeEmailStatusMessage,
    navigate,
    dispatch,
  ]);
  return (
    <div className='main-content-wrapper-homepage'>
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
