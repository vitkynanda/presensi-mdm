import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SoftBox from "../SoftBox";
import { formatKey } from "utils";
import SoftTypography from "../SoftTypography";
import { TimePicker } from "@mui/x-date-pickers";

export default function SoftTimePicker({
  value: [key, val] = ["", ""],
  onChange,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SoftBox>
        <SoftBox mb={0.5} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            {key && formatKey(key)}
          </SoftTypography>
        </SoftBox>
        <TimePicker
          value={val}
          onChange={(newVal) => onChange(newVal, key)}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={() => {
                return {
                  width: "100%",
                  "& input": {
                    width: "100% !important",
                  },
                };
              }}
            />
          )}
        />
      </SoftBox>
    </LocalizationProvider>
  );
}
