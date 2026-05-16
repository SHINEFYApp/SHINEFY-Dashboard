import { useState, useMemo } from "react";
import { exportTypes } from "../../constants/data";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { useGetPackages, useDeletePackage } from "../../api/features/compounds.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Trash2, ArrowUpToLine } from "lucide-react";
import { Link } from "react-router-dom";

const ManageCompoundPackages = () => {
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

    const { data, isLoading } = useGetPackages({
        limit: pageSize,
        page: currentPage,
        search_text: search,
    });

    const packagesRaw = data?.data?.data?.packages;
    const packages = (Array.isArray(packagesRaw) ? packagesRaw : []) as any[];

    const pagination = data?.data?.data?.pagination;
    const totalEntries = pagination?.total_items || packages.length;
    const totalPages = pagination?.total_pages || Math.ceil(totalEntries / pageSize);

    const deleteMutation = useDeletePackage({
        onSuccess: () => {
            toast.success("Package deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["compound-packages"] });
        },
        onError: () => toast.error("Failed to delete package"),
    });

    const handleDelete = (id: number) => {
        toast("Are you sure you want to delete this Package?", {
            action: {
                label: "Confirm",
                onClick: () => deleteMutation.mutate(id),
            },
        });
    };

    const columns = useMemo(() => [
        { key: "name_en", title: "Name (EN)" },
        { key: "name_ar", title: "Name (AR)" },
        {
            key: "price",
            title: "Price",
            render: (price: number) => `${Number(price).toFixed(2)}`,
        },
        { key: "period_days", title: "Period (Days)" },
        {
            key: "compounds",
            title: "Compounds",
            render: (compounds: any[]) =>
                compounds?.map((c: any) => c.name).join(", ") || "-",
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center text-nowrap">
                    <Link
                        to={`/compounds/packages/edit/${record.id}`}
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
                    subtitle="Manage Packages"
                    searchInitialValues={{ search: "" }}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={{}}
                    onFilterSubmit={handleFilterSubmit}
                    actionButtons={[
                        {
                            label: "Add Package",
                            href: "/compounds/packages/add",
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
                            data={packages}
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

export default ManageCompoundPackages;
