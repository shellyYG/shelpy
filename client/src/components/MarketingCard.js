import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import ChatIcon from './Icons/ChatIcon';


const MySwal = withReactContent(Swal);

function MarketingCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        setTitle('Self Employed');
        break;
      default:
        setTitle(t('na'));
    }
  }, [props.mainType, t]);

  async function handleBookHelperMarketingClick(e) {
    e.preventDefault();
    if (!props.helpeeId) {
      await MySwal.fire({
        title: <strong>Oops</strong>,
        html: <p>{t('please_sign_in_firce')}</p>,
        icon: 'error',
      });
    } else {
      navigate(
        `/helpee/book-helper?requestId=&partnerName=${props.username}` +
          `&userId=${props.helpeeId}&offerId=${props.id}&price=${props.price}` +
          `&bookingStatus=&bookingId=` +
          `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
          `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.username}` +
          `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
          `&thirdType=${props.thirdType}&fourthType=${props.fourthType}`,
      );
    }
  }
  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}` +
        `&userId=helpee_${props.helpeeId}&partnerName=${props.username}` +
        `&requestId=&offerId=${props.offerId}&price=${props.price}&bookingStatus=&bookingId=` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}&profilePicPath=${props.profilePicPath}`
    );
  }

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        <div className='helper-ImgBx'>
          {!props.isAnonymous && props.profilePicPath && (
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.username}
            ></img>
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
            <h3 style={{ fonrWeight: 'bold', fontSize: '18px' }}>
              {props.username}
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
            {t('offer_id')}: {props.id}
          </p>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            {t('price_per_45_min', { price: props.price })}
          </p>
        </div>
      </div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            {t('speaks')}: {props.languages}
          </p>
          <p
            style={{
              fontWeight: '12px',
              padding: '6px',
              lineBreak: 'anywhere',
            }}
          >
            {t('introduction')}: {props.introduction || t('na')}
          </p>
          <p
            style={{
              fontWeight: '12px',
              padding: '6px',
              lineBreak: 'anywhere',
            }}
          >
            {t('notes')}: {props.notes || t('na')}
          </p>
        </div>
      </div>
      <div className='fullWidth'>
        <button className='btn-next' onClick={handleBookHelperMarketingClick}>
          {t('book_name', { name: props.username })}
        </button>
      </div>
      <div className='fullWidth'>
        <ChatIcon onClick={handleChat} partnerName={props.username} />
      </div>
    </div>
  );
}
export default MarketingCard;
