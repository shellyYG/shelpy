import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import FeaturedHelperPart from '../../components/FeaturedHelperPart';
import HelperMarketingSection from '../../components/HelperMarketingSection';

const HelperLoggedInHomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  function handleCreateOfferClick(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helper/service-types`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }
  
  return (
    <div className='main-content-wrapper-no-height'>
      <div className='home-page-container'>
        <div
          className='centerWrapperWithBackgroundHelper'
          style={{ backgroundImage: 'url(/static-imgs/helper-home.jpeg)' }}
          title='Photo by Humphrey Muleba on Unsplash'
        >
          <div className='coverLeft'>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title1')}
              </h1>
            </div>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h2 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title2')}
              </h2>
              <h2 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title3')}
              </h2>
              <h2 style={{ textAlign: 'center', color: 'white' }}>
                {t('helper_home_banner_title4')}
              </h2>
            </div>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h3
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  marginBottom: '30px',
                  color: 'white',
                }}
              >
                {t('helper_home_banner_subtitle1')} <br />
                {t('helper_home_banner_subtitle2')}
              </h3>
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
        <FeaturedHelperPart isHelpee={false} />
      </div>
    </div>
  );
};

export default HelperLoggedInHomePage;
