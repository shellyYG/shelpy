import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';
import { CgGlobeAlt } from 'react-icons/cg';
import { onClickUpdateActiveIconTarget } from '../../store/general/general-actions';
import { useTranslation } from 'react-i18next';

function GlobalIcon (props) {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  function handleLanguageClick(e) {
    e.preventDefault();
    const data = {
      dropDownNavTarget: 'language',
    };
    try {
      dispatch(onClickUpdateActiveIconTarget(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  function onENClick(e) {
    e.preventDefault();
    let route = '';
    i18n.changeLanguage('en');
    const currentPathname = window.location.pathname.replace(/\/+$/, '');
    const routeParts = currentPathname.split('/');
    for (let i = 2; i < routeParts.length; i++) {
      route += `/${routeParts[i]}`;
    }
    window.location.replace(`/en${route}`);
  }
  function onZhTWClick(e) {
    e.preventDefault();
    let route = '';
    i18n.changeLanguage('zh-TW');
    const currentPathname = window.location.pathname.replace(/\/+$/, '');
    const routeParts = currentPathname.split('/');
    for (let i = 2; i < routeParts.length; i++) {
      route += `/${routeParts[i]}`;
    }
    window.location.replace(`/zh-TW${route}`);
  }
  function onZhCNClick(e) {
    e.preventDefault();
    let route = '';
    i18n.changeLanguage('zh-CN');
    const currentPathname = window.location.pathname.replace(/\/+$/, '');
    const routeParts = currentPathname.split('/');
    for (let i = 2; i < routeParts.length; i++) {
      route += `/${routeParts[i]}`;
    }
    window.location.replace(`/zh-CN${route}`);
  }
  useEffect(() => {
    if (props.dropDownNavTarget !== 'language') {
      setActive(false);
    }
  }, [props.dropDownNavTarget, props.value]);
  return (
    <IconContext.Provider value={{ color: 'white', size: '40' }}>
      <div onClick={handleLanguageClick} style={{ cursor: 'pointer' }}>
        {active && (
          <div className='navPopUpWrapper'>
            <div className='navDropDownContentLanguage'>
              <div onClick={onENClick}>English</div>
              <div onClick={onZhTWClick}>繁體中文</div>
              <div onClick={onZhCNClick}>简体中文</div>
            </div>
          </div>
        )}
        <CgGlobeAlt />
      </div>
    </IconContext.Provider>
  );
};

export default GlobalIcon;
