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
import LeftPointIcon from '../components/Icons/LeftPointIcon'
import '../App.css';
import { getHelperAuthStatus, getPotentialCustomers } from '../store/helper/helper-actions';
import { getHelpeeAuthStatus, getPotentialHelpers } from '../store/helpee/helpee-actions';
import LeftCloseIcon from '../components/Icons/LeftCloseIcon';
import RightOpenIcon from '../components/Icons/RightOpenIcon';
import DownPointIcon from '../components/Icons/DownPointIcon';
const youtubeURL = 'https://www.youtube.com/channel/UCTqPBBnP2T57kmiPQ87986g'; // TODO


const ChatRoomPage = (props) => {
  console.log('ChatRoomPage props: ', props);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHelpeeAuthStatus());
    dispatch(getHelperAuthStatus());
  }, [dispatch]);

  const { helpeeUserId } = useSelector(
    (state) => state.helpee
  );
  const { helperUserId } = useSelector(
    (state) => state.helper
  );
  const [searchParams] = useSearchParams();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const roomId = searchParams.get('roomId');
  const bookingId = searchParams.get('bookingId');
  const userId = searchParams.get('userId');
  const partnerName = searchParams.get('partnerName');
  const bookingStatus = searchParams.get('bookingStatus');
  const requestId = parseInt(searchParams.get('requestId'));
  const offerId = parseInt(searchParams.get('offerId'));
  const price = searchParams.get('price');
  
  const { allPotentialCustomers } = useSelector((state) => state.helper);
  const { allPotentialHelpers } = useSelector((state) => state.helpee);
  console.log('allPotentialHelpers: ', allPotentialHelpers);
  
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
      `/helpee/book-helper?requestId=${requestId}&partnerName=${partnerName}&userId=${userId}&offerId=${offerId}&price=${price}&bookingStatus=${bookingStatus}&bookingId=${bookingId}`,
      { replace: true }
    );
  }
  async function handleConfirmBooking(e) {
    e.preventDefault();
    navigate(
      `/helper/confirm-booking?bookingId=${bookingId}&roomId=${roomId}&userId=${userId}&requestId=${requestId}&offerId=${offerId}&price=${price}&bookingStatus=${bookingStatus}&bookingId=${bookingId}&partnerName=${partnerName}`,
      { replace: true }
    );
  }
  async function handleYoutubeClick(e) {
    e.preventDefault();
    const newWindow = window.open(youtubeURL, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
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
  useEffect(() => {
    if (helperUserId && !props.isHelpee)
      dispatch(getPotentialCustomers({ helperUserId }));
  }, [helperUserId, props.isHelpee, dispatch]);

  useEffect(() => {
    if (helpeeUserId && props.isHelpee)
      dispatch(getPotentialHelpers({ helpeeUserId }));
  }, [helpeeUserId, props.isHelpee, dispatch]);
  // console.log('allPotentialCustomers: ', allPotentialCustomers);

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
                (!allPotentialCustomers ||
                  allPotentialCustomers.length === 0) && (
                  <div className={'task-card'}>
                    <div className='chatRoomContent'>
                      <div style={{ lineBreak: 'anywhere', padding: '5px' }}>
                        <div
                          style={{ whiteSpace: 'pre-line' }}
                        >{`Oops!\n We haven't found \n any customers yet.\n Help us grow by \n following us on \n`}</div>
                        <button
                          className='btn-next'
                          style={{ margin: '10px 0px' }}
                          onClick={handleYoutubeClick}
                        >
                          Youtube
                        </button>
                        <div
                          style={{ whiteSpace: 'pre-line' }}
                        >{`So we can\n find you a \n customer sooner!`}</div>
                      </div>
                    </div>
                  </div>
                )}
              {props.isHelpee &&
                (!allPotentialHelpers || allPotentialHelpers.length === 0) && (
                  <div className={'task-card'}>
                    <div className='chatRoomContent'>
                      <div style={{ lineBreak: 'anywhere', padding: '5px' }}>
                        <div
                          style={{ whiteSpace: 'pre-line' }}
                        >{`Oops!\n We have not found \n any helpers yet. \n Help us grow by \n following us on \n`}</div>
                        <button
                          className='btn-next'
                          style={{ margin: '10px 0px' }}
                          onClick={handleYoutubeClick}
                        >
                          Youtube
                        </button>
                        <div
                          style={{ whiteSpace: 'pre-line' }}
                        >{`So we can\n find you a \n helper sooner!`}</div>
                      </div>
                    </div>
                  </div>
                )}
              {!props.isHelpee &&
                allPotentialCustomers.map((option) => (
                  <ChatRoomCard
                    pageRoomId={roomId}
                    roomId={`${option.helperId}-${option.helpeeId}`}
                    isHelpee={false}
                    helperAnonymous={option.helperAnonymous}
                    helpeeAnonymous={option.helpeeAnonymous}
                    helperId={helperUserId}
                    helpeeId={option.helpeeId}
                    price={option.price}
                    key={
                      option.bookingId ||
                      `${option.helperId}-${option.helpeeId}-${option.offerId}`
                    }
                    partnerName={option.helpeeUsername}
                    secondType={option.secondType}
                    thirdType={option.thirdType}
                    profilePicPath={option.profilePicPath}
                    requestId={option.requestId}
                    offerId={option.offerId}
                    pageOfferId={offerId}
                    bookingId={option.bookingId}
                    bookingStatus={option.bookingStatus}
                  />
                ))}
              {props.isHelpee &&
                allPotentialHelpers.map((option) => (
                  <ChatRoomCard
                    pageRoomId={roomId}
                    roomId={`${option.helperId}-${option.helpeeId}`}
                    helperAnonymous={option.helperAnonymous}
                    helpeeAnonymous={option.helpeeAnonymous}
                    isHelpee={true}
                    helperId={option.helperId}
                    helpeeId={helpeeUserId}
                    price={option.price}
                    key={
                      option.bookingId ||
                      `${option.helperId}-${option.helpeeId}-${option.offerId}`
                    }
                    partnerName={option.helperUsername}
                    secondType={option.secondType}
                    thirdType={option.thirdType}
                    profilePicPath={option.profilePicPath}
                    requestId={option.requestId}
                    offerId={option.offerId}
                    pageOfferId={offerId}
                    bookingId={option.bookingId}
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
                <div className='chatBoxTitle' style={{ display: 'flex' }}>
                  {roomId && (
                    <h3 style={{ margin: 'auto' }}>
                      {' '}
                      Your chat with {partnerName}{' '}
                    </h3>
                  )}
                </div>
                <div>
                  {props.isHelpee && bookingStatus === 'null' && (
                    <button className='btn-contact' onClick={handleBookHelper}>
                      Book {partnerName}{' '}
                    </button>
                  )}
                  {props.isHelpee && bookingStatus === 'helperAskChange' && (
                    <button className='btn-contact' onClick={handleBookHelper}>
                      Propose new booking time to {partnerName}
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
            {!roomId && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <LeftPointIcon />
                  <div style={{ fontSize: '30px' }}>
                    Click on the left side to select a{' '}
                    {props.isHelpee ? 'helper' : 'customer'} to chat.
                  </div>
                </div>
              </>
            )}
            {roomId && (!messageList || messageList.length === 0) && (
              <div style={{ marginTop: 'auto' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '30px' }}>
                    You havent with each other yet!
                  </div>
                  <div style={{ fontSize: '20px', marginBottom: '10px' }}>
                    Start chatting by sending your first message to him/her.
                  </div>
                  <DownPointIcon />
                </div>
              </div>
            )}
            {messageList.map((messageContent) => {
              return messageContent.author === userId ? (
                <ChatMessageSelf
                  key={messageContent.id}
                  message={messageContent.message}
                  message_time={messageContent.message_time}
                />
              ) : (
                <ChatMessageOther
                  key={messageContent.id}
                  message={messageContent.message}
                  message_time={messageContent.message_time}
                  author={messageContent.author}
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
                style={{
                  borderBottomRightRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
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
