import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { serviceOptions } from "../store/options/service-options";
import { tempRequests } from "../store/options/temp-requests";
import { useState } from "react";
import HelperCard from "../components/HelperCard";
import RequestList from "../components/RequestList";
const OrderHistoryPage = () => {
  const [active, setActive] = useState(false);
  const { globalNavigateTarget, globalActiveRequest } = useSelector(
    (state) => state.helpee
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  function handleNext(e) {
    e.preventDefault();
    let path;
    switch (globalNavigateTarget) {
      case "bookHelper":
        path = "/service-options";
        break;
      case "viewOrderHistory":
        path = "/profile";
        break;
      default:
        path = "/service-options";
    }
    navigate(path, { replace: true });
  }
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };
  window.addEventListener("popstate", onBackButtonEvent, { once: true });
  function handleShowPopUp(e) {
      e.preventDefault();
      setShowPopUp(!showPopUp);
  }
  
  return (
    <div className="section-left-align">
      <div
        style={{
          margin: "auto",
          minWidth: "70%",
          maxWidth: "70%",
          display: "flex",
          flexDirection: "row",
          paddingTop: "10px",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            paddingBottom: "3px",
            borderBottom: "1px solid #e6e6e6",
            marginTop: "auto",
          }}
        >
          {globalActiveRequest}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "150px",
                cursor: "pointer",
              }}
              onClick={handleShowPopUp}
            >
              <span style={{ fontSize: "50px", marginLeft: "auto" }}> . </span>
              <span style={{ fontSize: "50px" }}> . </span>
              <span style={{ fontSize: "50px" }}> . </span>
            </div>
          </div>
          <div style={{ display: "none" }}> View Other Requests </div>
          {showPopUp && (
            <div className="three-dot-list-popup">
              {tempRequests.map((list) => (
                <RequestList
                  service={list.service}
                  globalActiveRequest={globalActiveRequest}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="task-container">
        {serviceOptions.map((option) => (
          <HelperCard title={option.label} valueProps1={option.price} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
