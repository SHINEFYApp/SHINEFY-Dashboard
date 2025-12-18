import { useState } from "react";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes } from "../../constants/data";
// import { manageSubAdminSearchInitialValues } from "../../constants/initialValues";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { dummyManageSubAdmins } from "../../constants/data";
import Table from "../../components/tables/table";

const ManageSubAdmin = () => {
    return (
        <main>
            {/* <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <FilterHeader
                    subtitle="Manage Sub Admin"
                    searchInitialValues={manageSubAdminSearchInitialValues}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={manageSubAdminSearchInitialValues}
                    onFilterSubmit={handleFilterSubmit}
                    filterModalTitle="Filter Options"
                    filterModalSubtitle="Manage Sub Admin"
                    filterFields={
                        <FormDropdown
                            name="franchise"
                            label="Franchise"
                            placeholder="Choose Franchise"
                            options={['Franchise 1', 'Franchise 2', 'Franchise 3']}
                        />
                    }
                    actionButtons={[
                        {
                            label: "Add Sub Admin",
                            href: "/users&staff/subAdmin/addSubAdmin",
                            variant: "primary"
                        }
                    ]}
                    showExport={true}
                    exportOptions={exportTypes}
                />

            </div> */}
            <Table manageSectionFromComponant={'manageSubAdmin'} />
        </main>
    );
};

export default ManageSubAdmin;