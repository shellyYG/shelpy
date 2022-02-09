import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import { onClickDeleteRequest } from '../store/helpee/helpee-actions';

function RequestCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('');
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
        setTitle('Self-Employed');
        break;
      default:
        setImg('/offer_help');
    }
  }, [props.mainType]);
  useEffect(() => {
    switch (props.bookingStatus) {
      case 'helperConfirmed':
        setFilteredStatus(
          `Meet Helper at ${props.appointmentDate} ${props.appointmentTime}.\n
          A zoom link will be sent to your email 10 min before the meeting.`
        );
        break;
      case 'created':
        setFilteredStatus('Waiting for the helper to reply.');
        break;
      case '' || null:
        setFilteredStatus('You have not book any helper yet.');
        break;
      default:
        setImg('/offer_help');
    }
  }, [props.bookingStatus, props.appointmentDate, props.appointmentTime]);

  function handleDeleteRequest(e) {
    e.preventDefault();
    const data = {
      requestId: props.requestId,
      helpeeUserId: props.helpeeUserId,
    };
    try {
      dispatch(onClickDeleteRequest(data));
    } catch (err) {
      console.error(err);
    }
  }
  console.log(
    `/helpee/chatroom`
  );
  function handleChatWithHelpers(e) {
    e.preventDefault();
    navigate(
      `/helpee/chatroom`
    );
  }

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
            <h3 style={{ fonrWeight: 'bold', fontSize: '16px' }}>{title}</h3>
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
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            Booking ID: {props.bookingId || 'N/A'}
          </p>
        </div>
      </div>
      <div className='statusWidth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>{filteredStatus}</p>
        </div>
      </div>
      <div className='btnWidth'>
        {props.bookingStatus !== 'fulfilled' && (
          <div className='contentBx'>
            <button
              className='btn-next'
              onClick={handleChatWithHelpers}
              style={{ marginTop: '16px' }}
            >
              {' '}
              Chat with Potential Helpers{' '}
            </button>
          </div>
        )}
        {props.bookingStatus === 'fulfilled' && (
          <div className='contentBx'>
            <button className='btn-next'> Write Review </button>
          </div>
        )}
      </div>
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
