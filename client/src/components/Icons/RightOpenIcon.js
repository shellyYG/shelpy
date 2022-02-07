import { IconContext } from 'react-icons';
import { RiMenuUnfoldFill } from 'react-icons/ri';
const RightOpenIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '22' }}>
      <div style={{ marginTop: '10px'}}>
        <RiMenuUnfoldFill color='black' />
      </div>
    </IconContext.Provider>
  );
};

export default RightOpenIcon;
