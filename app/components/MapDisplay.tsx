"use client";

import { icon, LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const ICON = icon({
  iconUrl: "/marker-icon-2x.png",
  iconSize: [20, 32],
});

type MapDisplayProps = {
  latitude: number;
  longitude: number;
};

const MapDisplay = ({ latitude, longitude }: MapDisplayProps) => {
  const position: LatLngExpression = [latitude, longitude];

  return (
    <div className="h-60 rounded-lg overflow-hidden border">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position} icon={ICON} />
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
