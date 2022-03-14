import { useTranslation } from 'react-i18next';
import '../App.css';
import MktRow from './MktRow';

const HelpeeMarketingSection = () => {
  const { t } = useTranslation();
  return (
    <div className='centerWrapperMkt'>
      <div className='mktWrapper'>
        <MktRow
          title={t('helpee_mkt_affordable_price')}
          details1={t('helpee_mkt_affordable_price_subtitle1')}
          details2={t('helpee_mkt_affordable_price_subtitle2')}
          imagePath='/static-imgs/dinner.jpeg'
          alt='Photo by Vincenzo Landino on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_time_saving')}
          details1={t('helpee_mkt_time_saving_subtitle1')}
          details2={t('helpee_mkt_time_saving_subtitle2')}
          imagePath='/static-imgs/time.jpeg'
          alt='Photo by Icons8 Team on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_value_of_insider_info')}
          details1={t('helpee_mkt_value_of_insider_info_subtitle1')}
          details2={t('helpee_mkt_value_of_insider_info_subtitle2')}
          imagePath='/static-imgs/secret.jpeg'
          alt='Photo by saeed karimi on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_meet_role_model')}
          details1={t('helpee_mkt_meet_role_model_subtitle1')}
          details2={t('helpee_mkt_meet_role_model_subtitle2')}
          imagePath='/static-imgs/friends.jpeg'
          alt='Photo by Naassom Azevedo on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_get_answer')}
          details1={t('helpee_mkt_get_answer_subtitle1')}
          details2={t('helpee_mkt_get_answer_subtitle2')}
          imagePath='/static-imgs/google.jpeg'
          alt='Photo by Firmbee.com on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_market_researcher')}
          details1={t('helpee_mkt_market_researcher_subtitle1')}
          details2={t('helpee_mkt_market_researcher_subtitle2')}
          imagePath='/static-imgs/counselor.jpeg'
          alt='Photo by Christina @ wocintechchat.com on Unsplash'
          lastChild
        />
        <MktRow
          title={t('helpee_mkt_control_privacy')}
          details1={t('helpee_mkt_control_privacy_subtitle1')}
          details2={t('helpee_mkt_control_privacy_subtitle2')}
          imagePath='/static-imgs/oneToOne.jpeg'
          alt='Photo by Brett Jordan on Unsplash'
          lastChild={true}
        />
        <MktRow
          title={t('helpee_mkt_review_helper_eligible')}
          details1={t('helpee_mkt_review_helper_eligible_subtitle1')}
          details2={t('helpee_mkt_review_helper_eligible_subtitle2')}
          imagePath='/static-imgs/interview.jpeg'
          alt='Photo by LinkedIn Sales Solutions on Unsplash'
          lastChild={true}
        />
      </div>
    </div>
  );
};

export default HelpeeMarketingSection;
