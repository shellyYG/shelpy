import { IconContext } from 'react-icons';
import { FaHandPointDown } from 'react-icons/fa';
const DownPointIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '30' }}>
      <div>
        <FaHandPointDown color='#f47174' />
      </div>
    </IconContext.Provider>
  );
};

export default DownPointIcon;
