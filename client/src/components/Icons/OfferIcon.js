import { IconContext } from 'react-icons';
import { MdLocalOffer } from 'react-icons/md';
const OfferIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '20' }}>
      <div>
        <MdLocalOffer color='#f47174' />
      </div>
    </IconContext.Provider>
  );
};

export default OfferIcon;
