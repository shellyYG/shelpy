import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    supportedLngs: ['en', 'zh-TW', 'zh-CN'],
    fallbackLng: 'zh-TW',
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}.json',
    },
    react: {
      bindI18n: 'loaded languageChanged',
      useSuspense: true,
      wait: true,
    },
  });

export default i18n;
