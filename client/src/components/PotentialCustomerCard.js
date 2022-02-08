import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';

function PotentialCustomerCard(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  useEffect(() => {
    switch (props.mainType) {
      case 'university':
        setImg('/university');
        setTitle('University');
        break;
      case 'job':
        setImg('/job');
        setTitle('Job');
        break;
      case 'selfEmployed':
        setImg('/mom');
        setTitle('Self Employed');
        break;
      default:
        setImg('/university');
    }
  }, [props.mainType]);

  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}&userId=${props.helperId}&partnerName=${props.partnerName}&requestId=${props.requestId}&price=${props.price}&bookingStatus=${props.bookingStatus}`
    );
  }

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {img && (
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
          )}
        </div>
      </div>
      <div className='smallWIdth'>
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fonrWeight: 'bold', fontSize: '18px' }}>
              {props.partnerName}
            </h3>
          </div>
        </div>
      </div>
      <div className='smallFlexColumn'>
        <div className='content'>
          <div className='contentBx'>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='orange' />
              </div>
              <div className='textDateTime'>{props.secondType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
              </div>
              <div className='textDateTime'>{props.thirdType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <EarthIcon color='#95a0ff' />
              </div>
              <div className='textDateTime'>{props.country}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='checkBoxWIdth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>Type: {title}</p>
        </div>
      </div>
      <div className='checkBoxWIdth'>
        <div className='contentBx'>
          <button className='btn-contact' onClick={handleChat}>
            Chat with Customer
          </button>
        </div>
      </div>
    </div>
  );
}
export default PotentialCustomerCard;
