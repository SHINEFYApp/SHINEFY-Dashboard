import { Form, Formik } from "formik";
import { ArrowUpToLine, Eye, Key, Search, Shield, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useGetUsers, useExportUsers, useEditUserStatus, useEditOtpStatus, useGetCompanies, useEditUserProfile } from "../../api/features/ManageUsers.hooks";
import { getSubareas } from "../../api/features/bookings";
import { useGet } from "../../api/useGetData";
import { useQueryClient } from "@tanstack/react-query";
import { FormInput } from "../../common/FormInput";
import { Link, useSearchParams } from "react-router";
import { FormDropdown } from "../../common/FormDropdown";
import { CustomTable } from "../../common/CustomTable";
import { exportTypes } from "../../constants/data";
import FillterOptions from "./popUpWindow/filterOptions";
import type { filterOptionsTypes } from "../../types/users&staff";


const BASE_URL = import.meta.env.VITE_API_URL;

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

    const { mutate: editProfile } = useEditUserProfile({
        onSuccess: () => {
            toast.success("User profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update user profile");
        }
    });

    const columns = [
        {
            key: "image",
            title: "Image",
            render: (value: string) => (
                <img src={value?.startsWith("http") ? value : `${import.meta.env.VITE_IMAGES_URL}/${value}`} alt="User" className="w-10 h-10 rounded-full object-cover" />
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
                        onClick={() => setProfileModal({ open: true, data: record })}
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

    const [searchParams, setSearchParams] = useSearchParams();

    const [filterOptions, setFilterOptions] = useState<filterOptionsTypes>(() => ({
        state: false,
        data: {
            groupName: searchParams.get("filterGroupName") || "",
            activeFlag: searchParams.get("activeFlag") || "",
            otpVerify: searchParams.get("otpVerify") || "",
            loginType: searchParams.get("loginType") || "",
            companyId: searchParams.get("companyId") || "",
            createtimeFrom: searchParams.get("createtimeFrom") || "",
            createtimeTo: searchParams.get("createtimeTo") || "",
            subareaIds: searchParams.get("subareaIds") || "",
        }
    }))

    const [filterData, setFilterData] = useState(() => ({
        search: searchParams.get("search") || "",
        groupName: searchParams.get("topGroupName") || ""
    }));

    const [profileModal, setProfileModal] = useState<{ open: boolean; data?: any }>({
        open: false,
    });

    const [currentPage, setCurrentPage] = useState(() => Number(searchParams.get("page")) || 1);
    const pageSize = 10;

    const { data: companiesData } = useGetCompanies();
    const companies = companiesData?.data?.companies;

    const { data: subareasData } = useGet({
        queryFn: () => getSubareas(`${BASE_URL}/api/reports/subareas`),
        queryKey: ["reports", "subareas"],
        options: { staleTime: 1000 * 60 * 5 },
    });
    const subareas = Array.isArray(subareasData?.data) ? subareasData?.data : (subareasData?.data?.subareas || []);

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const urlParams = new URLSearchParams();
        if (filterData.search) urlParams.set("search", filterData.search);
        if (filterData.groupName) urlParams.set("topGroupName", filterData.groupName);
        if (filterOptions.data.activeFlag) urlParams.set("activeFlag", filterOptions.data.activeFlag);
        if (filterOptions.data.otpVerify) urlParams.set("otpVerify", filterOptions.data.otpVerify);
        if (filterOptions.data.loginType) urlParams.set("loginType", filterOptions.data.loginType);
        if (filterOptions.data.companyId) urlParams.set("companyId", filterOptions.data.companyId);
        if (filterOptions.data.createtimeFrom) urlParams.set("createtimeFrom", filterOptions.data.createtimeFrom);
        if (filterOptions.data.createtimeTo) urlParams.set("createtimeTo", filterOptions.data.createtimeTo);
        if (filterOptions.data.subareaIds) urlParams.set("subareaIds", filterOptions.data.subareaIds);
        if (filterOptions.data.groupName) urlParams.set("filterGroupName", filterOptions.data.groupName);
        if (currentPage > 1) urlParams.set("page", String(currentPage));
        setSearchParams(urlParams, { replace: true });
    }, [
        filterData.search, filterData.groupName,
        filterOptions.data.activeFlag, filterOptions.data.otpVerify,
        filterOptions.data.loginType, filterOptions.data.companyId,
        filterOptions.data.createtimeFrom, filterOptions.data.createtimeTo,
        filterOptions.data.subareaIds,
        filterOptions.data.groupName,
        currentPage, setSearchParams
    ]);

    const toInt = (v: string) => v ? Number(v) : undefined;

    const { data, isLoading, isError, error } = useGetUsers({
        page: currentPage,
        limit: pageSize,
        search_text: filterData.search || undefined,
        group_name: filterData.groupName || filterOptions.data.groupName || undefined,
        active_flag: toInt(filterOptions.data.activeFlag),
        otp_verify: toInt(filterOptions.data.otpVerify),
        login_type: toInt(filterOptions.data.loginType),
        company_id: toInt(filterOptions.data.companyId),
        createtime_from: filterOptions.data.createtimeFrom || undefined,
        createtime_to: filterOptions.data.createtimeTo || undefined,
        subarea_ids: filterOptions.data.subareaIds || undefined,
    });

    const { mutate: exportMutation } = useExportUsers();

    const handleExport = (type: string) => {
        toast.info(`Exporting as ${type}...`);
        exportMutation({
            limit: 100,
            page: 1,
            search_text: filterData.search || undefined,
            group_name: filterData.groupName || filterOptions.data.groupName || undefined,
            active_flag: toInt(filterOptions.data.activeFlag),
            otp_verify: toInt(filterOptions.data.otpVerify),
            login_type: toInt(filterOptions.data.loginType),
            company_id: toInt(filterOptions.data.companyId),
            createtime_from: filterOptions.data.createtimeFrom || undefined,
            createtime_to: filterOptions.data.createtimeTo || undefined,
            subarea_ids: filterOptions.data.subareaIds || undefined,
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
        setCurrentPage(1);
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
                                search: filterData.search,
                                groupName: filterData.groupName
                            }}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {() => (
                                <Form>
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
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
            
            {/* Edit Profile Modal */}
            <section
                className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30 backdrop-blur-xs transition-all duration-300 ${
                    profileModal.open ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"
                }`}
            >
                <div className={`w-[678px] relative px-10 py-8 bg-white rounded-xl transition-transform duration-300 ${
                    profileModal.open ? "scale-100" : "scale-95"
                }`}>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-[#242731] text-[20px] font-bold">Edit Profile</h1>
                        <button
                            onClick={() => setProfileModal({ open: false })}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            email: profileModal.data?.email || "",
                            phone_number: profileModal.data?.phone_number || "",
                            hide_phone_number: profileModal.data?.hide_phone_number || 0,
                        }}
                        onSubmit={(values) => {
                            editProfile({
                                user_id: profileModal.data?.user_id || profileModal.data?.id,
                                email: values.email || undefined,
                                phone_number: values.phone_number || undefined,
                                hide_phone_number: Number(values.hide_phone_number),
                            });
                            setProfileModal({ open: false });
                        }}
                    >
                        {({ isValid }) => (
                            <Form className="space-y-4">
                                <FormInput
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    type="email"
                                    checkmark={false}
                                />
                                <FormInput
                                    name="phone_number"
                                    label="Phone Number"
                                    placeholder="Phone number"
                                    type="text"
                                    checkmark={false}
                                />
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium text-gray-700">Hide Phone Number</label>
                                    <FormDropdown
                                        name="hide_phone_number"
                                        options={[
                                            { label: "No", value: 0 },
                                            { label: "Yes", value: 1 }
                                        ]}
                                        className="mb-0"
                                    />
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setProfileModal({ open: false })}
                                        className="w-[168px] border text-[16px] py-3 border-black rounded-[10px]"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-10 py-3 rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
            
            <FillterOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} companies={companies} subareas={subareas} />
        </>
    )
}