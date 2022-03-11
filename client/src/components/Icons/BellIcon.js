import { IconContext } from 'react-icons';
import { AiFillBell } from 'react-icons/ai';
const BellIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '20' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <div style={{ marginBottom: '-50px'}}>
          <div
            style={{
              backgroundColor: 'black',
              borderRadius: '50%',
              padding: '5px',
              zIndex: '-1',
              textAlign: 'center',
              width: '30px',
              height: '30px'
            }}
          >
            <AiFillBell color={props.color} />
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#e41e3f',
            borderRadius: '50%',
            padding: '3px',
            display: 'flex',
            width: '25px',
            height: '25px',
            top: '-5px',
            margin: 'auto'
          }}
        >
          <div style={{ color: 'white', textAlign: 'center', fontSize: '8px', margin: 'auto' }}>New</div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default BellIcon;
