import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { ArrowUpToLine, Eye, Search, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { FormDropdown } from "../../../common/FormDropdown";
import { dummyManageOrdersQuestions, exportTypes } from "../../../constants/data";
import { CustomTable } from "../../../common/CustomTable";
import { useState } from "react";
import type { FilterFormValuesOnlySearch } from "../../../types/bookings";

const columns = [
    {
        key: "orderQuestionInEnglish",
        title: "Order Question In English",
    },
    {
        key: "orderQuestionInArabic",
        title: "Order Question In Arabic",
    },
    {
        key: "createDateAndTime",
        title: "Create Date & Time",
    },
    {
        key: "action",
        title: "Action",
        render: () => (
            <div className="flex gap-2 items-center">
                <button
                    className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                    onClick={() => alert('updated item')}
                >
                    <ArrowUpToLine /> update
                </button>
                <button
                    className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                    onClick={() => alert('deleted item')}
                >
                    <Trash2 /> delete
                </button>
            </div>
        ),
    },
]



export default function ManageOrdersQuestions(){
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
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <Link
                                                to={"/technicalSupport/manage/orderQuestions/addOrdersQuestions"}
                                                className="w-full text-[13px] lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                            >
                                                Aadd Order Questions
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
                    data={dummyManageOrdersQuestions}
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