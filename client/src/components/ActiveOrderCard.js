import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarIcon from './Icons/CalendarIcon';
import TimeIcon from './Icons/TimeIcon';

function ActiveOrderCard(props) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  function handleShowActiveOrderStatus(e) {
    e.preventDefault();
    navigate('/helper-lists', { replace: true });
  }
  const [img, setImg] = useState('');
  const [label, setLabel] = useState('');
  useEffect(()=>{
    switch (props.service) {
      case 'visa':
        setImg('/visa');
        break;
      case 'anmelden':
        setImg('/anmelden');
        break;
      case 'arzt':
        setImg('/arzt');
        break;
      case 'apartmentVisit':
        setImg('/wohnung');
        break;
      case 'localFriend':
        setImg('/friend');
        break;
      case 'others':
        setImg('/offer_help');
        break;
      default:
        setImg('/offer_help');
    }
  },[props.service])
  useEffect(() => {
    switch (props.service) {
      case 'visa':
        setLabel('Visa');
        break;
      case 'anmelden':
        setLabel('Register (Anmeldung)');
        break;
      case 'arzt':
        setLabel('Doctor Appointment');
        break;
      case 'apartmentVisit':
        setLabel('Apartment Visit');
        break;
      case 'localFriend':
        setLabel('Friend');
        break;
      case 'others':
        setLabel('Others');
        break;
      default:
        setLabel('Others');
    }
  }, [props.service]);

  return (
    <div className={active ? 'history-card-active' : 'history-card'}>
      <div
        style={{ display: 'flex', flexDirection: 'column', flexBasis: '40%' }}
      >
        <div className='content'>
          <div className='contentBx'>
            <h3 style={{ fonrWeight: 'bold', fontSize: '18px' }}>{label}</h3>
          </div>
        </div>
      </div>
      <div className='flexColumnRightMargin5'>
        <div className='helper-ImgBx'>
          <img src={`${img}.jpeg`} alt={'visa'}></img>
        </div>
      </div>

      <div className='flexColumnRightMargin5'>
        <div className='content'>
          <div className='contentBx'>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <CalendarIcon />
              </div>
              <div className='pureFlexColumn'>
                <div className='textDateTime'>{props.meetDate}</div>
              </div>
            </div>
            <div className='pureFlexRow'>
              <div className='flexItemVerticalCenter'>
                <TimeIcon />
              </div>
              <div className='textDateTime'>{props.meetTime}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flexColumnRightMargin5'>
        <div className='content'>
          <div className='contentBx'>
            <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
              3 Helpers
            </div>
            <div style={{ marginBottom: '12px' }}>waiting for your reply</div>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='contentBx'>
          <button className='btn-contact' onClick={handleShowActiveOrderStatus}>
            Check Status
          </button>
        </div>
      </div>
    </div>
  );
}
export default ActiveOrderCard;
