import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
}

const MapView = ({ lat, lng, zoom = 13 }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize the map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([lat, lng], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([lat, lng]).addTo(map);

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []); // Initialize only once

  // Update position when lat/lng change
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      mapRef.current.flyTo([lat, lng], zoom, {
        duration: 1,
      });
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng, zoom]);

  return <div ref={containerRef} className="h-full w-full rounded-xl shadow-inner border border-gray-200" style={{ minHeight: "400px" }} />;
};

export default MapView;
