import { useState, useMemo } from 'react';
import { useParams, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Calendar, FileDown, MapPin, X, DollarSign, Route, Clock, Briefcase, TrendingUp } from 'lucide-react';
import { Formik, Form } from "formik";
import { useGetServiceBoyDetails, useGetServiceBoyAreas, useGetServiceBoyBookings, useGetServiceBoyDailyReport } from "../../../api/features/serviceBoys.hooks";
import { CustomTable } from "../../../common/CustomTable";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormDropdown } from "../../../common/FormDropdown";

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

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed", "Canceled", "Confirmed"];
const STATUS_MAP: Record<string, { label: string; className: string }> = {
    "0": { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
    "1": { label: "In Progress", className: "bg-blue-100 text-blue-800" },
    "2": { label: "Completed", className: "bg-green-100 text-green-800" },
    "3": { label: "Canceled", className: "bg-red-100 text-red-800" },
    "4": { label: "Confirmed", className: "bg-indigo-100 text-indigo-800" },
};

const ServiceBoyDetails = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('Service Boy Details');
    const [filters, setFilters] = useState({ status: "", date_from: "", date_to: "" });
    const [reportDate, setReportDate] = useState(() => new Date().toISOString().split("T")[0]);
    const pageSize = 10;

    const { data: responseData, isLoading, isError } = useGetServiceBoyDetails(id as string);
    const { data: areasResponse, isLoading: isLoadingAreas } = useGetServiceBoyAreas(id as string);
    const { data: bookingsResponse, isLoading: isLoadingBookings } = useGetServiceBoyBookings(id as string, {
        start: currentPage,
        limit: pageSize,
        ...(filters.status && { status: filters.status }),
        ...(filters.date_from && { date_from: filters.date_from }),
        ...(filters.date_to && { date_to: filters.date_to }),
    });

    const { data: dailyReportResponse, isLoading: isLoadingReport } = useGetServiceBoyDailyReport(id as string, reportDate);
    const dailyReport = dailyReportResponse?.data?.data;

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
            render: (status: number | string) => {
                const s = STATUS_MAP[String(status)] || STATUS_MAP["0"];
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${s.className}`}>
                        {s.label}
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
                            <img src={serviceBoy.image_url?.startsWith("http") ? serviceBoy.image_url : `${import.meta.env.VITE_IMAGES_URL}/${serviceBoy.image_url}`} alt="Profile" className="w-full h-full object-cover" />
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
                    {/* <div className="bg-[#F5F6F8] rounded-[24px] p-8 mt-12 w-full max-w-full overflow-hidden"> */}
                        
                        {/* Filter Bar */}
                        {/* <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 border-b border-gray-200/60 pb-8">
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
                        </div> */}

                        {/* Chart Area */}
                        {/* <div className="bg-transparent">
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
                        </div> */}

                    {/* </div> */}
                </div>
            )}
            
            {activeTab === 'Booking History' && (
                <div className="px-6">
                    <Formik
                        initialValues={{ status: "", date_from: "", date_to: "" }}
                        onSubmit={(values) => {
                            setFilters(values);
                            setCurrentPage(1);
                        }}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="flex flex-wrap items-end gap-4 mb-6">
                                    <div className="w-44">
                                        <FormDropdown
                                            name="status"
                                            label="Status"
                                            placeholder="All Statuses"
                                            options={STATUS_OPTIONS}
                                        />
                                    </div>
                                    <div className="w-44">
                                        <FormDatePicker
                                            name="date_from"
                                            label="Date From"
                                            placeholder="From date"
                                        />
                                    </div>
                                    <div className="w-44">
                                        <FormDatePicker
                                            name="date_to"
                                            label="Date To"
                                            placeholder="To date"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-black/85 transition-colors"
                                    >
                                        Filter
                                    </button>
                                    {(filters.status || filters.date_from || filters.date_to) && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                setFilters({ status: "", date_from: "", date_to: "" });
                                                setCurrentPage(1);
                                            }}
                                            className="px-4 py-3 flex items-center gap-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                                        >
                                            <X className="w-4 h-4" /> Clear
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
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

            {activeTab === 'Daily Report' && (
                <div className="px-6 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={reportDate}
                                onChange={(e) => setReportDate(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm font-medium text-gray-700"
                            />
                        </div>
                    </div>

                    {isLoadingReport ? (
                        <div className="py-10 text-center text-gray-500 font-medium">Loading report...</div>
                    ) : !dailyReport ? (
                        <div className="py-10 text-center text-gray-500 font-medium bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            No data for this date
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Completed Bookings</p>
                                        <Briefcase className="w-5 h-5 text-green-500" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{dailyReport.completed_bookings_count}</p>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Available Slots</p>
                                        <Clock className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{dailyReport.available_slots}</p>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total KM</p>
                                        <Route className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{dailyReport.total_km.toFixed(2)} km</p>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Avg KM</p>
                                        <TrendingUp className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{dailyReport.average_km.toFixed(2)} km</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                    <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-500" />
                                        Payment Breakdown
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: "Cash", key: "cash", color: "text-emerald-600" },
                                            { label: "Credit", key: "credit", color: "text-purple-600" },
                                            { label: "Package", key: "package", color: "text-amber-600" },
                                        ].map(({ label, key, color }) => {
                                            const item = (dailyReport.payment_breakdown as any)[key];
                                            return (
                                                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                                                    <span className={`text-sm font-bold ${color}`}>
                                                        {item.count} bookings &middot; EGP {item.amount.toFixed(2)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                    <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-blue-500" />
                                        Commission Summary
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                            <span className="text-sm font-semibold text-gray-700">Commissionable Bookings</span>
                                            <span className="text-sm font-bold text-blue-600">{dailyReport.commission.commissionable_bookings_count}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                            <span className="text-sm font-semibold text-gray-700">Total Commission</span>
                                            <span className="text-sm font-bold text-green-600">EGP {dailyReport.commission.total_commission.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                            <span className="text-sm font-semibold text-gray-700">First 4 No Commission</span>
                                            <span className={`text-sm font-bold ${dailyReport.commission.first_4_no_commission ? "text-red-500" : "text-gray-500"}`}>
                                                {dailyReport.commission.first_4_no_commission ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="py-2">
                                            <span className="text-xs text-gray-500 font-medium">Commission Rule:</span>
                                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{dailyReport.commission.commission_rate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {dailyReport.commission.bookings.length > 0 && (
                                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-x-auto">
                                    <h3 className="text-base font-bold text-gray-800 mb-4">Commission Per Booking</h3>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-3 text-gray-500 font-semibold text-xs uppercase">#</th>
                                                <th className="text-left py-3 px-3 text-gray-500 font-semibold text-xs uppercase">Booking ID</th>
                                                <th className="text-right py-3 px-3 text-gray-500 font-semibold text-xs uppercase">Vehicles</th>
                                                <th className="text-right py-3 px-3 text-gray-500 font-semibold text-xs uppercase">Main 20%</th>
                                                <th className="text-right py-3 px-3 text-gray-500 font-semibold text-xs uppercase">Extra 20%</th>
                                                <th className="text-right py-3 px-3 text-gray-500 font-semibold text-xs uppercase">Commission</th>
                                                <th className="text-left py-3 px-3 text-gray-500 font-semibold text-xs uppercase">Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dailyReport.commission.bookings.map((b) => (
                                                <tr key={b.booking_id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                    <td className="py-3 px-3 text-gray-700 font-medium">{b.position}</td>
                                                    <td className="py-3 px-3">
                                                        <Link to={`/bookings/manage/${b.booking_id}`} className="text-primary hover:underline font-medium">
                                                            #{b.booking_id}
                                                        </Link>
                                                    </td>
                                                    <td className="py-3 px-3 text-right text-gray-700">{b.vehicle_count}</td>
                                                    <td className="py-3 px-3 text-right text-gray-700">EGP {b["main_service_20%"].toFixed(2)}</td>
                                                    <td className="py-3 px-3 text-right text-gray-700">EGP {b["extra_service_20%"].toFixed(2)}</td>
                                                    <td className="py-3 px-3 text-right font-bold text-green-600">EGP {b.commission.toFixed(2)}</td>
                                                    <td className="py-3 px-3 text-xs text-gray-400">{b.note || "—"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ServiceBoyDetails;