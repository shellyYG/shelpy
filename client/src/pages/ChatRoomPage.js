import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from '../components/TaskCard';
import { serviceOptions } from '../store/options/options';
import { Icon } from '@iconify/react';
import '../App.css';


const ChatRoomPage = () => {
  const navigate = useNavigate();
  
  const socket = io.connect('http://localhost:9000'); // connect to API
  const [searchParams, setSearchParams] = useSearchParams();
  const [room, setRoom] = useState('abc');
  
  
  const q = searchParams.get('roomId');
  console.log(`Room: ${q}`);
  const [showTaskSection, setShowTaskSection] = useState(true);

  function handleSchrink(e) {
    e.preventDefault();
    setShowTaskSection(false);
  }
  function handleExpand(e) {
    e.preventDefault();
    setShowTaskSection(true);
  }
  function handleSend(e) {
    e.preventDefault();
    // navigate({
    //   pathname: "/chatroom",
    //   search: `roomId=${room}`,
    // });
    socket.emit('join_room', room)
  }

  return (
    <>
      <div className="main-content-wrapper">
        {!showTaskSection && (
          <div className="task-expander">
            <h3 className="expander" onClick={handleExpand}>
              {" "}
              {">>"}{" "}
            </h3>
          </div>
        )}
        {showTaskSection && (
          <div className="section-left-align">
            <div className="task-schrinker">
              <h3 className="schrinker" onClick={handleSchrink}>
                {" "}
                {"<<"}{" "}
              </h3>
            </div>
            <div className="task-category">
              <button data-text="Book Room" className="btn-task-category">
                <span>Avtive</span>
              </button>
              <button
                data-text="Book Room"
                className="btn-task-category-active"
              >
                <span>Complete</span>
              </button>
            </div>
            <div className="task-container">
              {serviceOptions.map((option) => (
                <TaskCard title={option.label} valueProps1={option.price} />
              ))}
            </div>
          </div>
        )}
        <div className="chat-section-center-align">
          <div className="chat-box-title-container">
            <div className="chat-box-title-container-text">
              <h3> Your chat with Markus </h3>
            </div>
          </div>
          <div className="chat-box">
            <div className="left-chat-container">Hi Shelly</div>
            <div className="right-chat-container">Hi Markus</div>
            <div className="left-chat-container">
              Thanks for booking me as Shelper.
            </div>
            <div className="right-chat-container">No problem!</div>
            <div className="right-chat-container">
              Can we meet at 7:30am tomorrow?
            </div>
            <div className="right-chat-container">
              I want to be at the forginer office a bit earlier.
            </div>
            <div className="left-chat-container">Sure thing! See you then.</div>
            <div className="left-chat-container">
              My phone number is : 015555555555My phone number is :
              015555555555My phone number is : 015555555555My phone number is :
              015555555555My phone number is : 015555555555My phone number is :
              015555555555My phone number is : 015555555555
            </div>
            <div className="right-chat-container">
              Thank you! See you at 7:30am! :) My phone number is :
              015555555555My phone number is : 015555555555My phone number is :
              015555555555My phone number is : 015555555555My phone number is :
              015555555555My phone number is : 015555555555My phone number is :
              015555555555
            </div>
            <div className="right-chat-container">
              My phone number is : 100000000
            </div>
          </div>
          <div className="send-msg-container">
            <form action="" className="centerbox-chat">
              <input
                type="text"
                className="form-control-chat"
                placeholder="Send some message here"
              />
              <button
                data-text="Book Room"
                className="btn-send"
                onClick={handleSend}
              >
                <span>
                  <Icon icon="fa:paper-plane-o" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoomPage;
