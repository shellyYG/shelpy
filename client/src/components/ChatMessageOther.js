function ChatMessageOther(props) {
  return (
    <div>
      <div className='left-chat-container'>{props.message}</div>
      <div className='left-chat-meta'>
        {props.messageTime} {props.author}
      </div>
    </div>
  );
}

export default ChatMessageOther;
