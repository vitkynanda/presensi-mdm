import {
  Card,
  CircularProgress,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import SoftDataTable from "components/UI/SoftDataTable";
import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import { useEffect, useState } from "react";
import { getAllLogbookData, getAllTeamData, getAllUserData } from "services";
import { useUiStateStore } from "store/ui-state";
import { columns } from "./data/logbookDataTable";
import SoftDatePicker from "components/UI/SoftDatePicker";
import AutoCompleteOption from "components/UI/AutoCompleteOption";
import SoftButton from "components/UI/SoftButton";
import { Sort } from "@mui/icons-material";
import SoftBottomModal from "components/UI/SoftBottomModal";

const LogbookTable = ({ onSetDate }) => {
  const {
    allLogbookData,
    setAllLogbookData,
    setGlobalLoading,
    setAllTeamData,
    allTeamData,
    setAllUserData,
    allUserData,
    globalLoading,
  } = useUiStateStore();
  const [loading, setLoading] = useState();
  const matchesMd = useMediaQuery("(max-width:600px)");
  const [openFilter, setOpenFilter] = useState(false);

  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    team: { label: "", id: "" },
    user: { label: "", id: "" },
  });

  const handleFilter = async () => {
    setGlobalLoading(true);
    const res = await getAllLogbookData(filter);
    if (res) {
      setAllLogbookData(res);
      if (matchesMd) setOpenFilter(false);
    }
    setGlobalLoading(false);
    onSetDate(filter);
  };

  const handleChangeDate = (newVal, key) => {
    if (key === "startDate")
      return setFilter({ ...filter, endDate: "", [key]: newVal });
    setFilter({ ...filter, [key]: newVal });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllLogbookData();
      if (res) setAllLogbookData(res);
      setLoading(false);
    })();
  }, [setAllLogbookData]);

  const FilterLogbook = () => (
    <Stack
      direction={matchesMd ? "column" : "row"}
      spacing={1.5}
      alignItems={matchesMd ? "" : "center"}
    >
      <SoftDatePicker
        noLabel={true}
        value={["startDate", filter.startDate]}
        placeholder="Start Date"
        onChange={handleChangeDate}
        disableDate={(valDate) => valDate > new Date()}
        width={matchesMd ? undefined : 150}
        size="small"
      />
      <SoftDatePicker
        noLabel={true}
        value={["endDate", filter.endDate]}
        placeholder="End Date"
        onChange={handleChangeDate}
        disableDate={(valDate) =>
          valDate < new Date(filter.startDate) || valDate > new Date()
        }
        width={matchesMd ? undefined : 150}
        size="small"
      />
      <AutoCompleteOption
        width={matchesMd ? undefined : 150}
        value={["", filter.team]}
        fetcher={getAllTeamData}
        options={allTeamData.map((team) => ({ label: team.name, id: team.id }))}
        setOption={setAllTeamData}
        onSelect={(e, newVal) => setFilter({ ...filter, team: newVal })}
        noLabel={true}
        placeholder="Select team"
      />
      <AutoCompleteOption
        width={matchesMd ? undefined : 150}
        value={["", filter.user]}
        fetcher={getAllUserData}
        options={allUserData.map((user) => ({ label: user.name, id: user.id }))}
        setOption={setAllUserData}
        onSelect={(e, newVal) => setFilter({ ...filter, user: newVal })}
        noLabel={true}
        placeholder="Select user"
      />
      <SoftBox textAlign="right">
        <SoftButton
          size="small"
          color="info"
          variant="gradient"
          onClick={handleFilter}
          disabled={globalLoading}
          endIcon={
            globalLoading ? (
              <CircularProgress color="inherit" size={14} />
            ) : null
          }
        >
          Filter
        </SoftButton>
      </SoftBox>
    </Stack>
  );

  return (
    <Card>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        pt={3}
      >
        <SoftTypography variant="h5">Logbooks Data</SoftTypography>
        {matchesMd ? (
          <>
            <IconButton onClick={() => setOpenFilter(true)}>
              <Sort />
            </IconButton>
            <SoftBottomModal
              open={openFilter}
              title="Filter Presences Data"
              handleClose={() => setOpenFilter(false)}
              height={100}
            >
              <FilterLogbook />
            </SoftBottomModal>
          </>
        ) : (
          <FilterLogbook />
        )}
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
          table={{ columns, rows: allLogbookData || [] }}
          isLoading={loading}
        />
      </SoftBox>
    </Card>
  );
};

export default LogbookTable;
