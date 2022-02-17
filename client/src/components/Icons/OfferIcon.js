import { IconContext } from 'react-icons';
import { BsFillTrophyFill } from 'react-icons/bs';
const OfferIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '20' }}>
      <div>
        <BsFillTrophyFill color='#f47174' />
      </div>
    </IconContext.Provider>
  );
};

export default OfferIcon;
