import { Link, useNavigate } from "react-router";
import { FormInput } from "../../../common/FormInput";
import { ArrowUpToLine, Eye, Search, Trash2 } from "lucide-react";
import { Form, Formik } from "formik";
import { CustomTable } from "../../../common/CustomTable";
import { useState } from "react";
import { useGetExtraServices, useDeleteExtraService } from "../../../api/features/extraServices.hooks";
import { toast } from "sonner";

export default function ManageExtraService() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 10;

    const { data: extraServicesData, isLoading, isError, refetch } = useGetExtraServices({
        start: (currentPage - 1) * pageSize,
        length: pageSize,
        search,
    });

    const { mutate: deleteExtraService } = useDeleteExtraService({
        onSuccess: () => {
            toast.success("Extra service deleted successfully");
            refetch();
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to delete extra service");
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this extra service?")) {
            deleteExtraService(id);
        }
    };

    const services = extraServicesData?.data?.services || [];
    const pagination = extraServicesData?.data?.pagination;
    const recordsTotal = pagination?.total || 0;
    const totalPages = pagination?.last_page || 1;
    const imageBase = import.meta.env.VITE_API_URL;

    const columns = [
        {
            key: "extra_service_image",
            title: "Extra Image",
            render: (_: any, row: any) => (
                <img
                    src={row.extra_service_image ? `${imageBase}/uploads/service_image/${row.extra_service_image}` : "/placeholder.png"}
                    alt={row.extra_service_name}
                    className="w-12 h-12 rounded object-cover"
                />
            ),
        },
        {
            key: "extra_service_name",
            title: "Extra Service Name (English)",
            render: (_: any, row: any) => row.extra_service_name || "-",
        },
        {
            key: "extra_service_name_arabic",
            title: "Extra Service Name (Arabic)",
            render: (_: any, row: any) => row.extra_service_name_arabic || "-",
        },
        {
            key: "extra_service_price",
            title: "Extra Service Price",
            render: (_: any, row: any) => row.extra_service_price || "-",
        },
        {
            key: "extra_service_time",
            title: "Extra Service Time [ minutes ]",
            render: (_: any, row: any) => row.extra_service_time || "-",
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, row: any) => (
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] p-2 font-semibold transition-colors"
                        onClick={() => navigate(`/services&extra/manage/ExtreService/viewExtraService/${row.extra_service_id}`)}
                    >
                        <Eye /> View
                    </button>
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                        onClick={() => navigate(`/services&extra/manage/ExtreService/editExtraService/${row.extra_service_id}`)}
                    >
                        <ArrowUpToLine /> update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                        onClick={() => handleDelete(row.extra_service_id)}
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
                                <div className="flex flex-col lg:flex-row items-center gap-5">
                                    <Link
                                        to={"/services&extra/manage/extreService/addExtraService"}
                                        className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                    >
                                        Add Extra Services
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
                <div className="text-center py-10 text-red-500">Failed to load extra services</div>
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
