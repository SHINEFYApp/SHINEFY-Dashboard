import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { ArrowUpToLine, Search, Trash2 } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router";
import { FormDropdown } from "../../../common/FormDropdown";
import { CustomTable } from "../../../common/CustomTable";
import { exportTypes } from "../../../constants/data";
import {
    useGetFaqs,
    useDeleteFaq,
} from "../../../api/features/faqs.hooks";
import { exportFaqs } from "../../../api/features/faqs";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function Managefaqs() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data, isLoading } = useGetFaqs({
        page: currentPage - 1,
        limit: pageSize,
        search,
    });

    const deleteMutation = useDeleteFaq({
        onSuccess: () => {
            toast.success("FAQ deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.data?.message || "Failed to delete FAQ");
        },
    });

    const handleDelete = useCallback((id: number) => {
        if (window.confirm("Delete this FAQ?")) {
            deleteMutation.mutate(id);
        }
    }, [deleteMutation]);

    const faqs = data?.data?.faqs || [];
    const total = data?.data?.total || 0;
    const totalPages = Math.ceil(total / pageSize);

    const handleExport = async (type: string) => {
        if (!type) return;
        try {
            const blob = await exportFaqs(type.toLowerCase() as "csv" | "excel" | "pdf", search);
            const ext = type.toLowerCase();
            const filename = `Shinefy Manage FAQs.${ext === "excel" ? "xlsx" : ext}`;
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch {
            toast.error("Failed to export FAQs");
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
        {
            key: "question_in_english",
            title: "Question (English)",
        },
        {
            key: "answer_in_english",
            title: "Answer (English)",
        },
        {
            key: "question_in_arabic",
            title: "Question (Arabic)",
        },
        {
            key: "answer_in_arabic",
            title: "Answer (Arabic)",
        },
        {
            key: "action",
            title: "Action",
            render: (_value: any, row: any) => (
                <div className="flex gap-2 items-center">
                    <Link
                        to={`/technicalSupport/manage/faqs/edit/${row.faq_id}`}
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                    >
                        <ArrowUpToLine /> update
                    </Link>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                        onClick={() => handleDelete(row.faq_id)}
                    >
                        <Trash2 /> delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
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
                                                to={"/technicalSupport/manage/faqs/addFqs"}
                                                className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                            >
                                                Add FAQ
                                            </Link>
                                            <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                            <div className="w-full lg:w-[135px]">
                                                <FormDropdown name="export" label="" placeholder={"Export"} options={exportTypes} className="mb-2" />
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
                    data={faqs}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={total}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    isLoading={isLoading}
                />
            </div>
        </main>
    );
}
