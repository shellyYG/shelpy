import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatRoomCard from "../components/ChatRoomCard";
import ChatMessageSelf from "../components/ChatMessageSelf";
import ChatMessageOther from "../components/ChatMessageOther";
import {socket} from '../service/socket';
import { Icon } from '@iconify/react';
import '../App.css';
import { getPotentialCustomers } from '../store/helper/helper-actions';
import { getPotentialHelpers } from '../store/helpee/helpee-actions';
import LeftCloseIcon from '../components/Icons/LeftCloseIcon';
import RightOpenIcon from '../components/Icons/RightOpenIcon';


const ChatRoomPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const roomId = searchParams.get('roomId');
  const userId = parseInt(searchParams.get('userId'));
  const partnerName = searchParams.get('partnerName');
  const bookingStatus = searchParams.get('bookingStatus');
  const requestId = parseInt(searchParams.get('requestId'));
  const offerId = parseInt(searchParams.get('offerId'));
  const price = searchParams.get('price');
  console.log('@ChatRoom: isHelpee?', props.isHelpee, 'userId: ', userId);
  
  useEffect(() => {
    if (userId && !props.isHelpee)
      dispatch(getPotentialCustomers({ helperUserId: userId }));
  }, [userId, props.isHelpee, dispatch]);

  useEffect(() => {
    if (userId && props.isHelpee)
      dispatch(getPotentialHelpers({ helpeeUserId: userId }));
  }, [userId, props.isHelpee, dispatch]);

  const { allPotentialCustomers } = useSelector((state) => state.helper);
  const { allPotentialHelpers } = useSelector((state) => state.helpee);
  console.log('@chatroom->allPotentialCustomers: ', allPotentialCustomers);
  const [showTaskSection, setShowTaskSection] = useState(true);
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate('/home', { replace: true });
  };
  window.addEventListener('popstate', onBackButtonEvent, { once: true });
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
  async function handleBookHelper(e) {
    e.preventDefault();
    navigate(
      `/helpee/book-helper?requestId=${requestId}&partnerName=${partnerName}&userId=${userId}&offerId=${offerId}&price=${price}&bookingStatus=${bookingStatus}`,
      { replace: true }
    );
  }
  async function handleConfirmBooking(e) {
    e.preventDefault();
    navigate(
      `/helper/confirm-booking?roomId=${roomId}&userId=${userId}&requestId=${requestId}&offerId=${offerId}&price=${price}&bookingStatus=${bookingStatus}`,
      { replace: true }
    );
  }
  async function handleSend(e) {
    e.preventDefault();
    if (currentMessage !== '') {
      const messageData = {
        room: roomId,
        author: userId,
        message: currentMessage,
        message_time:
          new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
            new Date(Date.now())
          ) +
          ' ' +
          new Date(Date.now()).getDate() +
          ' ' +
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData); // send to everyone in the room
      setMessageList((list) => [...list, messageData]); // add messageList on self
      setCurrentMessage(''); // clear input message
    }
  }

  // only render once when onload. Rrevent infinite loop
  useEffect(() => {
    socket.emit('join_room', roomId);
    socket.on('history', (data) => {
      setMessageList(data); // add messageList on self
    });
  }, [roomId]);
  // listen to changes from socket server
  useEffect(() => {
    socket.on('server_send_message', (data) => {
      setMessageList((list) => [...list, data]); // add messageList on other
    });
  }, []);

  return (
    <>
      <div className='main-content-wrapper-no-background'>
        {!showTaskSection && (
          <div className='task-expander'>
            <div className='expander' onClick={handleExpand}>
              <RightOpenIcon />
            </div>
          </div>
        )}
        {showTaskSection && (
          <div className='chatRoomLeft'>
            <div className='task-schrinker'>
              <div className='schrinker' onClick={handleSchrink}>
                <LeftCloseIcon />
              </div>
            </div>

            <div className='task-container'>
              {!props.isHelpee &&
                allPotentialCustomers.map((option) => (
                  <ChatRoomCard
                    isHelpee={false}
                    helperId={userId}
                    helpeeId={option.helpeeId}
                    price={option.price}
                    key={
                      option.bookingId ||
                      `${option.requestId}-${option.offerId}`
                    }
                    partnerName={option.helpeeName}
                    secondType={option.secondType}
                    thirdType={option.thirdType}
                    profilePicPath={option.profilePicPath}
                    requestId={option.requestId}
                    offerId={option.offerId}
                    bookingStatus={option.bookingStatus}
                  />
                ))}
              {props.isHelpee &&
                allPotentialHelpers.map((option) => (
                  <ChatRoomCard
                    isHelpee={true}
                    helperId={option.helperId}
                    helpeeId={userId}
                    price={option.price}
                    key={
                      option.bookingId ||
                      `${option.requestId}-${option.offerId}`
                    }
                    partnerName={option.helperName}
                    secondType={option.secondType}
                    thirdType={option.thirdType}
                    profilePicPath={option.profilePicPath}
                    requestId={option.requestId}
                    offerId={option.offerId}
                    bookingStatus={option.bookingStatus}
                  />
                ))}
            </div>
          </div>
        )}
        <div className='chat-section-center-align'>
          <div className='chat-box-title-container'>
            <div className='chat-box-title-container-text-wrapper'>
              <div className='chatBoxTitleInnerWrapper'>
                <div className='chatBoxTitle'>
                  <h3> Your chat with {partnerName} </h3>
                </div>
                <div>
                  {props.isHelpee && bookingStatus === 'null' && (
                    <button className='btn-contact' onClick={handleBookHelper}>
                      Book {partnerName}{' '}
                    </button>
                  )}
                  {props.isHelpee && bookingStatus === 'helperAskChange' && (
                    <button className='btn-contact' onClick={handleBookHelper}>
                      Change Booking Time
                    </button>
                  )}
                  {!props.isHelpee && bookingStatus === 'created' && (
                    <button
                      className='btn-contact'
                      onClick={handleConfirmBooking}
                    >
                      Confirm {partnerName}'s Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <ScrollToBottom className='chat-box'>
            {messageList.map((messageContent) => {
              return messageContent.author === userId ? (
                <ChatMessageSelf
                  key={messageContent.Id}
                  message={messageContent.message}
                  message_time={messageContent.message_time}
                />
              ) : (
                <ChatMessageOther
                  key={messageContent.Id}
                  message={messageContent.message}
                  message_time={messageContent.message_time}
                  author={partnerName}
                />
              );
            })}
          </ScrollToBottom>
          <div className='send-msg-container'>
            <form action='' className='centerbox-chat'>
              <input
                type='text'
                value={currentMessage}
                className='form-control-chat'
                placeholder='Send some message here'
                onChange={handleMessageInput}
                onKeyPress={(e) => {
                  e.key === 'Enter' && handleSend(e);
                }}
              />
              <button
                data-text='Send message'
                className='btn-send'
                onClick={handleSend}
                style={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}
              >
                <span>
                  <Icon icon='fa:paper-plane-o' />
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
