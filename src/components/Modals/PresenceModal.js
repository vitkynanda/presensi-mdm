import SoftBox from "components/UI/SoftBox";
import SoftTypography from "components/UI/SoftTypography";
import SoftButton from "components/UI/SoftButton";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useUiStateStore } from "store/ui-state";
import SoftModal from "components/UI/SoftModal";
import SoftBottomModal from "components/UI/SoftBottomModal";
import PresenceLMap from "components/Maps/PresenceLMap";
import SelectOption from "components/UI/SelectOption";

const options = [
  { key: "WFH", value: "WFH" },
  { key: "WFO", value: "WFO" },
  { key: "Leave (Cuti)", value: "Leave (Cuti)" },
  { key: "Leave (Sakit)", value: "Leave (Sakit)" },
];

export default function PresenceModal({
  title,
  open = false,
  handleClose,
  action,
  loading,
  location,
}) {
  const [workMode, setWorkMode] = useState("WFO");
  const {
    validWFO,
    userLoggedIn: { userInfo },
  } = useUiStateStore();
  const matchesmd = useMediaQuery("(max-width:600px)");
  const ModalWrapper = matchesmd ? SoftBottomModal : SoftModal;
  const handleSelectChange = (e) => setWorkMode(e.target.value);

  return (
    <ModalWrapper title={title} open={open} handleClose={handleClose}>
      <SoftBox sx={{ mb: 1.5 }}>
        <SoftTypography
          varinat="gradient"
          fontWeight="medium"
          mb={1}
          fontSize={17}
        >
          Your current location
        </SoftTypography>
        <PresenceLMap
          location={location.lat ? location : { lat: 0, lng: 0 }}
          workplace={userInfo?.workplace?.location}
          height="200px"
        />
        {!validWFO && workMode === "WFO" && title === "Clock In" && (
          <SoftTypography fontSize={10} color="error">
            *your current location is not within range of the workplace, please
            choose another work mode.
          </SoftTypography>
        )}
      </SoftBox>
      {title === "Clock In" && (
        <SoftBox mb={2}>
          <SelectOption
            value={["Select Work Mode", workMode]}
            onSelect={handleSelectChange}
            options={options}
            placeholder="Select Work Mode"
          />
        </SoftBox>
      )}
      <SoftBox textAlign="right">
        <SoftButton
          variant="gradient"
          color="error"
          endIcon={
            loading ? <CircularProgress color="inherit" size={18} /> : null
          }
          disabled={workMode === "WFO" && title === "Clock In" && !validWFO}
          onClick={() => action(workMode)}
        >
          Submit
        </SoftButton>
      </SoftBox>
    </ModalWrapper>
  );
}
