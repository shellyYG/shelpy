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
          imagePath='/static-imgs/helpPeople.jpg'
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
          title={t('helper_mkt_marketing_listing')}
          details1={t('helper_mkt_marketing_listing_subtitle1')}
          details2={t('helper_mkt_marketing_listing_subtitle2')}
          imagePath='/static-imgs/counselor.jpeg'
          alt='Photo by Christina @ wocintechchat.com on Unsplash'
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
      </div>
    </div>
  );
};

export default HelperMarketingSection;
