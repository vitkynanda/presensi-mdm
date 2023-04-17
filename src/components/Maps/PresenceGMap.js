import { PersonPin } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { InfoWindowF, CircleF, MarkerF } from "@react-google-maps/api";
import SoftGoogleMap from "components/UI/SoftGoogleMap";
import SoftTypography from "components/UI/SoftTypography";
import { useUiStateStore } from "store/ui-state";

const defaultCenter = {
  lat: -6.216322692316662,
  lng: 106.81430143785283,
};

export default function PresenceGMap({ location, height }) {
  const {
    setValidWFO,
    userLoggedIn: { userInfo },
  } = useUiStateStore();

  const containerStyle = {
    width: "100%",
    height: height || "300px",
    borderRadius: "5px",
  };

  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 100,
    zIndex: 1,
  };

  function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  const onLoadCircle = (circle) => {
    if (!userInfo?.workplace?.location) return setValidWFO(true);
    const isValidWFO = arePointsNear(
      userInfo?.workplace?.location,
      location,
      circle.radius / 1000
    );
    setValidWFO(isValidWFO);
  };

  return (
    <SoftGoogleMap
      center={location || userInfo?.workplace?.location || defaultCenter}
      mapContainerStyle={containerStyle}
      zoom={18}
    >
      <CircleF
        onLoad={onLoadCircle}
        center={userInfo?.workplace?.location || defaultCenter}
        options={circleOptions}
      />
      <MarkerF
        center={userInfo?.workplace?.location || defaultCenter}
        position={userInfo?.workplace?.location || defaultCenter}
      />
      <InfoWindowF position={location.lat ? location : defaultCenter}>
        <Stack alignItems="center">
          <SoftTypography sx={{ fontSize: 14 }}>You are here</SoftTypography>
          <PersonPin />
        </Stack>
      </InfoWindowF>
    </SoftGoogleMap>
  );
}
