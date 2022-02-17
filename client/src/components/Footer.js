import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      <div className='footer-text'>{t('footer_question')}</div>
      <div className='footer-text'>{t('footer_legal_rights')}</div>
    </footer>
  );
}

export default Footer;
