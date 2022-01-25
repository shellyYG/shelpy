import qs from 'qs';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HelperCard from '../components/HelperCard';
import { serviceOptions } from '../store/options/service-options';
import '../App.css';

const ServiceOptionPage = () => {
  const { globalServiceType } = useSelector((state) => state.helpee);
  const { DBHelpeeEmail } = useSelector((state) => state.helpee);
  const [email, setEmail] = useState(DBHelpeeEmail);
  const [helpers, setHelpers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = qs.parse(location.search, { ignoreQueryPrefix: true });
  
  useEffect(() => {
    async function getHelperLists(orderId) {
      try {
        const response = await axios.get('api/helper-list', {
          params: { orderId },
        });
        if (response) {
          console.log('helper list response: ', response);
          const { helpers } = response.data;
          setHelpers(helpers);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getHelperLists(orderId);
  }, [orderId]);
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate('/home', { replace: true });
  };
  window.addEventListener('popstate', onBackButtonEvent, { once: true });
  function handleNext(e) {
    e.preventDefault();
    let path = '/book-appointment-form';
    navigate(path, { replace: true });
  }
  return (
    <div className='main-content-wrapper-no-background'>
      <div className='section-center-align'>
        <div>
          <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
            Select a Helper
          </h1>
        </div>
        <div>
          <h2
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '30px',
            }}
          ></h2>
        </div>
        <div
          className='container'
          style={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '800px',
            margin: 'auto',
          }}
        >
          {helpers.map((helper) => (
            <HelperCard
              key={helper.helperId}
              username={helper.username}
              fulfilledOrderCount={helper.fulfilledOrderCount}
              averageRate={helper.averageRate}
              nationality={helper.nationality}
              nativeLanguage={helper.nativeLanguage}
              firstLanguage={helper.firstLanguage}
              secondLanguage={helper.secondLanguage}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className='btn-next' onClick={handleNext}>
            Next ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceOptionPage;
