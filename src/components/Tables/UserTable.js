import { Card } from "@mui/material";
import SoftDataTable from "components/UI/SoftDataTable";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useEffect } from "react";
import { getAllUserData } from "services";
import { useUiStateStore } from "store/ui-state";
import { columns } from "./data/userDataTable";

const UserTable = () => {
  const { allUserData, setAllUserData, globalLoading, setGlobalLoading } =
    useUiStateStore();

  useEffect(() => {
    (async () => {
      setGlobalLoading(true);
      const res = await getAllUserData();
      if (res) setAllUserData(res);
      setGlobalLoading(false);
    })();
  }, [setAllUserData, setGlobalLoading]);

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
          table={{ columns, rows: allUserData || [] }}
          isLoading={globalLoading}
        />
      </SoftBox>
    </Card>
  );
};

export default UserTable;
