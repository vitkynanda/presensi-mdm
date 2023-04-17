import { CircularProgress, useMediaQuery } from "@mui/material";
import { useState } from "react";
import SoftModal from "components/UI/SoftModal";
import SoftBottomModal from "components/UI/SoftBottomModal";
import InputWithLabel from "components/Inputs/InputWithLabel";
import { getAllPresenceData, updatePresence } from "services";
import { useUiStateStore } from "store/ui-state";
import SoftBox from "components/UI/SoftBox";
import SoftButton from "components/UI/SoftButton";
import SelectOption from "components/UI/SelectOption";
import SoftTimePicker from "components/UI/SoftTimePicker";

const options = [
  { key: "WFH", value: "WFH" },
  { key: "WFO", value: "WFO" },
  { key: "Leave (Cuti)", value: "Leave (Cuti)" },
  { key: "Leave (Sakit)", value: "Leave (Sakit)" },
];

export default function PresenceUpdateModal({
  title,
  open = false,
  handleClose,
  rowData,
}) {
  const { setGlobalLoading, setAllPresenceData, globalLoading } =
    useUiStateStore();
  const [presenceData, setPresenceData] = useState({
    ...rowData,
    clock_in: new Date(rowData.clock_in.seconds * 1000),
    clock_out: rowData.clock_out
      ? new Date(rowData.clock_out.seconds * 1000)
      : rowData.clock_out,
  });
  const matchesmd = useMediaQuery("(max-width:600px)");
  const ModalWrapper = matchesmd ? SoftBottomModal : SoftModal;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPresenceData({ ...presenceData, [name]: value });
  };

  const handleUpdate = async () => {
    setGlobalLoading(true);
    const res = await updatePresence({
      ...presenceData,
      created_at: new Date(presenceData.created_at.seconds * 1000),
    });
    if (res) {
      handleClose();
      const updatedUser = await getAllPresenceData();
      if (updatedUser) setAllPresenceData(updatedUser);
    }

    setGlobalLoading(false);
  };

  const handleChangeTime = (newVal, key) => {
    setPresenceData({ ...presenceData, [key]: newVal });
  };

  return (
    <ModalWrapper title={title} open={open} handleClose={handleClose}>
      <InputWithLabel
        value={["name", presenceData.user.name]}
        disabled={true}
        onChange={handleChangeInput}
      />
      <SelectOption
        value={["work_mode", presenceData.work_mode]}
        options={options}
        onSelect={handleChangeInput}
      />

      <SoftTimePicker
        value={["clock_in", presenceData.clock_in]}
        onChange={handleChangeTime}
      />

      <SoftTimePicker
        value={["clock_out", presenceData.clock_out]}
        onChange={handleChangeTime}
      />

      <SoftBox sx={{ mt: 2, textAlign: "right" }}>
        <SoftButton
          endIcon={
            globalLoading ? (
              <CircularProgress color="inherit" size={18} />
            ) : null
          }
          onClick={handleUpdate}
          variant="gradient"
          color="error"
          disabled={
            globalLoading ||
            (presenceData.clock_out !== "" &&
              presenceData.clock_out <= presenceData.clock_in)
          }
        >
          Update
        </SoftButton>
      </SoftBox>
    </ModalWrapper>
  );
}
