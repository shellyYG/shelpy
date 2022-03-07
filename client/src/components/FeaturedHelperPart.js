import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from './Icons/SearchIcon';
import MktCard from './MktCard';

function FeaturedHelperPart(props) {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
        {props.isHelpee
          ? t('featured_helpees_experts')
          : t('featured_helpers_experts')}
      </h1>
      <div className='pureFlexRow' style={{ marginBottom: '30px' }}>
        {props.isHelpee && (
          <div className='mktHomepageText'>
            <p style={{ textAlign: 'center' }}>
              {t('want_to_book_mkt_helpers')}{' '}
              <a
                href={`/${currentLanguage}/helpee/service-types?refId=${refId}`}
                target='_blank'
                rel='noreferrer'
              >
                {t('create_a_request_sentence_1')}
              </a>{' '}
              {t('create_a_request_sentence_2')}{' '}
            </p>
          </div>
        )}
      </div>
      <div className='container'>
        <MktCard
          imageSrc='/static-imgs/Ian_job.png'
          title='Ian'
          key='ian-job'
          experience={t('mkt_ian_job')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('job')}
          tag2={t('job_form_job_project_manager')}
          tag3={t('country_ireland')}
        />
        <MktCard
          imageSrc='/static-imgs/Chrystal_selfEmployed.jpg'
          title='Crystal'
          key='crystal-selfEmployed'
          experience={t('mkt_crystal_selfEmployed')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('service_types_self_employed')}
          tag2={t('self_employed_profession_makeup_artist')}
          tag3={t('country_france')}
        />
        <MktCard
          imageSrc='/static-imgs/easyCookAsia_selfEmployed.jpeg'
          title='Marcus'
          key='marcus-selfEmployed'
          experience={t('mkt_marcus_selfEmployed')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('service_types_self_employed')}
          tag2={t('self_employed_profession_ui_ecommerce')}
          tag3={t('country_germany')}
        />
        <MktCard
          imageSrc='/static-imgs/Chris_school.jpg'
          title='Chris'
          key='chris-school'
          experience={t('mkt_chris_school')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('school')}
          tag2={t('uni_form_department_chemistry')}
          tag3={t('country_usa')}
        />
        <MktCard
          imageSrc='/static-imgs/Anya_school.jpeg'
          title='Anya'
          key='anya-school'
          experience={t('mkt_anya_school')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('school')}
          tag2={t('uni_form_department_neuroscience')}
          tag3={t('country_usa')}
        />
        <MktCard
          imageSrc='/static-imgs/Yichen_school.jpg'
          title='YC'
          key='yichen-school'
          experience={t('mkt_yc_school')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('school')}
          tag2={t('uni_form_department_chemistry')}
          tag3={t('country_germany')}
        />
        <MktCard
          imageSrc='/static-imgs/Markus_job.jpeg'
          title='Markus'
          key='markus-job'
          experience={t('mkt_markus_job')}
          language1={t('languages_english')}
          language2={t('languages_german')}
          tag1={t('job')}
          tag2={t('job_form_job_strategy_consultant')}
          tag3={t('country_germany')}
        />

        <MktCard
          imageSrc='/static-imgs/Nick_school.jpg'
          title='Nick'
          key='nick-school'
          experience={t('mkt_nick_school')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('school')}
          tag2={t('uni_form_department_computer_science_and_info_engineering')}
          tag3={t('country_usa')}
        />

        <MktCard
          imageSrc='/static-imgs/Shelly_job.jpg'
          title='Shelly'
          key='shelly-job'
          experience={t('mkt_shelly_job')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('job')}
          tag2={t('job_form_job_data_analyst')}
          tag3={t('country_germany')}
        />
        <MktCard
          imageSrc='/static-imgs/Chloe_job.png'
          title='Chloe'
          key='chloe-job'
          experience={t('mkt_chloe_job')}
          language1={t('languages_chinese')}
          language2={t('languages_english')}
          tag1={t('job')}
          tag2={t('job_form_job_mobile_developer')}
          tag3={t('country_germany')}
        />
      </div>
    </>
  );
}

export default FeaturedHelperPart;
