import AppointmentForm from '../components/AppointmentForm';
import '../App.css';

const BookAppointmentPage = () => {
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
