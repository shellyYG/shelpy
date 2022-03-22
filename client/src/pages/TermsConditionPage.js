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
      <div className='legalPagesOuterContainer'>
        <div className='legalPagesInnerContainer'>
          <div>
            <h1>Shelpy {t('terms_and_conditions')}</h1>
          </div>

          <div style={{ width: '80%', margin: 'auto', textAlign: 'start' }}>
            <div style={{ margin: '10px auto' }}>
              {t('update_time_terms')}
              <br />
              {t('provider_terms')}
              <p className='legalPagesTitle'>{t('intro_title')}</p>
              {t('intro_terms')}
              <p className='legalPagesTitle'>
                {t('sign_up_sign_in_terms_title')}
              </p>
              {t('sign_up_sign_in_terms_1')}
              <br />
              {t('sign_up_sign_in_terms_2')}
              <br />
              {t('sign_up_sign_in_terms_3')}
              <br />
              {t('sign_up_sign_in_terms_4')}
              <br />
              {t('sign_up_sign_in_terms_5')}
              <br />
              {t('sign_up_sign_in_terms_6')}
              <p className='legalPagesTitle'>{t('payment_terms_title')}</p>
              {t('payment_intro')}
              <p className='legalPagesTitle'>{t('receipt_process')}</p>
              {t('receipt_process_intro')}
              <p className='legalPagesTitle'>{t('refund_policy')}</p>
              {t('refund_policy_intro')}
              <br />
              <br />
              {t('refund_policy_s1')}
              <br />
              {t('refund_policy_s2')}
              <br />
              {t('refund_policy_s3')}
              <br />
              {t('refund_policy_s4')}
              <br />
              <br />
              {t('refund_policy_ending')}
              <br />
              <p className='legalPagesTitle'>{t('service_terms_title')}</p>
              {t('service_terms')}
              <p className='legalPagesTitle'>
                {t('ownership_terms_title')}
              </p>{' '}
              {t('ownership_terms')}
              <p className='legalPagesTitle'>
                {t('intellectual_property_rights_title')}
              </p>{' '}
              {t('intellectual_property_rights')}
              <p className='legalPagesTitle'>
                {t('stop_service_terms_title')}
              </p>{' '}
              {t('stop_service_terms')}
              <p className='legalPagesTitle'>{t('change_terms_title')}</p>{' '}
              {t('change_terms')}
              <p className='legalPagesTitle'>
                {t('warranty_and_disclaimer_title')}
              </p>{' '}
              {t('warranty_and_disclaimer')}
              <p className='legalPagesTitle'>
                {t('general_conditions_terms')}
              </p>{' '}
              {t('general_conditions')}
              {t('legal_country')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionaPage;
