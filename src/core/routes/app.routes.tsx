import { Route, Routes } from "react-router-dom";
import Layout from "../../layout/Layout";
import ShipmentsListPage from "../../pages/ShipmentsListPage/ShipmentsListPage";
import ShipmentsDetailsPage from "../../pages/ShipmentsDetailsPage/ShipmentsDetailsPage";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="shipments/track" element={<ShipmentsListPage />} />
        <Route
          path="shipments/track/:trackingNumber"
          element={<ShipmentsDetailsPage />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
