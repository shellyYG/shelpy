import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from './Icons/DiamondIcon';
import EarthIcon from './Icons/EarthIcon';

function PastOrderCard(props) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [helpers, setHelpers] = useState([]);
  const [helperCount, setHelperCount] = useState(0);
  const [img, setImg] = useState('');
  // TODO; get helper ID
  useEffect(() => {
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
      case 'bankAccount':
        setImg('/bank');
        break;
      case 'others':
        setImg('/offer_help');
        break;
      default:
        setImg('/offer_help');
    }
  }, [props.service]);

  useEffect(() => {
    async function getHelperLists(orderId) {
      try {
        const response = await axios.get('api/helpee/helper-list', {
          params: { orderId, type: props.type },
        });
        if (response) {
          const { helpers } = response.data;
          setHelperCount(helpers.length);
          setHelpers(helpers);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getHelperLists(props.orderId);
  }, [props.orderId, props.type]);
  function handleViewReceipt(e) {
    e.preventDefault();
    navigate(`/receipt?orderId=${props.orderId}`, { replace: true });
  }
  function handleWriteReview(e) {
    e.preventDefault();
    navigate(`/write-review?orderId=${props.orderId}`, { replace: true });
  }

  return (
    <div className={active ? 'history-card-active' : 'history-card'}>
      <div className='smallWidth'>
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
            Request ID: {props.orderId}
          </p>
          <button className='btn-contact' onClick={handleViewReceipt}>
            View Receipt
          </button>
        </div>
      </div>
      <div className='checkBoxWidth'>
        <div className='contentBx'>
          <p style={{ fontWeight: '12px', padding: '6px' }}>
            Helper ID: {props.orderId}
          </p>
          <button className='btn-contact' onClick={handleWriteReview}>
            Write Review
          </button>
        </div>
      </div>
    </div>
  );
}
export default PastOrderCard;
