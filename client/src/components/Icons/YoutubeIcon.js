import { IconContext } from 'react-icons';
import { AiFillYoutube } from 'react-icons/ai';
const youtubeURL = 'https://www.facebook.com/shelpy.co'; // TODO
const YoutubeIcon = () => {
  async function handleYoutubeClick(e) {
    e.preventDefault();
    const newWindow = window.open(youtubeURL, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }
  return (
    <IconContext.Provider value={{ color: 'white', size: '20' }}>
      <div onClick={handleYoutubeClick} style={{ cursor: 'pointer' }}>
        <AiFillYoutube color='white' />
      </div>
    </IconContext.Provider>
  );
};

export default YoutubeIcon;