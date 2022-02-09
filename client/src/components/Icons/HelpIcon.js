import { IconContext } from 'react-icons';
import { FaHandsHelping } from 'react-icons/fa';
const HelpIcon = (props) => {
  return (
    <IconContext.Provider value={{ color: props.color, size: '20' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <FaHandsHelping color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default HelpIcon;
