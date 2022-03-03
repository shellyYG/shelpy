import { useTranslation } from "react-i18next";
import FooterElement from "./FooterElement";

function Footer() {
  const { t } = useTranslation();
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  return (
    <footer>
      <div className='footer-row'>
        <div className='footer-column'>
          <FooterElement
            text={t('about_us')}
            link={`/${currentLanguage}/about`}
          />
          <FooterElement
            text='Impressum'
            link={`/${currentLanguage}/impressum`}
          />
        </div>
        <div className='footer-column'>
          <FooterElement
            text={t('contact_us')}
            link={`/${currentLanguage}/contact`}
          />
          <FooterElement text={t('footer_legal_rights')} />
        </div>
        <div className='footer-column'>
          <FooterElement text={t('follow_us')} />
          <div>FB IG Youtube TODO</div>
        </div>
        <div className='footer-column'>
          <FooterElement
            text={t('terms_and_condition')}
            link={`/${currentLanguage}/terms`}
          />
          <FooterElement
            text={t('privacy_policy')}
            link={`/${currentLanguage}/privacy`}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
