import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ChatIcon from './Icons/ChatIcon';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';

function PotentialCustomerCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  console.log('props @potentialCustomerCard: ', props);

  useEffect(() => {
    switch (props.mainType) {
      case 'university':
        setTitle(t('service_types_uni'));
        break;
      case 'job':
        setTitle(t('service_types_job'));
        break;
      case 'selfEmployed':
        setTitle(t('service_types_self_employed'));
        break;
      default:
        setTitle(t('service_types_job'));
    }
  }, [props.mainType,t]);
  
  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/helper/chatroom?roomId=${props.helperId}-${props.helpeeId}` +
        `&userId=helper_${props.helperId}&partnerName=${props.partnerName}` +
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}` +
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}`+
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}`
    );
  }
  
  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        {!props.helpeeAnonymous && !!props.profilePicPath && (
          <div className='helper-ImgBx'>
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
          </div>
        )}
        {(!!props.helpeeAnonymous || !props.profilePicPath) && (
          <div className='smallBlankProfileImageBx'>
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
          </div>
        )}
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
            <div>
              <ChatIcon onClick={handleChat} partnerName={props.partnerName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PotentialCustomerCard;
