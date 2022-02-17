import { IconContext } from 'react-icons';
import { IoIosInformationCircle } from 'react-icons/io';
const AboutIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '20' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <IoIosInformationCircle color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default AboutIcon;
