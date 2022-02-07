function ChatMessageOther(props) {
  return (
    <div>
      <div className='left-chat-container'>{props.message}</div>
      <div className='left-chat-meta'>
        {props.message_time} {props.author}
      </div>
    </div>
  );
}

export default ChatMessageOther;
