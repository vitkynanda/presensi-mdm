import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatKey } from "utils";
import SoftBox from "./SoftBox";
import SoftTypography from "./SoftTypography";

export default function SelectOption({
  options = [],
  onSelect = () => {},
  value: [key, val] = ["", ""],
  ...restProps
}) {
  return (
    <>
      <SoftBox mb={0.5} ml={0.5}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          {key && formatKey(key)}
        </SoftTypography>
      </SoftBox>
      <FormControl fullWidth size="small">
        <Select {...restProps} value={val} name={key} onChange={onSelect}>
          {options.map((opt, idx) => (
            <MenuItem key={idx} value={opt.value}>
              {opt.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
