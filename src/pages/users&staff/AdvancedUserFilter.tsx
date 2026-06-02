import { Form, Formik } from "formik";
import { Download, Search, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router";
import { useGetAdvancedFilterUsers, useExportAdvancedFilterUsers } from "../../api/features/advancedUserFilter.hooks";
import { filterOptionsList, filterNeedsDateRange, filterNeedsMinBookings, filterNeedsDays, filterNeedsCancelPct } from "../../api/features/advancedUserFilter.services";
import type { AdvancedFilterUser } from "../../api/features/advancedUserFilter.services";
import { extraColumnsMap } from "../../columns/advancedUserFilterColumns";
import { CustomTable } from "../../common/CustomTable";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { FormDateRangePicker } from "../../common/FormDateRangePicker";

const pageSize = 10;

export default function AdvancedUserFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [appliedFilters, setAppliedFilters] = useState(() => ({
        filter_type: searchParams.get("filter_type") || "",
        from_date: searchParams.get("from_date") || "",
        to_date: searchParams.get("to_date") || "",
        register_from_date: searchParams.get("register_from_date") || "",
        register_to_date: searchParams.get("register_to_date") || "",
        min_bookings: searchParams.get("min_bookings") || "",
        days: searchParams.get("days") || "",
        cancel_pct: searchParams.get("cancel_pct") || "",
    }));

    const [currentPage, setCurrentPage] = useState(() => Number(searchParams.get("page")) || 1);

    const isFilterSelected = !!appliedFilters.filter_type;

    const queryParams = useMemo(() => {
        if (!isFilterSelected) return { filter_type: "" };
        const params: Record<string, any> = {
            filter_type: appliedFilters.filter_type,
            page: currentPage,
            limit: pageSize,
        };
        if (appliedFilters.from_date) params.from_date = appliedFilters.from_date;
        if (appliedFilters.to_date) params.to_date = appliedFilters.to_date;
        if (appliedFilters.register_from_date) params.register_from_date = appliedFilters.register_from_date;
        if (appliedFilters.register_to_date) params.register_to_date = appliedFilters.register_to_date;
        if (appliedFilters.min_bookings) params.min_bookings = Number(appliedFilters.min_bookings);
        if (appliedFilters.days) params.days = Number(appliedFilters.days);
        if (appliedFilters.cancel_pct) params.cancel_pct = Number(appliedFilters.cancel_pct);
        return params;
    }, [appliedFilters, currentPage, isFilterSelected]);

    const { data, isLoading, isError, error } = useGetAdvancedFilterUsers(queryParams as any, {
        enabled: isFilterSelected,
    });

    const { mutate: exportMutation } = useExportAdvancedFilterUsers();

    const handleExport = () => {
        if (!isFilterSelected) {
            toast.error("Please select a filter type first");
            return;
        }
        toast.info("Exporting...");
        exportMutation(queryParams as any, {
            onSuccess: (response: any) => {
                const blob = response?.data instanceof Blob ? response.data : response;
                if (blob instanceof Blob) {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `users-${appliedFilters.filter_type}-${new Date().toISOString().split("T")[0]}.xlsx`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    toast.success("Export successful!");
                } else {
                    toast.error("Export failed: Unexpected response format.");
                }
            },
            onError: (error: any) => {
                toast.error(`Export failed: ${error.message || "Unknown error"}`);
            },
        });
    };

    const handleSubmit = (values: typeof appliedFilters) => {
        const params = new URLSearchParams();
        if (values.filter_type) params.set("filter_type", values.filter_type);
        if (values.from_date) params.set("from_date", values.from_date);
        if (values.to_date) params.set("to_date", values.to_date);
        if (values.register_from_date) params.set("register_from_date", values.register_from_date);
        if (values.register_to_date) params.set("register_to_date", values.register_to_date);
        if (values.min_bookings) params.set("min_bookings", values.min_bookings);
        if (values.days) params.set("days", values.days);
        if (values.cancel_pct) params.set("cancel_pct", values.cancel_pct);
        setSearchParams(params, { replace: true });
        setAppliedFilters(values);
        setCurrentPage(1);
    };

    const selectedFilter = appliedFilters.filter_type;
    const showDateRange = filterNeedsDateRange.includes(selectedFilter);
    const showMinBookings = filterNeedsMinBookings.includes(selectedFilter);
    const showDays = filterNeedsDays.includes(selectedFilter);
    const showCancelPct = filterNeedsCancelPct.includes(selectedFilter);

    const extraColDefs = extraColumnsMap[selectedFilter] || [];

    const users = data?.data?.users || [];
    const totalEntries = data?.data?.pagination?.total_items || 0;
    const totalPages = data?.data?.pagination?.total_pages || 0;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const columns = useMemo(() => {
        const base: any[] = [
            {
                key: "image",
                title: "Image",
                render: (value: string) => (
                    <img
                        src={value?.startsWith("http") ? value : `${import.meta.env.VITE_IMAGES_URL}/${value}`}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ),
            },
            { key: "name", title: "Name" },
            { key: "email", title: "Email" },
            { key: "phone_number", title: "Phone Number" },
            { key: "createtime", title: "Registered" },
            {
                key: "status",
                title: "Status",
                render: (value: number) => (
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${value === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {value === 1 ? "Activated" : "Deactivated"}
                    </span>
                ),
            },
            {
                key: "otp_status",
                title: "OTP Status",
                render: (value: number) => (
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${value === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {value === 1 ? "Enabled" : "Disabled"}
                    </span>
                ),
            },
        ];

        extraColDefs.forEach((col) => {
            if (col.render) {
                base.push({ key: col.key, title: col.title, render: (value: any, record: AdvancedFilterUser) => col.render!(value, record) });
            } else {
                base.push({ key: col.key, title: col.title });
            }
        });

        base.push({
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <Link
                    to={`/users&staff/manage/users/${record.user_id || record.id}`}
                    className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] p-2 font-semibold transition-colors w-fit"
                >
                    <Eye className="w-4 h-4" /> View
                </Link>
            ),
        });

        return base;
    }, [extraColDefs]);

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <div className="mb-6">
                    <Formik
                        initialValues={{
                            filter_type: appliedFilters.filter_type,
                            from_date: appliedFilters.from_date,
                            to_date: appliedFilters.to_date,
                            register_from_date: appliedFilters.register_from_date,
                            register_to_date: appliedFilters.register_to_date,
                            min_bookings: appliedFilters.min_bookings,
                            days: appliedFilters.days,
                            cancel_pct: appliedFilters.cancel_pct,
                        }}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-4">
                                        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-4 flex-1 flex-wrap">
                                            <div className="w-full md:w-[280px]">
                                                <FormDropdown
                                                    name="filter_type"
                                                    label="Filter Type"
                                                    placeholder="Select a filter..."
                                                    options={filterOptionsList}
                                                />
                                            </div>

                                            {showDateRange && (
                                                <div className="w-full md:w-[320px]">
                                                    <FormDateRangePicker
                                                        fromName="from_date"
                                                        toName="to_date"
                                                        label="Date Range"
                                                        placeholder="Select date range"
                                                    />
                                                </div>
                                            )}

                                            {showMinBookings && (
                                                <div className="w-full md:w-[160px]">
                                                    <FormInput
                                                        name="min_bookings"
                                                        label="Min Bookings"
                                                        placeholder="e.g. 5"
                                                        type="number"
                                                        checkmark={false}
                                                    />
                                                </div>
                                            )}

                                            {showDays && (
                                                <div className="w-full md:w-[160px]">
                                                    <FormInput
                                                        name="days"
                                                        label="Days Until Expiry"
                                                        placeholder="Default: 15"
                                                        type="number"
                                                        checkmark={false}
                                                    />
                                                </div>
                                            )}

                                            {showCancelPct && (
                                                <div className="w-full md:w-[160px]">
                                                    <FormInput
                                                        name="cancel_pct"
                                                        label="Cancel %"
                                                        placeholder="Default: 20"
                                                        type="number"
                                                        checkmark={false}
                                                    />
                                                </div>
                                            )}

                                            <div className="w-full md:w-[320px]">
                                                <FormDateRangePicker
                                                    fromName="register_from_date"
                                                    toName="register_to_date"
                                                    label="Registration Date"
                                                    placeholder="Select registration date range"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full md:w-[120px] h-fit py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap flex items-center justify-center gap-2"
                                            >
                                                <Search className="w-4 h-4" /> Search
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={handleExport}
                                                disabled={!isFilterSelected}
                                                className="w-full lg:w-auto py-3 px-6 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Download className="w-4 h-4" /> Export
                                            </button>
                                        </div>
                                    </div>

                                    {selectedFilter && (
                                        <p className="text-xs text-gray-500">
                                            Showing results for: <span className="font-semibold text-gray-700">{filterOptionsList.find(f => f.value === selectedFilter)?.label || selectedFilter}</span>
                                            {showDateRange && appliedFilters.from_date && appliedFilters.to_date && (
                                                <> &middot; {appliedFilters.from_date} to {appliedFilters.to_date}</>
                                            )}
                                            {appliedFilters.register_from_date && appliedFilters.register_to_date && (
                                                <> &middot; Registered {appliedFilters.register_from_date} to {appliedFilters.register_to_date}</>
                                            )}
                                        </p>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {!isFilterSelected ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg font-medium">Select a filter type and click Search</p>
                        <p className="text-sm mt-1">Choose from 13 different user filter criteria</p>
                    </div>
                ) : isLoading ? (
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
    );
}
