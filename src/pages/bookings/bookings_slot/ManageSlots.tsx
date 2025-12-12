import { useState } from "react";
import { CustomTable } from "../../../common/CustomTable";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { dummySlotTableData } from "../../../constants/data";
import { manageSlotsColumns } from "../../../columns/manageSlotsColumns";
import { manageSlotsSearchInitialValues } from "../../../constants/initialValues";
import { FilterHeader } from "../../../common/FilterHeader";

const types = ['type one', 'type two', 'type three'];
const status = ['Open', 'Closed'];
const exportTypes = ['CSV', 'Excel', 'PDF'];

const ManageSlot = () => {
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

    const columns = manageSlotsColumns;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                {/* Filter Section */}
                <FilterHeader
                    subtitle="Manage Slots"
                    searchInitialValues={{ search: '', export: '' }}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={manageSlotsSearchInitialValues}
                    onFilterSubmit={handleFilterSubmit}
                    filterModalTitle="Filter Options"
                    filterModalSubtitle="Manage Slots"
                    filterFields={
                        <>
                            <FormDropdown
                                name="type"
                                label="Type"
                                placeholder="Choose Type"
                                options={types}
                            />
                            <FormDropdown
                                name="status"
                                label="Status"
                                placeholder="Choose Status"
                                options={status}
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
                            label: "Add Slot",
                            href: "/bookings/slot/create",
                            variant: "primary"
                        }
                    ]}
                    showExport={true}
                    exportOptions={exportTypes}
                />

                {/* Table Section */}
                <CustomTable
                    columns={columns}
                    data={dummySlotTableData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </div>
        </main>
    );
};

export default ManageSlot;