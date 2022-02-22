import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import HelperMarketingSection from '../../components/HelperMarketingSection';

const HelperLoggedInHomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  function handleCreateOfferClick(e) {
    e.preventDefault();
    navigate('/helper/service-types');
  }
  
  return (
    <div className='main-content-wrapper-no-height'>
      <div className='home-page-container'>
        <div
          className='centerWrapperWithBackgroundHelper'
          style={{ backgroundImage: 'url(/helper-home.jpeg)' }}
          title='Photo by Humphrey Muleba on Unsplash'
        >
          <div className='coverLeft'>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title1')}
              </h1>
            </div>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title2')}
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
                {t('helper_home_banner_subtitle1')} <br />
                {t('helper_home_banner_subtitle2')}
              </h2>
            </div>
          </div>
          <div className='coverButtonWrapper'>
            <div style={{ margin: 'auto' }}>
              <button class='btn-next' onClick={handleCreateOfferClick}>
                {' '}
                {t('helper_home_cta')}
              </button>
            </div>
          </div>
        </div>
        <HelperMarketingSection />
      </div>
    </div>
  );
};

export default HelperLoggedInHomePage;
