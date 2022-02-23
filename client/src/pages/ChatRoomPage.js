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
import { useTranslation } from 'react-i18next';
const youtubeURL = 'https://www.youtube.com/channel/UCTqPBBnP2T57kmiPQ87986g'; // TODO


const ChatRoomPage = (props) => {
  const { t } = useTranslation();
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
  const [allChatPartners, setAllChatPartners] = useState([]);

  const roomId = searchParams.get('roomId');
  const bookingId = searchParams.get('bookingId');
  const userId = searchParams.get('userId');
  const partnerName = searchParams.get('partnerName');
  const bookingStatus = searchParams.get('bookingStatus');
  const requestId = parseInt(searchParams.get('requestId'));
  const offerId = parseInt(searchParams.get('offerId'));
  const price = searchParams.get('price');

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
  
  const { allPotentialCustomers } = useSelector((state) => state.helper);
  const { allPotentialHelpers } = useSelector((state) => state.helpee);
 
  
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
      allPotentialHelpers.forEach((p) => {
        partners.push(p);
      });
      const partnerIds = allPotentialHelpers.map((p) => p.helperId);

      if (currentPartner.helperId && partnerIds.indexOf(currentPartner.helperId) === -1) {
        partners.push(currentPartner);
      }

      setAllChatPartners(partners);
    } else {
      allPotentialCustomers.forEach((p) => {
        partners.push(p);
      });
      const partnerIds = allPotentialCustomers.map((p) => p.helpeeId);
      if (currentPartner.helpeeId && partnerIds.indexOf(currentPartner.helpeeId) === -1) {
        partners.push(currentPartner);
      }
      setAllChatPartners(partners);
    }
  }, [
    allPotentialCustomers,
    allPotentialHelpers,
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
  async function handleBookHelper(e) {
    e.preventDefault();
    navigate(
      `/helpee/book-helper?requestId=${requestId}&partnerName=${partnerName}` +
        `&userId=${userId}&offerId=${offerId}&price=${price}` +
        `&bookingStatus=&bookingId=` +
        `&helpeeId=${helpeeId}&helperId=${helperId}` +
        `&helpeeUsername=${helpeeUsername}&helperUsername=${helperUsername}` +
        `&country=${country}&mainType=${mainType}&secondType=${secondType}` +
        `&thirdType=${thirdType}&fourthType=${fourthType}`,
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
        helperId: parseInt(roomId.split('-')[0]),
        helpeeId: parseInt(roomId.split('-')[1]),
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
                        )}!\n ${t('we_havent_found')} \n ${t('any_customer_yet')}\n ${t('help_us_grow_by')} \n ${t('following_us_on')} \n`}</div>
                        <button
                          className='btn-next'
                          style={{ margin: '10px 0px' }}
                          onClick={handleYoutubeClick}
                        >
                          Youtube
                        </button>
                        <div
                          style={{ whiteSpace: 'pre-line' }}
                        >{`${t('so_we_can')}\n ${t('find_you_a')} \n ${t('customer_sonner')}`}</div>
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
                        )}!\n ${t('we_havent_found')} \n ${t('any_helper_yet')}\n ${t('help_us_grow_by')} \n ${t('following_us_on')} \n`}</div>
                        <button
                          className='btn-next'
                          style={{ margin: '10px 0px' }}
                          onClick={handleYoutubeClick}
                        >
                          Youtube
                        </button>
                        <div
                          style={{ whiteSpace: 'pre-line' }}
                        >{`${t('so_we_can')}\n ${t('find_you_a')} \n ${t('helper_sonner')}`}</div>
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
                <div>
                  {props.isHelpee &&
                    (bookingStatus === 'null' ||
                      !bookingStatus ||
                      bookingStatus === 'undefined') &&
                    partnerName && (
                      <button
                        className='btn-contact'
                        onClick={handleBookHelper}
                      >
                        {t('book_name', { name: partnerName })}
                      </button>
                    )}
                  {props.isHelpee && bookingStatus === 'helperAskChange' && (
                    <button className='btn-contact' onClick={handleBookHelper}>
                      {t('propose_new_time_to_helper', {
                        name: partnerName,
                      })}
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
        </div>
      </div>
    </>
  );
};

export default ChatRoomPage;
