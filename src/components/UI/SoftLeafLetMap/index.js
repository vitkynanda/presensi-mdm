import { MapContainer, TileLayer } from "react-leaflet";

const SoftLeafLetMap = ({ children, ...rest }) => {
  return (
    <MapContainer id="map" zoom={20} scrollWheelZoom={false} {...rest}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default SoftLeafLetMap;
