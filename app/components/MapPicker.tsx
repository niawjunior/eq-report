"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression, icon } from "leaflet";
import { useEffect } from "react";

const ICON = icon({
  iconUrl: "/marker-icon-2x.png",
  iconSize: [20, 32],
});

type Props = {
  selectedCoords: { lat: number; lng: number } | null;
  onSelect: (latlng: { lat: number; lng: number }) => void;
};

function MapAutoCenter({ coords }: { coords: { lat: number; lng: number } }) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, map.getZoom(), {
      animate: true,
    });
  }, [coords, map]);

  return null;
}

function ClickHandler({
  onSelect,
}: {
  onSelect: (latlng: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function MapPicker({ selectedCoords, onSelect }: Props) {
  const fallbackCoords: LatLngExpression = [13.7563, 100.5018];

  const coords = selectedCoords ?? {
    lat: fallbackCoords[0],
    lng: fallbackCoords[1],
  };

  return (
    <MapContainer
      center={coords}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedCoords && <Marker position={selectedCoords} icon={ICON} />}
      <MapAutoCenter coords={coords} />
      <ClickHandler onSelect={onSelect} />
    </MapContainer>
  );
}
