import { IconContext } from 'react-icons';
import { IoDiamondSharp } from 'react-icons/io5';
const DiamondIcon = (props) => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '16' }}>
      <div>
        <IoDiamondSharp color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default DiamondIcon;
