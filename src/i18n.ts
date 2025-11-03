import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],

    resources: {
      en: {
        translation: {
          welcome: "Welcome to our dashboard!",
          click: "Click here",
        },
      },
      ar: {
        translation: {
          welcome: "مرحبًا بك في لوحة التحكم!",
          click: "اضغط هنا",
        },
      },
    },
  });

export default i18n;
