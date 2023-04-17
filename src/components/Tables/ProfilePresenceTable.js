import { Card } from "@mui/material";
import SoftBox from "components/UI/SoftBox";
import SoftDataTable from "components/UI/SoftDataTable";
import SoftTypography from "components/UI/SoftTypography";
import { useUiStateStore } from "store/ui-state";
import { columns } from "./data/profilePresenceDataTable";

const ProfilePresenceTable = () => {
  const { presenceInfo } = useUiStateStore();
  return (
    <Card>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        pt={3}
      >
        <SoftTypography>Presence Data</SoftTypography>
      </SoftBox>
      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        <SoftDataTable table={{ columns, rows: presenceInfo || [] }} />
      </SoftBox>
    </Card>
  );
};

export default ProfilePresenceTable;
