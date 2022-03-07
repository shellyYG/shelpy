import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onClickUpdateSignInRole } from '../store/general/general-actions';

function SignInRoleCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { signInRole } = useSelector((state) => state.general);

  function handleOnClick(e) {
    e.preventDefault();
    const data = {
      signInRole: props.signInRole,
    };

    try {
      dispatch(onClickUpdateSignInRole(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (signInRole !== props.signInRole) {
      setActive(false);
    }
  }, [signInRole, props.signInRole]);

  return (
    <div className={active ? 'card-active' : 'card'} onClick={handleOnClick}>
      <div className='content'>
        <div className='imgBxHomePage'>
          <img src={props.imageSrc} alt={props.text}></img>
        </div>
        <div className='contentBx'>
          <h3>{props.title}</h3>
        </div>
      </div>
    </div>
  );
}
export default SignInRoleCard;
