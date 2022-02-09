import { IconContext } from 'react-icons';
import { BsFillChatLeftDotsFill } from 'react-icons/bs';
const ChatIcon = (props) => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '30' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <BsFillChatLeftDotsFill color='white' />
      </div>
    </IconContext.Provider>
  );
};

export default ChatIcon;
