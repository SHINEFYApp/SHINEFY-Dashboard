import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Calendar, FileDown, MapPin } from 'lucide-react';
import { useGetServiceBoyDetails, useGetServiceBoyAreas, useGetServiceBoyBookings } from "../../../api/features/serviceBoys.hooks";
import { CustomTable } from "../../../common/CustomTable";
import { useMemo } from 'react';

const chartData = [
  { name: 'Fri', uv: 60, color: '#FF6B4A' },
  { name: 'Sat', uv: 80, color: '#FFC107' },
  { name: 'Sun', uv: 40, color: '#FF6B4A' },
  { name: 'Mon', uv: 68, color: '#FFC107' },
  { name: 'Tue', uv: 60, color: '#FF6B4A' },
  { name: 'Wed', uv: 25, color: '#FFC107' },
  { name: 'Thu', uv: 60, color: '#FF6B4A' },
  { name: 'Fri', uv: 60, color: '#FF6B4A' },
  { name: 'Sat', uv: 80, color: '#FFC107' },
  { name: 'Sun', uv: 40, color: '#FF6B4A' },
  { name: 'Mon', uv: 68, color: '#FFC107' },
  { name: 'Tue', uv: 60, color: '#FF6B4A' },
  { name: 'Wed', uv: 25, color: '#FFC107' },
  { name: 'Thu', uv: 60, color: '#FF6B4A' },
  { name: 'Fri', uv: 60, color: '#FF6B4A' },
  { name: 'Sat', uv: 80, color: '#FFC107' },
  { name: 'Sun', uv: 40, color: '#FF6B4A' },
  { name: 'Mon', uv: 68, color: '#FFC107' },
  { name: 'Tue', uv: 60, color: '#FF6B4A' },
  { name: 'Wed', uv: 25, color: '#FFC107' },
  { name: 'Thu', uv: 60, color: '#FF6B4A' },
  { name: 'Fri', uv: 60, color: '#FF6B4A' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1C1E] text-white px-3 py-1.5 rounded text-sm font-bold shadow-lg">
        {payload[0].value}
      </div>
    );
  }
  return null;
};

