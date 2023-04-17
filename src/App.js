/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "components/Sidenav";
import Configurator from "components/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import {
  useSoftUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
// import brand from "assets/images/logo-ct.png";
import svLogo from "assets/images/sv-logo.png";

import SettingsIcon from "@mui/icons-material/Settings";
import NotFoundPage from "layouts/not-found";
import ProtectedRoute from "helpers/protected-routes";
import useAuthListener from "hooks/use-auth-listener";
import { filterNonAdminRoutes } from "utils";
import { useMediaQuery } from "@mui/material";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { userLoggedIn } = useAuthListener();
  const matchesmd = useMediaQuery("(max-width:600px)");

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) =>
      route.route ? (
        ["/profile", "/managements"].includes(route.route) ? (
          <Route
            element={<ProtectedRoute user={userLoggedIn} />}
            key={route.key}
          >
            <Route exact path={route.route} element={route.component} />
          </Route>
        ) : (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        )
      ) : null
    );

  const sidenavRoutes = routes.filter(
    (route) => !route?.route?.includes("authentication")
  );

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <SettingsIcon />
    </SoftBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && layout !== "error" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={svLogo}
            brandName="Soft UI Dashboard"
            routes={
              userLoggedIn?.userInfo?.system_role === "Administrator"
                ? sidenavRoutes
                : filterNonAdminRoutes(sidenavRoutes)
            }
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {matchesmd && configsButton}
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="*" element={<NotFoundPage dispatch={dispatch} />} />
      </Routes>
    </ThemeProvider>
  );
}
