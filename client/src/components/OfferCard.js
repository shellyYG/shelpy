import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import { onClickDeleteOffer } from '../store/helper/helper-actions';

function OfferCard(props) {
  const dispatch = useDispatch();
  const [img, setImg] = useState('');
  useEffect(() => {
    switch (props.type) {
      case 'University':
        setImg('/university');
        break;
      case 'Job':
        setImg('/job');
        break;
      case 'Self-Employed':
        setImg('/mom');
        break;
      default:
        setImg('/offer_help');
    }
  }, [props.type]);

  function handleDeleteOffer(e) {
    e.preventDefault();
    const data = {
      offerId: props.offerId,
      helperUserId: props.helperUserId,
    };
    try {
      dispatch(onClickDeleteOffer(data));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          <img src={`${img}.jpeg`} alt={'visa'}></img>
        </div>
      </div>
      <div className='smallWidth'>
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fonrWeight: 'bold', fontSize: '18px' }}>
              {props.type}
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
              <div className='textDateTime'>{props.mainCategory}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
              </div>
              <div className='textDateTime'>{props.subCategory}</div>
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
            Price: {props.price} €
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
