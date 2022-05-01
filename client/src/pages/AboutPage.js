import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <div
      className='main-content-wrapper-homepage'
      style={{ backgroundImage: 'url(/static-imgs/helpee-home.jpeg)' }}
    >
      <div className='section-center-align-landing'>
        <div className='centerWrapper' style={{ textAlign: 'center' }}>
          <img
            src={'/static-imgs/shelpy_logo.png'}
            alt={'shelpy'}
            style={{ width: '150px', height: '150px' }}
          />
          <h2>{t('mission_statement')}</h2>
          <br />
          <h3>
            {t('mission_statement_part0')} <br />
            <br />
          </h3>
          <h2>{t('our_vision')}</h2>
          <br />
          <p style={{ margin: '3px 30px' }}>
            {t('mission_statement_part1')} <br />
            <br />
          </p>
          <p style={{ margin: '3px 30px' }}>
            {t('mission_statement_part2')} <br />
            <br />
          </p>
          <p style={{ margin: '3px 30px' }}>
            {t('mission_statement_part3')} <br />
            <br />
          </p>
          <p style={{ margin: '3px 30px' }}>
            {t('mission_statement_part4')} <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
