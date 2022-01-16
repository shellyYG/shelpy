import { IconContext } from 'react-icons';
import { CgCalendar } from 'react-icons/cg';
const CalendarIcon = () => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '40' }}>
      <div>
        <CgCalendar color='black'/>
      </div>
    </IconContext.Provider>
  );
};

export default CalendarIcon;
