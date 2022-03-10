import { IconContext } from 'react-icons';
import { CgProfile } from 'react-icons/cg';
const AvatarIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '70' }}>
      <div onClick={props.onClick} style={{ margin: 'auto', height: 'auto' }}>
        <CgProfile color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default AvatarIcon;
