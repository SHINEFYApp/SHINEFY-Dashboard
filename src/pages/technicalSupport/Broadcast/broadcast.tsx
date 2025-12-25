import { Form, Formik } from "formik";
import type { FilterFormValuesBroadcast } from "../../../types/bookings";
import { FormInput } from "../../../common/FormInput";
import { Calendar, Search } from "lucide-react";
import { Link } from "react-router";
import { FormDropdown } from "../../../common/FormDropdown";
import { CustomTable } from "../../../common/CustomTable";
import { dummyBroadcast, exportTypes } from "../../../constants/data";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { useState } from "react";


const columns = [
    {
        key: "message",
        title: "Message",
    },
    {
        key: "type",
        title: "Type",
    },
    {
        key: "customers",
        title: "Customers",
    },
    {
        key: "broadcastDate",
        title: "Broadcast Date",
    }
]

export default function Broadcast(){
    const handleSubmit = (values: FilterFormValuesBroadcast) => {
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
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                <div className="mb-6">
                    <Formik
                        initialValues={{
                            search : '' ,
                            date : ''
                        }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                    {/* left side  */}
                                        <div className="flex items-center gap-2">
                                            <FormInput
                                                name="search"
                                                label=""
                                                placeholder="Search"
                                                icon={<Search className="w-5 h-5" />}
                                                className="w-[248px] mb-2"
                                                checkmark={false}
                                            />
                                            <FormDatePicker
                                                name="date"
                                                label=""
                                                placeholder="Date"
                                                icon={<Calendar className="w-5 h-5" />}
                                                className="mb-0 w-[248px]"
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
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <Link
                                                to={'/technicalSupport/broadcast/SendBroadcast'}
                                                className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                            >
                                                Send Broadcast
                                            </Link>
                                            <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                            <div className="w-full lg:w-[135px]">
                                                <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                {/* table  */}
                <CustomTable
                    columns={columns}
                    data={dummyBroadcast}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </div>
        </main>
    )
}