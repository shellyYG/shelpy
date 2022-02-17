import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <div className='main-content-wrapper-homepage'>
      <div className='section-center-align-landing'>
        <div
          className='centerWrapper'
          style={{ textAlign: 'center', paddingTop: '28px' }}
        >
          <h2>{t('mission_statement')}</h2>
          <br />
          <h3>
            {t('mission_statement_part1')} <br />
            <br />
            {t('mission_statement_part2')}
          </h3>
          <br />
          <h2>Impressum</h2>
          <br />
          <h3>
            Angaben gemäß § 5 TMG Obertshausen, Germany
            <br />
            <br />
            E-Mail: team@shelpy.de
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
