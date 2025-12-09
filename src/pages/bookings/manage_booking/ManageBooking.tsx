import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router";
import { Search, Calendar, SlidersHorizontal } from "lucide-react";
import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";
import { BookingFilterModal } from "../../../components/booking/manageBooking/BookingFilterModal";
import { CustomTable } from "../../../common/CustomTable";
import { FormInput } from "../../../common/FormInput";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { dummyTableData } from "../../../constants/data";
import { getManageBookingColumns } from "../../../columns/manageBookingColumns";
import { manageBookingSearchInitialValues } from "../../../constants/initialValues";

const ManageBooking = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const pageSize = 10;
    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSubmit = (values: any) => {
        console.log("Search values:", values);
    };

    const handleFilterSubmit = (values: any) => {
        console.log("Filter values:", values);
    };

    const columns = getManageBookingColumns(navigate);

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl mb-6">
                {/* Filter Section */}
                <div className="mb-6 px-4">
                    <Formik
                        initialValues={manageBookingSearchInitialValues}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col gap-4">
                                    {/* Filters and Actions Row */}
                                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                                        {/* Left Side - Header + Search Filters */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1 min-w-0">
                                            {/* Header */}
                                            <div className="flex flex-col shrink-0">
                                                <h1 className="text-lg md:text-xl font-bold text-secondary-900">
                                                    Filter
                                                </h1>
                                                <p className="text-xs text-secondary-500 whitespace-nowrap">
                                                    Manage Bookings
                                                </p>
                                            </div>

                                            {/* Search Filters */}
                                            <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
                                                <div className="flex-1 min-w-0 -space-y-2">
                                                    <FormInput
                                                        name="search"
                                                        label=""
                                                        placeholder="Search"
                                                        icon={<Search className="w-5 h-5" />}
                                                        className="mb-0"
                                                        checkmark={false}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-auto sm:min-w-[160px] sm:max-w-[200px] -space-y-2">
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
                                                    className="w-full sm:w-auto px-6 py-3 bg-primary rounded-lg text-secondary-900 text-sm font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>

                                        {/* Right Side - Filter Button */}
                                        <button
                                            type="button"
                                            onClick={() => setIsFilterModalOpen(true)}
                                            className="w-full sm:w-auto py-3 px-10 border border-gray-200 rounded-lg bg-[#F4F5FA] transition-colors hover:bg-gray-100 shrink-0"
                                        >
                                            <SlidersHorizontal className="w-5 h-5 text-secondary-700 mx-auto sm:mx-0" />
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {/* Table Section */}
                <CustomTable
                    columns={columns}
                    data={dummyTableData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </div>
            <CompletedBookingChart />
            <RatedReportsChart />

            {/* Filter Modal */}
            <BookingFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onSubmit={handleFilterSubmit}
            />
        </main>
    );
};

export default ManageBooking;