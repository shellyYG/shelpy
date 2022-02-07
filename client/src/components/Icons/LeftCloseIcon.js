import { IconContext } from 'react-icons';
import { RiMenuFoldFill } from 'react-icons/ri';
const LeftCloseIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '40' }}>
      <div>
        <RiMenuFoldFill color='black' />
      </div>
    </IconContext.Provider>
  );
};

export default LeftCloseIcon;
