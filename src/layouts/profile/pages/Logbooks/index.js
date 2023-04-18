import { Collapse, Divider, Stack, useMediaQuery } from "@mui/material";
import SoftBox from "components/UI/SoftBox";
import SoftButton from "components/UI/SoftButton";
import SoftTypography from "components/UI/SoftTypography";
import { useEffect, useState } from "react";
import LogbookForm from "./LogbookForm";
import ProfileLogbookTable from "components/Tables/ProfileLogbookTable";
import { useUiStateStore } from "store/ui-state";

const Logbooks = () => {
  const [showForm, setShowForm] = useState();
  const matchesMd = useMediaQuery("(max-width: 600px)");
  const { selectedLogbook, setSelectedLogbook } = useUiStateStore();

  useEffect(() => {
    selectedLogbook.id && setShowForm(true);
  }, [selectedLogbook.id]);

  return (
    <SoftBox>
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <SoftTypography
            variant="h3"
            sx={(theme) => ({
              mb: 1,
              [theme.breakpoints.down("md")]: {
                fontSize: 22,
              },
            })}
          >
            Logbook
          </SoftTypography>
          {!showForm && (
            <SoftButton
              onClick={() => setShowForm(!showForm)}
              color="info"
              variant="gradient"
              size={matchesMd ? "small" : undefined}
            >
              Add Logbook
            </SoftButton>
          )}
        </Stack>
        <Divider />
      </Stack>
      <Stack spacing={1}>
        <Collapse in={showForm} timeout="auto" unmountOnExit>
          <LogbookForm
            handleCloseForm={() => {
              setSelectedLogbook({});
              setShowForm(false);
            }}
          />
        </Collapse>
        <ProfileLogbookTable />
      </Stack>
    </SoftBox>
  );
};

export default Logbooks;
