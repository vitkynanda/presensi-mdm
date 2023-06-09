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

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import SoftButton from "components/UI/SoftButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "./ConfiguratorRoot";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
} from "context";
import SoftThemedIcon from "components/UI/SoftThemedIcon";
import { Close } from "@mui/icons-material";

function Configurator() {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } =
    controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = [
    "primary",
    "dark",
    "info",
    "success",
    "warning",
    "error",
  ];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <SoftBox>
          <SoftTypography variant="h5">SV App Configurator</SoftTypography>
          <SoftTypography variant="body2" color="text">
            See our dashboard options.
          </SoftTypography>
        </SoftBox>

        <IconButton onClick={handleCloseConfigurator}>
          <SoftThemedIcon IconComponent={Close} />
        </IconButton>
      </SoftBox>

      <Divider />

      <SoftBox pt={1.25} pb={3} px={3}>
        <SoftBox>
          <SoftTypography variant="h6">Sidenav Colors</SoftTypography>

          <SoftBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark },
                  transitions,
                }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({
                    functions: { linearGradient },
                    palette: { gradients },
                  }) =>
                    linearGradient(
                      gradients[color].main,
                      gradients[color].state
                    ),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </SoftBox>
        </SoftBox>

        <SoftBox mt={3} lineHeight={1}>
          <SoftTypography variant="h6">Sidenav Type</SoftTypography>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Choose between 2 different sidenav types.
          </SoftTypography>

          <SoftBox
            sx={{
              display: "flex",
              mt: 2,
            }}
          >
            <SoftButton
              color={sidenavColor}
              variant={transparentSidenav ? "gradient" : "outlined"}
              onClick={handleTransparentSidenav}
              disabled={disabled}
              fullWidth
              sx={{
                mr: 1,
                ...sidenavTypeButtonsStyles,
              }}
            >
              Transparent
            </SoftButton>
            <SoftButton
              color={sidenavColor}
              variant={transparentSidenav ? "outlined" : "gradient"}
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
              sx={sidenavTypeButtonsStyles}
            >
              White
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <SoftBox mt={3} mb={2} lineHeight={1}>
          <SoftTypography variant="h6">Navbar Fixed</SoftTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </SoftBox>
      </SoftBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
