import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import "../App.css";

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.removeEventListener("popstate", onBackButtonEvent);
    navigate(-1);
  };
  useEffect(() => {
    console.log("window.location.pathname: ", window.location.pathname);
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent, { once: true });
  }, []);
  return (
    <div className="main-content-wrapper" style={{ height: 500 }}>
      <div className="section-center-align">
        <div className="container">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
