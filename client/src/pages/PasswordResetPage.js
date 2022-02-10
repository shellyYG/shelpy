import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ConfirmBtn from '../components/ConfirmBtn';
import {
  changeHelpeePassword,
} from '../store/helpee/helpee-actions';

import {
  changeHelperPassword,
} from '../store/helper/helper-actions';

const MySwal = withReactContent(Swal);

const PasswordResetPage = (props) => {
    console.log('props.isHelpee@PasswordResetPage: ', props.isHelpee);
  const passwordRef = useRef();
  const [loading, setIsLoading] =
    useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const {
    helpeePasswordResetStatus,
    helpeePasswordResetStatusTitle,
    helpeePasswordResetStatusMessage,
  } = useSelector((state) => state.helpee);

  const {
    helperPasswordResetStatus,
    helperPasswordResetStatusTitle,
    helperPasswordResetStatusMessage,
  } = useSelector((state) => state.helper);

  console.log(
    'email: ',
    email,
    'helperPasswordResetStatus: ',
    helperPasswordResetStatus
  );

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
  async function handleConfirm(e) {
    e.preventDefault();
    if (props.isHelpee) {
      const data = {
        email,
        password: passwordRef.current.value,
        isHelpee: true,
        isPasswordUpdated: true,
      };
      dispatch(changeHelpeePassword(data));
    } else {
      const data = {
        email,
        password: passwordRef.current.value,
        isHelpee: false,
        isPasswordUpdated: true,
      };
      dispatch(changeHelperPassword(data));
    }

    setIsLoading(true);
  }
  
  
  useEffect(() => {
    if (props.isHelpee) {
      if (helpeePasswordResetStatus === 'error') {
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
          helpeePasswordResetStatusTitle,
          helpeePasswordResetStatusMessage
        );
        return;
      } else if (helpeePasswordResetStatus === 'success') {
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
          navigate('/helpee/sign-in');
        }
        sweetAlertAndNavigate(
          helpeePasswordResetStatusTitle,
          helpeePasswordResetStatusMessage
        );
      }
    } else {
      if (helperPasswordResetStatus === 'error') {
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
          helperPasswordResetStatusTitle,
          helperPasswordResetStatusMessage
        );
        return;
      } else if (helperPasswordResetStatus === 'success') {
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
          navigate('/helper/sign-in');
        }
        sweetAlertAndNavigate(
          helperPasswordResetStatusTitle,
          helperPasswordResetStatusMessage
        );
      }
    }
  }, [
    props.isHelpee,
    helpeePasswordResetStatus,
    helpeePasswordResetStatusTitle,
    helpeePasswordResetStatusMessage,
    helperPasswordResetStatus,
    helperPasswordResetStatusTitle,
    helperPasswordResetStatusMessage,
    navigate,
    dispatch,
  ]);
  return (
    <div className={props.isHelpee? 'main-content-wrapper-homepage': 'main-content-wrapper-homepage-helper'}>
      <div className='section-center-align' style={{ paddingTop: '5%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: 'white' }}>
          Email verified!
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          Please enter a new password.
        </h2>

        <form action='' className='centerbox-landing'>
          <input
            type='text'
            className='form-control-password'
            placeholder='Enter New Password'
            ref={passwordRef}
          />
          <ConfirmBtn cta='Change Password ❯' handleConfirm={handleConfirm} />
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;
