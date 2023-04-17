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
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useUiStateStore } from "store/ui-state";

function LogbooksCard({ logbookInfo }) {
  const { setCurrentProfileTab } = useUiStateStore();
  return (
    <Card
      sx={{ height: "100%", boxShadow: "large" }}
      onClick={() => setCurrentProfileTab(2)}
    >
      <SoftBox p={2}>
        <SoftTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          Logbook Information
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftTypography variant="h6" fontWeight="bold">
          Latest Activity
        </SoftTypography>

        {logbookInfo.length === 0 ? (
          <SoftTypography sx={{ p: 3, fontSize: 14, textAlign: "center" }}>
            No activity available, Tap this card to add activity
          </SoftTypography>
        ) : (
          logbookInfo?.slice(0, 3)?.map((logbook) => (
            <Stack
              key={logbook.id}
              py={1}
              alignItems="flex-start"
              direction="row"
              spacing={2}
            >
              <SoftTypography
                fontSize={14}
                component="span"
                fontWeight="medium"
              >
                {new Date(
                  logbook.selected_date.seconds * 1000
                ).toLocaleDateString()}
              </SoftTypography>

              <Stack>
                <SoftTypography fontSize={13} color="text" fontWeight="regular">
                  <SoftTypography
                    fontSize={13}
                    component="span"
                    fontWeight="bold"
                  >
                    Activity:{" "}
                  </SoftTypography>
                  {logbook.activity[0] && logbook.activity[0].slice(0, 50)}
                  {logbook.activity[0] && logbook.activity[0].length > 50
                    ? "..."
                    : ""}
                </SoftTypography>
                <SoftTypography fontSize={13} color="text" fontWeight="regular">
                  <SoftTypography
                    fontSize={13}
                    component="span"
                    fontWeight="bold"
                  >
                    Next Activity:{" "}
                  </SoftTypography>
                  {logbook.next_activity[0] &&
                    logbook.next_activity[0].slice(0, 50)}
                  {logbook.next_activity[0] &&
                  logbook.next_activity[0].length > 50
                    ? "..."
                    : ""}
                </SoftTypography>
              </Stack>
            </Stack>
          ))
        )}
      </SoftBox>
    </Card>
  );
}

export default LogbooksCard;
