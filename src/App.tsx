import { useEffect } from "react";
import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./common/i18n";
import { Route, Routes } from "react-router-dom";
import ShipmentsListPage from "./pages/ShipmentsListPage/ShipmentsListPage";
import ShipmentsDetailsPage from "./pages/ShipmentsDetailsPage/ShipmentsDetailsPage";
import Layout from "./layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  useEffect(() => {
    const language = localStorage.getItem("i18nextLng") || "en";
    document.documentElement.lang = language;
  }, []);

  // Define your custom theme
  const customTheme = createTheme({
    typography: {
      fontFamily: "'Cairo', sans-serif", // Change this to your preferred font family
    },
  });
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={customTheme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="shipments/track" element={<ShipmentsListPage />} />
            <Route
              path="shipments/track/:trackingNumber"
              element={<ShipmentsDetailsPage />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
