import { Form, Formik } from "formik";
import { Button } from "../../../components/ui/button";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { Check, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../utils/utils";
import { useGetUsers } from "../../../api/features/ManageUsers.hooks";
import { useGetCompanies } from "../../../api/features/ManageUsers.hooks";
import { manageUsersInitioalValue } from "../../../constants/initialValues";

interface SelectUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (selectedUsers: { user_id: number; name: string }[]) => void;
    initialSelectedUsers?: { user_id: number; name: string }[];
}

const loginTypeOptions = [
    { label: 'App (email/phone)', value: '0' },
    { label: 'Facebook', value: '1' },
    { label: 'Google', value: '2' },
    { label: 'Twitter', value: '3' },
    { label: 'Instagram', value: '4' },
    { label: 'Apple', value: '5' },
];

const statusOptions = [
    { label: 'Activated', value: '1' },
    { label: 'Deactivated', value: '0' },
];

const otpOptions = [
    { label: 'Verified', value: '1' },
    { label: 'Not Verified', value: '0' },
];

export default function SelectUserModal({ isOpen, onClose, onSave, initialSelectedUsers = [] }: SelectUserModalProps) {
    const [step, setStep] = useState<"filter" | "select">("filter");
    const [filterValues, setFilterValues] = useState<any>(manageUsersInitioalValue);
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>(
        initialSelectedUsers.map(u => u.user_id)
    );
    const [selectedUsers, setSelectedUsers] = useState<{ user_id: number; name: string }[]>(
        initialSelectedUsers
    );
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 100;

    const { data: companiesData } = useGetCompanies();
    const companies = companiesData?.data?.companies || [];

    const companyOptions = companies.map((c: any) => ({
        label: c.name,
        value: String(c.id),
    }));

    const params = {
        page: currentPage,
        limit: pageSize,
        ...(filterValues.activeFlag ? { active_flag: Number(filterValues.activeFlag) } : {}),
        ...(filterValues.otpVerify ? { otp_verify: Number(filterValues.otpVerify) } : {}),
        ...(filterValues.loginType ? { login_type: Number(filterValues.loginType) } : {}),
        ...(filterValues.companyId ? { company_id: Number(filterValues.companyId) } : {}),
        ...(filterValues.createtimeFrom ? { createtime_from: filterValues.createtimeFrom } : {}),
        ...(filterValues.createtimeTo ? { createtime_to: filterValues.createtimeTo } : {}),
    };

    const { data: usersData } = useGetUsers(params);
    const usersList = usersData?.data?.users || [];
    const pagination = usersData?.data?.pagination;
    const totalPages = pagination?.total_pages || 1;

    const handleApplyFilters = (values: any) => {
        setFilterValues(values);
        setCurrentPage(1);
        setStep("select");
    };

    const handleToggleAll = () => {
        const currentUserIds = usersList.map((u: any) => u.user_id || u.id);
        const currentUserEntries = usersList.map((u: any) => ({
            user_id: u.user_id || u.id,
            name: u.name || `User ${u.user_id || u.id}`,
        }));
        const allSelected = currentUserIds.every((id: number) => selectedUserIds.includes(id));

        if (allSelected) {
            setSelectedUserIds(prev => prev.filter(id => !currentUserIds.includes(id)));
            setSelectedUsers(prev => prev.filter(u => !currentUserIds.includes(u.user_id)));
        } else {
            setSelectedUserIds(prev => {
                const existing = new Set(prev);
                currentUserIds.forEach((id: number) => existing.add(id));
                return Array.from(existing);
            });
            setSelectedUsers(prev => {
                const existingIds = new Set(prev.map(u => u.user_id));
                const newEntries = currentUserEntries.filter((u: any) => !existingIds.has(u.user_id));
                return [...prev, ...newEntries];
            });
        }
    };

    const handleToggleUser = (userId: number, userName: string) => {
        setSelectedUserIds(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            }
            return [...prev, userId];
        });
        setSelectedUsers(prev => {
            if (prev.some(u => u.user_id === userId)) {
                return prev.filter(u => u.user_id !== userId);
            }
            return [...prev, { user_id: userId, name: userName }];
        });
    };

    const handleSave = () => {
        onSave(selectedUsers);
        onClose();
    };

    const handleClose = () => {
        setStep("filter");
        setFilterValues(manageUsersInitioalValue);
        setSelectedUserIds(initialSelectedUsers.map(u => u.user_id));
        setSelectedUsers(initialSelectedUsers);
        onClose();
    };

    return (
        <section
            className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30 backdrop-blur-sm z-[60]"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {step === "filter" ? (
                    <>
                        <div className="flex items-center gap-5 px-8 py-6 border-b border-gray-200">
                            <button
                                onClick={handleClose}
                                className="text-gray-400 border border-[#E7E7E7] bg-[#F7F7F7] transition-colors p-2 rounded-lg hover:bg-gray-200"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Filter Users</h2>
                                <p className="text-gray-700">Select filter criteria to find users</p>
                            </div>
                        </div>
                        <div className="bg-[#F4F5FA]">
                            <Formik
                                initialValues={filterValues}
                                onSubmit={handleApplyFilters}
                            >
                                {({ resetForm }) => (
                                    <Form>
                                        <div className="space-y-4 px-8 py-6">
                                            <FormDropdown name="activeFlag" label="Status" placeholder="Select Status" options={statusOptions} />
                                            <FormDropdown name="otpVerify" label="OTP Status" placeholder="Select OTP Status" options={otpOptions} />
                                            <FormDropdown name="loginType" label="Login Type" placeholder="Select Login Type" options={loginTypeOptions} />
                                            <FormDropdown name="companyId" label="Company" placeholder="Select Company" options={companyOptions} />
                                            <FormDatePicker name="createtimeFrom" label="Registration Start" checkmark={false} />
                                            <FormDatePicker name="createtimeTo" label="Registration End" checkmark={false} />
                                        </div>
                                        <div className="flex gap-4 items-stretch mt-8 p-6 bg-white shadow-2xl">
                                            <Button type="submit" className="bg-primary hover:bg-primary-600 text-gray-900 font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg h-full w-[60%]">
                                                Apply Filters
                                            </Button>
                                            <button type="button" onClick={() => resetForm()} className="px-6 py-3 bg-[#EFEFEF] text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors w-[40%]">
                                                Reset
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-5 px-8 py-6 border-b border-gray-200">
                            <button
                                onClick={() => setStep("filter")}
                                className="text-gray-400 border border-[#E7E7E7] bg-[#F7F7F7] transition-colors p-2 rounded-lg hover:bg-gray-200"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Select Users</h2>
                                <p className="text-gray-700">
                                    Page {currentPage} of {totalPages} ({pagination?.total_items || 0} users found)
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#F4F5FA]">
                            {usersList.length > 0 && (
                                <div className="px-8 pt-4 pb-2 border-b border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleToggleAll}
                                        className="flex items-center gap-3 py-2 px-1"
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded flex justify-center items-center transition-colors",
                                            usersList.every((u: any) => selectedUserIds.includes(u.user_id || u.id))
                                                ? "bg-green-600"
                                                : "bg-black/10"
                                        )}>
                                            {usersList.every((u: any) => selectedUserIds.includes(u.user_id || u.id)) && (
                                                <Check size={15} color="white" />
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">Select All</span>
                                    </button>
                                </div>
                            )}
                            <div className="px-8 py-4 overflow-auto h-[350px] space-y-1">
                                {usersList.length === 0 ? (
                                    <div className="text-center py-10 text-gray-500">No users found</div>
                                ) : (
                                    usersList.map((user: any) => {
                                        const userId = user.user_id || user.id;
                                        const userName = user.name || `User ${userId}`;
                                        const isSelected = selectedUserIds.includes(userId);
                                        return (
                                            <button
                                                key={userId}
                                                type="button"
                                                onClick={() => handleToggleUser(userId, userName)}
                                                className="w-full flex justify-between items-center py-3 px-5 rounded-lg hover:bg-white transition-all"
                                            >
                                                <span className="font-medium">{userName}</span>
                                                <div className={cn("w-5 h-5 rounded flex justify-center items-center", isSelected ? "bg-green-600" : "bg-black/10")}>
                                                    {isSelected && <Check size={15} color="white" />}
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-8 py-3 border-t border-gray-200">
                                    <button
                                        type="button"
                                        disabled={currentPage <= 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        type="button"
                                        disabled={currentPage >= totalPages}
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                            <div className="px-8 py-2 text-sm text-gray-600">
                                {selectedUserIds.length} user{selectedUserIds.length !== 1 ? "s" : ""} selected
                            </div>
                            <div className="flex gap-4 items-stretch p-6 bg-white shadow-2xl">
                                <Button type="button" onClick={handleSave} className="bg-primary hover:bg-primary-600 text-gray-900 font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg h-full w-[60%]" disabled={selectedUserIds.length === 0}>
                                    Save
                                </Button>
                                <button type="button" onClick={() => setStep("filter")} className="px-6 py-3 bg-[#EFEFEF] text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors w-[40%]">
                                    Back to Filters
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
