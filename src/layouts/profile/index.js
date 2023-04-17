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

// @mui material components
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";
// import SoftTypography from "components/UI/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
// import Footer from "components/Footer";
import ProfileInfoCard from "components/Cards/InfoCards/ProfileInfoCard";
import PresenceCard from "components/Cards/InfoCards/PresenceCard";

// Overview page components
import Header from "../../components/Headers/ProfileHeader";

// Data
import TabPanel from "components/UI/TabPanel";
import DialogVerified from "components/Dialogs/DialogVerified";
import LogbooksCard from "components/Cards/InfoCards/LogbooksCard";

import { useUiStateStore } from "store/ui-state";
import { useEffect, useMemo } from "react";
import { getLogbookInfo, getPresenceInfo } from "services";
import { getPresenceToday } from "utils";
import { Skeleton } from "@mui/material";
import SoftBottomModal from "components/UI/SoftBottomModal";
import Logbooks from "./pages/Logbooks";
import Presences from "./pages/Presences";

function Overview() {
  const {
    currentProfileTab,
    userLoggedIn,
    setPresenceInfo,
    presenceInfo,
    setLogbookInfo,
    logbookInfo,
    setGlobalLoading,
    globalLoading,
  } = useUiStateStore();

  useEffect(() => {
    (async () => {
      setGlobalLoading(true);
      const [resPresence, resLogBook] = await Promise.all([
        getPresenceInfo(userLoggedIn?.userInfo?.id),
        getLogbookInfo(userLoggedIn?.userInfo?.id),
      ]);
      if (resPresence) setPresenceInfo(resPresence);
      if (resLogBook) setLogbookInfo(resLogBook);
      setGlobalLoading(false);
    })();
  }, [
    userLoggedIn?.userInfo?.id,
    setPresenceInfo,
    setLogbookInfo,
    setGlobalLoading,
  ]);

  const presenceToday = useMemo(() => {
    return getPresenceToday(presenceInfo);
  }, [presenceInfo]);

  return (
    <>
      <SoftBottomModal />
      <DashboardLayout>
        <DialogVerified
          open={
            !userLoggedIn?.userInfo?.is_verified ||
            !userLoggedIn?.userInfo?.is_active
          }
        />
        <Header />
        <SoftBox mt={5} mb={3}>
          <TabPanel value={currentProfileTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={4}>
                {globalLoading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{
                      height: 300,
                    }}
                  />
                ) : (
                  <ProfileInfoCard
                    title="profile information"
                    description={
                      userLoggedIn?.userInfo?.profile_desc ||
                      `Hi, I’m ${userLoggedIn?.userInfo?.name}, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).`
                    }
                    info={{
                      fullName: userLoggedIn?.userInfo?.name || "-",
                      mobile: userLoggedIn?.userInfo?.phone || "-",
                      email: userLoggedIn?.userInfo?.email || "-",
                      location: userLoggedIn?.userInfo?.address || "-",
                    }}
                    social={[]}
                    action={{ route: "", tooltip: "Edit Profile" }}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                {globalLoading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{
                      height: 300,
                    }}
                  />
                ) : (
                  <PresenceCard presenceToday={presenceToday} />
                )}
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                {globalLoading ? (
                  <Skeleton
                    variant="rounded"
                    sx={{
                      height: 300,
                    }}
                  />
                ) : (
                  <LogbooksCard logbookInfo={logbookInfo} />
                )}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={currentProfileTab} index={1}>
            <Presences presenceToday={presenceToday} />
          </TabPanel>
          <TabPanel value={currentProfileTab} index={2}>
            <Logbooks />
          </TabPanel>
        </SoftBox>
      </DashboardLayout>
    </>
  );
}

export default Overview;
