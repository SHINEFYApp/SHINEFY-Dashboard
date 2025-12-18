import { useState } from "react";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes, franchise, dummyServiceBoyData } from "../../constants/data";
import { manageServiceBoySearchInitialValues } from "../../constants/initialValues";
import { FilterHeader } from "../../common/FilterHeader";
import { FormDatePicker } from "../../common/FormDatePicker";
import { CustomTable } from "../../common/CustomTable";
import { manageServiceBoyColumns } from "../../columns/manageServiceBoyColumns";

const ManageServiceBoy = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSearchSubmit = (values: any) => {
        console.log("Search values:", values);
    };

    const handleFilterSubmit = (values: any) => {
        console.log("Filter values:", values);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalEntries = dummyServiceBoyData.length;
    const totalPages = Math.ceil(totalEntries / pageSize);

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                {/* Filter Section */}
                <FilterHeader
                    subtitle="Manage Service Boy"
                    searchInitialValues={manageServiceBoySearchInitialValues}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={manageServiceBoySearchInitialValues}
                    onFilterSubmit={handleFilterSubmit}
                    filterModalTitle="Filter Options"
                    filterModalSubtitle="Manage Service Boy"
                    filterFields={
                        <>
                            <FormDropdown
                                name="status"
                                label="Status"
                                placeholder="Choose Status"
                                options={['Pending', 'Confirmed', 'Completed', 'Cancelled']}
                            />
                            <FormDropdown
                                name="franchise"
                                label="Franchise"
                                placeholder="Choose Franchise"
                                options={franchise}
                            />
                            <FormDatePicker
                                name="date"
                                label="Date"
                                placeholder="Select Date"
                                checkmark={false}
                            />
                        </>
                    }
                    actionButtons={[
                        {
                            label: "Add Service Boy",
                            href: "/users&staff/manage/serviceBoy/addServiceBoy",
                            variant: "primary"
                        }
                    ]}
                    showExport={true}
                    exportOptions={exportTypes}
                />

                {/* Table Section */}
                <div className="mt-6">
                    <CustomTable
                        columns={manageServiceBoyColumns}
                        data={dummyServiceBoyData}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={totalEntries}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </main>
    );
};

export default ManageServiceBoy;