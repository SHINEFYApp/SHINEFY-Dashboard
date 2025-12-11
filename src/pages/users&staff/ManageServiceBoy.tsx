import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes, franchise } from "../../constants/data";
import { manageServiceBoySearchInitialValues } from "../../constants/initialValues";
import { FilterHeader } from "../../components/common/FilterHeader";
import { FormDatePicker } from "../../common/FormDatePicker";

const ManageServiceBoy = () => {
    const handleSearchSubmit = (values: any) => {
        console.log("Search values:", values);
    };

    const handleFilterSubmit = (values: any) => {
        console.log("Filter values:", values);
    };

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
                            href: "/users&staff/manage/subAdmin/addSubAdmin",
                            variant: "primary"
                        }
                    ]}
                    showExport={true}
                    exportOptions={exportTypes}
                />
            </div>
        </main>
    );
};

export default ManageServiceBoy;