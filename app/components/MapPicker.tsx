"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression, icon } from "leaflet";

const ICON = icon({
  iconUrl: "/marker-icon-2x.png",
  iconSize: [20, 32],
});

type Props = {
  selectedCoords: { lat: number; lng: number } | null;
  onSelect: (coords: { lat: number; lng: number }) => void;
};

export default function MapPicker({ selectedCoords, onSelect }: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fallbackCenter: LatLngExpression = [13.7563, 100.5018]; // Bangkok

  function LocationSelector() {
    useMapEvents({
      click(e) {
        onSelect(e.latlng);
      },
    });
    return null;
  }

  return (
    <div className="h-60 rounded-lg overflow-hidden border">
      <MapContainer
        center={selectedCoords ?? fallbackCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationSelector />
        {selectedCoords && <Marker position={selectedCoords} icon={ICON} />}
      </MapContainer>
    </div>
  );
}
