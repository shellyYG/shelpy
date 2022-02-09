import { IconContext } from 'react-icons';
import { AiFillShopping } from 'react-icons/ai';
const ShopIcon = (props) => {
  return (
    <IconContext.Provider value={{ color: props.color, size: '20' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <AiFillShopping color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default ShopIcon;
