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
      style={{ height: 500, backgroundImage: 'none', flexDirection: 'column' }}
    >
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        I want to know how is life like...
      </h1>
      <div className='form-center-wrapper'>
        <div className='container'>
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
