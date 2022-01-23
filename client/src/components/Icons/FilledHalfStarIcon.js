import { IconContext } from 'react-icons';
import { BsStarHalf } from 'react-icons/bs';
const FilledHalfStarIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '16' }}>
      <div>
        <BsStarHalf color='#ffdf95' />
      </div>
    </IconContext.Provider>
  );
};

export default FilledHalfStarIcon;
