import { useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { Calendar, Download, Search, Users, BookOpen, Star, CheckCircle } from "lucide-react";
import { FormDateRangePicker } from "../../../common/FormDateRangePicker";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormInput } from "../../../common/FormInput";
import { CustomTable } from "../../../common/CustomTable";
import { TableLoading } from "../../../common/loader";
import { useGet } from "../../../api/useGetData";
import { getUserBookingsReport, exportUserBookingsReport, getSubareas } from "../../../api/features/bookings";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "../../../components/ui/skeleton";
import { useTranslation } from "react-i18next";

const CARD_COLORS = [
    { bg: "bg-primary-50", border: "border-primary-200", text: "text-primary-700", accent: "#ffc107" },
    { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", accent: "#3b82f6" },
    { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", accent: "#22c55e" },
    { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", accent: "#a855f7" },
];

const StatCard = ({ title, value, icon, isLoading, index = 0 }: { title: string; value: string | number; icon: React.ReactNode; isLoading: boolean; index?: number }) => {
    const color = CARD_COLORS[index % CARD_COLORS.length];
    return (
        <div className={`rounded-2xl shadow-md border p-5 transition-all hover:shadow-lg ${color.bg} ${color.border}`}>
            <div className="flex justify-between items-center mb-3">
                <p className={`text-sm font-medium ${color.text}`}>{title}</p>
                <div className={`text-${color.accent}`}>{icon}</div>
            </div>
            {isLoading ? (
                <Skeleton className="h-8 w-24" />
            ) : (
                <p className="text-3xl font-bold text-secondary-900">{value}</p>
            )}
        </div>
    );
};

const BASE_URL = import.meta.env.VITE_API_URL;

export default function BookingReports() {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [queryParams, setQueryParams] = useState<any>(null);

    const STATUS_OPTIONS = [
        { label: t("bookings.bookingReports.statusOptions.all"), value: "" },
        { label: t("bookings.bookingReports.statusOptions.pending"), value: "0" },
        { label: t("bookings.bookingReports.statusOptions.inProgress"), value: "1" },
        { label: t("bookings.bookingReports.statusOptions.completed"), value: "2" },
        { label: t("bookings.bookingReports.statusOptions.cancelled"), value: "3" },
    ];

    const OPERATOR_OPTIONS = [
        { label: t("bookings.bookingReports.operatorOptions.equalTo"), value: "eq" },
        { label: t("bookings.bookingReports.operatorOptions.greaterThan"), value: "gt" },
        { label: t("bookings.bookingReports.operatorOptions.lessThan"), value: "lt" },
        { label: t("bookings.bookingReports.operatorOptions.greaterThanOrEqual"), value: "gte" },
        { label: t("bookings.bookingReports.operatorOptions.lessThanOrEqual"), value: "lte" },
    ];

    const columns = [
        { key: "user_id", title: t("bookings.bookingReports.columns.userId") },
        { key: "name", title: t("bookings.bookingReports.columns.name") },
        { key: "email", title: t("bookings.bookingReports.columns.email") },
        { key: "phone_number", title: t("bookings.bookingReports.columns.phone") },
        { key: "createtime", title: t("bookings.bookingReports.columns.registered") },
        { key: "total_bookings", title: t("bookings.bookingReports.columns.totalBookings") },
        { key: "completed_bookings", title: t("bookings.bookingReports.columns.completed") },
        { key: "cancelled_bookings", title: t("bookings.bookingReports.columns.cancelled") },
        { key: "other_bookings", title: t("bookings.bookingReports.columns.other") },
        { key: "avg_rating", title: t("bookings.bookingReports.columns.avgRating") },
    ];

    const { data: subareasData } = useGet({
        queryFn: () => getSubareas(`${BASE_URL}/api/reports/subareas`),
        queryKey: ["reports", "subareas"],
        options: { staleTime: 1000 * 60 * 5 },
    });

    const subareas = Array.isArray(subareasData?.data) ? subareasData?.data : (subareasData?.data?.subareas || []);
    const areaOptions = [
        { label: t("bookings.bookingReports.allAreas"), value: "" },
        ...subareas.map((a: any) => ({
            label: a.name || a.area_name || String(a.id),
            value: String(a.id),
        })),
    ];

    const apiParams = queryParams
        ? {
            page: currentPage,
            from_date: queryParams.from_date,
            to_date: queryParams.to_date,
            status: queryParams.status || undefined,
            rating: queryParams.rating || undefined,
            booking_operator: queryParams.booking_operator || undefined,
            booking_quantity: queryParams.booking_quantity || undefined,
            area_id: queryParams.area_id || undefined,
            per_page: 20,
        }
        : null;

    const { data: response, isLoading } = useGet({
        queryFn: apiParams ? () => getUserBookingsReport(`${BASE_URL}/api/reports/user-bookings`, apiParams) : () => Promise.resolve(null),
        queryKey: apiParams ? ["reports", "user-bookings", currentPage, ...Object.values(apiParams)] : ["reports", "user-bookings", "idle"],
        options: { enabled: !!apiParams, staleTime: 1000 * 10 },
    });

    const reportData = response?.data?.report || [];
    const pagination = response?.data?.pagination;
    const totalItems = pagination?.total ?? 0;
    const totalPages = pagination?.last_page ?? 1;

    const totalUsers = reportData.length;
    const totalBookings = reportData.reduce((sum: number, r: any) => sum + Number(r.total_bookings || 0), 0);
    const totalCompleted = reportData.reduce((sum: number, r: any) => sum + Number(r.completed_bookings || 0), 0);
    const avgRating = totalUsers > 0
        ? (reportData.reduce((sum: number, r: any) => sum + Number(r.avg_rating || 0), 0) / totalUsers).toFixed(2)
        : "0.00";

    const chartData = useMemo(() => {
        const distribution: Record<string, number> = {};
        reportData.forEach((r: any) => {
            const count = String(r.total_bookings);
            distribution[count] = (distribution[count] || 0) + 1;
        });
        return Object.entries(distribution)
            .map(([bookings, users]) => ({ label: `${bookings} Bookings`, value: users }))
            .sort((a, b) => Number(a.label) - Number(b.label));
    }, [reportData]);

    const handleSearch = (values: any) => {
        setQueryParams({
            from_date: values.from_date,
            to_date: values.to_date,
            status: values.status,
            rating: values.rating,
            booking_operator: values.booking_operator,
            booking_quantity: values.booking_quantity,
            area_id: values.area_id,
        });
        setCurrentPage(1);
    };

    const handleReset = () => {
        setQueryParams(null);
        setCurrentPage(1);
    };

    const handleExport = async () => {
        if (!queryParams?.from_date || !queryParams?.to_date) {
            toast.error(t("bookings.bookingReports.pleaseSelectDateRange"));
            return;
        }
        try {
            const exportRoute = `${BASE_URL}/api/reports/user-bookings/export/excel`;
            const exportParams = {
                from_date: queryParams.from_date,
                to_date: queryParams.to_date,
                status: queryParams.status || undefined,
                rating: queryParams.rating || undefined,
                booking_operator: queryParams.booking_operator || undefined,
                booking_quantity: queryParams.booking_quantity || undefined,
                area_id: queryParams.area_id || undefined,
            };
            const blob = await exportUserBookingsReport(exportRoute, exportParams);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "user-bookings-report.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch {
            toast.error(t("bookings.bookingReports.exportFailed"));
        }
    };

    return (
        <main className="space-y-6">
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <Formik
                        initialValues={{
                            from_date: "",
                            to_date: "",
                            status: "",
                            rating: "",
                            booking_operator: "",
                            booking_quantity: "",
                            area_id: "",
                        }}
                        onSubmit={handleSearch}
                        enableReinitialize
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex flex-col gap-4 flex-1">
                                        <div className="flex flex-col min-w-[140px]">
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">{t("bookings.bookingReports.title")}</h1>
                                            <p className="text-xs md:text-sm text-secondary-500">{t("bookings.bookingReports.subtitle")}</p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="w-56">
                                                <FormDateRangePicker fromName="from_date" toName="to_date" placeholder={t("bookings.bookingReports.selectDateRange")} icon={<Calendar className="w-5 h-5" />} />
                                            </div>

                                            <div className="w-36">
                                                <FormDropdown name="status" label="" placeholder={t("bookings.bookingReports.status")} options={STATUS_OPTIONS} />
                                            </div>

                                            <div className="w-28">
                                                <FormInput name="rating" placeholder={t("bookings.bookingReports.minRating")} label="" checkmark={false} />
                                            </div>

                                            <div className="w-36">
                                                <FormDropdown name="booking_operator" label="" placeholder={t("bookings.bookingReports.operator")} options={OPERATOR_OPTIONS} />
                                            </div>

                                            <div className="w-28">
                                                <FormInput name="booking_quantity" placeholder={t("bookings.bookingReports.quantity")} label="" checkmark={false} />
                                            </div>

                                            <div className="w-44">
                                                <FormDropdown name="area_id" label="" placeholder={t("bookings.bookingReports.area")} options={areaOptions} />
                                            </div>

                                            <button type="submit" className="px-6 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm whitespace-nowrap">
                                                <Search className="w-5 h-5 inline-block mr-1" />
                                                {t("bookings.bookingReports.search")}
                                            </button>
                                            <button type="reset" onClick={handleReset} className="px-6 py-3 text-primary rounded-lg bg-secondary-900 font-semibold transition-all hover:bg-secondary-900/90 shadow-sm whitespace-nowrap">
                                                {t("bookings.bookingReports.reset")}
                                            </button>
                                        </div>
                                    </div>

                                    <button type="button" onClick={handleExport} className="flex items-center gap-2 px-6 py-3 bg-[#1B8354] text-white rounded-lg font-semibold transition-all hover:bg-[#156944] shadow-sm whitespace-nowrap self-start">
                                        <Download className="w-4 h-4" />
                                        {t("bookings.bookingReports.exportExcel")}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {!queryParams ? (
                    <div className="text-center py-16 text-gray-400 text-sm">
                        {t("bookings.bookingReports.noData")}
                    </div>
                ) : isLoading ? (
                    <TableLoading />
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                            <StatCard title={t("bookings.bookingReports.stats.totalUsers")} value={totalUsers} icon={<Users className="w-5 h-5" />} isLoading={false} index={0} />
                            <StatCard title={t("bookings.bookingReports.stats.totalBookings")} value={totalBookings} icon={<BookOpen className="w-5 h-5" />} isLoading={false} index={1} />
                            <StatCard title={t("bookings.bookingReports.stats.completed")} value={totalCompleted} icon={<CheckCircle className="w-5 h-5" />} isLoading={false} index={2} />
                            <StatCard title={t("bookings.bookingReports.stats.avgRating")} value={avgRating} icon={<Star className="w-5 h-5" />} isLoading={false} index={3} />
                        </div>

                        <div className="grid gap-8 lg:grid-cols-5 mb-6">
                            <div className="lg:col-span-5 bg-white rounded-2xl shadow-md border p-6">
                                <h2 className="text-xl font-semibold text-secondary-900 mb-4">{t("bookings.bookingReports.chartTitle")}</h2>
                                <div className="h-[300px] w-full">
                                    {chartData.length === 0 ? (
                                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">{t("bookings.bookingReports.noChartData")}</div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                                                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#ffc107" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>
                        </div>

                        <CustomTable
                            columns={columns}
                            data={reportData}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalItems}
                            pageSize={20}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </main>
    );
}
