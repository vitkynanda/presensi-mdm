import { Card } from "@mui/material";
import SoftDataTable from "components/UI/SoftDataTable";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useEffect, useState } from "react";
import { getAllTeamData } from "services";
import { useUiStateStore } from "store/ui-state";
import { columns } from "./data/teamDataTable";

const TeamTable = () => {
  const { allTeamData, setAllTeamData } = useUiStateStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllTeamData();
      if (res) setAllTeamData(res);
      setLoading(false);
    })();
  }, [setAllTeamData]);

  return (
    <Card>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        pt={3}
      >
        <SoftTypography variant="h5">Teams Data</SoftTypography>
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
        <SoftDataTable
          table={{ columns, rows: allTeamData || [] }}
          isLoading={loading}
        />
      </SoftBox>
    </Card>
  );
};

export default TeamTable;
