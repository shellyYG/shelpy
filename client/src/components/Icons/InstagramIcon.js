import { IconContext } from 'react-icons';
import { AiFillInstagram } from 'react-icons/ai';
const instagramURL = 'https://www.instagram.com/shelpy.co/';
const InstagramIcon = () => {
    async function handleInstagramClick(e) {
      e.preventDefault();
      const newWindow = window.open(
        instagramURL,
        '_blank',
        'noopener,noreferrer'
      );
      if (newWindow) newWindow.opener = null;
    }
  return (
    <IconContext.Provider value={{ color: 'white', size: '20' }}>
      <div onClick={handleInstagramClick} style={{ cursor: 'pointer' }}>
        <AiFillInstagram color='white' />
      </div>
    </IconContext.Provider>
  );
};

export default InstagramIcon;
