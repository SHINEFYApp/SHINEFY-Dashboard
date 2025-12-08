import { useState } from "react";
import { Formik, Form } from "formik";
import { Search } from "lucide-react";
import { CustomTable } from "../../common/CustomTable";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { dummyManageSubAdmins } from "../../constants/data";
import { manageSubAdminColumns } from "../../columns/manageSubAdminColumns";
import { manageSubAdminSearchInitialValues } from "../../constants/initialValues";

const Franchise = ['Franchise one', 'Franchise two', 'Franchise three'];
const exportTypes = ['CSV', 'Excel', 'PDF'];

const ManageSubAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSubmit = (values: any) => {
        console.log("Search values:", values);
    };

    const columns = manageSubAdminColumns;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                {/* Filter Section */}
                <div className="mb-6 px-4">
                    <Formik
                        initialValues={manageSubAdminSearchInitialValues}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    {/* Left Side */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        <div className="w-full md:w-52 lg:w-60 mb-2 -space-y-2">
                                            <FormInput
                                                name="search"
                                                label=""
                                                placeholder="Search"
                                                icon={<Search className="w-5 h-5" />}
                                                className="mb-0"
                                                checkmark={false}
                                            />
                                        </div>
                                        <div className="w-full md:w-52 lg:w-60 -space-y-2">
                                            <FormDropdown name="franchise" label="" placeholder="Franchise" options={Franchise} className="mb-2" />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                            Search
                                        </button>
                                    </div>

                                    {/* Right Side */}
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <a href="/users&staff/manage/subAdmin/addSubAdmin"
                                            type="button"
                                            className="w-full lg:w-[179px] py-3 flex justify-center items-center bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                            Add Sub Admin
                                        </a>
                                        <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                        <div className="w-full lg:w-[135px]">
                                            <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2 w-full" />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

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

export default ManageSubAdmin;