import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import HelpeeMarketingSection from '../../components/HelpeeMarketingSection';

const HelpeeLoggedInHomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  function handleBookHelperClick(e) {
    e.preventDefault();
    navigate('/helpee/service-types');
  }
  return (
    <div className='main-content-wrapper-no-height'>
      <div className='home-page-container'>
        <div
          className='centerWrapperWithBackground'
          style={{ backgroundImage: 'url(/static-imgs/helpee-home.jpeg)' }}
          title='Photo by Windows on Unsplash'
        >
          <div className='coverLeft'>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helpee_home_banner_title1')}
              </h1>
            </div>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helpee_home_banner_title2')}
              </h1>
            </div>
            <div>
              <h2
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  marginBottom: '30px',
                  color: 'white',
                }}
              >
                {t('helpee_home_banner_subtitle1')} <br />
                {t('helpee_home_banner_subtitle2')}
              </h2>
            </div>
          </div>
          <div className='coverButtonWrapper'>
            <div style={{ margin: 'auto' }}>
              <button class='btn-next' onClick={handleBookHelperClick}>
                {' '}
                {t('helpee_home_book_helper_now')}
              </button>
            </div>
          </div>
        </div>
        <HelpeeMarketingSection />
      </div>
    </div>
  );
};

export default HelpeeLoggedInHomePage;
