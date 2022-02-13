import { IconContext } from 'react-icons';
import { IoMdRefreshCircle } from 'react-icons/io';
const FilledStarIcon = () => {
  return (
    <IconContext.Provider value={{ size: '16' }}>
      <div>
        <IoMdRefreshCircle color='black' />
      </div>
    </IconContext.Provider>
  );
};

export default FilledStarIcon;
