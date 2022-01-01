import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHelpeeData } from '../store/helpee/helpee-actions';
import { helpeeActions } from '../store/helpee/helpee-slice';

function ChatRoomCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  return (
    <div
      className={active ? 'task-card-active' : 'task-card'}
    >
      <div className="content">
        <div className="helper-ImgBx">
          <img src={'/visa.jpeg'} alt={'visa'}></img>
        </div>

        <div className="contentBx">
          <h3>Visum</h3>
          <span style={{ fontSize: '10px', fontWeight: 'normal' }}>
            2021/01/01
          </span>
          <br />
          <span>{props.valueProps2}</span>
        </div>
      </div>
    </div>
  );
}
export default ChatRoomCard;
