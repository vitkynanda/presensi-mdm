import { Stack } from "@mui/material";
import SoftLeafLetMap from "components/UI/SoftLeafLetMap";
import SoftTypography from "components/UI/SoftTypography";
import { Circle, Marker, Popup } from "react-leaflet";
import { useUiStateStore } from "store/ui-state";
import L from "leaflet";
import { useEffect } from "react";
import { arePointsNear } from "utils";

const PlaceIcon = L.icon({
  iconUrl: "location.png",
  iconSize: [30, 40],
  iconAnchor: [12, 12],
  popupAnchor: [0, 0],
});

export default function PresenceLMap({ location, workplace, height, radius }) {
  const { setValidWFO, globalLoading } = useUiStateStore();

  useEffect(() => {
    if (!workplace) return setValidWFO(true);
    const isValidWFO = arePointsNear(workplace, location, radius);
    setValidWFO(isValidWFO);
  }, [location, workplace, radius, setValidWFO]);

  if (!location.lat || globalLoading)
    return (
      <Stack alignItems="center" justifyContent="center">
        <SoftTypography fontSize={16}>Loading Map...</SoftTypography>
      </Stack>
    );

  return (
    <SoftLeafLetMap
      style={{ height: height || "300px" }}
      center={[location?.lat, location?.lng]}
      zoom={18}
    >
      {workplace && (
        <Circle
          radius={radius || 70}
          center={[workplace?.lat, workplace?.lng]}
        />
      )}

      <Marker icon={PlaceIcon} position={[location?.lat, location?.lng]}>
        <Popup>Your work location</Popup>
      </Marker>
    </SoftLeafLetMap>
  );
}
