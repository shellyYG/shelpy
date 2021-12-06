import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CheckBox from './CheckBox';
import ConfirmBtn from './ConfirmBtn';

const MySwal = withReactContent(Swal);

function SignUpForm(props) {
  const { DBHelpeeName, DBHelpeeLanguage, DBServiceType } = useSelector(
    (state) => state.helpee
  );
  const [email, setEmail] = useState('2shellyyangtw@gmail.com');
  const [dataHandoverChecked, setDataHandoverChecked] = useState(false);
  const dataHandoverCheckedRef = useRef();
  const navigate = useNavigate();
  async function handleConfirm(e) {
    e.preventDefault();
    await MySwal.fire({
      title: <strong>Thank you!</strong>,
      html: <i>You are signed up successfully.</i>,
      icon: 'success',
    });
     let path = 'book-appointment-form';
     navigate(path);
  }
  console.log('email: ', email);
  return (
    <div className="form-inner">
      <form action="">
        <div className="form-row last">
          <div className="form-wrapper-full">
            <label for="">Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
            />
          </div>
        </div>
        <div className="form-row last">
          <div className="form-wrapper-full">
            <label for="">Username</label>
            <input type="text" className="form-control" placeholder="xxx" />
          </div>
        </div>

        <div className="form-row last">
          <div className="form-wrapper-full">
            <label for="">Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="****"
              value={props.password}
              onChange={props.handlePasswordTyping}
              ref={props.passwordRef}
            />
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
