import { Link } from "react-router";
import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";
import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { Calendar, Search, SlidersHorizontal } from "lucide-react";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { dummyTableData } from "../../../constants/data";
import type { FilterFormValues } from "../../../types/bookings";
import { useState } from "react";
import { CustomTable } from "../../../common/CustomTable";
import { useGet } from "../../../api/useGetData";
import Loader from "../../../common/loader";
import { toast } from "sonner";


    export interface Booking {
        booking_id: number;
        booking_no: string;
        total_price: string;
        customer_name: string;
        service_boy_name: string | null;
        service_name: string;
        payment_option: string;
    }
    export interface Pagination {
        current_page: number;
        total_pages: number;
        total_items: number;
        limit: number;
    }

    export interface BookingsData {
        bookings: Booking[];
        pagination: Pagination;
    }

    export interface ApiResponse {
        status: string;
        data: BookingsData;
    }


    const columns = [
        {
            key: "booking_no",
            title: "Booking Number",
        },
        {
            key: "customer_name",
            title: "Customer Name",
        },
        {
            key: "service_boy_name",
            title: "Service Boy Name",
        },
        {
            key: "service_name",
            title: "Service Name",
        },
        {
            key: "payment_option",
            title: "Payment Method",
        },
        {
            key: "total_price",
            title: "Total Amount(EGP)",
        },
        {
            key: "action",
            title: "Action",
            render: () => (
                <Link 
                to={'/bookings/manage/id'}
                className="text-primary hover:text-primary-700 font-semibold transition-colors"
                >
                    View Details
                </Link>
            ),
        },
    ]

    interface formDataManageBooking{
        search : string ,
        date : string
    }

export default function ManageBooking(){
    const [currentPage, setCurrentPage] = useState(1);
    const [formData , setFormData] = useState<formDataManageBooking>({
        search : '' ,
        date : ''
    })
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const baseURL = import.meta.env.VITE_API_URL
    
    const { data, isLoading, isError, error , refetch } = useGet<ApiResponse>({
        route: `${baseURL}/admin/api/getBookings`,
        queryKey: ["bookings", currentPage, formData.search, formData.date],
        params: {
            page: currentPage,
            limit: 20,                
            booking_date: formData.date,
            search: formData.search,
            // booking_type: '0', 
            // order: "desc", 
        },
        options: {
            staleTime: 1000 * 10,
        },
    });
    
    const handleSubmit = (values: FilterFormValues) => {
        console.log("Search values:", values);
        setFormData({...values})
        refetch()
    };
    
    const bookings = data?.data.bookings
    const pagination = data?.data.pagination

    if(isLoading) return <Loader />
    if(isError) return toast.error(error.message)

    return (
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl`}>
                <div className="mb-6">
                    <Formik
                        initialValues={{
                            search: "",
                            date: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        <div className={`flex flex-col min-w-[140px]`}>
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                                                Filter
                                            </h1>
                                            <p className="text-xs md:text-sm text-secondary-500">
                                                Manage Bookings
                                            </p>
                                        </div>
                                        <div className="w-full md:w-52 lg:w-60 mb-2">
                                            <FormInput
                                                name="search"
                                                label=""
                                                placeholder="Search"
                                                icon={<Search className="w-5 h-5" />}
                                                className="mb-0"
                                                checkmark={false}
                                            />
                                        </div>
                                        <div className={`w-full md:w-48 lg:w-56 -space-y-2`}>
                                            <FormDatePicker
                                                name="date"
                                                label=""
                                                placeholder="Date"
                                                icon={<Calendar className="w-5 h-5" />}
                                                className="mb-0"
                                                checkmark={false}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                            Search
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className="py-3 px-10 border border-gray-200 rounded-lg bg-[#F4F5FA] transition-colors hover:bg-gray-100 shrink-0 self-end lg:self-auto"
                                    >
                                        <SlidersHorizontal className="w-5 h-5 text-secondary-700" />
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <CustomTable
                    columns={columns}
                    data={bookings}
                    currentPage={currentPage}
                    totalPages={pagination.total_pages}
                    totalEntries={pagination.total_pages}
                    pageSize={pagination.limit}
                    onPageChange={handlePageChange}
                />
            </div>
            <CompletedBookingChart />
            <RatedReportsChart />
        </main>
    );
};
