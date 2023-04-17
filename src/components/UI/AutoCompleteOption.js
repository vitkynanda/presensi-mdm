import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SoftBox from "./SoftBox";
import SoftTypography from "./SoftTypography";
import { formatKey } from "utils";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function AutoCompleteOption({
  options = [{ label: "", id: "" }],
  setOption = () => {},
  fetcher = async () => {},
  onSelect = () => {},
  value: [key, val] = ["", { label: "" }],
  size = "small",
  noLabel = false,
  width,
  placeholder,
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchOptionData = async () => {
    if (options.length !== 0) return setOpen(true);
    setLoading(true);
    const res = await fetcher();
    if (res) {
      setOption(res);
      setOpen(true);
    }
    setLoading(false);
  };

  return (
    <SoftBox>
      {!noLabel && (
        <SoftBox mb={0.5} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            {key && formatKey(key)}
          </SoftTypography>
        </SoftBox>
      )}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        size={size}
        open={open}
        onOpen={() => fetchOptionData()}
        onClose={() => setOpen(false)}
        options={options}
        onChange={(e, newVal) => onSelect(e, newVal, key)}
        value={val}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ width: width || "100%" }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            inputProps={{ ...params.inputProps, placeholder }}
          />
        )}
      />
    </SoftBox>
  );
}
