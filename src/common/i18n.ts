import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./localization/en/translate.json";
import ar from "./localization/ar/translate.json";

const currentLang = localStorage.getItem("i18nextLng") || "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      ar: ar,
    },
    lng: currentLang,
    fallbackLng: "en",
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
