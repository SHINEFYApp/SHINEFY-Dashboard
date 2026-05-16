import { Link, useNavigate } from "react-router";
import { FormInput } from "../../../common/FormInput";
import { ArrowUpToLine, Download, Eye, Search, Trash2 } from "lucide-react";
import { Form, Formik } from "formik";
import { CustomTable } from "../../../common/CustomTable";
import { useState } from "react";
import { useGetSpecialServices, useDeleteSpecialService } from "../../../api/features/specialServices.hooks";
import { toast } from "sonner";

export default function ManageSpecialService() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 10;

    const { data: specialServicesData, isLoading, isError, refetch } = useGetSpecialServices({
        per_page: pageSize,
        page: currentPage,
        search,
    });

    const { mutate: deleteSpecialService } = useDeleteSpecialService({
        onSuccess: () => {
            toast.success("Special service deleted successfully");
            refetch();
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to delete special service");
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this special service?")) {
            deleteSpecialService(id);
        }
    };

    const services = specialServicesData?.data?.services || [];
    const pagination = specialServicesData?.data?.pagination;
    const recordsTotal = pagination?.total || 0;
    const totalPages = pagination?.last_page || 1;

    const handleExport = (format: string) => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        const baseUrl = import.meta.env.VITE_API_URL;
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        const url = `${baseUrl}/api/services/special/export/${format}?${params.toString()}`;
        window.open(url, "_blank");
    };

    const columns = [
        {
            key: "photo_url",
            title: "Image",
            render: (_: any, row: any) => (
                <img
                    src={row.photo_url || "/placeholder.png"}
                    alt={row.name_en}
                    className="w-12 h-12 rounded object-cover"
                />
            ),
        },
        {
            key: "name_en",
            title: "Name (English)",
            render: (_: any, row: any) => row.name_en || "-",
        },
        {
            key: "name_ar",
            title: "Name (Arabic)",
            render: (_: any, row: any) => row.name_ar || "-",
        },
        {
            key: "price",
            title: "Price",
            render: (_: any, row: any) => row.price || "-",
        },
        {
            key: "label",
            title: "Label",
            render: (_: any, row: any) => row.label || "-",
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, row: any) => (
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] p-2 font-semibold transition-colors"
                        onClick={() => navigate(`/services&extra/manage/SpecialService/viewSpecialService/${row.id}`)}
                    >
                        <Eye /> View
                    </button>
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                        onClick={() => navigate(`/services&extra/manage/SpecialService/editSpecialService/${row.id}`)}
                    >
                        <ArrowUpToLine /> update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                        onClick={() => handleDelete(row.id)}
                    >
                        <Trash2 /> delete
                    </button>
                </div>
            ),
        },
    ];

    const handleSubmit = (values: { search: string }) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
            <div className="mb-6">
                <Formik
                    initialValues={{ search: "" }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {() => (
                        <Form>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
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
                                        className="w-full md:w-[108px] h-fit py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                    >
                                        Search
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleExport("csv")}
                                            className="px-3 py-3 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1"
                                        >
                                            <Download className="w-4 h-4" /> CSV
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleExport("excel")}
                                            className="px-3 py-3 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1"
                                        >
                                            <Download className="w-4 h-4" /> Excel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleExport("pdf")}
                                            className="px-3 py-3 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1"
                                        >
                                            <Download className="w-4 h-4" /> PDF
                                        </button>
                                    </div>
                                    <Link
                                        to={"/services&extra/manage/SpecialService/addSpecialService"}
                                        className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                    >
                                        Add Special Services
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {isLoading ? (
                <div className="text-center py-10">Loading...</div>
            ) : isError ? (
                <div className="text-center py-10 text-red-500">Failed to load special services</div>
            ) : (
                <CustomTable
                    columns={columns}
                    data={services}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={recordsTotal}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
            )}
        </main>
    );
}
