import React, { useState } from "react";
import { Formik, Form } from "formik";
import type { FilterFormValues, FilterFormValuesManageSlots , FilterFormValuesManageSubAdmin, ManageBookingsAndSlotsProps } from "../../types/bookings";
import { CustomTable } from "../../common/CustomTable";
import { dummyManageSubAdmins, dummyTableData } from "../../constants/data";
import { dummySlotTableData } from "../../constants/data";
import { Tables } from "./tablesLayout";


const Table = ({ manageSectionFromComponant} : ManageBookingsAndSlotsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSubmit = (values: FilterFormValues | FilterFormValuesManageSlots | FilterFormValuesManageSubAdmin) => {
        console.log("Search values:", values);
    };

    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
            {/* Filter Section */}
            <div className="mb-6 px-4">
                <Formik<FilterFormValues |
                    FilterFormValuesManageSlots |
                    FilterFormValuesManageSubAdmin
                    >initialValues={Tables[manageSectionFromComponant].InitialValues} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                {/* Left Side */}
                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                    {/* Title */}
                                    {(Tables[manageSectionFromComponant].head.headTitle.one !== '' && Tables[manageSectionFromComponant].head.headTitle.two !== '') && (
                                        <div className={`flex flex-col min-w-[140px] ${manageSectionFromComponant === 'manageSlots' ? 'min-w-[101px]' : 'min-w-[140px]' }`}>
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                                                {Tables[manageSectionFromComponant].head.headTitle.one}
                                            </h1>
                                            <p className="text-xs md:text-sm text-secondary-500">
                                                {Tables[manageSectionFromComponant].head.headTitle.two}
                                            </p>
                                        </div> )
                                    }

                                    {/* left side */}
                                    {Tables[manageSectionFromComponant].head.leftSide.map((el , index) => {
                                        return React.cloneElement(el, { key: index })
                                    })}

                                </div>

                                {/* right side */}
                                {Tables[manageSectionFromComponant].head.rightSide.map((el , index) => {
                                    return React.cloneElement(el, { key: index })
                                })}
                                
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Table Section */}
            <CustomTable
                columns={Tables[manageSectionFromComponant].columns}
                data={manageSectionFromComponant === 'manageBookings' ? dummyTableData : manageSectionFromComponant === 'manageSlots' ? dummySlotTableData : dummyManageSubAdmins}
                currentPage={currentPage}
                totalPages={totalPages}
                totalEntries={totalEntries}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Table;
