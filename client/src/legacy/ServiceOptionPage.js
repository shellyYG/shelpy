import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ServiceTypeCard from "./ServiceTypeCard";
import { serviceOptions } from '../store/options/service-options';
import '../App.css';


const ServiceOptionPage = () => {
  const navigate = useNavigate();
  const { globalServiceType }= useSelector((state) => state.helpee);
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  
  function handleNext(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/book-appointment-form`;
    navigate(path);
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
