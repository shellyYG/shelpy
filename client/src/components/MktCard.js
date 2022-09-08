import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from './Icons/SearchIcon';
import SpeakIcon from './Icons/SpeakIcon';

function MktCard(props) {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('');

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  
  return (
    <div className='mktCard'>
      <div className='content'>
        <div className='imgBx'>
          <img
            src={props.imageSrc}
            alt={props.text}
            onClick={() =>
              window.open(
                `/${currentLanguage}/personal/offers?providerId=${props.providerId}&refId=helper${props.providerId}&refId=${refId}`, "_blank"
              )
            }
            style={{ cursor: 'pointer' }}
          ></img>
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
            <div style={{ marginLeft: '3px' }}>
              {' '}
              {props.language1}, {props.language2}
            </div>
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
