import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetServiceBoyTrack } from "../../../api/features/serviceBoys.hooks";
import MapView from "../../../common/MapView";
import { ChevronLeft, Phone, MapPin, AlertCircle, Clock, Navigation } from "lucide-react";

const TrackServiceBoy = () => {
    const { id } = useParams();
    const [address, setAddress] = useState<string>("Fetching address...");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { data: response, isLoading, isError } = useGetServiceBoyTrack(id as string, {
        refetchInterval: 10000,
    });

    const trackData = response?.data?.data;
    const coordinates = trackData?.coordinates || [];
    const selectedCoord = coordinates[selectedIndex] || null;

    const lat = selectedCoord ? parseFloat(selectedCoord.latitude) : null;
    const lng = selectedCoord ? parseFloat(selectedCoord.longitude) : null;
    const hasCoordinates = lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng);

    // Reverse geocode the selected coordinate
    useEffect(() => {
        if (hasCoordinates) {
            setAddress("Fetching address...");
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
                .then(res => res.json())
                .then(data => {
                    setAddress(data.display_name || "Address not found");
                })
                .catch(() => {
                    setAddress("Failed to fetch address");
                });
        } else {
            setAddress("No location data");
        }
    }, [lat, lng, hasCoordinates]);

    if (isLoading) return <div className="p-10 text-center font-bold">Loading tracking data...</div>;
    if (isError) return <div className="p-10 text-center font-bold text-red-500">Failed to load tracking data.</div>;
    if (!trackData) return <div className="p-10 text-center font-bold">No tracking data available.</div>;

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    return (
        <div className="w-full min-h-screen bg-white rounded-xl pb-10 px-4 md:px-6 py-4">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    to="/users&staff/manage/serviceBoy"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Track Service Boy</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Details + Location History */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Service Boy Info Card */}
                    <div className="bg-[#1C1C1E] rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#FFC107] to-[#FF9800] rounded-xl flex items-center justify-center text-black font-bold text-xl shadow-md">
                                {trackData.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{trackData.name}</h2>
                                <p className="text-gray-400 text-sm">ID: {trackData.user_id}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Phone size={18} className="text-[#FFC107]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Phone Number</p>
                                    <p className="font-semibold">{trackData.phone_number}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/10 rounded-lg shrink-0">
                                    <MapPin size={18} className="text-[#FFC107]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Current Address</p>
                                    <p className="font-medium text-sm leading-relaxed">{address}</p>
                                </div>
                            </div>

                            {hasCoordinates && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Navigation size={18} className="text-[#FFC107]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Coordinates</p>
                                        <p className="font-mono text-sm">{lat!.toFixed(6)}, {lng!.toFixed(6)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Location History List */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Clock size={18} className="text-gray-500" />
                                Location History
                            </h3>
                            <span className="text-xs font-medium text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">
                                {coordinates.length} records
                            </span>
                        </div>

                        {coordinates.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-6">No location history available.</p>
                        ) : (
                            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
                                {coordinates.map((coord, index) => {
                                    const isSelected = index === selectedIndex;
                                    const coordLat = parseFloat(coord.latitude);
                                    const coordLng = parseFloat(coord.longitude);

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setSelectedIndex(index)}
                                            className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 border ${
                                                isSelected
                                                    ? "bg-[#1C1C1E] text-white border-[#FFC107] shadow-md"
                                                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                                                    isSelected
                                                        ? "bg-[#FFC107] text-black"
                                                        : "bg-gray-100 text-gray-500"
                                                }`}>
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`font-mono text-xs ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                                                        {!isNaN(coordLat) ? coordLat.toFixed(6) : "N/A"}, {!isNaN(coordLng) ? coordLng.toFixed(6) : "N/A"}
                                                    </p>
                                                    <p className={`text-xs mt-1 flex items-center gap-1 ${isSelected ? "text-[#FFC107]" : "text-gray-400"}`}>
                                                        <Clock size={12} />
                                                        {formatDate(coord.created_at)}
                                                    </p>
                                                </div>
                                                {isSelected && (
                                                    <div className="w-2 h-2 rounded-full bg-[#FFC107] mt-1.5 animate-pulse shrink-0" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Map */}
                <div className="lg:col-span-2 relative">
                    <div className="sticky top-6 h-[700px] w-full bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center">
                        {hasCoordinates ? (
                            <>
                                <MapView lat={lat!} lng={lng!} />
                                {/* Overlay for coordinates */}
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-md border border-gray-200 z-[1000] text-xs font-bold text-gray-700 flex gap-4">
                                    <span>LAT: {lat!.toFixed(6)}</span>
                                    <span>LNG: {lng!.toFixed(6)}</span>
                                    {selectedCoord && (
                                        <span className="text-gray-400">
                                            {formatDate(selectedCoord.created_at)}
                                        </span>
                                    )}
                                </div>

                                {/* Selected location indicator */}
                                <div className="absolute top-4 left-4 bg-[#1C1C1E]/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md z-[1000] text-white text-xs font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" />
                                    Location {selectedIndex + 1} of {coordinates.length}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-4 text-gray-400">
                                <AlertCircle size={64} strokeWidth={1} />
                                <p className="text-lg font-medium">No location data available for this service boy.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackServiceBoy;
