import '../App.css';
import { useTranslation } from 'react-i18next';
import GuidanceCard from '../components/GuidanceCard';
import HowItWorksCard from '../components/HowItWorksCard';

const HowItWorksPage = () => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  return (
    <div className='section-left-align'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: '100%',
          }}
        >
          <div style={{ margin: '10px auto'}}>
            <h2>{t('easy_5_step')}</h2>
          </div>

          <div
            style={{
              display: 'flex',

              flexDirection: 'column',
              margin: 'auto',
            }}
          >
            <HowItWorksCard
              imgPath={
                currentLanguage === 'en'
                  ? '/static-imgs/how-it-works/hiw_en1.png'
                  : '/static-imgs/how-it-works/hiw_zh1.png'
              }
              imgAlt={'register'}
            />
            <HowItWorksCard
              imgPath={
                currentLanguage === 'en'
                  ? '/static-imgs/how-it-works/hiw_en2.png'
                  : '/static-imgs/how-it-works/hiw_zh2.png'
              }
              imgAlt={'register'}
            />
            <HowItWorksCard
              imgPath={
                currentLanguage === 'en'
                  ? '/static-imgs/how-it-works/hiw_en3.png'
                  : '/static-imgs/how-it-works/hiw_zh3.png'
              }
              imgAlt={'register'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
