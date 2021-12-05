function ChatMessageSelf(props) {
    return (
      <div>
        <div className="right-chat-container">
          <p>{props.message}</p>
        </div>
        <div className='right-chat-meta'>{props.time} You</div>
      </div>
    );
}

export default ChatMessageSelf;