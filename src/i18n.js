
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import translationAR from './locales/ar/translation.json';
import translationEN from './locales/en/translation.json';
// import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    ar: { translation: translationAR },
    en: { translation: translationEN },
};
const fallBack = localStorage.getItem('lang');

i18n
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: fallBack || 'ar',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
