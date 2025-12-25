import { Form, Formik } from "formik";
import { ArrowUpToLine, Eye, Key, Search, Shield, ShieldCheck, SlidersHorizontal, Trash2 } from "lucide-react";
import type { FilterFormValuesOnlySearch } from "../../types/bookings";
import { useState } from "react";
import { FormInput } from "../../common/FormInput";
import { Link } from "react-router";
import { FormDropdown } from "../../common/FormDropdown";
import { CustomTable } from "../../common/CustomTable";
import { dummyUsers, exportTypes } from "../../constants/data";
import { GenericModal } from "../../common/GenericModal";
import FillterOptions from "./popUpWindow/filterOptions";

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
        title: "Registration on",
    },
    {
        key: "status",
        title: "Status",
    },
    {
        key: "groupName",
        title: "Group Name",
    },
    {
        key: "action",
        title: "Action",
        render: () => (
            <div className="flex gap-2 items-center">
                <button
                    className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] p-2 font-semibold transition-colors"
                    onClick={() => alert('view item')}
                >
                    <Eye /> View
                </button>
                <button
                    className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                    onClick={() => alert('updated item')}
                >
                    <ArrowUpToLine /> update
                </button>
                <button
                    className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                    onClick={() => alert('Deactivate item')}
                >
                    <Shield />  Deactivate
                </button>
                <button
                    className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                    onClick={() => alert('Deactivate item')}
                >
                    <Key />  OTP
                </button>
                {/* <button
                    className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                    onClick={() => alert('Deactivate item')}
                >
                    <ShieldCheck />  OTP
                </button> */}
            </div>
        ),
    },
]

export default function ManageUsers(){
    const [filterOptions , setFilterOptions] = useState({
        state : false , 
        data : {}
    })

    console.log(filterOptions.data)
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
                                search : '',
                                groupName: ''
                            }}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form>
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        {/* left side  */}
                                            <div className="grid grid-cols-2 gap-2">
                                                <FormInput
                                                    name="search"
                                                    label=""
                                                    placeholder="Search"
                                                    icon={<Search className="w-5 h-5" />}
                                                    className="mb-2"
                                                    checkmark={false}
                                                />
                                                <FormInput
                                                    name="groupName"
                                                    label=""
                                                    placeholder="Group Name"
                                                    className="mb-2"
                                                    checkmark={false}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full md:w-[108px] h-fit py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Search
                                            </button>
                                        </div>
                                        {/* right side  */}
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <div className="flex flex-col lg:flex-row items-center gap-5">
                                                <Link
                                                    to={"/users&staff/manage/users/manageGroup"}
                                                    className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                                >
                                                    Manage Group
                                                </Link>
                                                <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                                <div className="w-full lg:w-[135px]">
                                                    <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                                </div>
                                                <div>
                                                    <button type="button" onClick={() => {
                                                        setFilterOptions({...filterOptions , state : true})
                                                    }} className="py-3 px-10 rounded-lg bg-[#F4F5FA]">
                                                        <SlidersHorizontal />
                                                    </button>
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
                        data={dummyUsers}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={totalEntries}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
            <FillterOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
        </>
    )
}