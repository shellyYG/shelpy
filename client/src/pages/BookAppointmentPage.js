import { useNavigate } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import "../App.css";

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };
  window.addEventListener("popstate", onBackButtonEvent, { once: true });
  return (
    <div
      className='main-content-wrapper'
      style={{ height: 500, backgroundImage: 'none' }}
    >
      <div className='section-center-align'>
        <div className='container'>
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
