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
          imagePath='/helpPeople.jpg'
          lastChild={false}
        />
        <MktRow
          title={t('helper_mkt_generate_extra_revenue')}
          details1={t('helper_mkt_generate_extra_revenue_subtitle1')}
          details2={t('helper_mkt_generate_extra_revenue_subtitle2')}
          imagePath='/sidebusiness.jpeg'
          lastChild={false}
        />
        <MktRow
          title={t('helper_mkt_marketing_listing')}
          details1={t('helper_mkt_marketing_listing_subtitle1')}
          details2={t('helper_mkt_marketing_listing_subtitle2')}
          imagePath='/counselor.jpeg'
          lastChild={true}
        />
        <MktRow
          title={t('helper_mkt_control_privacy')}
          details1={t('helper_mkt_control_privacy_subtitle1')}
          details2={t('helper_mkt_control_privacy_subtitle2')}
          imagePath='/oneToOne.jpeg'
          lastChild={false}
        />
      </div>
    </div>
  );
};

export default HelperMarketingSection;
