import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";
import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { Calendar, Search, SlidersHorizontal } from "lucide-react";
import { FormDateRangePicker } from "../../../common/FormDateRangePicker";
import { useEffect, useRef, useState } from "react";
import { CustomTable } from "../../../common/CustomTable";
import { useGet } from "../../../api/useGetData";
import { toast } from "sonner";
import { manageBookings } from "../../../api/features/bookings";
import { TableLoading } from "../../../common/loader";
import { useSearchParams } from "react-router";
import { FormDropdown } from "../../../common/FormDropdown";
import BookingFilterOptions from "./BookingFilterOptions";
import type { BookingFilterState } from "../../../types/bookings";
import { cn } from "../../../utils/utils";
import { useTranslation } from "react-i18next";



function formatDate(dateStr: string) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ManageBooking() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentPage, setCurrentPage] = useState(() => Number(searchParams.get("page")) || 1);
    const [formData, setFormData] = useState(() => ({
        search: searchParams.get("search") || "",
        dateFrom: searchParams.get("dateFrom") || "",
        dateTo: searchParams.get("dateTo") || "",
        limit: searchParams.get("limit") || "25",
    }));
    const [filterOptions, setFilterOptions] = useState<BookingFilterState>(() => ({
        state: false,
        data: {
            status: searchParams.get("status") || "",
            booking_type: searchParams.get("booking_type") || "",
            paymentMethod: searchParams.get("paymentMethod") || "",
        },
    }));

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const urlParams = new URLSearchParams();
        if (formData.search) urlParams.set("search", formData.search);
        if (formData.dateFrom) urlParams.set("dateFrom", formData.dateFrom);
        if (formData.dateTo) urlParams.set("dateTo", formData.dateTo);
        if (formData.limit && formData.limit !== "25") urlParams.set("limit", formData.limit);
        if (currentPage > 1) urlParams.set("page", String(currentPage));
        if (filterOptions.data.status) urlParams.set("status", filterOptions.data.status);
        if (filterOptions.data.booking_type) urlParams.set("booking_type", filterOptions.data.booking_type);
        if (filterOptions.data.paymentMethod) urlParams.set("paymentMethod", filterOptions.data.paymentMethod);
        setSearchParams(urlParams, { replace: true });
    }, [formData.search, formData.dateFrom, formData.dateTo, formData.limit, currentPage, filterOptions.data.status, filterOptions.data.booking_type, filterOptions.data.paymentMethod, setSearchParams]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const baseURL = import.meta.env.VITE_API_URL;
    const route = `${baseURL}/api/getBookings`;

    const params = {
        page: currentPage,
        limit: Number(formData.limit) || 25,
        booking_date_from: formData.dateFrom || undefined,
        booking_date_to: formData.dateTo || undefined,
        search: formData.search,
        status: filterOptions.data.status || undefined,
        booking_type: filterOptions.data.booking_type || undefined,
        payment_method: filterOptions.data.paymentMethod || undefined,
    };

    // Fetch data
    const { data, isLoading, isError, isSuccess, error } = useGet({
        queryFn: () => manageBookings(route, params),
        queryKey: ["bookings", currentPage, formData.search, formData.dateFrom, formData.dateTo, formData.limit, filterOptions.data.status, filterOptions.data.booking_type, filterOptions.data.paymentMethod],
        options: { staleTime: 1000 * 10 },
    });

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message);
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(t("bookings.manageBooking.fetchSuccess"));
        }
    }, [isSuccess]);

    const bookings = data?.data?.bookings || [];
    const pagination = data?.data?.pagination;
    const totalItems = pagination?.total_items ?? 0;
    const totalPages = pagination?.total_pages ?? Math.ceil(totalItems / (Number(formData.limit) || 25));

    const STATUS_MAP: Record<string, { label: string; color: string }> = {
        "0": { label: t("bookings.manageBooking.status.pending"), color: "bg-yellow-100 text-yellow-800" },
        "1": { label: t("bookings.manageBooking.status.inProgress"), color: "bg-blue-100 text-blue-800" },
        "2": { label: t("bookings.manageBooking.status.completed"), color: "bg-green-100 text-green-800" },
        "3": { label: t("bookings.manageBooking.status.canceled"), color: "bg-red-100 text-red-800" },
        "4": { label: t("bookings.manageBooking.status.confirmed"), color: "bg-indigo-100 text-indigo-800" },
    };

    const BOOKING_TYPE_MAP: Record<number, { label: string; color: string }> = {
        0: { label: t("bookings.manageBooking.bookingType.suchdegle"), color: "bg-purple-100 text-purple-800" },
        1: { label: t("bookings.manageBooking.bookingType.waiting"), color: "bg-orange-100 text-orange-800" },
    };

    const columns = [
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
        { key: "service_boy_name", title: t("bookings.manageBooking.columns.serviceBoy") },
        { key: "service_name", title: t("bookings.manageBooking.columns.service") },
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

    // Reset form
    const handleReset = () => {
        setFormData({ search: "", dateFrom: "", dateTo: "", limit: "25" });
        setFilterOptions({ state: false, data: { status: "", booking_type: "", paymentMethod: "" } });
        setCurrentPage(1);
    };

    // Handle Formik submit
    const handleSubmit = (values: any) => {
        setFormData({ search: values.search, dateFrom: values.dateFrom || "", dateTo: values.dateTo || "", limit: values.limit });
        setCurrentPage(1);
    };

    // Handle Limit change on dropdown directly (onChange)
    const handleLimitChange = (newLimit: string) => {
        setFormData((prev) => ({ ...prev, limit: newLimit }));
        setCurrentPage(1);
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <Formik initialValues={formData} onSubmit={handleSubmit} enableReinitialize>
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        <div className="flex flex-col min-w-[140px]">
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">{t("bookings.manageBooking.title")}</h1>
                                            <p className="text-xs md:text-sm text-secondary-500">{t("bookings.manageBooking.subtitle")}</p>
                                        </div>

                                        <div className="w-full md:w-52 lg:w-60 mb-2">
                                            <FormInput name="search" placeholder={t("bookings.manageBooking.searchPlaceholder")} icon={<Search className="w-5 h-5" />} checkmark={false} label={""} />
                                        </div>

                                        <div className="w-full md:w-56 lg:w-64">
                                            <FormDateRangePicker fromName="dateFrom" toName="dateTo" placeholder={t("bookings.manageBooking.selectDateRange")} icon={<Calendar className="w-5 h-5" />} />
                                        </div>

                                        <button type="submit" className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap">{t("bookings.manageBooking.search")}</button>
                                        <button type="reset" onClick={handleReset} className="px-6 lg:px-8 py-3 text-primary rounded-lg bg-secondary-900 font-semibold transition-all hover:bg-secondary-900/90 shadow-sm hover:shadow-md whitespace-nowrap">{t("bookings.manageBooking.reset")}</button>
                                    </div>

                                    <div className="flex gap-5 items-center">
                                        <div className="mb-2 w-28">
                                            <FormDropdown
                                                name="limit"
                                                placeholder={t("bookings.manageBooking.pageLimit")}
                                                options={["25", "50", "75", "100"]}
                                                onChangeExternal={(val) => handleLimitChange(val)} label={""}
                                            />
                                        </div>
                                        <button type="button" onClick={() => setFilterOptions({ ...filterOptions, state: true })} className="py-4 px-10 border border-gray-200 rounded-lg bg-[#F4F5FA] transition-colors hover:bg-gray-100 shrink-0 self-end lg:self-auto">
                                            <SlidersHorizontal className="w-5 h-5 text-secondary-700" />
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {isLoading ? (
                    <TableLoading />
                ) : (
                    <CustomTable
                        columns={columns}
                        data={bookings}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={totalItems}
                        pageSize={Number(formData.limit) || 25}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            {/* <CompletedBookingChart /> */}
            {/* <RatedReportsChart /> */}
            <BookingFilterOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
        </main>
    );
}
