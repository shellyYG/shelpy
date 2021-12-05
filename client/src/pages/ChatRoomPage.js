import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import TaskCard from '../components/TaskCard';
import ChatMessageSelf from "../components/ChatMessageSelf";
import ChatMessageOther from "../components/ChatMessageOther";
import { serviceOptions } from '../store/options/options';
import {socket} from '../service/socket';
import { Icon } from '@iconify/react';
import '../App.css';


const ChatRoomPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  console.log("messageList:");
  console.log(messageList);
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
 
  const [showTaskSection, setShowTaskSection] = useState(true);

  function handleSchrink(e) {
    e.preventDefault();
    setShowTaskSection(false);
  }
  function handleExpand(e) {
    e.preventDefault();
    setShowTaskSection(true);
  }
  function handleMessageInput(e) {
    e.preventDefault();
    setCurrentMessage(e.target.value);
  }
  socket.emit("join_room", roomId);
  async function handleSend(e) {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        author: userId, // username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData); // send to everyone in the room
      console.log('1 new message: ', messageData);
      console.log("---");
      setMessageList((list) => [...list, messageData]); // add messageList on self
      setCurrentMessage(''); // clear input message
    }
    // navigate({
    //   pathname: "/chatroom",
    //   search: `roomId=${room}`,
    // });
    
  }
  // listen to changes from socket server
  useEffect(() => {
    socket.on('server_send_message', (data) => {
      console.log("2 new messsage from server: ", data);
      console.log('~~~');
      setMessageList((list) => [...list, data]); // add messageList on other
    })
  },[socket])

  return (
    <>
      <div className="main-content-wrapper">
        {!showTaskSection && (
          <div className="task-expander">
            <h3 className="expander" onClick={handleExpand}>
              {">>"}
            </h3>
          </div>
        )}
        {showTaskSection && (
          <div className="section-left-align">
            <div className="task-schrinker">
              <h3 className="schrinker" onClick={handleSchrink}>
                {"<<"}
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
          {/* <div className="chat-box"> */}
            <ScrollToBottom className="chat-box">
            {messageList.map((messageContent)=>{
              return messageContent.author === userId ? (
                <ChatMessageSelf
                  message={messageContent.message}
                  time={messageContent.time}
                />
              ) : (
                <ChatMessageOther
                  message={messageContent.message}
                  time={messageContent.time}
                  author={messageContent.author}
                />
              );
            })}
            </ScrollToBottom>
          {/* </div> */}
          <div className="send-msg-container">
            <form action="" className="centerbox-chat">
              <input
                type="text"
                value={currentMessage}
                className="form-control-chat"
                placeholder="Send some message here"
                onChange={handleMessageInput}
                onKeyPress={(e)=>{
                  e.key === "Enter" && handleSend(e);
                }}
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
