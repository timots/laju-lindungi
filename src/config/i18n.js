// src/config/i18n.js atau i18n/index.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Konfigurasi untuk Next.js
const nextConfig = {
  debug: process.env.NODE_ENV === 'development',
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  detection: {
    // Order untuk deteksi bahasa
    order: ['cookie', 'localStorage', 'path', 'navigator'],
    // Menggunakan cookie untuk konsistensi dengan SSR
    lookupCookie: 'NEXT_LOCALE',
    lookupLocalStorage: 'i18nextLng',
    // Menyimpan preferensi bahasa
    caches: ['cookie', 'localStorage'],
    cookieOptions: { path: '/', sameSite: 'strict' },
  },
  // Daftar bahasa yang didukung
  supportedLngs: ['en', 'id'],
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  fallbackNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  // Fitur untuk development
  saveMissing: process.env.NODE_ENV === 'development',
  saveMissingTo: 'all',
};

// Inisialisasi i18next
if (!i18next.isInitialized) {
  i18next.use(HttpBackend).use(LanguageDetector).use(initReactI18next).init(nextConfig);
}

export default i18n;
