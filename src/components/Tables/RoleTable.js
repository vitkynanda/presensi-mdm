import { Card } from "@mui/material";
import SoftDataTable from "components/UI/SoftDataTable";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useEffect, useState } from "react";
import { getAllRoleData } from "services";
import { useUiStateStore } from "store/ui-state";
import { columns } from "./data/roleDataTable";

const RoleTable = () => {
  const { allRoleData, setAllRoleData } = useUiStateStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllRoleData();
      if (res) setAllRoleData(res);
      setLoading(false);
    })();
  }, [setAllRoleData]);

  return (
    <Card>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        pt={3}
      >
        <SoftTypography variant="h5">Roles Data</SoftTypography>
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
          table={{ columns, rows: allRoleData || [] }}
          isLoading={loading}
        />
      </SoftBox>
    </Card>
  );
};

export default RoleTable;
