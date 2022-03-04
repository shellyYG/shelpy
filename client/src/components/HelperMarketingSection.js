import { useTranslation } from 'react-i18next';
import '../App.css';
import MktRow from './MktRow';

const HelperMarketingSection = () => {
  const { t } = useTranslation();
  return (
    <div className='centerWrapperMkt'>
      <div className='mktWrapper'>
        <MktRow
          title={t('helper_mkt_help_people')}
          details1={t('helper_mkt_help_people_subtitle1')}
          details2={t('helper_mkt_help_people_subtitle2')}
          imagePath='/static-imgs/helpPeople.jpeg'
          alt='Photo by Kelly Sikkema on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helper_mkt_generate_extra_revenue')}
          details1={t('helper_mkt_generate_extra_revenue_subtitle1')}
          details2={t('helper_mkt_generate_extra_revenue_subtitle2')}
          imagePath='/static-imgs/sidebusiness.jpeg'
          alt='Photo by Cayley Nossiter on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helpee_mkt_time_saving')}
          details1={t('helpee_mkt_time_saving_subtitle1')}
          details2={t('helper_mkt_time_saving_subtitle2')}
          imagePath='/static-imgs/time.jpeg'
          alt='Photo by Icons8 Team on Unsplash'
          lastChild={false}
        />
        <MktRow
          title={t('helper_mkt_share_truth_not_perfect')}
          details1={t('helper_mkt_share_truth_not_perfect_subtitle1')}
          details2={t('helper_mkt_share_truth_not_perfect_subtitle2')}
          imagePath='/static-imgs/truth.jpeg'
          alt='Photo by Alex Shute on Unsplash'
          lastChild={false}
        />

        <MktRow
          title={t('helper_mkt_control_privacy')}
          details1={t('helper_mkt_control_privacy_subtitle1')}
          details2={t('helper_mkt_control_privacy_subtitle2')}
          imagePath='/static-imgs/oneToOne.jpeg'
          alt='Photo by Brett Jordan on Unsplash'
          lastChild={true}
        />
        <MktRow
          title={t('helper_mkt_marketing_listing')}
          details1={t('helper_mkt_marketing_listing_subtitle1')}
          details2={t('helper_mkt_marketing_listing_subtitle2')}
          imagePath='/static-imgs/counselor.jpeg'
          alt='Photo by Christina @ wocintechchat.com on Unsplash'
          lastChild={false}
        />
      </div>
    </div>
  );
};

export default HelperMarketingSection;
