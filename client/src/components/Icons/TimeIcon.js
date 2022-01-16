import { IconContext } from 'react-icons';
import { CgTime } from 'react-icons/cg';
const TimeIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '40' }}>
      <div>
        <CgTime color='black' />
      </div>
    </IconContext.Provider>
  );
};

export default TimeIcon;
