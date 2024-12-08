import { Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Only navigate to /shipments/track if the current path doesn't already include it
    if (!pathname.includes("shipments/track")) {
      navigate("/shipments/track"); // Absolute path
    }
  }, [pathname, navigate]);

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <ResponsiveAppBar />
      <Container
        disableGutters
        maxWidth={false}
        sx={{ maxWidth: "90%", marginY: "40px" }}
      >
        {" "}
        <Outlet />
      </Container>
    </Stack>
  );
};

export default Layout;
