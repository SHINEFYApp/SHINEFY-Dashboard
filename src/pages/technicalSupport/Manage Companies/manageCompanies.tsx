import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { ArrowUpToLine, Eye, Search, Trash2 } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router";
import { FormDropdown } from "../../../common/FormDropdown";
import { exportTypes } from "../../../constants/data";
import { CustomTable } from "../../../common/CustomTable";
import {
    useGetCompanies,
    useDeleteCompany,
} from "../../../api/features/companies.hooks";
import { exportCompanies } from "../../../api/features/companies";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function ManageCompanies() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data, isLoading } = useGetCompanies({
        limit: pageSize,
        start: (currentPage - 1) * pageSize,
        search: search || undefined,
    });

    const companies = data?.data?.data || [];
    const pagination = data?.data?.pagination;

    const deleteMutation = useDeleteCompany({
        onSuccess: () => {
            toast.success("Company deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["companies"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.data?.message || "Failed to delete company");
        },
    });

    const handleDelete = useCallback((id: number) => {
        if (window.confirm("Delete this company?")) {
            deleteMutation.mutate(id);
        }
    }, [deleteMutation]);

    const handleExport = async (type: string) => {
        if (!type) return;
        try {
            const blob = await exportCompanies(type.toLowerCase() as "csv" | "excel" | "pdf", {
                search: search || undefined,
            });
            const ext = type.toLowerCase() === "excel" ? "xlsx" : type.toLowerCase();
            const filename = `Shinefy Companies.${ext}`;
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch {
            toast.error("Failed to export companies");
        }
    };

    const handleSubmit = (values: { search: string; export: string }) => {
        setSearch(values.search);
        setCurrentPage(1);
        if (values.export) {
            handleExport(values.export);
        }
    };

    const columns = [
        { key: "name", title: "Name" },
        { key: "code", title: "Code" },
        { key: "email_extension", title: "Email Extension" },
        { key: "num_of_users", title: "Num Of Users" },
        {
            key: "percentage",
            title: "Percentage",
            render: (value: number) => (value != null ? `${value}%` : "-"),
        },
        {
            key: "company_benefit_percentage",
            title: "Company Benefit",
            render: (value: number) => (value != null ? `${value}%` : "-"),
        },
        { key: "start_date", title: "Start Date" },
        { key: "end_date", title: "End Date" },
        { key: "created_at", title: "Created At" },
        {
            key: "action",
            title: "Action",
            render: (_value: any, row: any) => (
                <div className="flex gap-2 items-center">
                    <Link
                        to={`/technicalSupport/manage/companies/edit/${row.id}`}
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                    >
                        <ArrowUpToLine size={18} /> update
                    </Link>
                    <Link
                        to={`/technicalSupport/manage/companies/view/${row.id}`}
                        className="bg-[#E3F2FD] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-white hover:bg-[#1976D2] p-2 font-semibold transition-colors"
                    >
                        <Eye size={18} /> view
                    </Link>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                        onClick={() => handleDelete(row.id)}
                    >
                        <Trash2 size={18} /> delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <div className="mb-6">
                    <Formik
                        initialValues={{
                            search: "",
                            export: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
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
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <Link
                                                to={"/technicalSupport/manage/companies/add"}
                                                className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                            >
                                                Add Company
                                            </Link>
                                            <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                            <div className="w-full lg:w-[135px]">
                                                <FormDropdown name="export" label="" placeholder="Export" options={exportTypes} className="mb-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <CustomTable
                    columns={columns}
                    data={companies}
                    currentPage={pagination?.current_page || currentPage}
                    totalPages={pagination?.total_pages || 1}
                    totalEntries={pagination?.total_items || 0}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    isLoading={isLoading}
                />
            </div>
        </main>
    );
}
