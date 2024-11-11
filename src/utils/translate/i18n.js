import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resLang from './reslang';

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'id',
  interpolation: {
    escapeValue: false,
  },
  resources: resLang,
});

export default i18n;
