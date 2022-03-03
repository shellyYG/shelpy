import { IconContext } from 'react-icons';
import { AiFillFacebook } from 'react-icons/ai';
const facebookURL = 'https://www.facebook.com/shelpy.co';
const FacebookIcon = () => {
  async function handleFacebookClick(e) {
    e.preventDefault();
    const newWindow = window.open(facebookURL, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }
  return (
    <IconContext.Provider value={{ color: 'white', size: '20' }}>
      <div onClick={handleFacebookClick} style={{ cursor: 'pointer'}}>
        <AiFillFacebook color='white' />
      </div>
    </IconContext.Provider>
  );
};

export default FacebookIcon;
