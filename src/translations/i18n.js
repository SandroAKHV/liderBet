import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locale/en';
import ru from './locale/ru';
import ge from './locale/ge';

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('current_language') ? localStorage.getItem('current_language') : 'en',
  resources: {
    en,
    ru,
    ge,
  },
  fallbackLng: 'en',
  debug: false,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: true,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

export default i18n;
