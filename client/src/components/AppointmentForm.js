import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function AppointmentForm(props) {

  async function handleConfirm(e) {
    e.preventDefault();
    await MySwal.fire({
      title: <strong>Thank you!</strong>,
  html: <i>We received your request.</i>,
  icon: 'success'
    })
  }
  return (
    <div className="form-inner">
      <form action="">
        <h3>Find a Helper</h3>
        <div className="form-row">
          <div className="form-wrapper">
            <label for="">Your Nickname *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
          <div className="form-wrapper">
            <label for="">Phone *</label>
            <input type="text" className="form-control" placeholder="Phone" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-wrapper">
            <label for="">Appointment Date *</label>
            <span className="lnr lnr-calendar-full"></span>
            <input
              type="text"
              className="form-control datepicker-here"
              data-language="en"
              data-date-format="dd M yyyy"
              id="dp1"
            />
          </div>
          <div className="form-wrapper">
            <label for="">Appointment Time *</label>
            <select name="" id="" className="form-control">
              <option value="1">7am-8am</option>
              <option value="2">8am-9am</option>
              <option value="3">9am-10am</option>
              <option value="4">10am-11am</option>
              <option value="5">11am-12pm</option>
              <option value="6">12pm-1pm</option>
              <option value="6">1pm-2pm</option>
              <option value="6">2pm-3pm</option>
              <option value="6">3pm-4pm</option>
              <option value="6">4pm-5pm</option>
              <option value="6">5pm-6pm</option>
            </select>
            <i className="zmdi zmdi-chevron-down"></i>
          </div>
        </div>
        <div className="form-row last">
          <div className="form-wrapper">
            <label for="">Country *</label>
            <select name="" id="" className="form-control">
              <option value="1">Germany</option>
              <option value="2">France</option>
              <option value="3">Italy</option>
              <option value="4">Spain</option>
              <option value="5">Sweden</option>
              <option value="6">Taiwan</option>
            </select>
            <i className="zmdi zmdi-chevron-down"></i>
          </div>
          <div className="form-wrapper">
            <label for="">City *</label>
            <select name="" id="" className="form-control">
              <option value="1">Berlin</option>
              <option value="2">Frankfurt</option>
              <option value="3">München</option>
              <option value="4">Bremen</option>
              <option value="5">Hamburg</option>
              <option value="6">Koblenz</option>
            </select>
            <i className="zmdi zmdi-chevron-down"></i>
          </div>
        </div>
        <div className="form-row last">
          <div className="form-wrapper">
            <label for="">Your native language *</label>
            <select name="" id="" className="form-control">
              <option value="1">English</option>
              <option value="2">Chinese</option>
              <option value="3">German</option>
              <option value="4">Spanish</option>
              <option value="5">French</option>
              <option value="6">Italien</option>
              <option value="7">Others (Please specify in Notes)</option>
            </select>
            <i className="zmdi zmdi-chevron-down"></i>
          </div>
          <div className="form-wrapper">
            <label for="">Your 1st best foreign lanauge </label>
            <select name="" id="" className="form-control">
              <option value="1">NA</option>
              <option value="1">English</option>
              <option value="2">Chinese</option>
              <option value="3">Vietnamese</option>
              <option value="4">Turkish</option>
              <option value="5">Arabic</option>
              <option value="5">French</option>
              <option value="6">Italien</option>
              <option value="7">Others (Please specify in Notes)</option>
            </select>
            <i className="zmdi zmdi-chevron-down"></i>
          </div>
        </div>
        <div className="form-row last">
          <div className="form-wrapper">
            <label for="">Your 2nd best foreign lanauge</label>
            <select name="" id="" className="form-control">
              <option value="1">NA</option>
              <option value="1">English</option>
              <option value="2">Chinese</option>
              <option value="3">Vietnamese</option>
              <option value="4">Turkish</option>
              <option value="5">Arabic</option>
              <option value="5">French</option>
              <option value="6">German</option>
              <option value="7">Italien</option>
              <option value="8">Others (Please specify in Notes)</option>
            </select>
            <i className="zmdi zmdi-chevron-down"></i>
          </div>
          <div className="form-wrapper">
            <label for="">Notes</label>
            <input
              type="text"
              className="form-control"
              placeholder="Japanese?"
            />
            <i className="zmdi zmdi-chevron-down"></i>
          </div>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" /> No one rejects, dislikes, or avoids
            pleasure itself.
            <span className="checkmark"></span>
          </label>
        </div>
        <br />
        <button
          data-text="Book Room"
          className="btn-next"
          onClick={handleConfirm}
        >
          <span>Book Appoinment</span>
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
