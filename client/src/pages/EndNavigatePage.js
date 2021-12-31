import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ServiceTypeCard from "../components/ServiceTypeCard";
import { navigateOptions } from "../store/options/navigate-options";
import "../App.css";
import NavigateCard from "../components/NavigateCard";

const EndNavigatePage = () => {
  const { globalNavigateTarget } = useSelector((state) => state.helpee);
  const navigate = useNavigate();
  function handleNext(e) {
    e.preventDefault();
    let path;
    switch(globalNavigateTarget) {
      case 'bookHelper':
        path = "/service-options";
        break;
      case 'viewOrderHistory':
        path = "/profile";
        break;
      default:
        path = "/service-options";
    }
    navigate(path, { replace: true });
  }
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.removeEventListener("popstate", onBackButtonEvent);
    navigate(-1);
  };
  useEffect(()=>{
    console.log('window.location.pathname: ', window.location.pathname);
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent, { once: true });
  },[])
  return (
    <div className="main-content-wrapper">
      <div className="section-center-align">
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>Welcome back</h1>
        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          What can we offer you today?
        </h2>
        <div className="container">
          {navigateOptions.map((option) => (
            <NavigateCard
              imageSrc={option.imgPath}
              title={option.label}
              value={option.value}
              globalNavigateTarget={globalNavigateTarget}
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

export default EndNavigatePage;
