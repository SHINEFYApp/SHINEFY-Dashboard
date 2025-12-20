import { Form, Formik } from "formik";
import { ArrowUpToLine, Calendar, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { CustomTable } from "../../../common/CustomTable";
import { dummySlotTableData, exportTypes, status, types } from "../../../constants/data";
import type { FilterFormValuesManageSlots } from "../../../types/bookings";
import { useState } from "react";
import { FormDropdown } from "../../../common/FormDropdown";
import { Link } from "react-router";

    const columns = [
        {
            key: "slotDate",
            title: "Slot Date",
        },
        {
            key: "createDateAndTim",
            title: "Create Date & Tim",
        },
        {
            key: "type",
            title: "Type",
        },
        {
            key: "startTime",
            title: "Start Time",
        },
        {
            key: "endTime",
            title: "End Time",
        },
        {
            key: "status",
            title: "Status",
        },
        {
            key: "action",
            title: "Action",
            render: () => (
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => alert('updated item')}
                    >
                        <ArrowUpToLine /> update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => alert('deleted item')}
                    >
                        <Trash2 /> delete
                    </button>
                </div>
            ),
        },
    ]

export default function ManageSlot(){
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSubmit = (values: FilterFormValuesManageSlots) => {
        console.log("Search values:", values);
    };

    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    
    return (
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl`}>
                <div className="mb-6">
                    <Formik
                        initialValues={{
                            type: "",
                            status: "",
                            date: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        {/* head  */}
                                        <div className={`flex flex-col min-w-[140px]`}>
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                                                Filter
                                            </h1>
                                            <p className="text-xs md:text-sm text-secondary-500">
                                                Manage Slots
                                            </p>
                                        </div>
                                        {/* left side  */}
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
                                    {/* right side  */}
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
                {/* table  */}
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