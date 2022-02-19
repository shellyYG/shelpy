import { useTranslation } from "react-i18next";

function ChatMessageSelf(props) {
  const { t } = useTranslation();
    return (
      <div>
        <div className='right-chat-container'>
          <p>{props.message}</p>
        </div>
        <div className='right-chat-meta'>{props.messageTime} {t('me')}</div>
      </div>
    );
}

export default ChatMessageSelf;