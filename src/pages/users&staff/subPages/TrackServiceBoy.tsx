import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetServiceBoyTrack } from "../../../api/features/serviceBoys.hooks";
import MapView from "../../../common/MapView";
import { ChevronLeft, Phone, Calendar, MapPin, AlertCircle } from "lucide-react";

const TrackServiceBoy = () => {
    const { id } = useParams();
    const [address, setAddress] = useState<string>("Fetching address...");
    const { data: response, isLoading, isError } = useGetServiceBoyTrack(id as string, {
        refetchInterval: 10000, // Refetch every 10 seconds for real-time tracking
    });

    const trackData = response?.data?.data;
    const latStr = trackData?.latitude;
    const lngStr = trackData?.longitude;
    const lat = latStr ? parseFloat(latStr) : null;
    const lng = lngStr ? parseFloat(lngStr) : null;
    const hasCoordinates = lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng);

    useEffect(() => {
        if (hasCoordinates) {
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
                {/* Left Column: Details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1C1C1E] rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-black font-bold text-xl overflow-hidden">
                                {trackData.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{trackData.name}</h2>
                                <p className="text-gray-400 text-sm">Service Boy ID: {trackData.user_id}</p>
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

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Calendar size={18} className="text-[#FFC107]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Last Updated</p>
                                    <p className="font-semibold">{trackData.created_at}</p>
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
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Location Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">Latitude:</span>
                                <span className="font-mono text-gray-700">{latStr || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">Longitude:</span>
                                <span className="font-mono text-gray-700">{lngStr || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Map */}
                <div className="lg:col-span-2 relative">
                    <div className="sticky top-6 h-[600px] w-full bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center">
                        {hasCoordinates ? (
                            <>
                                <MapView lat={lat!} lng={lng!} />
                                {/* Overlay for coordinates */}
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-gray-200 z-1000 text-xs font-bold text-gray-700 flex gap-4">
                                     <span>LAT: {lat!.toFixed(6)}</span>
                                     <span>LNG: {lng!.toFixed(6)}</span>
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
