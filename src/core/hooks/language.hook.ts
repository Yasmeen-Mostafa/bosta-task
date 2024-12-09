export const useLanguage = () => {
  const language = localStorage.getItem("i18nextLng") || "en";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
};
