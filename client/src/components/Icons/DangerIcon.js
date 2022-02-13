import { IconContext } from 'react-icons';
import { CgDanger } from 'react-icons/cg';
const CalendarIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '40' }}>
      <div>
        <CgDanger color='#f47174' />
      </div>
    </IconContext.Provider>
  );
};

export default CalendarIcon;
