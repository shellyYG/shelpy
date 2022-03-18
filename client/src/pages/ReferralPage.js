import { useTranslation } from 'react-i18next';

const ReferralPage = (props) => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  console.log('ReferralPage isHelpee: ', props.isHelpee);
  return (
    <div
      className='main-content-wrapper-homepage'
      style={{ backgroundImage: 'url(/static-imgs/helpee-home.jpeg)' }}
    >
      <div className='section-center-align-landing'>
        <div className='centerWrapper' style={{ textAlign: 'center' }}>
          {props.isHelpee && <h2>{t('helpee_referral_title')}</h2>}
          {!props.isHelpee && <h2>{t('helper_referral_title')}</h2>}
          <br />
          <h3>
            {props.isHelpee &&
              t('your_referral_link', {
                link: `https://shelpy.co/${currentLanguage}/helpee/home?refId=helpee${props.helpeeId}`,
              })}{' '}
            <br />
            {!props.isHelpee &&
              t('your_referral_link', {
                link: `https://shelpy.co/${currentLanguage}/helper/home?refId=helper${props.helperId}`,
              })}{' '}
            <br />
            <br />
            {props.isHelpee && t('if_helper_sign_up')}
            {!props.isHelpee && t('if_helpee_sign_up')}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
