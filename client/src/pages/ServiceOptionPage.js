import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ServiceTypeCard from "../components/ServiceTypeCard";
import { serviceOptions } from '../store/options/service-options';
import '../App.css';


const ServiceOptionPage = () => {
  const { globalServiceType }= useSelector((state) => state.helpee);
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
    <div className="main-content-wrapper">
      <div className="section-center-align">
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>
          I need a helper to attend ... with me.
        </h1>
        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          We will send a helper to translate for you!
        </h2>
        <div className="container">
          {serviceOptions.map((option) => (
            <ServiceTypeCard
              imageSrc={option.imgPath}
              title={option.label}
              valueProps1={option.price}
              valueProps2={option.location}
              value={option.value}
              globalServiceType={globalServiceType}
            />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="btn-next" onClick={handleNext}>
            Next ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceOptionPage;
