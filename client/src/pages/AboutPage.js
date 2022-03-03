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
            {t('mission_statement_part1')} <br />
            {t('mission_statement_part2')}
          </h3>
          <br />
          <h2>Impressum</h2>
          <br />
          <h3>
            Angaben gemäß § 5 TMG Pingtung, Taiwan
            <br />
            <br />
            E-Mail: team@shelpy.co
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
