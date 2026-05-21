import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { Search, ChevronDown, ChevronUp, User, Phone, CalendarDays } from "lucide-react";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { useState, useEffect } from "react";
import { CustomTable } from "../../../common/CustomTable";
import { useGet } from "../../../api/useGetData";
import { getServiceBoysWithBookings } from "../../../api/features/serviceBoys";
import { TableLoading } from "../../../common/loader";
import { useSearchParams } from "react-router";
import { cn } from "../../../utils/utils";
import { useTranslation } from "react-i18next";

function formatDate(dateStr: string) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
    "0": { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    "1": { label: "In Progress", color: "bg-blue-100 text-blue-800" },
    "2": { label: "Completed", color: "bg-green-100 text-green-800" },
    "3": { label: "Canceled", color: "bg-red-100 text-red-800" },
    "4": { label: "Confirmed", color: "bg-indigo-100 text-indigo-800" },
};

const BOOKING_TYPE_MAP: Record<number, { label: string; color: string }> = {
    0: { label: "Suchdegle", color: "bg-purple-100 text-purple-800" },
    1: { label: "Waiting", color: "bg-orange-100 text-orange-800" },
};

function todayString() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

export default function ServiceBoysWithBookings() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentPage, setCurrentPage] = useState(() => Number(searchParams.get("page")) || 1);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [bookingDate, setBookingDate] = useState(searchParams.get("booking_date") || todayString());
    const [limit] = useState(20);

    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams();
        if (search) urlParams.set("search", search);
        if (bookingDate) urlParams.set("booking_date", bookingDate);
        if (currentPage > 1) urlParams.set("page", String(currentPage));
        setSearchParams(urlParams, { replace: true });
    }, [search, bookingDate, currentPage, setSearchParams]);

    const baseURL = import.meta.env.VITE_API_URL;
    const route = `${baseURL}/api/dashboard/service-boys-with-bookings`;

    const params = {
        page: currentPage,
        limit,
        booking_date: bookingDate || undefined,
        search: search || undefined,
    };

    const { data, isLoading } = useGet({
        queryFn: () => getServiceBoysWithBookings(params),
        queryKey: ["service-boys-with-bookings", currentPage, search, bookingDate],
        options: { staleTime: 1000 * 10 },
    });

    const serviceBoys = data?.data?.data?.service_boys || [];
    const pagination = data?.data?.data?.pagination;
    const totalItems = pagination?.total_items ?? 0;
    const totalPages = pagination?.total_pages ?? 1;

    const toggleExpand = (userId: number) => {
        setExpandedId(expandedId === userId ? null : userId);
    };

    const bookingColumns = [
        { key: "booking_no", title: t("bookings.manageBooking.columns.bookingNo") },
        { key: "customer_name", title: t("bookings.manageBooking.columns.customer") },
        {
            key: "booking_date",
            title: t("bookings.manageBooking.columns.bookingDate"),
            render: (value: string) => (
                <span className="text-gray-700 font-medium text-xs whitespace-nowrap">
                    {formatDate(value)}
                </span>
            ),
        },
        {
            key: "status",
            title: t("bookings.manageBooking.columns.status"),
            render: (value: string) => {
                const status = STATUS_MAP[value];
                if (!status) return <span className="text-gray-500">—</span>;
                return (
                    <span className={cn("inline-block px-2.5 py-1 rounded-full text-xs font-semibold", status.color)}>
                        {status.label}
                    </span>
                );
            },
        },
        {
            key: "booking_type",
            title: t("bookings.manageBooking.columns.type"),
            render: (value: number) => {
                const bt = BOOKING_TYPE_MAP[value];
                if (!bt) return <span className="text-gray-500">—</span>;
                return (
                    <span className={cn("inline-block px-2.5 py-1 rounded-full text-xs font-semibold", bt.color)}>
                        {bt.label}
                    </span>
                );
            },
        },
        { key: "service_name", title: t("bookings.manageBooking.columns.service") },
        { key: "subarea", title: t("bookings.manageBooking.columns.subarea") },
        {
            key: "payment_option",
            title: t("bookings.manageBooking.columns.payment"),
            render: (value: string) => {
                if (!value) return <span className="text-gray-400">—</span>;
                const colors: Record<string, string> = {
                    cash: "bg-emerald-50 text-emerald-700",
                    credit: "bg-purple-50 text-purple-700",
                    free: "bg-gray-100 text-gray-600",
                    wallet: "bg-amber-50 text-amber-700",
                };
                return (
                    <span className={cn("inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize", colors[value.toLowerCase()] || "bg-gray-100 text-gray-600")}>
                        {value}
                    </span>
                );
            },
        },
        { key: "total_price", title: t("bookings.manageBooking.columns.amount") },
        { key: "action", title: "", dynmincPage: "single_booking_details" },
    ];

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <Formik
                        initialValues={{ search, booking_date: bookingDate }}
                        onSubmit={(values) => {
                            setSearch(values.search);
                            setBookingDate(values.booking_date || todayString());
                            setCurrentPage(1);
                        }}
                        enableReinitialize
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        <div className="flex flex-col min-w-[140px]">
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">Service Boys With Bookings</h1>
                                            <p className="text-xs md:text-sm text-secondary-500">Today's active service boys and their bookings</p>
                                        </div>

                                        <div className="w-full md:w-52 lg:w-60 mb-2">
                                            <FormInput name="search" placeholder="Search by name or phone..." icon={<Search className="w-5 h-5" />} checkmark={false} label={""} />
                                        </div>

                                        <div className="w-full md:w-48 lg:w-52">
                                            <FormDatePicker name="booking_date" label="" placeholder="Select date" icon={<CalendarDays className="w-5 h-5" />} checkmark={false} />
                                        </div>

                                        <button type="submit" className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap">Search</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {isLoading ? (
                    <TableLoading />
                ) : serviceBoys.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-sm">No service boys found for this date.</div>
                ) : (
                    <div className="space-y-3">
                        {serviceBoys.map((sb: any) => {
                            const boy = sb.service_boy;
                            const isExpanded = expandedId === boy.user_id;
                            return (
                                <div key={boy.user_id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => toggleExpand(boy.user_id)}
                                        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                                {boy.image_url ? (
                                                    <img src={boy.image_url} alt={boy.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold text-gray-900">{boy.name}</p>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                                                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{boy.phone_number}</span>
                                                    <span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-medium", boy.active_flag === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                                                        {boy.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                                                {sb.total_bookings_today} bookings
                                            </span>
                                            {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                        </div>
                                    </button>

                                    {isExpanded && (
                                        <div className="border-t border-gray-100">
                                            <CustomTable
                                                columns={bookingColumns}
                                                data={sb.today_bookings}
                                                pageSize={sb.today_bookings.length}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Showing page {currentPage} of {totalPages} ({totalItems} items)
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage <= 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className={cn("px-4 py-2 text-sm rounded-lg border", currentPage <= 1 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-700 hover:bg-gray-100")}
                            >
                                Previous
                            </button>
                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                className={cn("px-4 py-2 text-sm rounded-lg border", currentPage >= totalPages ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-700 hover:bg-gray-100")}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}