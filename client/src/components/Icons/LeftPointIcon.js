import { IconContext } from 'react-icons';
import { FaRegHandPointLeft } from 'react-icons/fa';
const LeftPintIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '30' }}>
      <div>
        <FaRegHandPointLeft color='#f47174' />
      </div>
    </IconContext.Provider>
  );
};

export default LeftPintIcon;
