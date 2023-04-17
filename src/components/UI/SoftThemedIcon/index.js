import { useSoftUIController } from "context";
import { useLocation } from "react-router-dom";

const SoftThemedIcon = ({ IconComponent, color }) => {
  const { pathname } = useLocation();
  const [controller] = useSoftUIController();
  const { darkMode } = controller;

  return (
    <IconComponent
      sx={{
        color: ({ palette: { dark, white } }) =>
          pathname === "/profile"
            ? "inherit"
            : !darkMode
            ? dark.main
            : white.main,
        fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
        cursor: "pointer",
      }}
    />
  );
};

export default SoftThemedIcon;
