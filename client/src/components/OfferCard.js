import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import { onClickDeleteOffer } from '../store/helper/helper-actions';

function OfferCard(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    switch (props.mainType) {
      case 'university':
        setTitle('University');
        break;
      case 'job':
        setTitle('Job');
        break;
      case 'selfEmployed':
        setTitle('Self-Employed');
        break;
      default:
        setTitle('');
    }
  }, [props.mainType]);

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {!props.isAnonymous && props.profilePicPath && <img src={`/images/${props.profilePicPath}`} alt={'visa'}></img>}
          {(props.isAnonymous || !props.profilePicPath)  && (
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
            <h3 style={{ fonrWeight: 'bold', fontSize: '18px' }}>
              {props.helperName}
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
            Offer ID: {props.offerId}
          </p>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            Price: {props.price} € / 30 minutes
          </p>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            Speaks: {props.languages}
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
      {/* <div className='checkBoxWidth'>
        <div className='contentBx'>
          <button className='btn-red' onClick={handleDeleteOffer}>
            Delete Offer
          </button>
        </div>
      </div> */}
    </div>
  );
}
export default OfferCard;
