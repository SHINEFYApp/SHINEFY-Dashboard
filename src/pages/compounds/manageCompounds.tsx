import { useState, useMemo } from "react";
import { exportTypes } from "../../constants/data";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { useGetCompounds, useDeleteCompound } from "../../api/features/compounds.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Trash2, ArrowUpToLine } from "lucide-react";
import { Link } from "react-router-dom";

const ManageCompounds = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSearchSubmit = (values: any) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    const handleFilterSubmit = (values: any) => {
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const { data, isLoading } = useGetCompounds({
        limit: pageSize,
        page: currentPage,
        search_text: search,
    });

    const compoundsRaw = data?.data?.data?.compounds;
    const compounds = (Array.isArray(compoundsRaw) ? compoundsRaw : []) as any[];

    const pagination = data?.data?.data?.pagination;
    const totalEntries = pagination?.total_items || compounds.length;
    const totalPages = pagination?.total_pages || Math.ceil(totalEntries / pageSize);

    const deleteMutation = useDeleteCompound({
        onSuccess: () => {
            toast.success("Compound deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["compounds"] });
        },
        onError: () => toast.error("Failed to delete compound"),
    });

    const handleDelete = (id: number) => {
        toast("Are you sure you want to delete this Compound?", {
            action: {
                label: "Confirm",
                onClick: () => deleteMutation.mutate(id),
            },
        });
    };

    const columns = useMemo(() => [
        { key: "code", title: "Code" },
        { key: "name_en", title: "Name (EN)" },
        { key: "name_ar", title: "Name (AR)" },
        { key: "city", title: "City" },
        { key: "address", title: "Address" },
        {
            key: "area_set",
            title: "Area Set",
            render: (area_set: boolean) => (
                <span className={`font-bold ${area_set ? "text-green-600" : "text-red-600"}`}>
                    {area_set ? "Yes" : "No"}
                </span>
            ),
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center text-nowrap">
                    <Link
                        to={`/compounds/manage/edit/${record.id}`}
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                    >
                        <ArrowUpToLine size={18} /> update
                    </Link>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => handleDelete(record.id)}
                    >
                        <Trash2 size={18} /> delete
                    </button>
                </div>
            ),
        },
    ], [handleDelete]);

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <FilterHeader
                    subtitle="Manage Compounds"
                    searchInitialValues={{ search: "" }}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={{}}
                    onFilterSubmit={handleFilterSubmit}
                    actionButtons={[
                        {
                            label: "Add Compound",
                            href: "/compounds/manage/add",
                            variant: "primary",
                        },
                    ]}
                    showExport={false}
                />
                <div className="mt-6">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <CustomTable
                            columns={columns}
                            data={compounds}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default ManageCompounds;
