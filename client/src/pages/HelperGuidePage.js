import '../App.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DangerIcon from '../components/Icons/DangerIcon';
import GuidanceCard from '../components/GuidanceCard';

const HelperGuidePage = () => {
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
            margin: '50px auto',
          }}
        >
          <div>
            <h1>How to be a Helper?</h1>
          </div>

          <div style={{ width: '80%', margin: 'auto', textAlign: 'start' }}>
            <div style={{ margin: '10px auto' }}>
              <GuidanceCard
                title={'Step 1. Apply to be a Helper'}
                details={`Go to helper home page and register for free.Go to helper home
              page and register for free.Go to helper home page and register for
              free.Go to helper home page and register for free.Go to helper
              home page and register for free.Go to helper home page and
              register for free.`}
                imgPath={'/static-imgs/helper_register_step.gif'}
                imgAlt={'register'}
              />
              <GuidanceCard
                title={'Step 2. Apply to be a Helper'}
                details={`Go to helper home page and register for free.Go to helper home
              page and register for free.Go to helper home page and register for
              free.Go to helper home page and register for free.Go to helper
              home page and register for free.Go to helper home page and
              register for free.`}
                imgPath={'/static-imgs/helper-home.jpeg'}
                imgAlt={'register'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelperGuidePage;
