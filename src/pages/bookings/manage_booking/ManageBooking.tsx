import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";
import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { Calendar, Search, SlidersHorizontal } from "lucide-react";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { useEffect, useState } from "react";
import { CustomTable } from "../../../common/CustomTable";
import { useGet } from "../../../api/useGetData";
import { toast } from "sonner";
import { manageBookings } from "../../../api/features/bookings";
import { TableLoading } from "../../../common/loader";
import { useLocation, useSearchParams } from "react-router";
import { FormDropdown } from "../../../common/FormDropdown";

const columns = [
    { key: "booking_no", title: "Booking Number" },
    { key: "customer_name", title: "Customer Name" },
    { key: "service_boy_name", title: "Service Boy Name" },
    { key: "service_name", title: "Service Name" },
    { key: "payment_option", title: "Payment Method" },
    { key: "total_price", title: "Total Amount(EGP)" },
    { key: "action", title: "Action", dynmincPage: "single_booking_details" },
];

export default function ManageBooking() {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        search: "",
        date: "",
        limit: "25",
    });

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Sync URL params with state on page load or URL change
    useEffect(() => {
        const search = searchParams.get("search") || "";
        const date = searchParams.get("date") || "";
        const limit = searchParams.get("limit") || "25";
        setFormData({ search, date, limit });
    }, [location.search]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const baseURL = import.meta.env.VITE_API_URL;
    const route = `${baseURL}/api/getBookings`;

    const params = {
        page: currentPage,
        limit: Number(formData.limit) || 25,
        booking_date: formData.date,
        search: formData.search,
    };

    // Fetch data
    const { data, isLoading, isError, isSuccess, error } = useGet({
        queryFn: () => manageBookings(route, params),
        queryKey: ["bookings", currentPage, formData.search, formData.date, formData.limit],
        options: { staleTime: 1000 * 10 },
    });

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message);
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('The Process Of Fetchong Data Has Successfuly');
        }
    }, [isSuccess]);

    const bookings = data?.data?.bookings || [];
    const pagination = data?.data?.pagination;
    const totalItems = pagination?.total_items ?? 0;
    const totalPages = pagination?.total_pages ?? Math.ceil(totalItems / (Number(formData.limit) || 25));

    // Reset form
    const handleReset = () => {
        setFormData({ search: "", date: "", limit: "25" });
        setSearchParams({}, { replace: true });
        setCurrentPage(1);
    };

    // Handle Formik submit
    const handleSubmit = (values: any) => {
        // FormDatePicker already outputs yyyy-MM-dd, use it directly
        const formattedDate = values.date || "";

        // Update state — queryKey depends on formData so react-query refetches automatically
        setFormData({ search: values.search, date: formattedDate, limit: values.limit });

        // Update URL
        const urlParams = new URLSearchParams();
        if (values.search) urlParams.set("search", values.search);
        if (formattedDate) urlParams.set("date", formattedDate);
        if (values.limit) urlParams.set("limit", values.limit);
        setSearchParams(urlParams, { replace: true });

        setCurrentPage(1);
    };

    // Handle Limit change on dropdown directly (onChange)
    const handleLimitChange = (newLimit: string) => {
        setFormData((prev) => ({ ...prev, limit: newLimit }));
        const urlParams = new URLSearchParams(searchParams);
        urlParams.set("limit", newLimit);
        setSearchParams(urlParams, { replace: true });
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
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">Filter</h1>
                                            <p className="text-xs md:text-sm text-secondary-500">Manage Bookings</p>
                                        </div>

                                        <div className="w-full md:w-52 lg:w-60 mb-2">
                                            <FormInput name="search" placeholder="Search" icon={<Search className="w-5 h-5" />} checkmark={false} label={""} />
                                        </div>

                                        <div className="w-full md:w-48 lg:w-56 -space-y-2">
                                            <FormDatePicker name="date" placeholder="Date" icon={<Calendar className="w-5 h-5" />} checkmark={false} label={""} />
                                        </div>

                                        <button type="submit" className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap">Search</button>
                                        <button type="reset" onClick={handleReset} className="px-6 lg:px-8 py-3 text-primary rounded-lg bg-secondary-900 font-semibold transition-all hover:bg-secondary-900/90 shadow-sm hover:shadow-md whitespace-nowrap">Reset</button>
                                    </div>

                                    <div className="flex gap-5 items-center">
                                        <div className="mb-2 w-28">
                                            <FormDropdown
                                                name="limit"
                                                placeholder="Page Limit"
                                                options={["25", "50", "75", "100"]}
                                                onChangeExternal={(val) => handleLimitChange(val)} label={""}
                                            />
                                        </div>
                                        <button type="button" className="py-4 px-10 border border-gray-200 rounded-lg bg-[#F4F5FA] transition-colors hover:bg-gray-100 shrink-0 self-end lg:self-auto">
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

            <CompletedBookingChart />
            <RatedReportsChart />
        </main>
    );
}
