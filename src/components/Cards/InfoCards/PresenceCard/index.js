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
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";

import { Chip, Divider, Stack } from "@mui/material";
import { Done } from "@mui/icons-material";
import { useUiStateStore } from "store/ui-state";

function PresenceCard({ presenceToday }) {
  const { setCurrentProfileTab } = useUiStateStore();

  return (
    <Card sx={{ height: "100%" }} onClick={() => setCurrentProfileTab(1)}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <SoftTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          Presence Information
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftTypography>Today, {new Date().toDateString()}</SoftTypography>
        <Stack lineHeight={1} my={2} spacing={1}>
          <SoftTypography fontWeight="bold">Clock In</SoftTypography>
          {presenceToday && presenceToday?.clock_in ? (
            <>
              <SoftTypography fontSize={14}>
                Status :{" "}
                <Chip
                  component="span"
                  label={
                    presenceToday?.clock_in
                      ? "Already clock in"
                      : "Not clock in yet"
                  }
                  onClick={() => {}}
                  deleteIcon={<Done />}
                  size="small"
                  variant="outlined"
                  color={presenceToday?.clock_in ? "success" : "inherit"}
                />
              </SoftTypography>
              <SoftTypography fontSize={14}>
                Time :{" "}
                {new Date(
                  presenceToday?.clock_in?.seconds * 1000
                ).toLocaleTimeString()}{" "}
              </SoftTypography>
              <SoftTypography fontSize={14}>
                Work Mode : {presenceToday?.work_mode}
              </SoftTypography>
            </>
          ) : (
            <SoftTypography fontSize={14}>
              No clock in info, Tap this card to clock in.
            </SoftTypography>
          )}
        </Stack>
        <Divider />
        <Stack lineHeight={1} my={2} spacing={1}>
          <SoftTypography fontWeight="bold">Clock Out</SoftTypography>
          {presenceToday && presenceToday?.clock_out ? (
            <>
              <SoftTypography fontSize={14}>
                Status :{" "}
                <Chip
                  component="span"
                  label={
                    presenceToday?.clock_out
                      ? "Already clock out"
                      : "Not clock out yet"
                  }
                  onClick={() => {}}
                  deleteIcon={<Done />}
                  size="small"
                  variant="outlined"
                  color={presenceToday?.clock_out ? "success" : "inherit"}
                />
              </SoftTypography>
              <SoftTypography fontSize={14}>
                Time :{" "}
                {new Date(
                  presenceToday?.clock_out?.seconds * 1000
                ).toLocaleTimeString()}{" "}
              </SoftTypography>
              <SoftTypography fontSize={14}>
                Work Mode : {presenceToday?.work_mode}
              </SoftTypography>
            </>
          ) : (
            <SoftTypography fontSize={14}>
              No clock out info, Tap this card to clock out
            </SoftTypography>
          )}
        </Stack>
      </SoftBox>
    </Card>
  );
}

export default PresenceCard;
