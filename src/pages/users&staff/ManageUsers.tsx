import { Form, Formik } from "formik";
import { ArrowUpToLine, Eye, Key, Search, Shield, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetUsers, useExportUsers, useEditUserStatus, useEditOtpStatus } from "../../api/features/ManageUsers.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { FormInput } from "../../common/FormInput";
import { Link } from "react-router";
import { FormDropdown } from "../../common/FormDropdown";
import { CustomTable } from "../../common/CustomTable";
import { exportTypes } from "../../constants/data";
import FillterOptions from "./popUpWindow/filterOptions";
import type { filterOptionsTypes } from "../../types/users&staff";


export default function ManageUsers() {
    const queryClient = useQueryClient();
    const { mutate: editUserStatus } = useEditUserStatus({
        onSuccess: () => {
            toast.success("User status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update user status");
        }
    });

    const { mutate: editOtpStatus } = useEditOtpStatus({
        onSuccess: () => {
            toast.success("OTP status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update OTP status");
        }
    });

    const columns = [
        {
            key: "image",
            title: "Image",
            render: (value: string) => (
                <img src={value} alt="User" className="w-10 h-10 rounded-full object-cover" />
            )
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
            key: "phone_number",
            title: "Phone Number",
        },
        {
            key: "createtime",
            title: "Registration on",
        },
        {
            key: "status",
            title: "Status",
            render: (value: number) => (
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${value === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {value === 1 ? "Activated" : "Deactivated"}
                </span>
            )
        },
        {
            key: "otp_status",
            title: "OTP Status",
            render: (value: number) => (
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${value === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {value === 1 ? "Enabled" : "Disabled"}
                </span>
            )
        },
        {
            key: "group_name",
            title: "Group Name",
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center">
                    <Link
                        to={`/users&staff/manage/users/${record.user_id || record.id}`}
                        className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] p-2 font-semibold transition-colors"
                    >
                        <Eye className="w-4 h-4" /> View
                    </Link>
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                        onClick={() => console.log('updated item', record)}
                    >
                        <ArrowUpToLine className="w-4 h-4" /> update
                    </button>
                    <button
                        className={`flex items-center gap-2 rounded-[2.75px] p-2 font-semibold transition-colors border ${
                            record.status === 1 
                                ? "bg-[#FFD5D2] text-[#F44336] border-[#F44336] hover:text-[#FFD5D2] hover:bg-[#F44336]" 
                                : "bg-[#C9FFCB] text-[#4CAF50] border-[#4CAF50] hover:text-[#C9FFCB] hover:bg-[#4CAF50]"
                        }`}
                        onClick={() => editUserStatus({
                            user_id: record.user_id || record.id,
                            status: record.status === 1 ? 0 : 1
                        })}
                    >
                        {record.status === 1 ? (
                            <>
                                <Shield className="w-4 h-4" /> Deactivate
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="w-4 h-4" /> Activate
                            </>
                        )}
                    </button>
                    <button
                        className={`flex items-center gap-2 rounded-[2.75px] p-2 font-semibold transition-colors border ${
                            record.otp_status === 1 
                                ? "bg-[#FFD5D2] text-[#F44336] border-[#F44336] hover:text-[#FFD5D2] hover:bg-[#F44336]" 
                                : "bg-[#C9FFCB] text-[#4CAF50] border-[#4CAF50] hover:text-[#C9FFCB] hover:bg-[#4CAF50]"
                        }`}
                        onClick={() => editOtpStatus({
                            user_id: record.user_id || record.id,
                            status: record.otp_status === 1 ? 0 : 1
                        })}
                    >
                        <Key className="w-4 h-4" /> {record.otp_status === 1 ? "Disable OTP" : "Enable OTP"}
                    </button>
                </div>
            ),
        },
    ]

    const [filterOptions, setFilterOptions] = useState<filterOptionsTypes>({
        state: false,
        data: {
            groupName: "",
            companyName: "",
            areaName: "",
            deviceType: "",
            registrationStart: "",
            registrationEnd: ""
        }
    })

    console.log(filterOptions.data)
    const [filterData, setFilterData] = useState({
        search: "",
        groupName: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Combine top search and modal filter options
    const { data, isLoading, isError, error } = useGetUsers({
        page: currentPage,
        limit: pageSize,
        search_text: filterData.search,
        group_name: filterData.groupName || filterOptions.data.groupName,
        // Add other filters if supported by the API
        // area_name: filterOptions.data.areaName,
        // device_type: filterOptions.data.deviceType,
        // date_from: filterOptions.data.registrationStart,
        // date_to: filterOptions.data.registrationEnd,
    });

    const { mutate: exportMutation } = useExportUsers();

    const handleExport = (type: string) => {
        toast.info(`Exporting as ${type}...`);
        exportMutation({
            limit: 100,
            page: 1,
            group_name: filterData.groupName || filterOptions.data.groupName,
            search_text: filterData.search,
        }, {
            onSuccess: (data: any) => {
                if (data instanceof Blob) {
                    const url = window.URL.createObjectURL(data);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Users_Export_${new Date().getTime()}.${type.toLowerCase() === 'csv' ? 'csv' : 'xlsx'}`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    toast.success("Export successful! Your download should start shortly.");
                } else {
                    toast.error("Export failed: Unexpected response format.");
                }
            },
            onError: (error: any) => {
                toast.error(`Export failed: ${error.message || "Unknown error"}`);
            }
        });
    };

    const handleSubmit = (values: { search: string, groupName: string }) => {
        setFilterData({
            search: values.search,
            groupName: values.groupName
        });
        setCurrentPage(1); // Reset to first page on search
    };

    const users = data?.data?.users || [];
    const totalEntries = data?.data?.pagination?.total_items || 0;
    const totalPages = data?.data?.pagination?.total_pages || 0;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <main>
                <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                    <div className="mb-6">
                        <Formik
                            initialValues={{
                                search: '',
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
                                                    <FormDropdown
                                                        name="export"
                                                        label=""
                                                        placeholder={'Export'}
                                                        options={exportTypes}
                                                        className="mb-2"
                                                        onChangeExternal={(val) => handleExport(val)}
                                                    />
                                                </div>
                                                <div>
                                                    <button type="button" onClick={() => {
                                                        setFilterOptions({ ...filterOptions, state: true })
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
                    {isLoading ? (
                        <div className="flex justify-center py-10">Loading...</div>
                    ) : isError ? (
                        <div className="text-red-500 text-center py-10">Error loading users: {(error as any)?.message}</div>
                    ) : (
                        <CustomTable
                            columns={columns}
                            data={users}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </main>
            <FillterOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
        </>
    )
}