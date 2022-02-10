import { IconContext } from 'react-icons';
import { AiOutlineRightCircle } from 'react-icons/ai';
const RightOpenIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '30' }}>
      <div style={{ marginTop: '10px' }}>
        <AiOutlineRightCircle color='black' />
      </div>
    </IconContext.Provider>
  );
};

export default RightOpenIcon;
