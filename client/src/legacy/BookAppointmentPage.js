import AppointmentForm from "../components/AppointmentForm";
import "../App.css";

const BookAppointmentPage = () => {
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
