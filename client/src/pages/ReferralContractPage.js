import '../App.css';
import { useTranslation } from 'react-i18next';

const ReferralContractPage = () => {
  const { t } = useTranslation();

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
            <h1>
              {t('shelpyltd')} {t('helper_terms')} - {t('referral_terms')}
            </h1>
          </div>

          <div style={{ width: '80%', margin: 'auto', textAlign: 'start' }}>
            <div style={{ margin: '10px auto' }}>
              {t('referral_terms_intro1')}
              {t('referral_terms_intro2')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('intro_title')}
              </p>
              {t('t1_why_helper_terms')}
              <br />
              {t('t2_helper_terms_explanation_power')}
              <br />
              {t('t3_helper_terms_violation')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('general_conditions_terms')}
              </p>{' '}
              {t('t1_referral_service_includes_d1')}
              <br />
              {t('t1_referral_service_includes_d2')}
              <br />
              {t('t2_referral_service_protect_helpee_d1')}
              <br />
              {t('t2_helper_service_protect_helpee_d2')}
              <br />
              {t('t2_referral_service_protect_helpee_t1')} <br />
              {t('t2_helper_service_protect_helpee_t2')} <br />
              {t('t2_helper_service_protect_helpee_t3')} <br />
              {t('t2_helper_service_protect_helpee_t4')} <br />
              {t('t2_helper_service_protect_helpee_t5')} <br />
              {t('t2_helper_service_protect_helpee_t6')} <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('helper_terms_payment_terms')}
              </p>{' '}
              {t('t1_referral_terms_payment_detail1')}
              {t('t1_referral_terms_payment_detail2')}
              <br />
              {t('t2_helper_terms_calculation')}
              <br />
              {t('t3_helper_terms_payment_date')}
              <br />
              {t('t4_referral_terms_payment_ways')}
              <br />
              <br />
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {t('helper_terms_termination')}
              </p>{' '}
              {t('helper_terms_termination_intro')} <br />
              {t('helper_terms_termination_t1')} <br />
              {t('helper_terms_termination_t2')} <br />
              {t('helper_terms_termination_t3')} <br />
              {t('referral_terms_termination_t4')} <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralContractPage;
