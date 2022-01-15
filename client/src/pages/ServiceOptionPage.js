import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ServiceTypeCard from "../components/ServiceTypeCard";
import { serviceOptions } from '../store/options/service-options';
import '../App.css';


const ServiceOptionPage = () => {
  const { globalServiceType }= useSelector((state) => state.helpee);
  const { DBHelpeeEmail } = useSelector((state) => state.helpee);
  const [email, setEmail] = useState(DBHelpeeEmail);
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };
  window.addEventListener("popstate", onBackButtonEvent, { once: true });
  function handleNext(e) {
    e.preventDefault();
    let path = '/book-appointment-form';
    navigate(path, { replace: true });
  }
  return (
    <div className='main-content-wrapper-no-background'>
      <div
        className='section-center-align'
      >
        <div>
          <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
            I need a helper to go ... with me.
          </h1>
        </div>
        <div>
          <h2
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '30px',
            }}
          >
            
          </h2>
        </div>
        <div
          className='container'
          style={{ display: 'flex', flexDirection: 'row', maxWidth: '800px', margin: 'auto' }}
        >
          {serviceOptions.map((option) => (
            <ServiceTypeCard
              imageSrc={option.imgPath}
              title={option.label}
              price={option.price}
              valueProps2={option.location}
              value={option.value}
              globalServiceType={globalServiceType}
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
