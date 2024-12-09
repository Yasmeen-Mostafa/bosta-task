import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./common/localization/i18n";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "./common/theme/mui.theme";
import { useLanguage } from "./core/hooks/language.hook";
import RoutesConfig from "./core/routes/app.routes";

function App() {
  useLanguage();

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={customTheme}>
        <RoutesConfig />
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
