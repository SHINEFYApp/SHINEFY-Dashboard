import { useState } from "react";
import { Search, Calendar, SlidersHorizontal } from "lucide-react";
import { Formik, Form } from "formik";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormInput } from "../../../common/FormInput";
import type { FilterFormValues, FilterFormValuesManageSlots , ManageBookingsAndSlotsProps } from "../../../types/bookings";
import type { Column } from "../../../types/common";
import { CustomTable } from "../../../common/CustomTable";
import { dummyTableData } from "../../../constants/data";
import { useNavigate } from "react-router";
import { FormDropdown } from "../../../common/FormDropdown";

const ManageBookingsAndSlots = ({headTitle , manageSectionFromComponant} : ManageBookingsAndSlotsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const pageSize = 10;

    const manageBookingInitialValues: FilterFormValues = {
        search: "",
        date: "",
    };

    const manageSlotsInitialValues: FilterFormValuesManageSlots = {
        type: "",
        status : "" ,
        date: "",
    };

    const handleSubmit = (values: FilterFormValues | FilterFormValuesManageSlots) => {
        console.log("Search values:", values);
    };

    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);

    const columns: Column<any>[] = [
        {
            key: "bookingNumber",
            title: "Booking Number",
        },
        {
            key: "customerName",
            title: "Customer Name",
        },
        {
            key: "serviceBoyName",
            title: "Service Boy Name",
        },
        {
            key: "serviceName",
            title: "Service Name",
        },
        {
            key: "paymentMethod",
            title: "Payment Method",
        },
        {
            key: "totalAmount",
            title: "Total Amount(EGP)",
        },
        {
            key: "action",
            title: "Action",
            render: () => (
                <button
                    className="text-primary hover:text-primary-700 font-semibold transition-colors"
                    onClick={() => navigate('/bookings/manage/id')}
                >
                    View Details
                </button>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const types = ['type one' , 'type two' , 'type three']
    const status = ['Open' , 'Closed' ]
    const exportTypes = ['CSV' , 'Excel' , 'PDF' ]

    return (
        <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
            {/* Filter Section */}
            <div className="mb-6 px-4">
                <Formik<FilterFormValues | FilterFormValuesManageSlots> initialValues={manageSectionFromComponant === 'manage bookings' ? manageBookingInitialValues : manageSlotsInitialValues} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                {/* Left Side */}
                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                    {/* Title */}
                                    <div className={`flex flex-col min-w-[140px] ${manageSectionFromComponant === 'manage slots' ? 'min-w-[101px]' : 'min-w-[140px]' }`}>
                                        <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                                            {headTitle.one}
                                        </h1>
                                        <p className="text-xs md:text-sm text-secondary-500">
                                            {headTitle.two}
                                        </p>
                                    </div>

                                    {/* Type DropList Manage slots */}
                                    {manageSectionFromComponant === 'manage slots' && 
                                        <div className={`w-full md:w-[178px] -space-y-2`}>
                                            <FormDropdown name="type" label="" placeholder="Type" options={types} className="mb-2" />
                                        </div>
                                    }

                                    {/* Status DropList Manage slots */}
                                    {manageSectionFromComponant === 'manage slots' && 
                                        <div className="w-full md:w-[178px] -space-y-2">
                                            <FormDropdown name="status" label="" placeholder="Status" options={status} className="mb-2" />
                                        </div>
                                    }

                                    {/* Search Input */}
                                    {manageSectionFromComponant === 'manage bookings' &&
                                        <div className="w-full md:w-52 lg:w-60 -space-y-2">
                                            <FormInput
                                                name="search"
                                                label=""
                                                placeholder="Search"
                                                icon={<Search className="w-5 h-5" />}
                                                className="mb-0"
                                                checkmark={false}
                                            />
                                        </div>
                                    }

                                    {/* Date Picker */}
                                    <div className={`w-full ${manageSectionFromComponant === 'manage slots' ? 'md:w-[150px]' : 'md:w-48 lg:w-56'} -space-y-2`}>
                                        <FormDatePicker
                                            name="date"
                                            label=""
                                            placeholder="Date"
                                            icon={<Calendar className="w-5 h-5" />}
                                            className="mb-0"
                                            checkmark={false}
                                        />
                                    </div>

                                    {/* Search Button */}
                                    <button
                                        type="submit"
                                        className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                    >
                                        Search
                                    </button>
                                </div>

                                {/*Right Side manage bookings */}
                                {manageSectionFromComponant === 'manage bookings' &&
                                    <button
                                        type="button"
                                        className="py-3 px-10 border border-gray-200 rounded-lg bg-[#F4F5FA] transition-colors hover:bg-gray-100 shrink-0 self-end lg:self-auto"
                                        >
                                            <SlidersHorizontal className="w-5 h-5 text-secondary-700" />
                                    </button>
                                }

                                {/*Right Side manage slots */}
                                {manageSectionFromComponant === 'manage slots' && 
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <div className="w-full lg:w-[135px]">
                                            <FormDropdown name="export" label="" placeholder="Export" options={exportTypes} className="mb-2" />
                                        </div>
                                        <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                        <button
                                            type="button"
                                            className="w-full lg:w-[94px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Add Slot
                                        </button>
                                    </div>
                                }
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
    );
};

export default ManageBookingsAndSlots;
