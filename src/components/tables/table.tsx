import React, { useState } from "react";
import { Formik, Form } from "formik";
import type { FilterFormValues, FilterFormValuesManageSlots, FilterFormValuesManageSubAdmin, FilterFormValuesUserWallets, ManageBookingsAndSlotsProps } from "../../types/bookings";
import { CustomTable } from "../../common/CustomTable";
import { dummyManageSubAdmins, dummyTableData, dummySlotTableData, dummyUserWallets, dummyCountries, dummyRegions } from "../../constants/data";
import { exportTypes, Tables } from "./tablesLayout";
import { FormDropdown } from "../../common/FormDropdown";


const Table = ({ manageSectionFromComponant, setOpenWindow }: ManageBookingsAndSlotsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSubmit = (values: FilterFormValues | FilterFormValuesManageSlots | FilterFormValuesManageSubAdmin | FilterFormValuesUserWallets) => {
        console.log("Search values:", values);
    };

    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl ${(manageSectionFromComponant === 'countries' || manageSectionFromComponant === 'regions') && 'min-h-screen' }`}>
            {/* Filter Section */}
            <div className="mb-6">
                <Formik<FilterFormValues |
                    FilterFormValuesManageSlots |
                    FilterFormValuesManageSubAdmin |
                    FilterFormValuesUserWallets
                > initialValues={Tables[manageSectionFromComponant].InitialValues} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                {/* Left Side */}
                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                    {/* Title */}
                                    {(Tables[manageSectionFromComponant].head.headTitle.one !== '' && Tables[manageSectionFromComponant].head.headTitle.two !== '') && (
                                        <div className={`flex flex-col min-w-[140px] ${manageSectionFromComponant === 'manageSlots' ? 'min-w-[101px]' : 'min-w-[140px]'}`}>
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                                                {Tables[manageSectionFromComponant].head.headTitle.one}
                                            </h1>
                                            <p className="text-xs md:text-sm text-secondary-500">
                                                {Tables[manageSectionFromComponant].head.headTitle.two}
                                            </p>
                                        </div>)
                                    }

                                    {/* left side */}
                                    {Tables[manageSectionFromComponant].head.leftSide.map((el, index) => {
                                        return React.cloneElement(el, { key: index });
                                    })}

                                </div>

                                {/* right side */}

                                {Tables[manageSectionFromComponant].head.rightSide.map((el, index) => {
                                        return React.cloneElement(el, {
                                            key: index
                                        });
                                    })
                                }

                                {(manageSectionFromComponant === 'countries' || manageSectionFromComponant === 'regions')  && 
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <button 
                                        type="button"
                                        onClick={() => setOpenWindow?.(true)}
                                        className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center">
                                            {manageSectionFromComponant === 'countries' ?
                                                'Add a new Country'
                                                :
                                                'Add a new Regions'
                                            }
                                        </button>
                                        <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                        <div className="w-full lg:w-[135px]">
                                            <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                        </div>
                                    </div>    
                                }
                                
                                {manageSectionFromComponant === 'userWallets' &&
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <button
                                            type="button"
                                            onClick={() => setOpenWindow?.(true)}
                                            className="w-full lg:w-[179px] py-3 flex justify-center items-center bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                            Add Wallet Amount
                                        </button>
                                        <div className="w-full lg:w-[135px]">
                                            <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2 w-full" />
                                        </div>
                                    </div>
                                }

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Table Section */}
            <CustomTable
                page={manageSectionFromComponant}
                columns={Tables[manageSectionFromComponant].columns}
                data={
                    manageSectionFromComponant === 'manageBookings' ? dummyTableData :
                    manageSectionFromComponant === 'manageSlots' ? dummySlotTableData :
                    manageSectionFromComponant === 'userWallets' ? dummyUserWallets :
                    manageSectionFromComponant === 'countries' ? dummyCountries :
                    manageSectionFromComponant === 'regions' ? dummyRegions : dummyManageSubAdmins}
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
