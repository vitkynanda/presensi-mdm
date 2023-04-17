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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import SoftAvatar from "components/UI/SoftAvatar";

// Soft UI Dashboard React icons
import Cube from "components/Icons/Cube";
import Document from "components/Icons/Document";
import Settings from "components/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import defaultProfile from "assets/images/default-profile.png";
import { useUiStateStore } from "store/ui-state";
import { formatKey } from "utils";
import Office from "components/Icons/Office";
import CustomerSupport from "components/Icons/CustomerSupport";
import SpaceShip from "components/Icons/SpaceShip";

function ManagementHeader() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const { currentAdminTab, setCurrentAdminTab } = useUiStateStore();

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setCurrentAdminTab(newValue);

  const { userLoggedIn } = useUiStateStore();

  return (
    <SoftBox position="relative">
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
            rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={userLoggedIn?.userInfo?.imageUrl || defaultProfile}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {userLoggedIn?.userInfo?.name}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {userLoggedIn?.userInfo?.company_role?.name}{" "}
                {userLoggedIn?.userInfo?.system_role === "administrator" &&
                  " | " + formatKey(userLoggedIn?.userInfo?.system_role)}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={8} lg={8} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={currentAdminTab}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="Presences" icon={<Document />} index={0} />
                <Tab label="Logbooks" icon={<Settings />} index={1} />
                <Tab label="Teams" icon={<Cube />} index={2} />
                <Tab label="Users" icon={<CustomerSupport />} index={3} />
                <Tab label="Workplaces" icon={<Office />} index={4} />
                <Tab label="Roles" icon={<SpaceShip />} index={5} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default ManagementHeader;
