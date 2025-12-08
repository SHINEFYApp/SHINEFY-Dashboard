import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router";
import { Calendar } from "lucide-react";
import { CustomTable } from "../../../common/CustomTable";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { dummySlotTableData } from "../../../constants/data";
import { manageSlotsColumns } from "../../../columns/manageSlotsColumns";
import { manageSlotsSearchInitialValues } from "../../../constants/initialValues";

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

    const handleSubmit = (values: any) => {
        console.log("Search values:", values);
    };

    const columns = manageSlotsColumns;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                {/* Filter Section */}
                <div className="mb-6 px-4">
                    <Formik
                        initialValues={manageSlotsSearchInitialValues}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    {/* Left Side */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        <div className="flex flex-col min-w-[101px]">
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                                                Filter
                                            </h1>
                                            <p className="text-xs md:text-sm text-secondary-500">
                                                Manage Slots
                                            </p>
                                        </div>

                                        <div className={`w-full md:w-[178px] -space-y-2`}>
                                            <FormDropdown name="type" label="" placeholder="Type" options={types} className="mb-2" />
                                        </div>
                                        <div className="w-full md:w-[178px] -space-y-2">
                                            <FormDropdown name="status" label="" placeholder="Status" options={status} className="mb-2" />
                                        </div>
                                        <div className={`w-full md:w-[150px] -space-y-2`}>
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

                                    {/* Right Side */}
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <div className="w-full lg:w-[135px]">
                                            <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                        </div>
                                        <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                        <Link
                                            to={"/bookings/slot/create"}
                                            className="w-full lg:w-[94px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                        >
                                            Add Slot
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

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