import { useEffect } from "react";
import L from "leaflet";
import type { LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

import { useFormikContext } from "formik";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface DrawMapProps {
  name: string;
}

const DrawMap = ({ name }: DrawMapProps) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const map = L.map("draw-map").setView([30.0444, 31.2357], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {},
        rectangle: {},
        polyline: false,
        marker: false,
        circle: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event: LeafletEvent) => {
      const layer = (event as any).layer;

      drawnItems.clearLayers();
      drawnItems.addLayer(layer);

      if (typeof layer.getLatLngs === 'function') {
        const latLngs = layer.getLatLngs();
        // Leaflet polygons usually return LatLng[][] (array of rings)
        // We take the first ring [0] if it's an array of arrays
        const points = Array.isArray(latLngs[0]) ? latLngs[0] : latLngs;

        const coords = points.map((c: any) => ({
          lat: c.lat,
          lng: c.lng,
        }));
        setFieldValue(name, coords);
      } else {
        console.warn("Layer does not support getLatLngs", layer);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="draw-map" style={{ height: "500px", width: "100%" }} />;
};

export default DrawMap;
