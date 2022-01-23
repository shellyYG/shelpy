import { IconContext } from 'react-icons';
import { BsStarFill } from 'react-icons/bs';
const FilledStarIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '16' }}>
      <div>
        <BsStarFill color='#ffdf95' />
      </div>
    </IconContext.Provider>
  );
};

export default FilledStarIcon;
