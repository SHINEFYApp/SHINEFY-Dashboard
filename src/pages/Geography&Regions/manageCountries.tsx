import { useState } from "react";
import { Button } from "../../components/ui/button";
import { FormInput } from "../../common/FormInput";
import { Form, Formik } from "formik";
import { addCountry } from "../../constants/initialValues";
import { addCountrySchema } from "../../constants/validationSchema";
import FileUploader from "../../common/fileUploader";
import { CustomTable } from "../../common/CustomTable";
import { dummyCountries, exportTypes } from "../../constants/data";
import { Search } from "lucide-react";
import { FormDropdown } from "../../common/FormDropdown";
import { countriesColumns } from "../../columns/countriesColumns";

export default function ManageCountries() {
    const [openWindowAddNewCountry, setOpenWindowAddNewCountry] = useState<boolean>();


    return (
        <>
            <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <div className="mb-6">
                    <Formik
                        initialValues={{ search: '' }}
                        onSubmit={(values) => console.log(values)}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col gap-4">
                                    {/* Filters and Actions Row */}
                                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                                        {/* Left Side - Header + Search Filters */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                            {/* Header */}
                                            <div className="flex flex-col min-w-[100px] lg:min-w-[140px]">
                                                <h1 className="text-lg md:text-xl font-bold text-secondary-900">
                                                    Filter
                                                </h1>
                                                <p className="text-xs text-secondary-500">
                                                    Manage Countries
                                                </p>
                                            </div>

                                            {/* Search Filters */}
                                            <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap gap-3 flex-1">
                                                <div className="w-full sm:flex-1 -space-y-2">
                                                    <FormInput
                                                        name="search"
                                                        label=""
                                                        placeholder="Search"
                                                        icon={<Search className="w-5 h-5" />}
                                                        className="mb-0"
                                                        checkmark={false}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full sm:w-auto sm:px-8 md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>

                                        {/* Right Side - Action Buttons */}
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 xl:gap-4 xl:shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => setOpenWindowAddNewCountry(true)}
                                                className="w-full sm:w-auto px-6 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                            >
                                                Add a new Country
                                            </button>
                                            <span className="hidden xl:block w-px h-10 bg-[#D2D2D2]"></span>
                                            <div className="w-full sm:w-auto sm:min-w-[135px] xl:w-[135px]">
                                                <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <CustomTable
                    page={'countries'}
                    columns={countriesColumns}
                    data={dummyCountries}
                    currentPage={1}
                    totalPages={Math.ceil(dummyCountries.length / 10)}
                    totalEntries={dummyCountries.length}
                    pageSize={10}
                    onPageChange={() => { }}
                />
            </main>
            <section
                className={`
                    fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                    bg-black/30 backdrop-blur-xs transition-all duration-300
                    ${openWindowAddNewCountry ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
                `}
            >
                <div className={`w-[678px] h-[579px] relative px-10 py-5 bg-white rounded-xl transition-transform duration-300 
                    ${openWindowAddNewCountry ? "scale-100" : "scale-95"}
                `}>
                    <h1 className=" text-[#242731] text-[20px] font-bold">Add a new Country</h1>
                    <div className="flex flex-col mt-10 justify-center items-center">
                        <Formik
                            initialValues={addCountry}
                            validationSchema={addCountrySchema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {({ isValid }) => (
                                <Form>
                                    <div className=" grid grid-cols-1 w-[377px]">
                                        <FileUploader name="flag" title='Flags Upload' />
                                        <div className=" mt-5">
                                            <FormInput
                                                name="name"
                                                label="Country Name"
                                                placeholder="Country Name"
                                                type="text"
                                            />
                                        </div>
                                        <div className=" w-full p-5 flex justify-between items-center absolute bottom-0 left-0">
                                            <button
                                                type="button"
                                                onClick={() => setOpenWindowAddNewCountry(false)}
                                                className="w-[168px] border text-[20px] py-3 border-black rounded-[10px]"
                                            >
                                                Back
                                            </button>

                                            <Button
                                                type="submit"
                                                disabled={!isValid}
                                                className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[429px] h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    );
}