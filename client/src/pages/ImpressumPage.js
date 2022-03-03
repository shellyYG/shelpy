import { useTranslation } from 'react-i18next';

const ImpressumPage = () => {
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

export default ImpressumPage;
