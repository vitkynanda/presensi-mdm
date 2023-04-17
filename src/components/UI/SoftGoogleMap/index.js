import { Stack } from "@mui/material";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import SoftTypography from "components/UI/SoftTypography";

const defaultMapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "5px",
};

export default function SoftGoogleMap({ children, ...restProps }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY,
  });

  if (!isLoaded)
    return (
      <Stack alignItems="center" justifyContent="center">
        <SoftTypography>Loading Map ...</SoftTypography>
      </Stack>
    );

  const onLoadMap = (map) => {};

  return (
    <GoogleMap
      onLoad={onLoadMap}
      mapContainerStyle={defaultMapContainerStyle}
      zoom={10}
      {...restProps}
    >
      {children}
    </GoogleMap>
  );
}
