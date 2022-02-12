import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatIcon from './Icons/ChatIcon';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';

function PotentialHelperCard(props) {
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
      `/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}&userId=helpee${props.helpeeId}&partnerName=${props.partnerName}&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}&bookingStatus=${props.bookingStatus}`
    );
  }
  console.log('props: ', props);
  async function handleBookHelper(e) {
    e.preventDefault();
    navigate(
      `/helpee/book-helper?requestId=${props.requestId}&partnerName=${props.partnerName}` +
        `&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}` +
        `&bookingStatus=${props.bookingStatus}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.partnerName}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}`,
      { replace: true }
    );
  }
  console.log('helperId: ', props.helperId, 'helpeeId: ', props.helpeeId)

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {img && props.profilePicPath && (
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
              <div className='textDateTime'>{title}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
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
      
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {!props.bookingStatus && (
              <button className='btn-contact' onClick={handleBookHelper}>
                Book {props.partnerName}
              </button>
            )}
            <div >
              <ChatIcon onClick={handleChat} partnerName={props.partnerName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PotentialHelperCard;
