// import { useHistory } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm';
import '../App.css';

const BookAppointmentPage = () => {
  // const history = useHistory();
  return (
    <div className="main-content-wrapper" style={{ height: 500 }}>
      <div className="section-left-align">
        <div></div>
      </div>
      <div className="section-center-align">
        <div className="container">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
