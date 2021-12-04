import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import HomeCard from '../components/HomeCard';
import { serviceOptions } from '../store/options/options';
import '../App.css';


const ServiceOptionPage = () => {
  const dispatch = useDispatch();
  const {
    DBHelpeeName,
    DBHelpeeLanguage,
    DBServiceType,
  } = useSelector((state) => state.helpee);
  console.log(
    `DBServiceType: ${DBServiceType} | DBHelpeeName: ${DBHelpeeName} | DBHelpeeLanguage: ${DBHelpeeLanguage}`
  );
  
  const navigate = useNavigate();

  function handleNext(e) {
    e.preventDefault();
    let path = 'sign-up';
    navigate(path);
  }
 
  return (
    <div className="main-content-wrapper">
      <div className="section-center-align">
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
          I need a helper to attend ... with me.
        </h1>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          We will send a helper to translate for you!
        </h2>
        <div className="container">
          {serviceOptions.map((option) => (
            <HomeCard
              imageSrc={option.imgPath}
              title={option.label}
              valueProps1={option.price}
              valueProps2={option.location}
              value={option.value}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="btn-next" onClick={handleNext}>
            Next ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceOptionPage;
