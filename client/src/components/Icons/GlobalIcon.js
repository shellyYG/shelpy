import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';
import { CgGlobeAlt } from 'react-icons/cg';
import { onClickUpdateActiveIconTarget } from '../../store/general/general-actions';


const GlobalIcon = (props) => {
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
            <div className='navDropDownContent'>
              <div>English</div>
              <div>繁體中文</div>
              <div>简体中文</div>
            </div>
          </div>
        )}
        <CgGlobeAlt />
      </div>
    </IconContext.Provider>
  );
};

export default GlobalIcon;
