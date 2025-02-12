// import i18next from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import resLang from './reslang'; // Assuming you have your translations in resLang.js

// i18next.use(initReactI18next).init({
//   lng: 'en', // Default language
//   fallbackLng: 'id', // Fallback language if translation is missing
//   interpolation: {
//     escapeValue: false, // React already escapes values by default
//   },
//   resources: resLang, // Translations resources
// });

// export default i18next; // Export the i18next instance correctly

// i18n.js atau i18next.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resLang from './reslang';

i18n.use(initReactI18next).init({
  resources: resLang,
  lng: 'en', // bahasa default
  fallbackLng: 'en', // bahasa cadangan jika tidak ada terjemahan
  interpolation: {
    escapeValue: false, // react sudah melakukan escaping secara otomatis
  },
});

export default i18n;
