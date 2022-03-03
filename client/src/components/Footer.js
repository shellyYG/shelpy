import { useTranslation } from "react-i18next";
import { useSearchParams } from 'react-router-dom';
import FooterElement from "./FooterElement";

function Footer() {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId');

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];
  return (
    <footer>
      <div className='footer-row'>
        <div className='footer-column'>
          <FooterElement
            text={t('about_us')}
            link={`/${currentLanguage}/about?&refId=${refId}`}
          />
          <FooterElement
            text='Impressum'
            link={`/${currentLanguage}/impressum?&refId=${refId}`}
          />
        </div>
        <div className='footer-column'>
          <FooterElement
            text={t('contact_us')}
            link={`/${currentLanguage}/contact?&refId=${refId}`}
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
            link={`/${currentLanguage}/terms?&refId=${refId}`}
          />
          <FooterElement
            text={t('privacy_policy')}
            link={`/${currentLanguage}/privacy?&refId=${refId}`}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
