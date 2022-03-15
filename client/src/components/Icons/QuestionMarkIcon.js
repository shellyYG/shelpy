import { IconContext } from 'react-icons';
import { AiFillQuestionCircle } from 'react-icons/ai';
const QuestionMarkIcon = (props) => {
  return (
    <IconContext.Provider value={{ size: '20', cursor: 'pointer' }}>
      <div onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <AiFillQuestionCircle
          color={props.color}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </IconContext.Provider>
  );
};

export default QuestionMarkIcon;
