import { useState } from "react";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes } from "../../constants/data";
import { manageSubAdminColumns } from "../../columns/manageSubAdminColumns";
import { manageSubAdminSearchInitialValues } from "../../constants/initialValues";
import { FilterHeader } from "../../components/common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { dummyManageSubAdmins } from "../../constants/data";

const ManageSubAdmin = () => {
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

    const columns = manageSubAdminColumns;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                {/* Filter Section */}
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
                            href: "/users&staff/manage/subAdmin/addSubAdmin",
                            variant: "primary"
                        }
                    ]}
                    showExport={true}
                    exportOptions={exportTypes}
                />

                {/* Table Section */}
                <CustomTable
                    columns={columns}
                    data={dummyManageSubAdmins}
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

export default ManageSubAdmin;;