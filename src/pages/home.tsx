import { useDashboardStatistics, useRecentBookings, useRevenueChart } from "../api/features/home.hooks";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "../components/ui/skeleton";
import { cn } from "../utils/utils";

// Color Palette from Design System
const CARD_COLORS = [
    { bg: "bg-primary-50", border: "border-primary-200", text: "text-primary-700", accent: "#ffc107" },
    { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", accent: "#3b82f6" },
    { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", accent: "#ef4444" },
    { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", accent: "#22c55e" },
    { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", accent: "#a855f7" },
    { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", accent: "#f97316" },
    { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", accent: "#14b8a6" },
];

const StatCard = ({ title, value, isLoading, index = 0 }: { title: string; value: string | number; isLoading: boolean; index?: number }) => {
    const color = CARD_COLORS[index % CARD_COLORS.length];
    return (
        <div className={cn("rounded-2xl shadow-md border p-5 transition-all hover:shadow-lg animate-fade-in", color.bg, color.border)}>
            <div className="flex justify-between items-center mb-3">
                <p className={cn("text-sm font-medium", color.text)}>{title}</p>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color.accent }} />
            </div>
            {isLoading ? (
                <Skeleton className="h-8 w-24" />
            ) : (
                <p className="text-3xl font-bold text-secondary-900">{value}</p>
            )}
        </div>
    );
};

const STATUS_MAP: Record<string, { label: string; className: string }> = {
    "0": { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
    "1": { label: "In Progress", className: "bg-blue-100 text-blue-800" },
    "2": { label: "Completed", className: "bg-green-100 text-green-800" },
    "3": { label: "Canceled", className: "bg-red-100 text-red-800" },
    "4": { label: "Confirmed", className: "bg-indigo-100 text-indigo-800" },
};

const getStatusBadge = (status: number | string) => {
    const s = STATUS_MAP[String(status)] || STATUS_MAP["0"];
    return <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", s.className)}>{s.label}</span>;
};

const DashboardHome = () => {
    const { data: statsData, isLoading: statsLoading } = useDashboardStatistics();
    const { data: recentBookings, isLoading: bookingsLoading } = useRecentBookings(10);
    const { data: revenueData, isLoading: revenueLoading } = useRevenueChart('weekly');

    const stats = statsData?.data?.data;
    const chartData = revenueData?.data?.data?.data || [];

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-8 py-6 rounded-2xl space-y-8 animate-slide-up">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
                    <p className="text-secondary-500 mt-1">Welcome back, here's what's happening today.</p>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Waiting Bookings" value={stats?.waiting_bookings ?? 0} isLoading={statsLoading} index={0} />
                <StatCard title="Total Bookings" value={stats?.total_bookings_today ?? 0} isLoading={statsLoading} index={1} />
                <StatCard title="Cancelled Today" value={stats?.cancelled_bookings_today ?? 0} isLoading={statsLoading} index={2} />
                <StatCard title="Total Revenue" value={`EGP ${stats?.total_revenue ?? 0}`} isLoading={statsLoading} index={3} />
                <StatCard title="Package Subscriptions" value={stats?.package_subscriptions_today ?? 0} isLoading={statsLoading} index={4} />
                <StatCard title="Active Service Boys" value={stats?.active_service_boys ?? 0} isLoading={statsLoading} index={5} />
                {/* <StatCard title="Pending Slots" value={stats?.pending_slots_today ?? 0} isLoading={statsLoading} index={6} /> */}
            </div>

            {/* Recent Bookings & Chart */}
            <div className="grid gap-8 lg:grid-cols-5">
                {/* Recent Bookings Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border p-6">
                    <h2 className="text-xl font-semibold text-secondary-900 mb-4">Recent Bookings</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-secondary-500">
                                    <th className="p-3 font-medium">Booking</th>
                                    <th className="p-3 font-medium">Customer</th>
                                    <th className="p-3 font-medium">Price</th>
                                    <th className="p-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingsLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-3"><Skeleton className="h-4 w-20" /></td>
                                            <td className="p-3"><Skeleton className="h-4 w-24" /></td>
                                            <td className="p-3"><Skeleton className="h-4 w-16" /></td>
                                            <td className="p-3"><Skeleton className="h-6 w-16 rounded-full" /></td>
                                        </tr>
                                    ))
                                ) : (
                                    recentBookings?.data?.data?.map((booking: any) => (
                                        <tr key={booking.booking_id} className="border-b hover:bg-secondary-50 transition-colors">
                                            <td className="p-3 font-medium text-secondary-900">{booking.booking_no}</td>
                                            <td className="p-3 text-secondary-600">{booking.customer_name}</td>
                                            <td className="p-3 text-secondary-900 font-semibold">EGP {booking.total_price}</td>
                                            <td className="p-3">{getStatusBadge(booking.status)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-md border p-6">
                    <h2 className="text-xl font-semibold text-secondary-900 mb-4">Revenue Overview</h2>
                    <div className="h-[300px] w-full">
                        {revenueLoading ? (
                            <Skeleton className="h-full w-full rounded-xl" />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#ffc107" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardHome;
