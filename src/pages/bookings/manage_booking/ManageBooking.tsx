import { useState } from "react";
import { useNavigate } from "react-router";
import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";
import { CustomTable } from "../../../common/CustomTable";
import { dummyTableData } from "../../../constants/data";
import { getManageBookingColumns } from "../../../columns/manageBookingColumns";
import { manageBookingSearchInitialValues, bookingFilterInitialValues } from "../../../constants/initialValues";
import { FilterHeader } from "../../../components/common/FilterHeader";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormTimePicker } from "../../../common/FormTimePicker";

const ManageBooking = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchSubmit = (values: any) => {
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
                <FilterHeader
                    subtitle="Manage Bookings"
                    searchInitialValues={manageBookingSearchInitialValues}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={bookingFilterInitialValues}
                    onFilterSubmit={handleFilterSubmit}
                    filterModalTitle="Filter Options"
                    filterModalSubtitle="Manage Bookings"
                    filterFields={
                        <>
                            <FormDropdown
                                name="status"
                                label="Status"
                                placeholder="Choose Status"
                                options={['Pending', 'Confirmed', 'Completed', 'Cancelled']}
                            />
                            <FormDropdown
                                name="service_boy"
                                label="Service Boy"
                                placeholder="Choose Service Boy"
                                options={['service boy 1', 'service boy 2', 'service boy 3']}
                            />
                            <FormDropdown
                                name="address"
                                label="Address"
                                placeholder="Address"
                                options={['address 1', 'address 2', 'address 3']}
                            />
                            <FormDatePicker
                                name="date"
                                label="Date"
                                placeholder="Date"
                                checkmark={false}
                            />
                            <FormTimePicker
                                name="time"
                                label="Time"
                                placeholder="Time"
                            />
                        </>
                    }
                    showExport={false}
                />

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
        </main>
    );
};

export default ManageBooking;