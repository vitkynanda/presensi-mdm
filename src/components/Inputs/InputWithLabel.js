import SoftBox from "components/UI/SoftBox";
import SoftInput from "components/UI/SoftInput";
import SoftTypography from "components/UI/SoftTypography";
import { formatKey } from "utils";

const InputWithLabel = ({
  value: [key, val] = ["", ""],
  onChange,
  ...restProps
}) => {
  return (
    <SoftBox sx={{ width: "100%" }}>
      <SoftBox mb={0.5} ml={0.5}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          {formatKey(key)}
        </SoftTypography>
      </SoftBox>
      <SoftInput onChange={onChange} name={key} value={val} {...restProps} />
    </SoftBox>
  );
};

export default InputWithLabel;
