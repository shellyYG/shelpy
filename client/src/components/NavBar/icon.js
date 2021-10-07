import { IconContext } from 'react-icons';
import { CgGlobeAlt } from 'react-icons/cg';
const GlobalIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'black', size: '40' }}>
      <div>
        <CgGlobeAlt />
      </div>
    </IconContext.Provider>
  );
};

export default GlobalIcon;
