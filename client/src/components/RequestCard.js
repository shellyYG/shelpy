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
        setTitle('University');
        setDetails('Degree: ');
        break;
      case 'job':
        setTitle('Job');
        setDetails('Work from home status: ');
        break;
      case 'selfEmployed':
        setTitle('Self-Employed');
        setDetails('Years of experience you have: ');
        break;
      default:
        setDetails('');
    }
  }, [props.mainType]);
  console.log('props.profilePicPath: ', props.profilePicPath);
  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {!props.isAnonymous && !!props.profilePicPath && (
            <img src={`/images/${props.profilePicPath}`} alt={'avatar'}></img>
          )}
          {(props.isAnonymous || !props.profilePicPath) && (
            <a
              href='https://www.vecteezy.com/free-vector/default-avatar'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src={`/images/assets/defaultAvatar.jpg`}
                alt={
                  'Default Avatar Vectors by Vecteezy:https://www.vecteezy.com/free-vector/default-avatar'
                }
              ></img>
            </a>
          )}
        </div>
      </div>
      <div className='smallWidth'>
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fonrWeight: 'bold', fontSize: '16px', margin: '8px' }}>
              {props.helpeeName}
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
        <p style={{ fontWeight: '12px', padding: '6px' }}>
          Speaks: {props.languages}
        </p>
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
