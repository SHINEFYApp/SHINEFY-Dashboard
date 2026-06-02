import { useState } from "react";
import type { FilterFormValuesOnlySearch } from "../../types/bookings";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router";
import { FormInput } from "../../common/FormInput";
import { CustomTable } from "../../common/CustomTable";
import { Eye, Trash2, ToggleLeft, ToggleRight, Search } from "lucide-react";
import { useGetAds, useDeleteAd, useToggleAdStatus } from "../../api/features/ads.hooks";
import { toast } from "sonner";

export default function ManageAds() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 10;

    const { data: adsData, isLoading, isError, refetch } = useGetAds({
        start: (currentPage - 1) * pageSize,
        length: pageSize,
        search,
    });

    const { mutate: deleteAd } = useDeleteAd({
        onSuccess: () => {
            toast.success("Ad deleted successfully");
            refetch();
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to delete ad");
        },
    });

    const { mutate: toggleStatus } = useToggleAdStatus({
        onSuccess: () => {
            toast.success("Ad status toggled successfully");
            refetch();
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to toggle ad status");
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this ad?")) {
            deleteAd(id);
        }
    };

    const ads = adsData?.data?.ads || [];
    const pagination = adsData?.data?.pagination;
    const recordsTotal = pagination?.total || 0;
    const totalPages = pagination?.last_page || 1;
    const imageBase = import.meta.env.VITE_IMAGES_URL;

    const columns = [
        {
            key: "title",
            title: "Title",
            render: (_: any, row: any) => row.title || "-",
        },
        {
            key: "type",
            title: "Type",
            render: (_: any, row: any) => row.type || "-",
        },
        {
            key: "description",
            title: "Description",
            render: (_: any, row: any) =>
                row.description
                    ? row.description.length > 50
                        ? row.description.substring(0, 50) + "..."
                        : row.description
                    : "-",
        },
        {
            key: "link",
            title: "Link",
            render: (_: any, row: any) =>
                row.link ? (
                    <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-[#1976D2] underline text-sm">
                        {row.link.length > 40 ? row.link.substring(0, 40) + "..." : row.link}
                    </a>
                ) : "-",
        },
        {
            key: "image",
            title: "Image",
            render: (_: any, row: any) => (
                <img
                    src={row.image ? (row.image.startsWith("http") ? row.image : `${imageBase}/${row.image}`) : "/placeholder.png"}
                    alt={row.title}
                    className="w-12 h-12 rounded object-cover"
                />
            ),
        },
        {
            key: "start_date",
            title: "Start Date",
            render: (_: any, row: any) => row.start_date || "-",
        },
        {
            key: "end_date",
            title: "End Date",
            render: (_: any, row: any) => row.end_date || "-",
        },
        {
            key: "status",
            title: "Status",
            render: (_: any, row: any) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {row.status || "-"}
                </span>
            ),
        },
        {
            key: "is_active",
            title: "Active",
            render: (_: any, row: any) =>
                row.is_active === "1" ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                    <span className="text-red-600 font-semibold">No</span>
                ),
        },
        {
            key: "created_at",
            title: "Created At",
            render: (_: any, row: any) => row.created_at || "-",
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, row: any) => (
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] p-2 font-semibold transition-colors"
                        onClick={() => navigate(`/advertising/manage/edit/${row.id}`)}
                    >
                        <Eye /> Edit
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                        onClick={() => handleDelete(row.id)}
                    >
                        <Trash2 /> Delete
                    </button>
                    <button
                        className={`flex items-center gap-2 rounded-[2.75px] border p-2 font-semibold transition-colors ${row.is_active === "1" ? "bg-[#C9FFCB] text-[#4CAF50] border-[#4CAF50] hover:text-[#C9FFCB] hover:bg-[#4CAF50]" : "bg-gray-100 text-gray-600 border-gray-400 hover:text-white hover:bg-gray-600"}`}
                        onClick={() => toggleStatus(row.id)}
                    >
                        {row.is_active === "1" ? <ToggleRight /> : <ToggleLeft />}
                        {row.is_active === "1" ? "Active" : "Inactive"}
                    </button>
                </div>
            ),
        },
    ];

    const handleSubmit = (values: FilterFormValuesOnlySearch) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <div className="mb-6">
                    <Formik
                        initialValues={{ search: "" }}
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
                                        <Link
                                            to={"/advertising/manage/add"}
                                            className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                        >
                                            Add Ad
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
                    <div className="text-center py-10 text-red-500">Failed to load ads</div>
                ) : (
                    <CustomTable
                        columns={columns}
                        data={ads}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={recordsTotal}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </main>
    );
}
