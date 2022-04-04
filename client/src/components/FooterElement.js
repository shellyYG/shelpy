import { useNavigate } from 'react-router-dom';

function FooterElement(props) {
  const navigate = useNavigate();

  function handleOnClick(e) {
    e.preventDefault();
    if (props.link && !props.isRedirect) navigate(props.link);

    if (props.link && props.isRedirect) {
      const newWindow = window.open(
        props.link,
        '_blank',
        'noopener,noreferrer'
      );
      if (newWindow) newWindow.opener = null;
    }
  }
  return (
    <div onClick={handleOnClick} className={props.className || ''}>
      {props.text}
    </div>
  );
}

export default FooterElement;
