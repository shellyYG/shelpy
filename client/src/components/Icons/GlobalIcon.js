import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';
import { CgGlobeAlt } from 'react-icons/cg';
import { onClickUpdateActiveIconTarget } from '../../store/general/general-actions';
import { useTranslation } from 'react-i18next';

function GlobalIcon (props) {
  const { i18n } = useTranslation();
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
    i18n.changeLanguage('en');
  }
  function onZhTWClick(e) {
    e.preventDefault();
    i18n.changeLanguage('zh-TW');
  }
  function onZhCNClick(e) {
    e.preventDefault();
    i18n.changeLanguage('zh-CN');
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
