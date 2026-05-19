import { useState } from "react";
import { Form, Formik } from "formik";
import { Calendar, Download, Search } from "lucide-react";
import { FormDateRangePicker } from "../../../common/FormDateRangePicker";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormInput } from "../../../common/FormInput";
import { CustomTable } from "../../../common/CustomTable";
import { TableLoading } from "../../../common/loader";
import { useGet } from "../../../api/useGetData";
import { getUserBookingsReport, exportUserBookingsReport, getSubareas } from "../../../api/features/bookings";
import { toast } from "sonner";

const STATUS_OPTIONS = [
    { label: "All", value: "" },
    { label: "Pending", value: "0" },
    { label: "In Progress", value: "1" },
    { label: "Completed", value: "2" },
    { label: "Cancelled", value: "3" },
];

const OPERATOR_OPTIONS = [
    { label: "Equal To", value: "eq" },
    { label: "Greater Than", value: "gt" },
    { label: "Less Than", value: "lt" },
    { label: "Greater Than or Equal", value: "gte" },
    { label: "Less Than or Equal", value: "lte" },
];

const columns = [
    { key: "user_id", title: "User ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "phone_number", title: "Phone" },
    { key: "createtime", title: "Registered" },
    { key: "total_bookings", title: "Total Bookings" },
    { key: "completed_bookings", title: "Completed" },
    { key: "cancelled_bookings", title: "Cancelled" },
    { key: "other_bookings", title: "Other" },
    { key: "avg_rating", title: "Avg Rating" },
];

const BASE_URL = import.meta.env.VITE_API_URL;

export default function BookingReports() {
    const [currentPage, setCurrentPage] = useState(1);
    const [queryParams, setQueryParams] = useState<any>(null);

    const { data: subareasData } = useGet({
        queryFn: () => getSubareas(`${BASE_URL}/api/reports/subareas`),
        queryKey: ["reports", "subareas"],
        options: { staleTime: 1000 * 60 * 5 },
    });

    const subareas = subareasData?.data || [];
    const areaOptions = [
        { label: "All Areas", value: "" },
        ...(Array.isArray(subareas)
            ? subareas.map((a: any) => ({
                label: a.name || a.area_name || String(a.id),
                value: String(a.id),
            }))
            : []),
    ];

    const params = queryParams
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

    const { data, isLoading } = useGet({
        queryFn: params ? () => getUserBookingsReport(`${BASE_URL}/api/reports/user-bookings`, params) : () => Promise.resolve(null),
        queryKey: params ? ["reports", "user-bookings", currentPage, ...Object.values(params)] : ["reports", "user-bookings", "idle"],
        options: { enabled: !!params, staleTime: 1000 * 10 },
    });

    const report = data?.data?.report || [];
    const pagination = data?.data?.pagination;
    const totalItems = pagination?.total ?? 0;
    const totalPages = pagination?.last_page ?? 1;

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
            toast.error("Please select a date range first");
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
            toast.error("Export failed");
        }
    };

    return (
        <main>
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
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">Booking Reports</h1>
                                            <p className="text-xs md:text-sm text-secondary-500">User booking reports and analytics</p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="w-56">
                                                <FormDateRangePicker fromName="from_date" toName="to_date" placeholder="Select date range" icon={<Calendar className="w-5 h-5" />} />
                                            </div>

                                            <div className="w-36">
                                                <FormDropdown name="status" label="" placeholder="Status" options={STATUS_OPTIONS} />
                                            </div>

                                            <div className="w-28">
                                                <FormInput name="rating" placeholder="Min Rating" label="" checkmark={false} />
                                            </div>

                                            <div className="w-36">
                                                <FormDropdown name="booking_operator" label="" placeholder="Operator" options={OPERATOR_OPTIONS} />
                                            </div>

                                            <div className="w-28">
                                                <FormInput name="booking_quantity" placeholder="Quantity" label="" checkmark={false} />
                                            </div>

                                            <div className="w-44">
                                                <FormDropdown name="area_id" label="" placeholder="Area" options={areaOptions} />
                                            </div>

                                            <button type="submit" className="px-6 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm whitespace-nowrap">
                                                <Search className="w-5 h-5 inline-block mr-1" />
                                                Search
                                            </button>
                                            <button type="reset" onClick={handleReset} className="px-6 py-3 text-primary rounded-lg bg-secondary-900 font-semibold transition-all hover:bg-secondary-900/90 shadow-sm whitespace-nowrap">
                                                Reset
                                            </button>
                                        </div>
                                    </div>

                                    <button type="button" onClick={handleExport} className="flex items-center gap-2 px-6 py-3 bg-[#1B8354] text-white rounded-lg font-semibold transition-all hover:bg-[#156944] shadow-sm whitespace-nowrap self-start">
                                        <Download className="w-4 h-4" />
                                        Export Excel
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {!queryParams ? (
                    <div className="text-center py-16 text-gray-400 text-sm">
                        Select a date range and click Search to view reports
                    </div>
                ) : isLoading ? (
                    <TableLoading />
                ) : (
                    <CustomTable
                        columns={columns}
                        data={report}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={totalItems}
                        pageSize={20}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </main>
    );
}
