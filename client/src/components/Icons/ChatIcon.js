import { IconContext } from 'react-icons';
import { BsChatDotsFill } from 'react-icons/bs';
const ChatIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '30' }}>
      <div
        onClick={props.onClick}
        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row' }}
      >
        <BsChatDotsFill color='#93ccea' />
        <div style={{ margin: 'auto 0px'}}>
          <p style={{ marginLeft: '5px' }}>Chat with {props.partnerName}</p>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default ChatIcon;
