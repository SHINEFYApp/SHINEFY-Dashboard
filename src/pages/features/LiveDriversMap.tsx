import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Phone, Clock, X, Route, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useLiveDrivers, useDriverRoute } from "../../api/features/liveLocation.hooks";
import type { LiveDriver } from "../../api/features/liveLocation";

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Online → green marker, Offline → grey
const onlineIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:14px;height:14px;border-radius:50%;
    background:#22c55e;border:2px solid white;
    box-shadow:0 0 0 3px rgba(34,197,94,0.3);
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const offlineIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:12px;height:12px;border-radius:50%;
    background:#9ca3af;border:2px solid white;
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const selectedIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:18px;height:18px;border-radius:50%;
    background:#DC9927;border:2px solid white;
    box-shadow:0 0 0 4px rgba(220,153,39,0.4);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function LiveDriversMap() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());
  const routeLayerRef = useRef<L.Polyline | null>(null);

  const [selectedDriver, setSelectedDriver] = useState<LiveDriver | null>(null);
  const [showRoute, setShowRoute] = useState(false);

  const { data, isLoading, dataUpdatedAt, refetch, isFetching } = useLiveDrivers();
  const { data: routeData } = useDriverRoute(showRoute ? selectedDriver?.user_id ?? null : null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView([30.0444, 31.2357], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when data changes
  useEffect(() => {
    if (!mapRef.current || !data?.data) return;

    const drivers = data.data;
    const currentIds = new Set(drivers.map((d) => d.user_id));

    // Remove markers for drivers no longer in response
    markersRef.current.forEach((marker, id) => {
      if (!currentIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    drivers.forEach((driver) => {
      if (!driver.latitude || !driver.longitude) return;

      const isSelected = selectedDriver?.user_id === driver.user_id;
      const icon = isSelected ? selectedIcon : driver.is_online ? onlineIcon : offlineIcon;
      const pos: L.LatLngTuple = [driver.latitude, driver.longitude];

      const existing = markersRef.current.get(driver.user_id);
      if (existing) {
        existing.setLatLng(pos).setIcon(icon);
      } else {
        const marker = L.marker(pos, { icon })
          .addTo(mapRef.current!)
          .on("click", () => {
            setSelectedDriver(driver);
            setShowRoute(false);
          });
        markersRef.current.set(driver.user_id, marker);
      }
    });
  }, [data, selectedDriver]);

  // Draw route polyline
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old route
    routeLayerRef.current?.remove();
    routeLayerRef.current = null;

    if (!showRoute || !routeData?.locations?.length) return;

    const points: L.LatLngTuple[] = routeData.locations.map((p) => [p.latitude, p.longitude]);

    routeLayerRef.current = L.polyline(points, {
      color: "#DC9927",
      weight: 3,
      opacity: 0.8,
      dashArray: "6 4",
    }).addTo(mapRef.current);

    mapRef.current.fitBounds(routeLayerRef.current.getBounds(), { padding: [40, 40] });
  }, [showRoute, routeData]);

  // Focus map on selected driver
  useEffect(() => {
    if (!selectedDriver?.latitude || !selectedDriver?.longitude || !mapRef.current) return;
    mapRef.current.setView([selectedDriver.latitude, selectedDriver.longitude], 14, {
      animate: true,
    });
  }, [selectedDriver]);

  const onlineCount = data?.online_count ?? 0;
  const offlineCount = data?.offline_count ?? 0;
  const lastUpdate = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString("ar-EG") : "—";

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Navigation size={20} className="text-[#DC9927]" />
          خريطة السائقين الحية
        </h1>

        <div className="flex items-center gap-4">
          {/* Stats */}
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
              <Wifi size={13} />
              {onlineCount} متاح
            </span>
            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">
              <WifiOff size={13} />
              {offlineCount} غير متاح
            </span>
          </div>

          {/* Last update + refresh */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock size={12} />
            آخر تحديث: {lastUpdate}
            <button
              onClick={() => refetch()}
              className="p-1.5 hover:bg-gray-100 rounded-full transition"
              title="تحديث"
            >
              <RefreshCw size={13} className={isFetching ? "animate-spin text-[#DC9927]" : ""} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        <div ref={containerRef} className="flex-1" />

        {/* Driver info panel */}
        {selectedDriver && (
          <div className="w-72 bg-white border-l flex flex-col overflow-y-auto shadow-lg">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-bold text-sm text-gray-800">بيانات السائق</span>
              <button
                onClick={() => {
                  setSelectedDriver(null);
                  setShowRoute(false);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#DC9927] flex items-center justify-center text-white font-bold text-lg">
                  {selectedDriver.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedDriver.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      selectedDriver.is_online
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {selectedDriver.is_online ? "متاح" : "غير متاح"}
                  </span>
                </div>
              </div>

              {/* Info rows */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} />
                  <span dir="ltr">{selectedDriver.phone}</span>
                </div>
                {selectedDriver.last_updated && (
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Clock size={12} />
                    {new Date(selectedDriver.last_updated).toLocaleString("ar-EG")}
                  </div>
                )}
              </div>

              {/* Route button */}
              <button
                onClick={() => setShowRoute((prev) => !prev)}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${
                  showRoute
                    ? "bg-[#DC9927] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Route size={15} />
                {showRoute ? "إخفاء المسار" : "عرض مسار اليوم"}
              </button>

              {/* Route stats */}
              {showRoute && routeData && (
                <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-800 space-y-1">
                  <p className="font-semibold">مسار {routeData.date}</p>
                  <p>{routeData.total_records} نقطة مسجّلة</p>
                </div>
              )}
            </div>

            {/* Drivers list */}
            <div className="border-t mt-auto">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                السائقون الآخرون
              </p>
              <div className="overflow-y-auto max-h-64">
                {data?.data
                  .filter((d) => d.user_id !== selectedDriver.user_id)
                  .map((driver) => (
                    <button
                      key={driver.user_id}
                      onClick={() => {
                        setSelectedDriver(driver);
                        setShowRoute(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left transition"
                    >
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          driver.is_online ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <span className="text-sm text-gray-700 truncate">{driver.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-50">
          <div className="flex items-center gap-2 text-[#DC9927] font-medium">
            <RefreshCw size={18} className="animate-spin" />
            جاري تحميل بيانات السائقين...
          </div>
        </div>
      )}
    </div>
  );
}
