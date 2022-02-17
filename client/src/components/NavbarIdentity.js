import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import { FaHandPointDown } from 'react-icons/fa';
const NavbarIdentity = (props) => {
  const { t } = useTranslation();
  return (
    <IconContext.Provider value={{ color: 'white', size: '18' }}>
      {props.isHelpee && (
        <div
          style={{
            backgroundColor: '#EBEBE4',
            cursor: 'default',
            display: 'flex',
            padding: '1px 0px',
            pointerEvents: 'none',
          }}
        >
          <div style={{ padding: '12px 8px 12px 16px' }}>
            {t('nav_I_am_helpee')}
          </div>
          <div style={{ padding: '14px 16px 10px 0px' }}>
            <FaHandPointDown color='black' />
          </div>
        </div>
      )}
      {!props.isHelpee && (
        <div
          style={{
            backgroundColor: '#EBEBE4',
            cursor: 'default',
            display: 'flex',
            padding: '1px 0px',
            pointerEvents: 'none',
          }}
        >
          <div style={{ padding: '12px 8px 12px 16px' }}>
            {t('nav_I_am_helper')}
          </div>
          <div style={{ padding: '14px 16px 10px 0px' }}>
            <FaHandPointDown color='black' />
          </div>
        </div>
      )}
    </IconContext.Provider>
  );
};

export default NavbarIdentity;
