import '../App.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DangerIcon from '../components/Icons/DangerIcon';
import BulletPoint from '../components/BulletPoint';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const navigate = useNavigate();
  function handleToHomepage(e) {
    e.preventDefault();
    let path = `/${currentLanguage}/home`;
    if (window.location.search) path += window.location.search;
    navigate(path, { replace: true });
  }
  return (
    <div className='section-left-align'>
      <div className='legalPagesOuterContainer'>
        <div className='legalPagesInnerContainer'>
          <div>
            <h1>Shelpy {t('privacy_policy')}</h1>
          </div>

          <div style={{ width: '80%', margin: 'auto', textAlign: 'start' }}>
            <div style={{ margin: '10px auto' }}>
              <p className='legalPagesBigTitle'>{t('privacy_policy')}</p>
              <p>{t('privacy_policy_last_update')}</p>
              <p>{t('privacy_policy_preface1')}</p>
              <p>{t('privacy_policy_preface2')}</p>
              <br />
              <p style={{ fontWeight: 'bold' }}>{t('why_CCPA_GDPA')}</p>

              <p className='legalPagesBigTitle'>
                {t('interpretation_and_definitions')}
              </p>
              <p className='legalPagesTitle'>{t('interpretation')}</p>
              <p>{t('interpretation_p1')}</p>
              <p className='legalPagesTitle'>{t('definitions')}</p>
              <p>{t('for_the_purpose_privacy')}</p>

              <ul>
                <BulletPoint
                  title={t('accout')}
                  details1={t('account_meaning')}
                />
                <BulletPoint
                  title={t('business')}
                  details1={t('business_meaning')}
                />
                <BulletPoint
                  title={t('company')}
                  details1={t('company_meaning')}
                  details2={t('company_gdpr')}
                />
                <BulletPoint
                  title={t('consumer')}
                  details1={t('consumer_meaning')}
                />
                <BulletPoint
                  title={t('cookies')}
                  details1={t('cookies_meaning')}
                />
                <BulletPoint
                  title={t('country')}
                  details1={t('country_meaning')}
                />
                <BulletPoint
                  title={t('data_controller')}
                  details1={t('data_controller_meaning')}
                />
                <BulletPoint
                  title={t('device')}
                  details1={t('device_meaning')}
                />
                <BulletPoint
                  title={t('do_not_track')}
                  details1={t('do_not_track_meaning')}
                />

                <BulletPoint
                  title={t('fb_fanpage')}
                  details1={t('fb_fanpage_meaning')}
                />
                <p style={{ marginLeft: '1em' }}>
                  <a
                    href='https://www.facebook.com/shelpy.co'
                    rel='external nofollow noopener noreferrer'
                    target='_blank'
                  >
                    https://www.facebook.com/shelpy.co
                  </a>
                </p>

                <BulletPoint
                  title={t('personal_data')}
                  details1={t('personal_data_meaning')}
                  details2={t('personal_data_gdpr')}
                  details3={t('personal_data_ccpa')}
                />
                <BulletPoint title={t('sale')} details1={t('sale_meaning')} />
                <BulletPoint
                  title={t('service')}
                  details1={t('service_meaning')}
                />
                <BulletPoint
                  title={t('service_provider')}
                  details1={t('service_provider_meaning')}
                />
                <BulletPoint
                  title={t('third_party_social_media')}
                  details1={t('third_party_social_media_meaning')}
                />
                <BulletPoint
                  title={t('usage_data')}
                  details1={t('usage_data_meaning')}
                />
                <BulletPoint
                  title={t('website')}
                  details1={t('website_meaning')}
                />
                <p style={{ marginLeft: '1em' }}>
                  <a
                    href='https://shelpy.co/'
                    rel='external nofollow noopener noreferrer'
                    target='_blank'
                  >
                    https://shelpy.co
                  </a>
                </p>

                <BulletPoint
                  title={t('you')}
                  details1={t('you_meaning')}
                  details2={t('you_gdpr')}
                />
              </ul>
              <p className='legalPagesBigTitle'>
                {t('collect_and_use_personal_data')}
              </p>

              <p className='legalPagesTitle'>{t('types_of_data')}</p>
              <p className='legalPagesSubtitle'>{t('personal_data')}</p>
              <p>{t('usage_of_personal_data_intro')}</p>
              <ul>
                <BulletPoint details1={t('email_address')} />
                <BulletPoint details1={t('first_and_last_name')} />
                <BulletPoint details1={t('phone_number')} />
                <BulletPoint details1={t('address_details')} />
                <BulletPoint details1={t('usage_data')} />
              </ul>
              <p className='legalPagesSubtitle'>{t('usage_data')}</p>
              <p>{t('usage_data_collect_automatically')}</p>
              <p>{t('usage_data_example')}</p>
              <p>{t('usage_data_when_access')}</p>
              <p>{t('usage_data_may_also')}</p>

              <p className='legalPagesSubtitle'>
                {t('info_from_third_social')}
              </p>

              <p>{t('ways_to_register')}</p>
              <ul>
                <BulletPoint details1={'Google'} />
                <BulletPoint details1={'Facebook'} />
              </ul>
              <p>{t('if_register_with_social')}</p>
              <p>{t('social_also_others')}</p>
              <h3>Tracking Technologies and Cookies</h3>
              <p>
                We use Cookies and similar tracking technologies to track the
                activity on Our Service and store certain information. Tracking
                technologies used are beacons, tags, and scripts to collect and
                track information and to improve and analyze Our Service. The
                technologies We use may include:
              </p>
              <ul>
                <li>
                  <strong>Cookies or Browser Cookies.</strong> A cookie is a
                  small file placed on Your Device. You can instruct Your
                  browser to refuse all Cookies or to indicate when a Cookie is
                  being sent. However, if You do not accept Cookies, You may not
                  be able to use some parts of our Service. Unless you have
                  adjusted Your browser setting so that it will refuse Cookies,
                  our Service may use Cookies.
                </li>
                <li>
                  <strong>Flash Cookies.</strong> Certain features of our
                  Service may use local stored objects (or Flash Cookies) to
                  collect and store information about Your preferences or Your
                  activity on our Service. Flash Cookies are not managed by the
                  same browser settings as those used for Browser Cookies. For
                  more information on how You can delete Flash Cookies, please
                  read "Where can I change the settings for disabling, or
                  deleting local shared objects?" available at{' '}
                  <a
                    href='https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_'
                    rel='external nofollow noopener'
                    target='_blank'
                  >
                    https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_
                  </a>
                </li>
                <li>
                  <strong>Web Beacons.</strong> Certain sections of our Service
                  and our emails may contain small electronic files known as web
                  beacons (also referred to as clear gifs, pixel tags, and
                  single-pixel gifs) that permit the Company, for example, to
                  count users who have visited those pages or opened an email
                  and for other related website statistics (for example,
                  recording the popularity of a certain section and verifying
                  system and server integrity).
                </li>
              </ul>
              <p>
                Cookies can be "Persistent" or "Session" Cookies. Persistent
                Cookies remain on Your personal computer or mobile device when
                You go offline, while Session Cookies are deleted as soon as You
                close Your web browser. You can learn more about cookies here:{' '}
                <a
                  href='https://www.termsfeed.com/privacy-policy-generator/#faq-8'
                  target='_blank'
                >
                  Cookies by TermsFeed Generator
                </a>
                .
              </p>
              <p>
                We use both Session and Persistent Cookies for the purposes set
                out below:
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Necessary / Essential Cookies</strong>
                  </p>
                  <p>Type: Session Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies are essential to provide You with
                    services available through the Website and to enable You to
                    use some of its features. They help to authenticate users
                    and prevent fraudulent use of user accounts. Without these
                    Cookies, the services that You have asked for cannot be
                    provided, and We only use these Cookies to provide You with
                    those services.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cookies Policy / Notice Acceptance Cookies</strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies identify if users have accepted the
                    use of cookies on the Website.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Functionality Cookies</strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies allow us to remember choices You make
                    when You use the Website, such as remembering your login
                    details or language preference. The purpose of these Cookies
                    is to provide You with a more personal experience and to
                    avoid You having to re-enter your preferences every time You
                    use the Website.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Tracking and Performance Cookies</strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Third-Parties</p>
                  <p>
                    Purpose: These Cookies are used to track information about
                    traffic to the Website and how users use the Website. The
                    information gathered via these Cookies may directly or
                    indirectly identify you as an individual visitor. This is
                    because the information collected is typically linked to a
                    pseudonymous identifier associated with the device you use
                    to access the Website. We may also use these Cookies to test
                    new pages, features or new functionality of the Website to
                    see how our users react to them.
                  </p>
                </li>
              </ul>
              <p>
                For more information about the cookies we use and your choices
                regarding cookies, please visit our Cookies Policy or the
                Cookies section of our Privacy Policy.
              </p>
              <h2>Use of Your Personal Data</h2>
              <p>
                The Company may use Personal Data for the following purposes:
              </p>
              <ul>
                <li>
                  <strong>To provide and maintain our Service</strong>,
                  including to monitor the usage of our Service.
                </li>
                <li>
                  <strong>To manage Your Account:</strong> to manage Your
                  registration as a user of the Service. The Personal Data You
                  provide can give You access to different functionalities of
                  the Service that are available to You as a registered user.
                </li>
                <li>
                  <strong>For the performance of a contract:</strong> the
                  development, compliance and undertaking of the purchase
                  contract for the products, items or services You have
                  purchased or of any other contract with Us through the
                  Service.
                </li>
                <li>
                  <strong>To contact You:</strong> To contact You by email,
                  telephone calls, SMS, or other equivalent forms of electronic
                  communication, such as a mobile application's push
                  notifications regarding updates or informative communications
                  related to the functionalities, products or contracted
                  services, including the security updates, when necessary or
                  reasonable for their implementation.
                </li>
                <li>
                  <strong>To provide You</strong> with news, special offers and
                  general information about other goods, services and events
                  which we offer that are similar to those that you have already
                  purchased or enquired about unless You have opted not to
                  receive such information.
                </li>
                <li>
                  <strong>To manage Your requests:</strong> To attend and manage
                  Your requests to Us.
                </li>
                <li>
                  <strong>To deliver targeted advertising to You</strong>: We
                  may use Your information to develop and display content and
                  advertising (and work with third-party vendors who do so)
                  tailored to Your interests and/or location and to measure its
                  effectiveness.
                </li>
                <li>
                  <strong>For business transfers:</strong> We may use Your
                  information to evaluate or conduct a merger, divestiture,
                  restructuring, reorganization, dissolution, or other sale or
                  transfer of some or all of Our assets, whether as a going
                  concern or as part of bankruptcy, liquidation, or similar
                  proceeding, in which Personal Data held by Us about our
                  Service users is among the assets transferred.
                </li>
                <li>
                  <strong>For other purposes</strong>: We may use Your
                  information for other purposes, such as data analysis,
                  identifying usage trends, determining the effectiveness of our
                  promotional campaigns and to evaluate and improve our Service,
                  products, services, marketing and your experience.
                </li>
              </ul>
              <p>
                We may share Your personal information in the following
                situations:
              </p>
              <ul>
                <li>
                  <strong>With Service Providers:</strong> We may share Your
                  personal information with Service Providers to monitor and
                  analyze the use of our Service, to advertise on third party
                  websites to You after You visited our Service, for payment
                  processing, to contact You.
                </li>
                <li>
                  <strong>For business transfers:</strong> We may share or
                  transfer Your personal information in connection with, or
                  during negotiations of, any merger, sale of Company assets,
                  financing, or acquisition of all or a portion of Our business
                  to another company.
                </li>
                <li>
                  <strong>With Affiliates:</strong> We may share Your
                  information with Our affiliates, in which case we will require
                  those affiliates to honor this Privacy Policy. Affiliates
                  include Our parent company and any other subsidiaries, joint
                  venture partners or other companies that We control or that
                  are under common control with Us.
                </li>
                <li>
                  <strong>With business partners:</strong> We may share Your
                  information with Our business partners to offer You certain
                  products, services or promotions.
                </li>
                <li>
                  <strong>With other users:</strong> when You share personal
                  information or otherwise interact in the public areas with
                  other users, such information may be viewed by all users and
                  may be publicly distributed outside. If You interact with
                  other users or register through a Third-Party Social Media
                  Service, Your contacts on the Third-Party Social Media Service
                  may see Your name, profile, pictures and description of Your
                  activity. Similarly, other users will be able to view
                  descriptions of Your activity, communicate with You and view
                  Your profile.
                </li>
                <li>
                  <strong>With Your consent</strong>: We may disclose Your
                  personal information for any other purpose with Your consent.
                </li>
              </ul>
              <h2>Retention of Your Personal Data</h2>
              <p>
                The Company will retain Your Personal Data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use Your Personal Data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p>
                The Company will also retain Usage Data for internal analysis
                purposes. Usage Data is generally retained for a shorter period
                of time, except when this data is used to strengthen the
                security or to improve the functionality of Our Service, or We
                are legally obligated to retain this data for longer time
                periods.
              </p>
              <h2>Transfer of Your Personal Data</h2>
              <p>
                Your information, including Personal Data, is processed at the
                Company's operating offices and in any other places where the
                parties involved in the processing are located. It means that
                this information may be transferred to — and maintained on —
                computers located outside of Your state, province, country or
                other governmental jurisdiction where the data protection laws
                may differ than those from Your jurisdiction.
              </p>
              <p>
                Your consent to this Privacy Policy followed by Your submission
                of such information represents Your agreement to that transfer.
              </p>
              <p>
                The Company will take all steps reasonably necessary to ensure
                that Your data is treated securely and in accordance with this
                Privacy Policy and no transfer of Your Personal Data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of Your data and other
                personal information.
              </p>
              <h2>Disclosure of Your Personal Data</h2>
              <h3>Business Transactions</h3>
              <p>
                If the Company is involved in a merger, acquisition or asset
                sale, Your Personal Data may be transferred. We will provide
                notice before Your Personal Data is transferred and becomes
                subject to a different Privacy Policy.
              </p>
              <h3>Law enforcement</h3>
              <p>
                Under certain circumstances, the Company may be required to
                disclose Your Personal Data if required to do so by law or in
                response to valid requests by public authorities (e.g. a court
                or a government agency).
              </p>
              <h3>Other legal requirements</h3>
              <p>
                The Company may disclose Your Personal Data in the good faith
                belief that such action is necessary to:
              </p>
              <ul>
                <li>Comply with a legal obligation</li>
                <li>
                  Protect and defend the rights or property of the Company
                </li>
                <li>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service
                </li>
                <li>
                  Protect the personal safety of Users of the Service or the
                  public
                </li>
                <li>Protect against legal liability</li>
              </ul>
              <h2>Security of Your Personal Data</h2>
              <p>
                The security of Your Personal Data is important to Us, but
                remember that no method of transmission over the Internet, or
                method of electronic storage is 100% secure. While We strive to
                use commercially acceptable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
              </p>
              <h1>
                Detailed Information on the Processing of Your Personal Data
              </h1>
              <p>
                The Service Providers We use may have access to Your Personal
                Data. These third-party vendors collect, store, use, process and
                transfer information about Your activity on Our Service in
                accordance with their Privacy Policies.
              </p>
              <h2>Analytics</h2>
              <p>
                We may use third-party Service providers to monitor and analyze
                the use of our Service.
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Google Analytics</strong>
                  </p>
                  <p>
                    Google Analytics is a web analytics service offered by
                    Google that tracks and reports website traffic. Google uses
                    the data collected to track and monitor the use of our
                    Service. This data is shared with other Google services.
                    Google may use the collected data to contextualize and
                    personalize the ads of its own advertising network.
                  </p>
                  <p>
                    You can opt-out of having made your activity on the Service
                    available to Google Analytics by installing the Google
                    Analytics opt-out browser add-on. The add-on prevents the
                    Google Analytics JavaScript (ga.js, analytics.js and dc.js)
                    from sharing information with Google Analytics about visits
                    activity.
                  </p>
                  <p>
                    For more information on the privacy practices of Google,
                    please visit the Google Privacy &amp; Terms web page:{' '}
                    <a
                      href='https://policies.google.com/privacy'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </li>
              </ul>
              <h2>Email Marketing</h2>
              <p>
                We may use Your Personal Data to contact You with newsletters,
                marketing or promotional materials and other information that
                may be of interest to You. You may opt-out of receiving any, or
                all, of these communications from Us by following the
                unsubscribe link or instructions provided in any email We send
                or by contacting Us.
              </p>
              <p>
                We may use Email Marketing Service Providers to manage and send
                emails to You.
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Mailchimp</strong>
                  </p>
                  <p>
                    Mailchimp is an email marketing sending service provided by
                    The Rocket Science Group LLC.
                  </p>
                  <p>
                    For more information on the privacy practices of Mailchimp,
                    please visit their Privacy policy:{' '}
                    <a
                      href='https://mailchimp.com/legal/privacy/'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://mailchimp.com/legal/privacy/
                    </a>
                  </p>
                </li>
              </ul>
              <h2>Payments</h2>
              <p>
                We may provide paid products and/or services within the Service.
                In that case, we may use third-party services for payment
                processing (e.g. payment processors).
              </p>
              <p>
                We will not store or collect Your payment card details. That
                information is provided directly to Our third-party payment
                processors whose use of Your personal information is governed by
                their Privacy Policy. These payment processors adhere to the
                standards set by PCI-DSS as managed by the PCI Security
                Standards Council, which is a joint effort of brands like Visa,
                Mastercard, American Express and Discover. PCI-DSS requirements
                help ensure the secure handling of payment information.
              </p>
              <ul>
                <li>
                  <p>
                    <strong>PayPal</strong>
                  </p>
                  <p>
                    Their Privacy Policy can be viewed at{' '}
                    <a
                      href='https://www.paypal.com/webapps/mpp/ua/privacy-full'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://www.paypal.com/webapps/mpp/ua/privacy-full
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>TapPay</strong>
                  </p>
                  <p>
                    Their Privacy Policy can be viewed at{' '}
                    <a
                      href='https://www.tappaysdk.com/en/term/privacy/'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://www.tappaysdk.com/en/term/privacy/
                    </a>
                  </p>
                </li>
              </ul>
              <h2>Behavioral Remarketing</h2>
              <p>
                The Company uses remarketing services to advertise to You after
                You accessed or visited our Service. We and Our third-party
                vendors use cookies and non-cookie technologies to help Us
                recognize Your Device and understand how You use our Service so
                that We can improve our Service to reflect Your interests and
                serve You advertisements that are likely to be of more interest
                to You.
              </p>
              <p>
                These third-party vendors collect, store, use, process and
                transfer information about Your activity on Our Service in
                accordance with their Privacy Policies and to enable Us to:
              </p>
              <ul>
                <li>
                  Measure and analyze traffic and browsing activity on Our
                  Service
                </li>
                <li>
                  Show advertisements for our products and/or services to You on
                  third-party websites or apps
                </li>
                <li>
                  Measure and analyze the performance of Our advertising
                  campaigns
                </li>
              </ul>
              <p>
                Some of these third-party vendors may use non-cookie
                technologies that may not be impacted by browser settings that
                block cookies. Your browser may not permit You to block such
                technologies. You can use the following third-party tools to
                decline the collection and use of information for the purpose of
                serving You interest-based advertising:
              </p>
              <ul>
                <li>
                  The NAI's opt-out platform:{' '}
                  <a
                    href='http://www.networkadvertising.org/choices/'
                    rel='external nofollow noopener'
                    target='_blank'
                  >
                    http://www.networkadvertising.org/choices/
                  </a>
                </li>
                <li>
                  The EDAA's opt-out platform{' '}
                  <a
                    href='http://www.youronlinechoices.com/'
                    rel='external nofollow noopener'
                    target='_blank'
                  >
                    http://www.youronlinechoices.com/
                  </a>
                </li>
                <li>
                  The DAA's opt-out platform:{' '}
                  <a
                    href='http://optout.aboutads.info/?c=2&amp;lang=EN'
                    rel='external nofollow noopener'
                    target='_blank'
                  >
                    http://optout.aboutads.info/?c=2&amp;lang=EN
                  </a>
                </li>
              </ul>
              <p>
                You may opt-out of all personalized advertising by enabling
                privacy features on Your mobile device such as Limit Ad Tracking
                (iOS) and Opt Out of Ads Personalization (Android). See Your
                mobile device Help system for more information.
              </p>
              <p>
                We may share information, such as hashed email addresses (if
                available) or other online identifiers collected on Our Service
                with these third-party vendors. This allows Our third-party
                vendors to recognize and deliver You ads across devices and
                browsers. To read more about the technologies used by these
                third-party vendors and their cross-device capabilities please
                refer to the Privacy Policy of each vendor listed below.
              </p>
              <p>The third-party vendors We use are:</p>
              <ul>
                <li>
                  <p>
                    <strong>Google Ads (AdWords)</strong>
                  </p>
                  <p>
                    Google Ads (AdWords) remarketing service is provided by
                    Google Inc.
                  </p>
                  <p>
                    You can opt-out of Google Analytics for Display Advertising
                    and customise the Google Display Network ads by visiting the
                    Google Ads Settings page:{' '}
                    <a
                      href='http://www.google.com/settings/ads'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      http://www.google.com/settings/ads
                    </a>
                  </p>
                  <p>
                    Google also recommends installing the Google Analytics
                    Opt-out Browser Add-on -{' '}
                    <a
                      href='https://tools.google.com/dlpage/gaoptout'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://tools.google.com/dlpage/gaoptout
                    </a>{' '}
                    - for your web browser. Google Analytics Opt-out Browser
                    Add-on provides visitors with the ability to prevent their
                    data from being collected and used by Google Analytics.
                  </p>
                  <p>
                    For more information on the privacy practices of Google,
                    please visit the Google Privacy &amp; Terms web page:{' '}
                    <a
                      href='https://policies.google.com/privacy'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Facebook</strong>
                  </p>
                  <p>
                    Facebook remarketing service is provided by Facebook Inc.
                  </p>
                  <p>
                    You can learn more about interest-based advertising from
                    Facebook by visiting this page:{' '}
                    <a
                      href='https://www.facebook.com/help/516147308587266'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://www.facebook.com/help/516147308587266
                    </a>
                  </p>
                  <p>
                    To opt-out from Facebook's interest-based ads, follow these
                    instructions from Facebook:{' '}
                    <a
                      href='https://www.facebook.com/help/568137493302217'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://www.facebook.com/help/568137493302217
                    </a>
                  </p>
                  <p>
                    Facebook adheres to the Self-Regulatory Principles for
                    Online Behavioural Advertising established by the Digital
                    Advertising Alliance. You can also opt-out from Facebook and
                    other participating companies through the Digital
                    Advertising Alliance in the USA{' '}
                    <a
                      href='http://www.aboutads.info/choices/'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      http://www.aboutads.info/choices/
                    </a>
                    , the Digital Advertising Alliance of Canada in Canada{' '}
                    <a
                      href='http://youradchoices.ca/'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      http://youradchoices.ca/
                    </a>{' '}
                    or the European Interactive Digital Advertising Alliance in
                    Europe{' '}
                    <a
                      href='http://www.youronlinechoices.eu/'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      http://www.youronlinechoices.eu/
                    </a>
                    , or opt-out using your mobile device settings.
                  </p>
                  <p>
                    For more information on the privacy practices of Facebook,
                    please visit Facebook's Data Policy:{' '}
                    <a
                      href='https://www.facebook.com/privacy/explanation'
                      rel='external nofollow noopener'
                      target='_blank'
                    >
                      https://www.facebook.com/privacy/explanation
                    </a>
                  </p>
                </li>
              </ul>
              <h1>GDPR Privacy</h1>
              <h2>Legal Basis for Processing Personal Data under GDPR</h2>
              <p>
                We may process Personal Data under the following conditions:
              </p>
              <ul>
                <li>
                  <strong>Consent:</strong> You have given Your consent for
                  processing Personal Data for one or more specific purposes.
                </li>
                <li>
                  <strong>Performance of a contract:</strong> Provision of
                  Personal Data is necessary for the performance of an agreement
                  with You and/or for any pre-contractual obligations thereof.
                </li>
                <li>
                  <strong>Legal obligations:</strong> Processing Personal Data
                  is necessary for compliance with a legal obligation to which
                  the Company is subject.
                </li>
                <li>
                  <strong>Vital interests:</strong> Processing Personal Data is
                  necessary in order to protect Your vital interests or of
                  another natural person.
                </li>
                <li>
                  <strong>Public interests:</strong> Processing Personal Data is
                  related to a task that is carried out in the public interest
                  or in the exercise of official authority vested in the
                  Company.
                </li>
                <li>
                  <strong>Legitimate interests:</strong> Processing Personal
                  Data is necessary for the purposes of the legitimate interests
                  pursued by the Company.
                </li>
              </ul>
              <p>
                In any case, the Company will gladly help to clarify the
                specific legal basis that applies to the processing, and in
                particular whether the provision of Personal Data is a statutory
                or contractual requirement, or a requirement necessary to enter
                into a contract.
              </p>
              <h2>Your Rights under the GDPR</h2>
              <p>
                The Company undertakes to respect the confidentiality of Your
                Personal Data and to guarantee You can exercise Your rights.
              </p>
              <p>
                You have the right under this Privacy Policy, and by law if You
                are within the EU, to:
              </p>
              <ul>
                <li>
                  <strong>Request access to Your Personal Data.</strong> The
                  right to access, update or delete the information We have on
                  You. Whenever made possible, you can access, update or request
                  deletion of Your Personal Data directly within Your account
                  settings section. If you are unable to perform these actions
                  yourself, please contact Us to assist You. This also enables
                  You to receive a copy of the Personal Data We hold about You.
                </li>
                <li>
                  <strong>
                    Request correction of the Personal Data that We hold about
                    You.
                  </strong>{' '}
                  You have the right to have any incomplete or inaccurate
                  information We hold about You corrected.
                </li>
                <li>
                  <strong>Object to processing of Your Personal Data.</strong>{' '}
                  This right exists where We are relying on a legitimate
                  interest as the legal basis for Our processing and there is
                  something about Your particular situation, which makes You
                  want to object to our processing of Your Personal Data on this
                  ground. You also have the right to object where We are
                  processing Your Personal Data for direct marketing purposes.
                </li>
                <li>
                  <strong>Request erasure of Your Personal Data.</strong> You
                  have the right to ask Us to delete or remove Personal Data
                  when there is no good reason for Us to continue processing it.
                </li>
                <li>
                  <strong>Request the transfer of Your Personal Data.</strong>{' '}
                  We will provide to You, or to a third-party You have chosen,
                  Your Personal Data in a structured, commonly used,
                  machine-readable format. Please note that this right only
                  applies to automated information which You initially provided
                  consent for Us to use or where We used the information to
                  perform a contract with You.
                </li>
                <li>
                  <strong>Withdraw Your consent.</strong> You have the right to
                  withdraw Your consent on using your Personal Data. If You
                  withdraw Your consent, We may not be able to provide You with
                  access to certain specific functionalities of the Service.
                </li>
              </ul>
              <h2>Exercising of Your GDPR Data Protection Rights</h2>
              <p>
                You may exercise Your rights of access, rectification,
                cancellation and opposition by contacting Us. Please note that
                we may ask You to verify Your identity before responding to such
                requests. If You make a request, We will try our best to respond
                to You as soon as possible.
              </p>
              <p>
                You have the right to complain to a Data Protection Authority
                about Our collection and use of Your Personal Data. For more
                information, if You are in the European Economic Area (EEA),
                please contact Your local data protection authority in the EEA.
              </p>
              <h1>Facebook Fan Page</h1>
              <h2>Data Controller for the Facebook Fan Page</h2>
              <p>
                The Company is the Data Controller of Your Personal Data
                collected while using the Service. As operator of the Facebook
                Fan Page{' '}
                <a
                  href='https://www.facebook.com/shelpy.co'
                  rel='external nofollow noopener'
                  target='_blank'
                >
                  https://www.facebook.com/shelpy.co
                </a>
                , the Company and the operator of the social network Facebook
                are Joint Controllers.
              </p>
              <p>
                The Company has entered into agreements with Facebook that
                define the terms for use of the Facebook Fan Page, among other
                things. These terms are mostly based on the Facebook Terms of
                Service:{' '}
                <a
                  href='https://www.facebook.com/terms.php'
                  rel='external nofollow noopener'
                  target='_blank'
                >
                  https://www.facebook.com/terms.php
                </a>
              </p>
              <p>
                Visit the Facebook Privacy Policy{' '}
                <a
                  href='https://www.facebook.com/policy.php'
                  rel='external nofollow noopener'
                  target='_blank'
                >
                  https://www.facebook.com/policy.php
                </a>{' '}
                for more information about how Facebook manages Personal data or
                contact Facebook online, or by mail: Facebook, Inc. ATTN,
                Privacy Operations, 1601 Willow Road, Menlo Park, CA 94025,
                United States.
              </p>
              <h2>Facebook Insights</h2>
              <p>
                We use the Facebook Insights function in connection with the
                operation of the Facebook Fan Page and on the basis of the GDPR,
                in order to obtain anonymized statistical data about Our users.
              </p>
              <p>
                For this purpose, Facebook places a Cookie on the device of the
                user visiting Our Facebook Fan Page. Each Cookie contains a
                unique identifier code and remains active for a period of two
                years, except when it is deleted before the end of this period.
              </p>
              <p>
                Facebook receives, records and processes the information stored
                in the Cookie, especially when the user visits the Facebook
                services, services that are provided by other members of the
                Facebook Fan Page and services by other companies that use
                Facebook services.
              </p>
              <p>
                For more information on the privacy practices of Facebook,
                please visit Facebook Privacy Policy here:{' '}
                <a
                  href='https://www.facebook.com/privacy/explanation'
                  rel='external nofollow noopener'
                  target='_blank'
                >
                  https://www.facebook.com/privacy/explanation
                </a>
              </p>
              <h1>CCPA Privacy</h1>
              <p>
                This privacy notice section for California residents supplements
                the information contained in Our Privacy Policy and it applies
                solely to all visitors, users, and others who reside in the
                State of California.
              </p>
              <h2>Categories of Personal Information Collected</h2>
              <p>
                We collect information that identifies, relates to, describes,
                references, is capable of being associated with, or could
                reasonably be linked, directly or indirectly, with a particular
                Consumer or Device. The following is a list of categories of
                personal information which we may collect or may have been
                collected from California residents within the last twelve (12)
                months.
              </p>
              <p>
                Please note that the categories and examples provided in the
                list below are those defined in the CCPA. This does not mean
                that all examples of that category of personal information were
                in fact collected by Us, but reflects our good faith belief to
                the best of our knowledge that some of that information from the
                applicable category may be and may have been collected. For
                example, certain categories of personal information would only
                be collected if You provided such personal information directly
                to Us.
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Category A: Identifiers.</strong>
                  </p>
                  <p>
                    Examples: A real name, alias, postal address, unique
                    personal identifier, online identifier, Internet Protocol
                    address, email address, account name, driver's license
                    number, passport number, or other similar identifiers.
                  </p>
                  <p>Collected: Yes.</p>
                </li>
                <li>
                  <p>
                    <strong>
                      Category B: Personal information categories listed in the
                      California Customer Records statute (Cal. Civ. Code §
                      1798.80(e)).
                    </strong>
                  </p>
                  <p>
                    Examples: A name, signature, Social Security number,
                    physical characteristics or description, address, telephone
                    number, passport number, driver's license or state
                    identification card number, insurance policy number,
                    education, employment, employment history, bank account
                    number, credit card number, debit card number, or any other
                    financial information, medical information, or health
                    insurance information. Some personal information included in
                    this category may overlap with other categories.
                  </p>
                  <p>Collected: Yes.</p>
                </li>
                <li>
                  <p>
                    <strong>
                      Category C: Protected classification characteristics under
                      California or federal law.
                    </strong>
                  </p>
                  <p>
                    Examples: Age (40 years or older), race, color, ancestry,
                    national origin, citizenship, religion or creed, marital
                    status, medical condition, physical or mental disability,
                    sex (including gender, gender identity, gender expression,
                    pregnancy or childbirth and related medical conditions),
                    sexual orientation, veteran or military status, genetic
                    information (including familial genetic information).
                  </p>
                  <p>Collected: No.</p>
                </li>
                <li>
                  <p>
                    <strong>Category D: Commercial information.</strong>
                  </p>
                  <p>
                    Examples: Records and history of products or services
                    purchased or considered.
                  </p>
                  <p>Collected: Yes.</p>
                </li>
                <li>
                  <p>
                    <strong>Category E: Biometric information.</strong>
                  </p>
                  <p>
                    Examples: Genetic, physiological, behavioral, and biological
                    characteristics, or activity patterns used to extract a
                    template or other identifier or identifying information,
                    such as, fingerprints, faceprints, and voiceprints, iris or
                    retina scans, keystroke, gait, or other physical patterns,
                    and sleep, health, or exercise data.
                  </p>
                  <p>Collected: No.</p>
                </li>
                <li>
                  <p>
                    <strong>
                      Category F: Internet or other similar network activity.
                    </strong>
                  </p>
                  <p>
                    Examples: Interaction with our Service or advertisement.
                  </p>
                  <p>Collected: Yes.</p>
                </li>
                <li>
                  <p>
                    <strong>Category G: Geolocation data.</strong>
                  </p>
                  <p>Examples: Approximate physical location.</p>
                  <p>Collected: No.</p>
                </li>
                <li>
                  <p>
                    <strong>Category H: Sensory data.</strong>
                  </p>
                  <p>
                    Examples: Audio, electronic, visual, thermal, olfactory, or
                    similar information.
                  </p>
                  <p>Collected: No.</p>
                </li>
                <li>
                  <p>
                    <strong>
                      Category I: Professional or employment-related
                      information.
                    </strong>
                  </p>
                  <p>
                    Examples: Current or past job history or performance
                    evaluations.
                  </p>
                  <p>Collected: No.</p>
                </li>
                <li>
                  <p>
                    <strong>
                      Category J: Non-public education information (per the
                      Family Educational Rights and Privacy Act (20 U.S.C.
                      Section 1232g, 34 C.F.R. Part 99)).
                    </strong>
                  </p>
                  <p>
                    Examples: Education records directly related to a student
                    maintained by an educational institution or party acting on
                    its behalf, such as grades, transcripts, class lists,
                    student schedules, student identification codes, student
                    financial information, or student disciplinary records.
                  </p>
                  <p>Collected: No.</p>
                </li>
                <li>
                  <p>
                    <strong>
                      Category K: Inferences drawn from other personal
                      information.
                    </strong>
                  </p>
                  <p>
                    Examples: Profile reflecting a person's preferences,
                    characteristics, psychological trends, predispositions,
                    behavior, attitudes, intelligence, abilities, and aptitudes.
                  </p>
                  <p>Collected: No.</p>
                </li>
              </ul>
              <p>Under CCPA, personal information does not include:</p>
              <ul>
                <li>Publicly available information from government records</li>
                <li>Deidentified or aggregated consumer information</li>
                <li>
                  Information excluded from the CCPA's scope, such as:
                  <ul>
                    <li>
                      Health or medical information covered by the Health
                      Insurance Portability and Accountability Act of 1996
                      (HIPAA) and the California Confidentiality of Medical
                      Information Act (CMIA) or clinical trial data
                    </li>
                    <li>
                      Personal Information covered by certain sector-specific
                      privacy laws, including the Fair Credit Reporting Act
                      (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California
                      Financial Information Privacy Act (FIPA), and the Driver's
                      Privacy Protection Act of 1994
                    </li>
                  </ul>
                </li>
              </ul>
              <h2>Sources of Personal Information</h2>
              <p>
                We obtain the categories of personal information listed above
                from the following categories of sources:
              </p>
              <ul>
                <li>
                  <strong>Directly from You</strong>. For example, from the
                  forms You complete on our Service, preferences You express or
                  provide through our Service, or from Your purchases on our
                  Service.
                </li>
                <li>
                  <strong>Indirectly from You</strong>. For example, from
                  observing Your activity on our Service.
                </li>
                <li>
                  <strong>Automatically from You</strong>. For example, through
                  cookies We or our Service Providers set on Your Device as You
                  navigate through our Service.
                </li>
                <li>
                  <strong>From Service Providers</strong>. For example,
                  third-party vendors to monitor and analyze the use of our
                  Service, third-party vendors to deliver targeted advertising
                  to You, third-party vendors for payment processing, or other
                  third-party vendors that We use to provide the Service to You.
                </li>
              </ul>
              <h2>
                Use of Personal Information for Business Purposes or Commercial
                Purposes
              </h2>
              <p>
                We may use or disclose personal information We collect for
                "business purposes" or "commercial purposes" (as defined under
                the CCPA), which may include the following examples:
              </p>
              <ul>
                <li>
                  To operate our Service and provide You with our Service.
                </li>
                <li>
                  To provide You with support and to respond to Your inquiries,
                  including to investigate and address Your concerns and monitor
                  and improve our Service.
                </li>
                <li>
                  To fulfill or meet the reason You provided the information.
                  For example, if You share Your contact information to ask a
                  question about our Service, We will use that personal
                  information to respond to Your inquiry. If You provide Your
                  personal information to purchase a product or service, We will
                  use that information to process Your payment and facilitate
                  delivery.
                </li>
                <li>
                  To respond to law enforcement requests and as required by
                  applicable law, court order, or governmental regulations.
                </li>
                <li>
                  As described to You when collecting Your personal information
                  or as otherwise set forth in the CCPA.
                </li>
                <li>For internal administrative and auditing purposes.</li>
                <li>
                  To detect security incidents and protect against malicious,
                  deceptive, fraudulent or illegal activity, including, when
                  necessary, to prosecute those responsible for such activities.
                </li>
              </ul>
              <p>
                Please note that the examples provided above are illustrative
                and not intended to be exhaustive. For more details on how we
                use this information, please refer to the "Use of Your Personal
                Data" section.
              </p>
              <p>
                If We decide to collect additional categories of personal
                information or use the personal information We collected for
                materially different, unrelated, or incompatible purposes We
                will update this Privacy Policy.
              </p>
              <h2>
                Disclosure of Personal Information for Business Purposes or
                Commercial Purposes
              </h2>
              <p>
                We may use or disclose and may have used or disclosed in the
                last twelve (12) months the following categories of personal
                information for business or commercial purposes:
              </p>
              <ul>
                <li>Category A: Identifiers</li>
                <li>
                  Category B: Personal information categories listed in the
                  California Customer Records statute (Cal. Civ. Code §
                  1798.80(e))
                </li>
                <li>Category D: Commercial information</li>
                <li>Category F: Internet or other similar network activity</li>
              </ul>
              <p>
                Please note that the categories listed above are those defined
                in the CCPA. This does not mean that all examples of that
                category of personal information were in fact disclosed, but
                reflects our good faith belief to the best of our knowledge that
                some of that information from the applicable category may be and
                may have been disclosed.
              </p>
              <p>
                When We disclose personal information for a business purpose or
                a commercial purpose, We enter a contract that describes the
                purpose and requires the recipient to both keep that personal
                information confidential and not use it for any purpose except
                performing the contract.
              </p>
              <h2>Sale of Personal Information</h2>
              <p>
                As defined in the CCPA, "sell" and "sale" mean selling, renting,
                releasing, disclosing, disseminating, making available,
                transferring, or otherwise communicating orally, in writing, or
                by electronic or other means, a consumer's personal information
                by the business to a third party for valuable consideration.
                This means that We may have received some kind of benefit in
                return for sharing personal information, but not necessarily a
                monetary benefit.
              </p>
              <p>
                Please note that the categories listed below are those defined
                in the CCPA. This does not mean that all examples of that
                category of personal information were in fact sold, but reflects
                our good faith belief to the best of our knowledge that some of
                that information from the applicable category may be and may
                have been shared for value in return.
              </p>
              <p>
                We may sell and may have sold in the last twelve (12) months the
                following categories of personal information:
              </p>
              <ul>
                <li>Category A: Identifiers</li>
                <li>
                  Category B: Personal information categories listed in the
                  California Customer Records statute (Cal. Civ. Code §
                  1798.80(e))
                </li>
                <li>Category D: Commercial information</li>
                <li>Category F: Internet or other similar network activity</li>
              </ul>
              <h2>Share of Personal Information</h2>
              <p>
                We may share Your personal information identified in the above
                categories with the following categories of third parties:
              </p>
              <ul>
                <li>Service Providers</li>
                <li>Payment processors</li>
                <li>Our affiliates</li>
                <li>Our business partners</li>
                <li>
                  Third party vendors to whom You or Your agents authorize Us to
                  disclose Your personal information in connection with products
                  or services We provide to You
                </li>
              </ul>
              <h2>
                Sale of Personal Information of Minors Under 16 Years of Age
              </h2>
              <p>
                We do not knowingly collect personal information from minors
                under the age of 16 through our Service, although certain third
                party websites that we link to may do so. These third-party
                websites have their own terms of use and privacy policies and we
                encourage parents and legal guardians to monitor their
                children's Internet usage and instruct their children to never
                provide information on other websites without their permission.
              </p>
              <p>
                We do not sell the personal information of Consumers We actually
                know are less than 16 years of age, unless We receive
                affirmative authorization (the "right to opt-in") from either
                the Consumer who is between 13 and 16 years of age, or the
                parent or guardian of a Consumer less than 13 years of age.
                Consumers who opt-in to the sale of personal information may
                opt-out of future sales at any time. To exercise the right to
                opt-out, You (or Your authorized representative) may submit a
                request to Us by contacting Us.
              </p>
              <p>
                If You have reason to believe that a child under the age of 13
                (or 16) has provided Us with personal information, please
                contact Us with sufficient detail to enable Us to delete that
                information.
              </p>
              <h2>Your Rights under the CCPA</h2>
              <p>
                The CCPA provides California residents with specific rights
                regarding their personal information. If You are a resident of
                California, You have the following rights:
              </p>
              <ul>
                <li>
                  <strong>The right to notice.</strong> You have the right to be
                  notified which categories of Personal Data are being collected
                  and the purposes for which the Personal Data is being used.
                </li>
                <li>
                  <strong>The right to request.</strong> Under CCPA, You have
                  the right to request that We disclose information to You about
                  Our collection, use, sale, disclosure for business purposes
                  and share of personal information. Once We receive and confirm
                  Your request, We will disclose to You:
                  <ul>
                    <li>
                      The categories of personal information We collected about
                      You
                    </li>
                    <li>
                      The categories of sources for the personal information We
                      collected about You
                    </li>
                    <li>
                      Our business or commercial purpose for collecting or
                      selling that personal information
                    </li>
                    <li>
                      The categories of third parties with whom We share that
                      personal information
                    </li>
                    <li>
                      The specific pieces of personal information We collected
                      about You
                    </li>
                    <li>
                      If we sold Your personal information or disclosed Your
                      personal information for a business purpose, We will
                      disclose to You:
                      <ul>
                        <li>
                          The categories of personal information categories sold
                        </li>
                        <li>
                          The categories of personal information categories
                          disclosed
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>
                    The right to say no to the sale of Personal Data (opt-out).
                  </strong>{' '}
                  You have the right to direct Us to not sell Your personal
                  information. To submit an opt-out request please contact Us.
                </li>
                <li>
                  <strong>The right to delete Personal Data.</strong> You have
                  the right to request the deletion of Your Personal Data,
                  subject to certain exceptions. Once We receive and confirm
                  Your request, We will delete (and direct Our Service Providers
                  to delete) Your personal information from our records, unless
                  an exception applies. We may deny Your deletion request if
                  retaining the information is necessary for Us or Our Service
                  Providers to:
                  <ul>
                    <li>
                      Complete the transaction for which We collected the
                      personal information, provide a good or service that You
                      requested, take actions reasonably anticipated within the
                      context of our ongoing business relationship with You, or
                      otherwise perform our contract with You.
                    </li>
                    <li>
                      Detect security incidents, protect against malicious,
                      deceptive, fraudulent, or illegal activity, or prosecute
                      those responsible for such activities.
                    </li>
                    <li>
                      Debug products to identify and repair errors that impair
                      existing intended functionality.
                    </li>
                    <li>
                      Exercise free speech, ensure the right of another consumer
                      to exercise their free speech rights, or exercise another
                      right provided for by law.
                    </li>
                    <li>
                      Comply with the California Electronic Communications
                      Privacy Act (Cal. Penal Code § 1546 et. seq.).
                    </li>
                    <li>
                      Engage in public or peer-reviewed scientific, historical,
                      or statistical research in the public interest that
                      adheres to all other applicable ethics and privacy laws,
                      when the information's deletion may likely render
                      impossible or seriously impair the research's achievement,
                      if You previously provided informed consent.
                    </li>
                    <li>
                      Enable solely internal uses that are reasonably aligned
                      with consumer expectations based on Your relationship with
                      Us.
                    </li>
                    <li>Comply with a legal obligation.</li>
                    <li>
                      Make other internal and lawful uses of that information
                      that are compatible with the context in which You provided
                      it.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>The right not to be discriminated against.</strong>{' '}
                  You have the right not to be discriminated against for
                  exercising any of Your consumer's rights, including by:
                  <ul>
                    <li>Denying goods or services to You</li>
                    <li>
                      Charging different prices or rates for goods or services,
                      including the use of discounts or other benefits or
                      imposing penalties
                    </li>
                    <li>
                      Providing a different level or quality of goods or
                      services to You
                    </li>
                    <li>
                      Suggesting that You will receive a different price or rate
                      for goods or services or a different level or quality of
                      goods or services
                    </li>
                  </ul>
                </li>
              </ul>
              <h2>Exercising Your CCPA Data Protection Rights</h2>
              <p>
                In order to exercise any of Your rights under the CCPA, and if
                You are a California resident, You can contact Us:
              </p>
              <ul>
                <li>By email: team@shelpy.co</li>
              </ul>
              <p>
                Only You, or a person registered with the California Secretary
                of State that You authorize to act on Your behalf, may make a
                verifiable request related to Your personal information.
              </p>
              <p>Your request to Us must:</p>
              <ul>
                <li>
                  Provide sufficient information that allows Us to reasonably
                  verify You are the person about whom We collected personal
                  information or an authorized representative
                </li>
                <li>
                  Describe Your request with sufficient detail that allows Us to
                  properly understand, evaluate, and respond to it
                </li>
              </ul>
              <p>
                We cannot respond to Your request or provide You with the
                required information if We cannot:
              </p>
              <ul>
                <li>Verify Your identity or authority to make the request</li>
                <li>
                  And confirm that the personal information relates to You
                </li>
              </ul>
              <p>
                We will disclose and deliver the required information free of
                charge within 45 days of receiving Your verifiable request. The
                time period to provide the required information may be extended
                once by an additional 45 days when reasonably necessary and with
                prior notice.
              </p>
              <p>
                Any disclosures We provide will only cover the 12-month period
                preceding the verifiable request's receipt.
              </p>
              <p>
                For data portability requests, We will select a format to
                provide Your personal information that is readily usable and
                should allow You to transmit the information from one entity to
                another entity without hindrance.
              </p>
              <h2>Do Not Sell My Personal Information</h2>
              <p>
                You have the right to opt-out of the sale of Your personal
                information. Once We receive and confirm a verifiable consumer
                request from You, we will stop selling Your personal
                information. To exercise Your right to opt-out, please contact
                Us.
              </p>
              <p>
                The Service Providers we partner with (for example, our
                analytics or advertising partners) may use technology on the
                Service that sells personal information as defined by the CCPA
                law. If you wish to opt out of the use of Your personal
                information for interest-based advertising purposes and these
                potential sales as defined under CCPA law, you may do so by
                following the instructions below.
              </p>
              <p>
                Please note that any opt out is specific to the browser You use.
                You may need to opt out on every browser that You use.
              </p>
              <h3>Website</h3>
              <p>
                You can opt out of receiving ads that are personalized as served
                by our Service Providers by following our instructions presented
                on the Service:
              </p>
              <ul>
                <li>
                  The NAI's opt-out platform:{' '}
                  <a
                    href='http://www.networkadvertising.org/choices/'
                    rel='external nofollow noopener'
                    target='_blank'
                  >
                    http://www.networkadvertising.org/choices/
                  </a>
                </li>
                <li>
                  The EDAA's opt-out platform{' '}
                  <a
                    href='http://www.youronlinechoices.com/'
                    rel='external nofollow noopener'
                    target='_blank'
                  >
                    http://www.youronlinechoices.com/
                  </a>
                </li>
                <li>
                  The DAA's opt-out platform:{' '}
                  <a
                    href='http://optout.aboutads.info/?c=2&amp;lang=EN'
                    rel='external nofollow noopener'
                    target='_blank'
                  >
                    http://optout.aboutads.info/?c=2&amp;lang=EN
                  </a>
                </li>
              </ul>
              <p>
                The opt out will place a cookie on Your computer that is unique
                to the browser You use to opt out. If you change browsers or
                delete the cookies saved by your browser, You will need to opt
                out again.
              </p>
              <h3>Mobile Devices</h3>
              <p>
                Your mobile device may give You the ability to opt out of the
                use of information about the apps You use in order to serve You
                ads that are targeted to Your interests:
              </p>
              <ul>
                <li>
                  "Opt out of Interest-Based Ads" or "Opt out of Ads
                  Personalization" on Android devices
                </li>
                <li>"Limit Ad Tracking" on iOS devices</li>
              </ul>
              <p>
                You can also stop the collection of location information from
                Your mobile device by changing the preferences on Your mobile
                device.
              </p>
              <h1>
                "Do Not Track" Policy as Required by California Online Privacy
                Protection Act (CalOPPA)
              </h1>
              <p>Our Service does not respond to Do Not Track signals.</p>
              <p>
                However, some third party websites do keep track of Your
                browsing activities. If You are visiting such websites, You can
                set Your preferences in Your web browser to inform websites that
                You do not want to be tracked. You can enable or disable DNT by
                visiting the preferences or settings page of Your web browser.
              </p>
              <h1>Children's Privacy</h1>
              <p>
                Our Service does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 13. If You are a parent or guardian and
                You are aware that Your child has provided Us with Personal
                Data, please contact Us. If We become aware that We have
                collected Personal Data from anyone under the age of 13 without
                verification of parental consent, We take steps to remove that
                information from Our servers.
              </p>
              <p>
                If We need to rely on consent as a legal basis for processing
                Your information and Your country requires consent from a
                parent, We may require Your parent's consent before We collect
                and use that information.
              </p>
              <h1>
                Your California Privacy Rights (California's Shine the Light
                law)
              </h1>
              <p>
                Under California Civil Code Section 1798 (California's Shine the
                Light law), California residents with an established business
                relationship with us can request information once a year about
                sharing their Personal Data with third parties for the third
                parties' direct marketing purposes.
              </p>
              <p>
                If you'd like to request more information under the California
                Shine the Light law, and if You are a California resident, You
                can contact Us using the contact information provided below.
              </p>
              <h1>
                California Privacy Rights for Minor Users (California Business
                and Professions Code Section 22581)
              </h1>
              <p>
                California Business and Professions Code Section 22581 allows
                California residents under the age of 18 who are registered
                users of online sites, services or applications to request and
                obtain removal of content or information they have publicly
                posted.
              </p>
              <p>
                To request removal of such data, and if You are a California
                resident, You can contact Us using the contact information
                provided below, and include the email address associated with
                Your account.
              </p>
              <p>
                Be aware that Your request does not guarantee complete or
                comprehensive removal of content or information posted online
                and that the law may not permit or require removal in certain
                circumstances.
              </p>
              <h1>Links to Other Websites</h1>
              <p>
                Our Service may contain links to other websites that are not
                operated by Us. If You click on a third party link, You will be
                directed to that third party's site. We strongly advise You to
                review the Privacy Policy of every site You visit.
              </p>
              <p>
                We have no control over and assume no responsibility for the
                content, privacy policies or practices of any third party sites
                or services.
              </p>
              <h1>Changes to this Privacy Policy</h1>
              <p>
                We may update Our Privacy Policy from time to time. We will
                notify You of any changes by posting the new Privacy Policy on
                this page.
              </p>
              <p>
                We will let You know via email and/or a prominent notice on Our
                Service, prior to the change becoming effective and update the
                "Last updated" date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
              <h1>Contact Us</h1>
              <p>
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <ul>
                <li>By email: team@shelpy.co</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
