import { IconContext } from 'react-icons';
import { AiFillFire } from 'react-icons/ai';
const FireIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '20' }}>
      <div style={{ padding: '0px' }}>
        <AiFillFire color='red' />
      </div>
    </IconContext.Provider>
  );
};

export default FireIcon;
