import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole } from '../store/general/general-actions';


function UserRoleBtn(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [active, setActive] = useState(false);

  const { userRole } = useSelector((state) => state.general);
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  useEffect(() => {
    if (props.role !== userRole) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [props.role, userRole]);

  function handleUserRoleSwitch(e) {
    e.preventDefault();
    const data = {
      userRole: props.role,
    };
    try {
      dispatch(updateUserRole(data));
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    let newRoute = '';
    const currentPathname = window.location.pathname.replace(/\/+$/, '');
    console.log('currentPathname: ', currentPathname);
    if (currentPathname.includes('helper') && userRole === 'helpee') {
      newRoute = currentPathname.replace('helper', 'helpee');
      if (window.location.search) newRoute += window.location.search;
      window.location.replace(newRoute);
    }
    if (currentPathname.includes('helpee') && userRole === 'helper') {
      newRoute = currentPathname.replace('helpee', 'helper');
      if (window.location.search) newRoute += window.location.search;
      window.location.replace(newRoute);
    }
  }, [userRole]);
  

  return (
    <>
      {props.role === 'helpee' && (
        <div
          className={active ? 'leftHalfBtnActive' : 'leftHalfBtn'}
          onClick={handleUserRoleSwitch}
        >
          {t('i_am')} <br />
          {t('helpee')}
        </div>
      )}
      {props.role === 'helper' && (
        <div
          className={active ? 'rightHalfBtnActive' : 'rightHalfBtn'}
          onClick={handleUserRoleSwitch}
        >
          {t('i_am')} <br />
          {t('helper')}
        </div>
      )}
    </>
  );
}
export default UserRoleBtn;
