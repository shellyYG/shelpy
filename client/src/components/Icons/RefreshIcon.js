import { IconContext } from 'react-icons';
import { IoMdRefreshCircle } from 'react-icons/io';
const RefreshIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '30' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <IoMdRefreshCircle color='#04AA6D' />
      </div>
    </IconContext.Provider>
  );
};

export default RefreshIcon;
