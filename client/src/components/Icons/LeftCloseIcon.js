import { IconContext } from 'react-icons';
import { AiOutlineLeftCircle } from 'react-icons/ai';
const LeftCloseIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '30' }}>
      <div>
        <AiOutlineLeftCircle color='black' />
      </div>
    </IconContext.Provider>
  );
};

export default LeftCloseIcon;
