import { IconContext } from 'react-icons';
import { BsFillPencilFill } from 'react-icons/bs';
const EditIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '20' }}>
      <div onClick={props.onClick} className={ props.disableClickEvent? 'editIconContainerDisabled': 'editIconContainer' }>
        <BsFillPencilFill color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default EditIcon;

