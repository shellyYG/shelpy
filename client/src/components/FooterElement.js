import { useNavigate } from 'react-router-dom';

function FooterElement(props) {
  const navigate = useNavigate();

  function handleOnClick(e) {
    e.preventDefault();
    if (props.link) navigate(props.link);
  }
  return <div onClick={handleOnClick}>{props.text}</div>;
}

export default FooterElement;
