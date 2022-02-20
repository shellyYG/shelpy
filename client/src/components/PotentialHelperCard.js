import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ChatIcon from './Icons/ChatIcon';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';
import {
  countryOptions,
  departmentOptions,
  industryOptions,
  jobOptions,
  professionOptions,
  schoolOptions,
  typeOptions,
} from '../store/options/service-options';

function PotentialHelperCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [translatedSecondType, setTranslatedSecondType] = useState('');
  const [translatedThirdType, setTranslatedThirdType] = useState('');
  const [translatedCountry, setTranslatedCountry] = useState('');
  
  useEffect(() => {
    let secondTypeTranslationObj;
    let thirdTypeTranslationObj;
    const countryTranslationObj = countryOptions.filter(
      (o) => o.value === props.country
    );
    setTranslatedCountry(t(countryTranslationObj[0].label));
    switch (props.mainType) {
      case 'university':
        setTitle(t('service_types_uni'));
        secondTypeTranslationObj = schoolOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = departmentOptions[props.secondType].filter(
          (o) => o.value === props.thirdType
        );
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'job':
        setTitle(t('service_types_job'));
        secondTypeTranslationObj = industryOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = jobOptions.filter(
          (o) => o.value === props.thirdType
        );
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      case 'selfEmployed':
        setTitle(t('service_types_self_employed'));
        secondTypeTranslationObj = typeOptions.filter(
          (o) => o.value === props.secondType
        );
        if (
          props.secondType &&
          secondTypeTranslationObj &&
          secondTypeTranslationObj[0]
        ) {
          setTranslatedSecondType(t(secondTypeTranslationObj[0].label));
        }
        thirdTypeTranslationObj = professionOptions.filter(
          (o) => o.value === props.thirdType
        );
        if (
          props.thirdType &&
          thirdTypeTranslationObj &&
          thirdTypeTranslationObj[0]
        ) {
          setTranslatedThirdType(t(thirdTypeTranslationObj[0].label));
        }
        break;
      default:
        setTitle(t('service_types_job'));
    }
  }, [
    t,
    props.mainType,
    props.secondType,
    props.thirdType,
    props.country,
  ]);

  function handleChat(e) {
    e.preventDefault(e);
    navigate(
      `/helpee/chatroom?roomId=${props.helperId}-${props.helpeeId}` +
        `&userId=helpee_${props.helpeeId}&partnerName=${props.partnerName}` +
        `&requestId=${props.requestId}&offerId=${props.offerId}&price=${props.price}` +
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}`+
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.helperUsername}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}`
    );
  }
  console.log('props: ', props);
  async function handleBookHelper(e) {
    e.preventDefault();
    navigate(
      `/helpee/book-helper?requestId=${props.requestId}&partnerName=${props.partnerName}` +
        `&userId=${props.helpeeId}&offerId=${props.offerId}&price=${props.price}` +
        `&bookingStatus=${props.bookingStatus}&bookingId=${props.bookingId}` +
        `&helpeeId=${props.helpeeId}&helperId=${props.helperId}` +
        `&helpeeUsername=${props.helpeeUsername}&helperUsername=${props.partnerName}` +
        `&country=${props.country}&mainType=${props.mainType}&secondType=${props.secondType}` +
        `&thirdType=${props.thirdType}&fourthType=${props.fourthType}`,
    );
  }

  return (
    <div className='history-card'>
      <div className='profilePicWidth'>
        {!props.helperAnonymous && props.profilePicPath && (
          <div className='helper-ImgBx'>
            <img
              src={`/images/${props.profilePicPath}`}
              alt={props.partnerName}
            ></img>
          </div>
        )}
        {(!!props.helperAnonymous || !props.profilePicPath) && (
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
              <div className='textDateTime'>{translatedSecondType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <DiamondIcon color='#ffdf95' />
              </div>
              <div className='textDateTime'>{translatedThirdType}</div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <EarthIcon color='#95a0ff' />
              </div>
              <div className='textDateTime'>{translatedCountry}</div>
            </div>
          </div>
        </div>
      </div>

      {!props.bookingStatus && (
        <div className='checkBoxWidth'>
          <div className='bookWrapper'>
            {t('helper_organization')} : {props.organization || t('na')}
            <button className='btn-contact' onClick={handleBookHelper}>
              {t('book_name', { name: props.partnerName })}
            </button>
          </div>
        </div>
      )}
      {props.bookingStatus && (
        <div className='checkBoxWidth'>
          <div className='bookWrapper'>
            {t('helper_organization')} : {props.organization || t('na')} <br />
            {t('in_booking_process_with_name', { name: props.partnerName })}
          </div>
        </div>
      )}

      {
        <div className='checkBoxWidth'>
          <ChatIcon onClick={handleChat} partnerName={props.partnerName} />
        </div>
      }
    </div>
  );
}
export default PotentialHelperCard;
