import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import ImagesSrc from "../utils/ImagesSrc";
import { useTranslation } from "react-i18next";

function ResponsiveAppBar() {
  const { t } = useTranslation();
  const pages = [
    t("app-bar.home"),
    t("app-bar.prices"),
    t("app-bar.call-sales"),
  ];
  const settings = [t("app-bar.track_your_shipment"), t("app-bar.login")];

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeCurrentLang = (lng: string) => {
    localStorage.setItem("i18nextLng", lng);
    window.location.reload();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: 0,
        border: "1px solid rgba(224, 224, 224, 1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={"figure"}
            fontSize={0}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Box width="150px" component={"img"} src={ImagesSrc.logo} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.concat(settings).map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center", color: "#000" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
              <Button
                onClick={() =>
                  changeCurrentLang(
                    localStorage.getItem("i18nextLng") === "ar" ? "en" : "ar"
                  )
                }
                variant="text"
                disableTouchRipple
                sx={{
                  fontSize: "14px",
                  justifyContent: "center",
                  color: "red",
                  fontWeight: 700,
                }}
              >
                {localStorage.getItem("i18nextLng") === "ar" ? "ENG" : "AR"}
              </Button>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#000" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: { xs: "none", md: "flex" },
              }}
            >
              {settings.map((page) => (
                <Button key={page} sx={{ my: 2, color: "#000" }}>
                  {page}
                </Button>
              ))}
              <Button
                onClick={() =>
                  changeCurrentLang(
                    localStorage.getItem("i18nextLng") === "ar" ? "en" : "ar"
                  )
                }
                variant="text"
                disableTouchRipple
                sx={{
                  fontSize: "14px",
                  justifyContent: "center",
                  color: "red",
                  fontWeight: 700,
                }}
              >
                {localStorage.getItem("i18nextLng") === "ar" ? "ENG" : "AR"}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
