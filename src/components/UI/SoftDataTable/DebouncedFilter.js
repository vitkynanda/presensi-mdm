import { InputAdornment, TextField } from "@mui/material";
import React from "react";
// import SoftInput from "components/UI/SoftInput";
import SearchIcon from "@mui/icons-material/Search";

export default function DebouncedFilter({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}
