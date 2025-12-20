import { useState } from "react";
import { Button } from "../../components/ui/button";
import { FormInput } from "../../common/FormInput";
import { Form, Formik } from "formik";
import { addCountry } from "../../constants/initialValues";
import { addCountrySchema } from "../../constants/validationSchema";
import FileUploader from "../../common/fileUploader";
import { ArrowUpToLine, Search, Trash2 } from "lucide-react";
import { FormDropdown } from "../../common/FormDropdown";
import { dummyCountries, exportTypes } from "../../constants/data";
import type { FilterFormValuesOnlySearch } from "../../types/bookings";
import { CustomTable } from "../../common/CustomTable";


const columns = [
    {
        key: "flag",
        title: "Flag",
    },
    {
        key: "name",
        title: "Name",
    },
    {
        key: "createDateAndTime",
        title: "Create Date & Time",
    },{
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

export default function ManageCountries(){
    const [openWindowAddNewCountry, setOpenWindowAddNewCountry] = useState<boolean>();
    
    const handleSubmit = (values: FilterFormValuesOnlySearch) => {
        console.log("Search values:", values);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    

    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return(
        <>
            <main>
                <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                    <div className="mb-6">
                        <Formik
                            initialValues={{
                                search : ''
                            }}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form>
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        {/* left side  */}
                                            <div className="w-full md:w-52 lg:w-[446px] mb-2 -space-y-2">
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
                                                className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Search
                                            </button>
                                        </div>
                                        {/* right side  */}
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <button
                                                onClick={() => {
                                                    setOpenWindowAddNewCountry(true)
                                                }}
                                                className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                            >
                                                Add a new Country
                                            </button>
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
                    {/* table  */}
                    <CustomTable
                        page="countries"
                        columns={columns}
                        data={dummyCountries}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={totalEntries}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </div>
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
                                console.log(values)
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
    )
}