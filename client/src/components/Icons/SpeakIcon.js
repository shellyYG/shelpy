import { IconContext } from 'react-icons';
import { FaLanguage } from 'react-icons/fa';
const AboutIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '20' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <FaLanguage color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default AboutIcon;
