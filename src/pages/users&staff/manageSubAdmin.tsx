import { Form, Formik } from "formik";
import { dummyManageSubAdmins, exportTypes, franchise } from "../../constants/data";
import { FormDropdown } from "../../common/FormDropdown";
import { ArrowUpToLine, Eye, Search, Shield, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { CustomTable } from "../../common/CustomTable";
import type { FilterFormValuesManageSubAdmin } from "../../types/bookings";
import { useState } from "react";
import { FormInput } from "../../common/FormInput";


    const columns = [
        {
            key: "image",
            title: "Image",
        },
        {
            key: "name",
            title: "Name",
        },
        {
            key: "email",
            title: "Email",
        },
        {
            key: "phoneNumber",
            title: "Phone Number",
        },
        {
            key: "registrationOn",
            title: "Registration On",
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
                        className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] px-2 py-3 font-semibold transition-colors"
                        onClick={() => alert('updated item')}
                    >
                        <Eye /> View
                    </button>
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-2 py-3 font-semibold transition-colors"
                        onClick={() => alert('updated item')}
                    >
                        <ArrowUpToLine /> Update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-2 py-3 font-semibold transition-colors"
                        onClick={() => alert('deleted item')}
                    >
                        <Trash2 /> Delete
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3 py-3 font-semibold transition-colors"
                        onClick={() => alert('deleted item')}
                    >
                        <Shield /> Deactivated
                    </button>
                </div>
            ),
        },
    ]

export default function ManageSubAdmin(){
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSubmit = (values: FilterFormValuesManageSubAdmin) => {
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
                            search: '',
                            franchise: ''
                        }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    {/* rigt side */}
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
                                            <FormDropdown name="franchise" label="" placeholder="Franchise" options={franchise} className="mb-2" />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                            Search
                                        </button>
                                    </div>
                                    {/* left side */}
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <Link to="/users&staff/manage/subAdmin/addSubAdmin"
                                                type="button"
                                                className="w-full lg:w-[179px] py-3 flex justify-center items-center bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Add Sub Admin
                                            </Link>
                                            <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                            <div className="w-full lg:w-[135px]">
                                                <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2 w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                {/* table */}
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
