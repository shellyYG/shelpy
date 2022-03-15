import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import FeaturedHelperPart from '../../components/FeaturedHelperPart';
import HelpeeMarketingSection from '../../components/HelpeeMarketingSection';

const HelpeeLoggedInHomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  function handleBookHelperClick(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/helpee/service-types`;
    if (window.location.search) path += window.location.search;
    navigate(path);
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
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helpee_home_banner_title1')}
              </h1>
            </div>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                {t('helpee_home_banner_title2')}
              </h1>
            </div>
            <div style={{ textShadow: '0 1px 2px #000005' }}>
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
        <FeaturedHelperPart isHelpee={true} />
      </div>
    </div>
  );
};

export default HelpeeLoggedInHomePage;
