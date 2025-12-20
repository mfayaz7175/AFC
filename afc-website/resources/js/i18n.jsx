// resources/js/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './locales/en.json';
import fa from './locales/fa.json';
import ps from './locales/ps.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa },
      ps: { translation: ps },
    },
    lng: 'en', // start with a default
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
