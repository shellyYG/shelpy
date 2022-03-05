import SearchIcon from '../components/Icons/SearchIcon';
import SpeakIcon from '../components/Icons/SpeakIcon';

function MktCard(props) {
  return (
    <div className='mktCard'>
      <div className='content'>
        <div className='imgBx'>
          <img src={props.imageSrc} alt={props.text}></img>
        </div>
        <div className='contentBxMkt'>
          <h3 style={{ marginTop: '10px' }}>{props.title}</h3>
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'row',
              margin: 'auto',
            }}
          >
            <SpeakIcon />
            <div style={{ marginLeft: '3px' }}> {props.language1}, {props.language2}</div>
          </div>
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div style={{ marginLeft: '3px' }}>{props.experience}</div>
          </div>
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'row',
              margin: 'auto',
            }}
          >
            <SearchIcon />
            <div style={{ marginLeft: '3px' }}>
              #{props.tag1} #{props.tag2} #{props.tag3}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MktCard;
