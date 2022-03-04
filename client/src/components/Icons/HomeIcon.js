import { IconContext } from 'react-icons';
import { AiFillHome } from 'react-icons/ai';
const HomeIcon = (props) => {
  return (
    <IconContext.Provider value={{ color: props.color, size: '20' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <AiFillHome color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default HomeIcon;
