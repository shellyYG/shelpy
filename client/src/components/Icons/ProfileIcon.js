import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { onClickUpdateActiveIconTarget } from '../../store/general/general-actions';
import {
  getHelpeeAuthStatus,
} from '../../store/helpee/helpee-actions';
import { getHelperAuthStatus } from '../../store/helper/helper-actions';


const MySwal = withReactContent(Swal);

const ProfileIcon = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  
  function handleProfileClick(e) {
    e.preventDefault();
    const data = {
      dropDownNavTarget: 'profile',
    };
    try {
      dispatch(onClickUpdateActiveIconTarget(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  function handleHelpeeSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('shelpy-token');
    MySwal.fire({
      title: <strong>Successfully Signed-Out.</strong>,
      html: <p>You are now signed-out.</p>,
      icon: 'success',
    });
    dispatch(getHelpeeAuthStatus());
  }
  function handleHelperSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('shelper-token');
    MySwal.fire({
      title: <strong>Successfully Signed-Out.</strong>,
      html: <p>You are now signed-out.</p>,
      icon: 'success',
    });
    dispatch(getHelperAuthStatus());
  }
  function handleToHelpeeDashboard(e) {
    e.preventDefault();
    navigate('/helpee/dashboard', { replace: true });
  }
  function handleToHelperDashboard(e) {
    e.preventDefault();
    navigate('/helper/dashboard', { replace: true });
  }
  function handleHelpeeSignIn(e) {
    e.preventDefault();
    navigate('/helpee/sign-in', { replace: true });
  }
  function handleHelperSignIn(e) {
    e.preventDefault();
    navigate('/helper/sign-in', { replace: true });
  }

  useEffect(() => {
    if (props.dropDownNavTarget !== 'profile') {
      setActive(false);
    }
  }, [props.dropDownNavTarget, props.value]);

  return (
    <IconContext.Provider value={{ color: 'white', size: '35' }}>
      <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
        {active && (
          <div className='navPopUpWrapper'>
            <div className='navDropDownContent'>
              {props.isHelpeeAuthenticated && (
                <div onClick={handleToHelpeeDashboard}>
                  View Helpee Dashboard
                </div>
              )}
              {props.isHelperAuthenticated && (
                <div onClick={handleToHelperDashboard}>
                  View Helper Dashboard
                </div>
              )}
              {props.isHelpeeAuthenticated && (
                <div onClick={handleHelpeeSignOut}>Sign Out as Helpee</div>
              )}
              {props.isHelperAuthenticated && (
                <div onClick={handleHelperSignOut}>Sign Out as Helper</div>
              )}
              {!props.isHelpeeAuthenticated && (
                <div onClick={handleHelpeeSignIn}>Sign In as Helpee</div>
              )}
              {!props.isHelperAuthenticated && (
                <div onClick={handleHelperSignIn}>Sign In as Helper</div>
              )}
            </div>
          </div>
        )}
        <CgProfile color='white' />
      </div>
    </IconContext.Provider>
  );
};

export default ProfileIcon;
