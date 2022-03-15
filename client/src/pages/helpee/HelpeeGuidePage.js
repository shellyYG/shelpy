import '../../App.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DangerIcon from '../../components/Icons/DangerIcon';
import GuidanceCard from '../../components/GuidanceCard';

const HelpeeGuidePage = () => {
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
            margin: 'auto'
          }}
        >
          <div>
            <h1>{t('helpee_guide')}</h1>
          </div>

          <div style={{ width: '80%', margin: 'auto', textAlign: 'start' }}>
            <div style={{ margin: '10px auto' }}>
              <GuidanceCard
                title={t('helpee_guide_step1_title')}
                list1={t('helpee_guide_step_1_list1')}
                list2={t('helpee_guide_step_1_list2')}
                list3={t('helpee_guide_step_1_list3')}
                list4={t('helpee_guide_step_1_list4')}
                imgPath={
                  currentLanguage === 'en'
                    ? '/static-imgs/gifs/helpee/sign_up.gif'
                    : '/static-imgs/gifs/helpee/sign_up_zh.gif'
                }
                imgAlt={'register'}
              />
              <GuidanceCard
                title={t('helpee_guide_step2_title')}
                list1={t('helpee_guide_step_2_list1')}
                list2={t('helpee_guide_step_2_list2')}
                list3={t('helpee_guide_step_2_list3')}
                imgPath={
                  currentLanguage === 'en'
                    ? '/static-imgs/gifs/helpee/confirm_email_sign_in.gif'
                    : '/static-imgs/gifs/helpee/confirm_email_sign_in_zh.gif'
                }
                imgAlt={'confirm_email_sign_in'}
              />
              <GuidanceCard
                title={t('helpee_guide_step3_title')}
                list1={t('helpee_guide_step_3_list1')}
                list2={t('helpee_guide_step_3_list2')}
                list3={t('helpee_guide_step_3_list3')}
                list4={t('helpee_guide_step_3_list4')}
                imgPath={
                  currentLanguage === 'en'
                    ? '/static-imgs/gifs/helpee/basic_info.gif'
                    : '/static-imgs/gifs/helpee/basic_info_zh.gif'
                }
                imgAlt={'basic_info'}
              />
              <GuidanceCard
                title={t('helpee_guide_step4_title')}
                list1={t('helpee_guide_step_4_list1')}
                list2={t('helpee_guide_step_4_list2')}
                list3={t('helpee_guide_step_4_list3')}
                list4={t('helpee_guide_step_4_list4')}
                list5={t('helpee_guide_step_4_list5')}
                list6={t('helpee_guide_step_4_list6')}
                list7={t('helpee_guide_step_4_list7')}
                list8={t('helpee_guide_step_4_list8')}
                imgPath={
                  currentLanguage === 'en'
                    ? '/static-imgs/gifs/helpee/create_request.gif'
                    : '/static-imgs/gifs/helpee/create_request_zh.gif'
                }
                imgAlt={'create_request'}
              />
              <GuidanceCard
                title={t('helpee_guide_step5_title')}
                list1={t('helpee_guide_step_5_list1')}
                list2={t('helpee_guide_step_5_list2')}
                list3={t('helpee_guide_step_5_list3')}
                list4={t('helpee_guide_step_5_list4')}
                list5={t('helpee_guide_step_5_list5')}
                list6={t('helpee_guide_step_5_list6')}
                imgPath={
                  currentLanguage === 'en'
                    ? '/static-imgs/gifs/helpee/chat_with_helper.gif'
                    : '/static-imgs/gifs/helpee/chat_with_helper_zh.gif'
                }
                imgAlt={'chat_with_helper'}
              />
              <GuidanceCard
                title={t('helpee_guide_step6_title')}
                list1={t('helpee_guide_step_6_list1')}
                list2={t('helpee_guide_step_6_list2')}
                list3={t('helpee_guide_step_6_list3')}
                list4={t('helpee_guide_step_6_list4')}
                list5={t('helpee_guide_step_6_list5')}
                list6={t('helpee_guide_step_6_list6')}
                list7={t('helpee_guide_step_6_list7')}
                imgPath={
                  currentLanguage === 'en'
                    ? '/static-imgs/gifs/helpee/book_helper.gif'
                    : '/static-imgs/gifs/helpee/book_helper_zh.gif'
                }
                imgAlt={'book_helper'}
              />
              <GuidanceCard
                title={t('helpee_guide_step7_title')}
                list1={t('helpee_guide_step_7_list1')}
                list2={t('helpee_guide_step_7_list2')}
                list3={t('helpee_guide_step_7_list3')}
                list4={t('helpee_guide_step_7_list4')}
                list5={t('helpee_guide_step_7_list5')}
                imgPath={
                  currentLanguage === 'en'
                    ? '/static-imgs/gifs/helpee/pay_helper.gif'
                    : '/static-imgs/gifs/helpee/pay_helper_zh.gif'
                }
                imgAlt={'pay_helper'}
              />
              <GuidanceCard
                title={t('helpee_guide_step8_title')}
                list1={t('helpee_guide_step_8_list1')}
                list2={t('helpee_guide_step_8_list2')}
                list3={t('helpee_guide_step_8_list3')}
                list4={t('helpee_guide_step_8_list4')}
                list5={t('helpee_guide_step_8_list5')}
                list6={t('helpee_guide_step_8_list6')}
                list7={t('helpee_guide_step_8_list7')}
                imgPath={'/static-imgs/gifs/helpee/join_webex_meeting.gif'}
                imgAlt={'join_webex_meeting'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpeeGuidePage;
