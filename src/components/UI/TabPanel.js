import SoftBox from "./SoftBox";

const TabPanel = (props) => {
  const { children, value, index, ...restProps } = props;

  return (
    <SoftBox
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...restProps}
      py={1}
    >
      {value === index && children}
    </SoftBox>
  );
};

export default TabPanel;
