import '../App.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DangerIcon from '../components/Icons/DangerIcon';

const TermsConditionaPage = () => {
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
            <h1>Shelpy {t('terms_and_conditions')}</h1>
          </div>

          <div style={{ width: '80%', margin: 'auto', textAlign: 'start' }}>
            <div style={{ margin: '10px auto' }}>
              {t('update_time_terms')}
              <br />
              {t('provider_terms')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('intro_title')}
              </p>
              {t('intro_terms')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('sign_up_sign_in_terms_title')}
              </p>{' '}
              {t('sign_up_sign_in_terms_1')}
              <br />
              {t('sign_up_sign_in_terms_2')}
              <br />
              {t('sign_up_sign_in_terms_3')}
              <br />
              {t('sign_up_sign_in_terms_4')}
              <br />
              <br />
              {t('sign_up_sign_in_terms_5')}
              <br />
              {t('sign_up_sign_in_terms_6')}
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('payment_terms_title')}
              </p>{' '}
              {t('payment_intro')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('service_terms_title')}
              </p>{' '}
              {t('service_terms')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('ownership_terms_title')}
              </p>{' '}
              {t('ownership_terms')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('intellectual_property_rights_title')}
              </p>{' '}
              {t('intellectual_property_rights')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('stop_service_terms_title')}
              </p>{' '}
              {t('stop_service_terms')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('change_terms_title')}
              </p>{' '}
              {t('change_terms')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('warranty_and_disclaimer_title')}
              </p>{' '}
              {t('warranty_and_disclaimer')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('general_conditions_terms')}
              </p>{' '}
              {t('general_conditions')}
              <br />
              <br />
              {t('legal_country')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionaPage;
