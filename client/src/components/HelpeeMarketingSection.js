import { useTranslation } from 'react-i18next';
import '../App.css';
import MktRow from './MktRow';

const HelpeeMarketingSection = () => {
  const { t } = useTranslation();
  return (
    <div className='centerWrapperMkt'>
      <div className='mktWrapper'>
        <MktRow
          title={t('helpee_mkt_minimize_risk')}
          details1={t('helpee_mkt_minimize_risk_subtitle1')}
          details2={t('helpee_mkt_minimize_risk_subtitle2')}
          imagePath='/dinner.jpeg'
          alt='Photo by Vincenzo Landino on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_meet_role_model')}
          details1={t('helpee_mkt_meet_role_model_subtitle1')}
          details2={t('helpee_mkt_meet_role_model_subtitle2')}
          imagePath='/friends.jpeg'
          alt='Photo by Naassom Azevedo on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_get_answer')}
          details1={t('helpee_mkt_get_answer_subtitle1')}
          details2={t('helpee_mkt_get_answer_subtitle2')}
          imagePath='/google.jpeg'
          alt='Photo by Firmbee.com on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_control_privacy')}
          details1={t('helpee_mkt_control_privacy_subtitle1')}
          details2={t('helpee_mkt_control_privacy_subtitle2')}
          imagePath='/oneToOne.jpeg'
          alt='Photo by Brett Jordan on Unsplash'
          lastChild={true}
        />
      </div>
    </div>
  );
};

export default HelpeeMarketingSection;
