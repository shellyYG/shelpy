import { IconContext } from 'react-icons';
import { BsStar } from 'react-icons/bs';
const FilledHalfStarIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '16' }}>
      <div>
        <BsStar color='#ffdf95' />
      </div>
    </IconContext.Provider>
  );
};

export default FilledHalfStarIcon;
