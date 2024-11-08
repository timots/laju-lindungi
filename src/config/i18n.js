// i18n.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'common',
    fallbackLng: 'id',
    supportedLngs: ['id', 'en', 'ar'],
    ns: ['common', 'auth', 'admin'],
    resources: {
      id: {
        common: {
          welcome: 'Selamat Datang',
          language: 'Bahasa',
          switchLanguage: 'Ganti Bahasa',
        },
        auth: {
          login: 'Masuk',
          register: 'Daftar',
          email: 'Surel',
          password: 'Kata Sandi',
        },
      },
      en: {
        common: {
          welcome: 'Welcome',
          language: 'Language',
          switchLanguage: 'Switch Language',
        },
        auth: {
          login: 'Login',
          register: 'Register',
          email: 'Email',
          password: 'Password',
        },
      },
      ar: {
        common: {
          welcome: 'مرحبا',
          language: 'لغة',
          switchLanguage: 'تغيير اللغة',
        },
        auth: {
          login: 'تسجيل الدخول',
          register: 'يسجل',
          email: 'بريد إلكتروني',
          password: 'كلمة المرور',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
