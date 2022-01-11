import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { serviceOptions } from "../store/options/service-options";
import OrderCard from "../components/OrderCard";
import { useState } from "react";
const OrderHistoryPage = () => {
    const [active, setActive] = useState(false);
  const { globalNavigateTarget } = useSelector((state) => state.helpee);
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
        <Link
          className={active ? "activeStyle" : "nonActiveStyle"}
          to="/about"
        >
          Active Orders
        </Link>
        <Link
          className={!active ? "activeStyle" : "nonActiveStyle"}
          to="/service-options"
        >
          Past Orders
        </Link>
      </div>

      <div className="task-container">
        {serviceOptions.map((option) => (
          <OrderCard title={option.label} valueProps1={option.price} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
