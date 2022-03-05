import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
const SearchIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '20' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <FaSearch color={props.color} />
      </div>
    </IconContext.Provider>
  );
};

export default SearchIcon;
