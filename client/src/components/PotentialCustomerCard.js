import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';

function PotentialCustomerCard(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  console.log('props @potentialCustomerCard: ', props);
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
  console.log('props: ', props);
  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}&userId=${props.helperId}&partnerName=${props.partnerName}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}`
    );
  }
  function handleBookingConfirmation(e) {
    e.preventDefault(e);
    navigate(
      `/helper/confirm-booking?roomId=${props.helperId}-${props.helpeeId}&userId=${props.helperId}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}&partnerName=${props.partnerName}`
    );
  }
  console.log('props.bookingStatus: ', props.bookingStatus);
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
      <div className='smallWidth'>
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
          {props.bookingStatus === 'created' && (
            <button className='btn-contact' onClick={handleBookingConfirmation}>
              Confirm {props.partnerName}'s booking
            </button>
          )}
          {props.bookingStatus === 'helperConfirmed' && (
            <button className='btn-contact' onClick={handleChat}>
              Chat with {props.partnerName}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default PotentialCustomerCard;
