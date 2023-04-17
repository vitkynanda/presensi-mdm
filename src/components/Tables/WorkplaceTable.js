import { Card } from "@mui/material";
import SoftDataTable from "components/UI/SoftDataTable";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useEffect, useState } from "react";
import { getAllWorkplaceData } from "services";
import { useUiStateStore } from "store/ui-state";
import { columns } from "./data/workplaceDataTable";

const WorkplaceTable = () => {
  const { allWorkplaceData, setAllWorkplaceData } = useUiStateStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllWorkplaceData();
      if (res) setAllWorkplaceData(res);
      setLoading(false);
    })();
  }, [setAllWorkplaceData]);

  return (
    <Card>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        pt={3}
      >
        <SoftTypography variant="h5">Users Data</SoftTypography>
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
          table={{ columns, rows: allWorkplaceData || [] }}
          isLoading={loading}
        />
      </SoftBox>
    </Card>
  );
};

export default WorkplaceTable;
