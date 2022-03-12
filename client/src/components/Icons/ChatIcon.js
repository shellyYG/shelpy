import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import { BsChatDotsFill } from 'react-icons/bs';
const ChatIcon = (props) => {
  const { t } = useTranslation();
  return (
    <IconContext.Provider value={{ size: '30' }}>
      <div
        onClick={props.onClick}
        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row' }}
      >
        <BsChatDotsFill color='#93ccea' />
        <div style={{ margin: 'auto 0px' }}>
          <p style={{ marginLeft: '5px' }}>
            {!props.reArrangetime && (props.isHelpee
              ? t('chat_with_helper_name', { name: props.partnerName })
              : t('chat_with_helpee_name', { name: props.partnerName }))}
            {props.reArrangetime && (props.isHelpee
              ? t('chat_with_helper_name_re_arrange', {
                  name: props.partnerName,
                })
              : t('chat_with_helpee_name_re_arrange', {
                  name: props.partnerName,
                }))}
          </p>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default ChatIcon;
