import i18n, { ParseKeys } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { EN } from './locales';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
      en: { translation: EN },
    },
    compatibilityJSON: 'v4',
  });

export type LocalizationKey = ParseKeys<'translation'> | TemplateStringsArray;

export default i18n;
