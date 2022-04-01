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
import {
  getHelperAuthStatus,
  getAllChattedCustomers,
} from '../store/helper/helper-actions';
import {
  getHelpeeAuthStatus,
  getAllChattedHelpers,
} from '../store/helpee/helpee-actions';
import LeftCloseIcon from '../components/Icons/LeftCloseIcon';
import RightOpenIcon from '../components/Icons/RightOpenIcon';
import DownPointIcon from '../components/Icons/DownPointIcon';
import { useTranslation } from 'react-i18next';
const youtubeURL = 'https://www.facebook.com/shelpy.co' // 'https://www.youtube.com/channel/UCTqPBBnP2T57kmiPQ87986g'; // TODO


const ChatRoomPage = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

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
  const [allChatPartners, setAllChatPartners] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [triggerChangeOfShowBell, setTriggerChangeOfShowBell] = useState(false);

  const roomId = searchParams.get('roomId');
  const bookingId = searchParams.get('bookingId');
  const userId = searchParams.get('userId');
  const partnerName = searchParams.get('partnerName');
  const bookingStatus = searchParams.get('bookingStatus');
  const requestId = parseInt(searchParams.get('requestId'));
  const offerId = parseInt(searchParams.get('offerId'));
  const price = searchParams.get('price');
  const duration = searchParams.get('duration');
  const refId = searchParams.get('refId');

  const queryString = window.location.search;

  const profilePicPath = searchParams.get('profilePicPath');

  const helpeeId = parseInt(searchParams.get('helpeeId'));
  const helperId = parseInt(searchParams.get('helperId'));
  const helpeeUsername = searchParams.get('helpeeUsername');
  const helperUsername = searchParams.get('helperUsername');
  const country = searchParams.get('country');
  const mainType = searchParams.get('mainType');
  const secondType = searchParams.get('secondType');
  const thirdType = searchParams.get('thirdType');
  const fourthType = searchParams.get('fourthType');
  
  const { allChattedCustomers } = useSelector((state) => state.helper);  
  const { allChattedHelpers } = useSelector((state) => state.helpee);

  
  useEffect(() => {
    const partners = [];
    const currentPartner = {
      offerId,
      requestId,
      bookingId: null,
      bookingStatus: null,
      country,
      price,
      profilePicPath,
      helpeeId,
      helperId,
      helpeeUsername,
      helperUsername,
      mainType,
      secondType,
      thirdType,
      fourthType,
    };
    if (props.isHelpee) {
      allChattedHelpers.forEach((p) => {
        partners.push(p);
      });
      const partnerIds = allChattedHelpers.map((p) => p.helperId);

      if (
        currentPartner.helperId &&
        partnerIds.indexOf(currentPartner.helperId) === -1
      ) {
        partners.push(currentPartner);
      }

      setAllChatPartners(partners);
    } else {
      allChattedCustomers.forEach((p) => {
        partners.push(p);
      });
      const partnerIds = allChattedCustomers.map((p) => p.helpeeId);
      if (
        currentPartner.helpeeId &&
        partnerIds.indexOf(currentPartner.helpeeId) === -1
      ) {
        partners.push(currentPartner);
      }
      setAllChatPartners(partners);
    }
  }, [
    allChattedCustomers,
    allChattedHelpers,
    props.isHelpee,
    offerId,
    requestId,
    bookingId,
    bookingStatus,
    country,
    price,
    profilePicPath,
    helpeeId,
    helperId,
    helpeeUsername,
    helperUsername,
    mainType,
    secondType,
    thirdType,
    fourthType,
  ]);

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
  
  async function handleYoutubeClick(e) {
    e.preventDefault();
    const newWindow = window.open(youtubeURL, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }
  
  async function handleSend(e) {
    e.preventDefault();
    if (currentMessage !== '') {
      const messageData = {
        currentLanguage,
        queryString,
        room: roomId,
        author: userId,
        helperId: roomId? parseInt(roomId.split('-')[0]): 0,
        helpeeId: roomId? parseInt(roomId.split('-')[1]): 0,
        helpeeUsername,
        helperUsername,
        message: currentMessage,
        offerId: parseInt(offerId),
        messageTime:
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
  useEffect(() => {
    // set last message sent by others as read
    if (roomId) {
      socket.emit('set_last_others_msg_as_read', { roomId, author: userId });
    }
  }, [roomId, userId]);

  // only render once when onload. Rrevent infinite loop
  useEffect(() => {
    if (roomId) {
      socket.emit('join_room', roomId);
      socket.on('history', (data) => {
        setMessageList(data); // add messageList on self
      });
    }
  }, [roomId, userId]);

  // listen to changes from socket server
  useEffect(() => {
    socket.on('server_send_message', (data) => {
      setMessageList((list) => [...list, data]); // add messageList on other
      setCurrentRoom(data.room);
      setTriggerChangeOfShowBell(!triggerChangeOfShowBell);
    });
  }, [triggerChangeOfShowBell]); // should not have any dependency or the latest message will have duplicates

  useEffect(() => {
    socket.on('server_send_message', (data) => {
      socket.emit('message_received', data);
    });
  }, [userId]);

  useEffect(() => {
    if (helperUserId && !props.isHelpee)
      dispatch(getAllChattedCustomers({ helperUserId }));
  }, [helperUserId, props.isHelpee, dispatch]);

  useEffect(() => {
    if (helpeeUserId && props.isHelpee)
      dispatch(getAllChattedHelpers({ helpeeUserId }));
  }, [helpeeUserId, props.isHelpee, dispatch]);


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
                (!allChatPartners || allChatPartners.length === 0) && (
                  <div className={'task-card'}>
                    <div className='chatRoomContent'>
                      <div style={{ lineBreak: 'anywhere', padding: '5px' }}>
                        <div style={{ whiteSpace: 'pre-line' }}>{`${t(
                          'oops'
                        )}!\n ${t('we_havent_found')} \n ${t(
                          'any_customer_yet'
                        )}\n ${t('help_us_grow_by')} \n ${t(
                          'following_us_on'
                        )} \n`}</div>
                        <button
                          className='btn-next'
                          style={{ margin: '10px 0px' }}
                          onClick={handleYoutubeClick}
                        >
                          Facebook
                        </button>
                        <div style={{ whiteSpace: 'pre-line' }}>{`${t(
                          'so_we_can'
                        )}\n ${t('find_you_a')} \n ${t(
                          'customer_sonner'
                        )}`}</div>
                      </div>
                    </div>
                  </div>
                )}
              {props.isHelpee &&
                (!allChatPartners || allChatPartners.length === 0) && (
                  <div className={'task-card'}>
                    <div className='chatRoomContent'>
                      <div style={{ lineBreak: 'anywhere', padding: '5px' }}>
                        <div style={{ whiteSpace: 'pre-line' }}>{`${t(
                          'oops'
                        )}!\n ${t('we_havent_found')} \n ${t(
                          'any_helper_yet'
                        )}\n ${t('help_us_grow_by')} \n ${t(
                          'following_us_on'
                        )} \n`}</div>
                        <button
                          className='btn-next'
                          style={{ margin: '10px 0px' }}
                          onClick={handleYoutubeClick}
                        >
                          Facebook
                        </button>
                        <div style={{ whiteSpace: 'pre-line' }}>{`${t(
                          'so_we_can'
                        )}\n ${t('find_you_a')} \n ${t('helper_sonner')}`}</div>
                      </div>
                    </div>
                  </div>
                )}
              {!props.isHelpee &&
                allChatPartners.map((option) => (
                  <ChatRoomCard
                    pageRoomId={roomId}
                    roomId={`${option.helperId}-${option.helpeeId}`}
                    isHelpee={false}
                    helperAnonymous={option.helperAnonymous}
                    helpeeAnonymous={option.helpeeAnonymous}
                    helperId={helperUserId}
                    helpeeId={option.helpeeId}
                    helperUsername={option.helperUsername}
                    helpeeUsername={option.helpeeUsername}
                    country={option.country}
                    price={option.price}
                    duration={option.duration}
                    key={
                      option.bookingId ||
                      `${option.helperId}-${option.helpeeId}-${option.offerId}`
                    }
                    partnerName={option.helpeeUsername}
                    mainType={option.mainType}
                    secondType={option.secondType}
                    thirdType={option.thirdType}
                    fourthType={option.fourthType}
                    profilePicPath={option.profilePicPath}
                    requestId={option.requestId}
                    offerId={option.offerId}
                    pageOfferId={offerId}
                    bookingId={option.bookingId}
                    bookingStatus={option.bookingStatus}
                    currentRoom={currentRoom}
                    triggerChangeOfShowBell={triggerChangeOfShowBell}
                  />
                ))}
              {props.isHelpee &&
                allChatPartners.map((option) => (
                  <ChatRoomCard
                    pageRoomId={roomId}
                    roomId={`${option.helperId}-${option.helpeeId}`}
                    helperAnonymous={option.helperAnonymous}
                    helpeeAnonymous={option.helpeeAnonymous}
                    isHelpee={true}
                    helperId={option.helperId}
                    helpeeId={helpeeUserId}
                    helperUsername={option.helperUsername}
                    helpeeUsername={option.helpeeUsername}
                    country={option.country}
                    price={option.price}
                    duration={option.duration}
                    key={
                      option.bookingId ||
                      `${option.helperId}-${option.helpeeId}-${option.offerId}`
                    }
                    partnerName={option.helperUsername}
                    mainType={option.mainType}
                    secondType={option.secondType}
                    thirdType={option.thirdType}
                    fourthType={option.fourthType}
                    profilePicPath={option.profilePicPath}
                    requestId={option.requestId}
                    offerId={option.offerId}
                    pageOfferId={offerId}
                    bookingId={option.bookingId}
                    bookingStatus={option.bookingStatus}
                    currentRoom={currentRoom}
                    triggerChangeOfShowBell={triggerChangeOfShowBell}
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
                      {t('my_chat_with', { name: partnerName })}
                    </h3>
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
                    {props.isHelpee &&
                      t('chatroom_click_on_left_to_select', {
                        target: t('helper'),
                      })}
                    {!props.isHelpee &&
                      t('chatroom_click_on_left_to_select', {
                        target: t('customer'),
                      })}
                  </div>
                </div>
              </>
            )}
            {roomId && (!messageList || messageList.length === 0) && (
              <div style={{ marginTop: 'auto' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '30px' }}>{t('you_havent_chat')}</div>
                  <div style={{ fontSize: '20px', marginBottom: '10px' }}>
                    {t('start_chatting_by')}
                  </div>
                  <DownPointIcon />
                </div>
              </div>
            )}
            {roomId &&
              messageList.map((messageContent) => {
                return messageContent.author === userId ? (
                  <ChatMessageSelf
                    key={messageContent.id}
                    message={messageContent.message}
                    messageTime={messageContent.messageTime}
                  />
                ) : (
                  <ChatMessageOther
                    key={messageContent.id}
                    message={messageContent.message}
                    messageTime={messageContent.messageTime}
                    author={partnerName}
                  />
                );
              })}
          </ScrollToBottom>
          {roomId && (
            <div className='send-msg-container'>
              <form action='' className='centerbox-chat'>
                <input
                  type='text'
                  value={currentMessage}
                  className='form-control-chat'
                  placeholder={t('chatroom_chat_placeholder')}
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
          )}
        </div>
      </div>
    </>
  );
};

export default ChatRoomPage;
