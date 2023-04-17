import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SoftBox from "../SoftBox";
import { formatKey } from "utils";
import SoftTypography from "../SoftTypography";
import { DatePicker } from "@mui/x-date-pickers";

export default function SoftDatePicker({
  value: [key, val] = ["", ""],
  noLabel,
  onChange,
  size,
  disableDate = () => {},
  width,
  placeholder,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SoftBox mt={0.5}>
        {!noLabel && (
          <SoftBox mb={0.5} ml={0.5}>
            <SoftTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              {key && formatKey(key)}
            </SoftTypography>
          </SoftBox>
        )}
        <DatePicker
          shouldDisableDate={disableDate}
          value={val}
          onChange={(newVal) => onChange(newVal, key)}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                sx={() => {
                  return {
                    width: width || "100%",
                    "& input": {
                      width: "100% !important",
                    },
                  };
                }}
                size={size}
                inputProps={{ ...params.inputProps, placeholder }}
              />
            );
          }}
        />
      </SoftBox>
    </LocalizationProvider>
  );
}
