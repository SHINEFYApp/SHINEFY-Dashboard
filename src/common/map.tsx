import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import L from "leaflet";
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

if (!(L.LineUtil as any)._flat) {
  (L.LineUtil as any)._flat = L.LineUtil.isFlat;
}

interface DrawMapProps {
  name: string;
}

function readCoordsFromLayer(layer: any): { lat: number; lng: number }[] {
  if (typeof layer.getLatLngs !== 'function') return [];
  try {
    const latLngs = layer.getLatLngs();
    const points = Array.isArray(latLngs[0]) ? latLngs[0] : latLngs;
    return points.map((c: any) => ({ lat: c.lat, lng: c.lng }));
  } catch { return []; }
}

const DrawMap = forwardRef<{ syncCoords: () => void }, DrawMapProps>(({ name }, ref) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const mapRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const initialCoordsRendered = useRef(false);

  const syncCoords = () => {
    if (!drawnItemsRef.current) return [];
    let result: { lat: number; lng: number }[] = [];
    drawnItemsRef.current.eachLayer((layer: any) => {
      const coords = readCoordsFromLayer(layer);
      if (coords.length > 0) {
        result = coords;
        console.log("Syncing map coords to formik:", JSON.stringify(coords));
        setFieldValue(name, coords);
      }
    });
    return result;
  };

  useImperativeHandle(ref, () => ({ syncCoords }), []);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("draw-map").setView([30.0444, 31.2357], 12);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
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

    map.on('draw:created', (e: any) => {
      drawnItems.addLayer(e.layer);
      syncCoords();
      initialCoordsRendered.current = false;
    });

    map.on('draw:edited', () => {
      syncCoords();
    });

    map.on('draw:deleted', () => {
      setFieldValue(name, []);
      initialCoordsRendered.current = false;
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const existing = values?.[name];
    if (!drawnItemsRef.current) return;
    if (!existing || !Array.isArray(existing) || existing.length === 0) return;
    if (initialCoordsRendered.current) return;
    if (drawnItemsRef.current.getLayers().length > 0) return;

    initialCoordsRendered.current = true;
    const latLngs = existing.map((c: any) => {
      if (Array.isArray(c) && c.length >= 2) return [c[0], c[1]];
      return [c.lat, c.lng];
    });
    const polygon = L.polygon(latLngs);
    polygon.on('edit', () => {
      syncCoords();
    });
    drawnItemsRef.current.addLayer(polygon);
    mapRef.current?.fitBounds(polygon.getBounds().pad(0.1));
  }, [values?.[name]]);

  return <div id="draw-map" style={{ height: "500px", width: "100%" }} />;
});

export default DrawMap;