const ServiceBoyDetails = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('Service Boy Details');
    const pageSize = 10;

    const { data: responseData, isLoading, isError } = useGetServiceBoyDetails(id as string);
    const { data: areasResponse, isLoading: isLoadingAreas } = useGetServiceBoyAreas(id as string);
    const { data: bookingsResponse, isLoading: isLoadingBookings } = useGetServiceBoyBookings(id as string, {
        page: currentPage,
        limit: pageSize,
    });

    const tabs = ['Service Boy Details', 'Booking History', 'My Area', 'Daily Report'];
    const serviceBoy = responseData?.data?.data || responseData?.data;
    
    const bookings = bookingsResponse?.data?.data?.data || [];
    const pagination = bookingsResponse?.data?.data?.pagination;
    const totalEntries = pagination?.total || 0;
    const totalPages = pagination?.last_page || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const bookingColumns = useMemo(() => [
        { key: "booking_no", title: "Booking Number" },
        { key: "customer_name", title: "Customer Name" },
        { key: "service_name", title: "Service Name" },
        { key: "total_price", title: "Total Amount(EGP)" },
        { key: "booking_date", title: "Booking Date" },
        { key: "booking_time", title: "Booking Time" },
        {
            key: "status",
            title: "Status",
            render: (status: number) => {
                const statusStyles: Record<number, string> = {
                    0: "bg-blue-100 text-blue-800",
                    1: "bg-green-100 text-green-800",
                    2: "bg-red-100 text-red-800",
                };
                const statusLabels: Record<number, string> = {
                    0: "Pending",
                    1: "Completed",
                    2: "Cancelled",
                };
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
                        {statusLabels[status] || "Unknown"}
                    </span>
                );
            }
        },
        { 
            key: "action", 
            title: "Action", 
            render: (_: any, record: any) => (
                <Link 
                    to={`/bookings/manage/${record.booking_id}`}
                    className="text-primary hover:underline font-bold text-sm"
                >
                    View Details
                </Link>
            )
        },
    ], []);

    const availableDays = serviceBoy?.available_days || ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday'];

    if (isLoading) return <div className="p-10 text-center font-bold">Loading records...</div>;
    if (isError) return <div className="p-10 text-center font-bold text-red-500">Failed to load details.</div>;

    const workingHours = serviceBoy && serviceBoy.start_hour && serviceBoy.end_hour 
        ? `${serviceBoy.start_hour} / ${serviceBoy.end_hour}`
        : '12:00:00 AM / 11:59:00 PM';

    return (
        <div className="w-full min-h-screen bg-white rounded-xl pb-10">
            {/* Header Card */}
            <div className="bg-[#1C1C1E] rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 shadow-md">
                <div className="flex items-center gap-5">
                    <div className="w-[84px] h-[84px] bg-white rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        {serviceBoy?.image_url ? (
                            <img src={serviceBoy.image_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : null}
                    </div>
                    <div className="pt-1">
                        <h1 className="text-white text-[20px] font-bold tracking-wide mb-1">{serviceBoy?.name || "Loading..."}</h1>
                        <p className="text-white text-[16px] font-semibold tracking-wider">{serviceBoy?.phone_number_display || "+000 000 0000 00"}</p>
                    </div>
                </div>
                <Link 
                    to={`/users&staff/manage/serviceBoy/track/${id}`}
                    className="mt-4 sm:mt-0 bg-[#FFC107] text-black text-[14px] font-bold px-6 py-2.5 rounded-md hover:bg-yellow-500 transition-colors"
                >
                    Track Service Boy
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-x-8 border-b-2 border-gray-100 mb-8 pt-1 overflow-x-auto px-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-[16px] font-bold transition-all relative whitespace-nowrap ${
                            activeTab === tab 
                            ? 'text-gray-900 border-b-[3px] border-[#FFC107] -mb-[2px]' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'Service Boy Details' && (
                <div className="px-6 space-y-12">
                    {/* Info Section */}
                    <div className="grid grid-cols-[160px_1fr] gap-y-[18px] text-[15px]">
                        <div className="text-[#848484] font-bold self-center">Name :</div>
                        <div>
                            <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">{serviceBoy?.name || "-"}</span>
                        </div>

                        <div className="text-[#848484] font-bold self-center">Contact :</div>
                        <div>
                            <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">{serviceBoy?.phone_number_display || "-"}</span>
                        </div>

                        <div className="text-[#848484] font-bold self-center">Registration On :</div>
                        <div>
                            <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">{serviceBoy?.registered_at || "-"}</span>
                        </div>

                        <div className="text-[#848484] font-bold self-center">Status :</div>
                        <div>
                            <span className="bg-[#4CAF50] text-white px-4 py-1.5 rounded font-bold inline-block text-[13px] tracking-wide">{serviceBoy?.status || "Activated"}</span>
                        </div>

                        <div className="text-[#848484] font-bold self-center">Work Status :</div>
                        <div>
                            <span className="bg-[#4CAF50] text-white px-5 py-1.5 rounded font-bold inline-block text-[13px] tracking-wide">Free</span>
                        </div>

                        <div className="text-[#848484] font-bold self-center pt-1">Available Days :</div>
                        <div className="flex flex-wrap gap-2">
                            {availableDays.map((day: string) => (
                                <span key={day} className="bg-[#F8F9FA] border border-[#E9ECEF] text-gray-800 px-3 py-1.5 rounded text-[14px] font-semibold">
                                    {day}
                                </span>
                            ))}
                        </div>

                        <div className="text-[#848484] font-bold self-center">Working Hours :</div>
                        <div>
                            <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">{workingHours}</span>
                        </div>
                    </div>

                    {/* Chart & Booking Section Container */}
                    <div className="bg-[#F5F6F8] rounded-[24px] p-8 mt-12 w-full max-w-full overflow-hidden">
                        
                        {/* Filter Bar */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 border-b border-gray-200/60 pb-8">
                            <h2 className="text-[19px] font-extrabold text-[#1C1C1E]">Service Boy Booking</h2>
                            
                            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 space-x-2 shadow-sm flex-1 lg:flex-none">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="Start Date" className="bg-transparent border-none outline-none text-[14px] w-24 text-gray-600 font-medium placeholder-gray-400" />
                                </div>
                                <div className="flex items-center bg-[#F3F4F6] border border-gray-200 rounded-lg px-3 py-2 space-x-2 flex-1 lg:flex-none">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="End Date" className="bg-transparent border-none outline-none text-[14px] w-24 text-gray-600 font-medium placeholder-gray-400" />
                                </div>
                                <button className="bg-[#FFC107] text-black font-bold px-7 py-2.5 rounded-lg hover:bg-yellow-500 transition-colors text-[14px] shadow-sm">
                                    Search
                                </button>
                                
                                <div className="hidden lg:block w-4"></div>
                                
                                <button className="flex justify-center items-center gap-2 bg-white border border-gray-200 shadow-sm text-gray-900 font-bold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-[13px] flex-1 lg:flex-none">
                                    <FileDown className="w-4 h-4 text-[#4CAF50]" />
                                    Export Count
                                </button>
                                <button className="flex justify-center items-center gap-2 bg-white border border-gray-200 shadow-sm text-gray-900 font-bold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-[13px] flex-1 lg:flex-none">
                                    <FileDown className="w-4 h-4 text-[#4CAF50]" />
                                    Export Details
                                </button>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-transparent">
                            <h3 className="text-[18px] font-extrabold text-[#1C1C1E] mb-6 pt-1">Completed Bookings</h3>
                            
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={chartData}
                                        margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                                        barSize={10}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={{ stroke: '#D1D5DB', strokeWidth: 4 }}
                                            tickLine={false} 
                                            tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 500 }}
                                            dy={15}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 500 }}
                                            tickCount={5}
                                            domain={[0, 80]}
                                        />
                                        <Tooltip 
                                            content={<CustomTooltip />} 
                                            cursor={{fill: 'transparent'}}
                                            isAnimationActive={false}
                                        />
                                        <Bar dataKey="uv" radius={[4, 4, 4, 4]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            
            {activeTab === 'Booking History' && (
                <div className="px-6">
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        <CustomTable
                            columns={bookingColumns}
                            data={bookings}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            isLoading={isLoadingBookings}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'My Area' && (
                <div className="px-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Assigned Areas</h2>
                    {isLoadingAreas ? (
                        <div className="py-10 text-center text-gray-500 font-medium">Loading areas...</div>
                    ) : areasResponse?.data?.data?.areas?.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {areasResponse.data.data.areas.map((area: any) => (
                                <div key={area.area_id} className="bg-[#F8F9FA] border border-[#E9ECEF] p-4 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-[#FFC107]/10 rounded-lg flex items-center justify-center text-[#FFC107]">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Area ID: {area.area_id}</p>
                                        <p className="text-gray-800 font-bold">{area.area_name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-10 text-center text-gray-500 font-medium bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            No areas assigned to this service boy.
                        </div>
                    )}
                </div>
            )}

            {activeTab !== 'Service Boy Details' && activeTab !== 'My Area' && (
                <div className="py-20 text-center text-gray-500 font-medium">
                    Content for {activeTab}
                </div>
            )}
        </div>
    );
};

export default ServiceBoyDetails;