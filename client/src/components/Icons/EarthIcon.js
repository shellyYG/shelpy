import { IconContext } from 'react-icons';
import { IoEarthSharp } from 'react-icons/io5';
const EarthIcon = (props) => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '16' }}>
      <div>
        <IoEarthSharp color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default EarthIcon;
