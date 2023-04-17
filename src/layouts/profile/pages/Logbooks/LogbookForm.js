import { Add, Delete } from "@mui/icons-material";
import {
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import InputWithLabel from "components/Inputs/InputWithLabel";
import ConfigureProjectModal from "components/Modals/ConfigureProjectModal";
import SelectOption from "components/UI/SelectOption";
import SoftBox from "components/UI/SoftBox";
import SoftButton from "components/UI/SoftButton";
import SoftDatePicker from "components/UI/SoftDatePicker";
import SoftTypography from "components/UI/SoftTypography";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addLogbook, getLogbookInfo, updateLogbook } from "services";
import { useUiStateStore } from "store/ui-state";
import { getUUID } from "utils";

const LogbookForm = ({ handleCloseForm }) => {
  const {
    userLoggedIn,
    globalLoading,
    setGlobalLoading,
    setLogbookInfo,
    selectedLogbook,
  } = useUiStateStore();
  const [logbookData, setLogbookData] = useState({
    work_mode: "WFO",
    selected_date: "",
    project: userLoggedIn?.userInfo?.projects
      ? userLoggedIn?.userInfo?.projects[0]?.name
      : "",
    usecase: "",
    activity: [""],
    next_activity: [""],
  });

  const handleChangeInput = (e, key) =>
    setLogbookData({ ...logbookData, [key]: e.target.value });

  const handleAddRowActivity = () =>
    setLogbookData({ ...logbookData, activity: [...logbookData.activity, ""] });

  const handleAddRowNextActivity = () =>
    setLogbookData({
      ...logbookData,
      next_activity: [...logbookData.next_activity, ""],
    });

  const handleChangeMultipleActivity = (e, index) => {
    const values = [...logbookData.activity];
    values[index] = e.target.value;
    setLogbookData({ ...logbookData, activity: values });
  };

  const handleChangeMultipleNextActivity = (e, index) => {
    const values = [...logbookData.next_activity];
    values[index] = e.target.value;
    setLogbookData({ ...logbookData, next_activity: values });
  };

  const handleDeleteRowActivity = (index) => {
    const values = [...logbookData.activity];
    values.splice(index, 1);
    setLogbookData({ ...logbookData, activity: values });
  };

  const handleDeleteRowNextActivity = (index) => {
    const values = [...logbookData.next_activity];
    values.splice(index, 1);
    setLogbookData({ ...logbookData, next_activity: values });
  };

  const handleChangeDate = (newVal, key) =>
    setLogbookData({ ...logbookData, [key]: newVal });

  const validateLogbook = () => {
    let valid = true;
    for (let [key, val] of Object.entries(logbookData)) {
      if (typeof val === "string" && !val) return false;
      if (key.includes("activity") && val.filter((i) => !i).length > 0)
        return false;
    }
    return valid;
  };

  const handleAddLogbook = async () => {
    if (!validateLogbook())
      return toast.error("Please fill all logbook fields");
    setGlobalLoading(true);
    const res = await addLogbook({
      id: getUUID(),
      user: {
        name: userLoggedIn?.userInfo?.name,
        id: userLoggedIn?.userInfo?.id,
        team: userLoggedIn?.userInfo?.team?.name || "",
      },
      ...logbookData,
    });
    if (res) {
      const updatedLogbook = await getLogbookInfo(userLoggedIn?.userInfo?.id);
      if (updatedLogbook) {
        setLogbookInfo(updatedLogbook);
        handleCloseForm();
      }
    }
    setGlobalLoading(false);
  };

  const handleEditLogbook = async () => {
    if (!validateLogbook())
      return toast.error("Please fill all logbook fields");
    setGlobalLoading(true);
    const res = await updateLogbook({
      ...selectedLogbook,
      ...logbookData,
    });
    if (res) {
      const updatedLogbook = await getLogbookInfo(userLoggedIn?.userInfo?.id);
      if (updatedLogbook) {
        setLogbookInfo(updatedLogbook);
        handleCloseForm();
      }
    }
    setGlobalLoading(false);
  };

  useEffect(() => {
    selectedLogbook.id &&
      setLogbookData({
        selected_date: selectedLogbook.selected_date
          ? new Date(selectedLogbook.selected_date.seconds * 1000)
          : "",
        usecase: selectedLogbook.usecase || "",
        work_mode: selectedLogbook.work_mode || "WFO",
        project: selectedLogbook.project || "",
        activity: selectedLogbook.activity || [""],
        next_activity: selectedLogbook.next_activity || [""],
      });
  }, [selectedLogbook]);

  return (
    <Card sx={{ height: "100%", p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <SoftTypography
          sx={(theme) => ({ [theme.breakpoints.down("md")]: { fontSize: 16 } })}
        >
          {selectedLogbook.id ? "Edit" : "Add"} Logbook
        </SoftTypography>
        <ConfigureProjectModal />
      </Stack>
      <Divider />
      <Grid container px={1} spacing={3}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SoftTypography fontSize={15}>Select Date</SoftTypography>
              <SoftDatePicker
                noLabel={true}
                value={["selected_date", logbookData.selected_date]}
                placeholder="Select date"
                onChange={handleChangeDate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography fontSize={15}>Project</SoftTypography>
              {userLoggedIn?.userInfo?.projects &&
              userLoggedIn?.userInfo?.projects?.length > 0 ? (
                <SelectOption
                  value={["", logbookData.project]}
                  options={userLoggedIn?.userInfo?.projects?.map((project) => ({
                    key: project.name,
                    value: project.name,
                  }))}
                  onSelect={(e) => handleChangeInput(e, "project")}
                />
              ) : (
                <SoftTypography fontSize={14} mt={1}>
                  No project found. please configure first.
                </SoftTypography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography fontSize={15}>Usecase</SoftTypography>
              <InputWithLabel
                value={["", logbookData.usecase]}
                onChange={(e) => handleChangeInput(e, "usecase")}
                sx={{ py: 0.85 }}
                placeholder="Input usecase name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography fontSize={15}>Work Mode</SoftTypography>
              <SelectOption
                value={["", logbookData.work_mode]}
                options={[
                  { key: "WFO", value: "WFO" },
                  { key: "WFH", value: "WFH" },
                  { key: "Leave (Cuti)", value: "Leave (Cuti)" },
                  { key: "Leave (Sakit)", value: "Leave (Sakit)" },
                ]}
                onSelect={(e) => handleChangeInput(e, "work_mode")}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2} mt={0.5}>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SoftTypography fontSize={15}>Activity</SoftTypography>
                <IconButton onClick={handleAddRowActivity}>
                  <Add />
                </IconButton>
              </Stack>
              {logbookData.activity.map((activity, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <InputWithLabel
                    key={index}
                    value={["", activity]}
                    onChange={(e) => handleChangeMultipleActivity(e, index)}
                    placeholder="Input activity"
                  />
                  <IconButton
                    disabled={logbookData.activity.length === 1}
                    onClick={() => handleDeleteRowActivity(index)}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SoftTypography fontSize={15}>Next Activity</SoftTypography>
                <IconButton onClick={handleAddRowNextActivity}>
                  <Add />
                </IconButton>
              </Stack>
              {logbookData.next_activity.map((activity, index) => (
                <SoftBox key={index} display="flex">
                  <InputWithLabel
                    value={["", activity]}
                    onChange={(e) => handleChangeMultipleNextActivity(e, index)}
                    placeholder="Input next activity"
                  />
                  <IconButton
                    disabled={logbookData.next_activity.length === 1}
                    onClick={() => handleDeleteRowNextActivity(index)}
                  >
                    <Delete />
                  </IconButton>
                </SoftBox>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <SoftBox>
            <SoftTypography fontSize={15} mb={1}>
              Logbook Preview
            </SoftTypography>
            {logbookData.selected_date && (
              <SoftTypography component="span" fontSize={15} fontWeight="bold">
                {logbookData.selected_date.toDateString()}
                {", "}
                <SoftTypography
                  component="span"
                  fontSize={14}
                >{`(${logbookData.project})`}</SoftTypography>
              </SoftTypography>
            )}

            <SoftBox>
              <SoftTypography fontSize={14} fontWeight="bold">
                Activity
              </SoftTypography>
              {logbookData.activity.map((activity, index) => (
                <SoftTypography key={index} fontSize={14}>
                  - {activity}
                </SoftTypography>
              ))}
              <SoftTypography fontSize={14} fontWeight="bold">
                Next Activity
              </SoftTypography>
              {logbookData.next_activity.map((activity, index) => (
                <SoftTypography key={index} fontSize={14}>
                  - {activity}
                </SoftTypography>
              ))}
              <Stack direction="row" spacing={1}>
                <SoftTypography fontSize={14} fontWeight="bold">
                  Work Mode
                </SoftTypography>
                <SoftTypography fontSize={14}>
                  {logbookData.work_mode}
                </SoftTypography>
              </Stack>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="end"
        spacing={2}
        alignItems="center"
        mt={2}
      >
        <SoftButton onClick={handleCloseForm} color="error" variant="outlined">
          Cancel
        </SoftButton>
        <SoftButton
          onClick={selectedLogbook.id ? handleEditLogbook : handleAddLogbook}
          color="error"
          variant="gradient"
          endIcon={
            globalLoading ? (
              <CircularProgress color="inherit" size={18} />
            ) : null
          }
          disabled={globalLoading}
        >
          Submit
        </SoftButton>
      </Stack>
    </Card>
  );
};

export default LogbookForm;
