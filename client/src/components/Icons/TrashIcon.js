import { IconContext } from 'react-icons';
import { BsFillTrashFill } from 'react-icons/bs';
const TrashIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '20' }}>
      <div style={{ cursor: 'pointer' }} onClick={props.onClick}>
        <BsFillTrashFill color='#f47174' />
      </div>
    </IconContext.Provider>
  );
};

export default TrashIcon;
