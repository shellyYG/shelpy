import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import { onClickDeleteRequest } from '../store/helpee/helpee-actions';
const youtubeURL = 'https://www.youtube.com/channel/UCTqPBBnP2T57kmiPQ87986g'; // TODO

function RequestCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('');
  async function handleYoutubeClick(e) {
    e.preventDefault();
    const newWindow = window.open(youtubeURL, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }
  useEffect(() => {
    switch (props.mainType) {
      case 'university':
        setImg('/university');
        setTitle('University');
        setDetails('Degree: ');
        break;
      case 'job':
        setImg('/job');
        setTitle('Job');
        setDetails('Work from home status: ');
        break;
      case 'selfEmployed':
        setImg('/mom');
        setTitle('Self-Employed');
        setDetails('Years of experience you have: ');
        break;
      default:
        setImg('/offer_help');
    }
  }, [props.mainType]);
  // useEffect(() => {
  //   switch (props.bookingStatus) {
  //     case 'helperConfirmed':
  //       setFilteredStatus(
  //         `Meet Helper ${props.helperName} at ${props.appointmentDate} ${props.appointmentTime}.\n
  //         A zoom link will be sent to your email 10 min before the meeting.`
  //       );
  //       break;
  //     case 'created':
  //       setFilteredStatus(`Waiting for ${props.helperName} to reply.`);
  //       break;
  //     case '' || null:
  //       setFilteredStatus('You have not book any helper yet.');
  //       break;
  //     default:
  //       setFilteredStatus('Sorry! We do not find a helper yet. You can help us find more helpers by following us on Youtube.');
  //   }
  // }, [
  //   props.bookingStatus,
  //   props.appointmentDate,
  //   props.appointmentTime,
  //   props.helperName,
  // ]);

  console.log(props);

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {img && <img src={`${img}.jpeg`} alt={'visa'}></img>}
        </div>
      </div>
      <div className='smallWidth'>
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fonrWeight: 'bold', fontSize: '16px', margin: '8px' }}>
              {title}
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
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            Request ID: {props.id || 'N/A'}
          </p>
        </div>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            {details} {props.fourthType}
          </p>
        </div>
      </div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <p
            style={{
              fontWeight: '12px',
              padding: '6px',
              lineBreak: 'anywhere',
            }}
          >
            Notes: {props.notes || 'N/A'}
          </p>
        </div>
      </div>
      <div className='statusWidth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>{filteredStatus}</p>
        </div>
      </div>
      <div className='btnWidth'></div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          {/* <button className='btn-red' onClick={handleDeleteRequest}>
            Delete Request
          </button> */}
        </div>
      </div>
    </div>
  );
}
export default RequestCard;
