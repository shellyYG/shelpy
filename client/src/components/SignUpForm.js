import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckBox from './CheckBox';
import ConfirmBtn from './ConfirmBtn';

const MySwal = withReactContent(Swal);

function SignUpForm(props) {
  const { DBHelpeeName, DBHelpeeLanguage, DBServiceType } = useSelector(
    (state) => state.helpee
  );
  const [dataHandoverChecked, setDataHandoverChecked] = useState(false);
  const dataHandoverCheckedRef = useRef();
  const history = useHistory();
  async function handleConfirm(e) {
    e.preventDefault();
    await MySwal.fire({
      title: <strong>Thank you!</strong>,
      html: <i>You are signed up successfully.</i>,
      icon: 'success',
    });
     let path = 'book-appointment-form';
     history.push(path);
  }
  return (
    <div className="form-inner">
      <form action="">
        <h3></h3>
        <div className="form-row last">
          <div className="form-wrapper-full">
            <label for="">Username</label>
            <input type="text" className="form-control" placeholder="xxx" />
          </div>
        </div>
        <div className="form-row last">
          <div className="form-wrapper-full">
            <label for="">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="xxx@xxx.com"
            />
          </div>
        </div>
        <div className="form-row last">
          <div className="form-wrapper-full">
            <label for="">Password</label>
            <input type="text" className="form-control" placeholder="***" />
          </div>
        </div>
        <CheckBox
          checked={dataHandoverChecked}
          handleCheck={setDataHandoverChecked}
          details="By clicking
            Book Appointment, you consent to send your personal information to
            Shelpy."
          checkRef={dataHandoverCheckedRef}
        />
        <ConfirmBtn cta="Sign Up" handleConfirm={handleConfirm} />
      </form>
    </div>
  );
}

export default SignUpForm;
