import { Form, Formik } from "formik";
import Coupon from "../../../components/coupon/coupon";
import { FormInput } from "../../../common/FormInput";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { FormDropdown } from "../../../common/FormDropdown";
import { exportTypes } from "../../../constants/data";
import { useGetCoupons, useDeleteCoupon, useExportCoupons } from "../../../api/features/coupons.hooks";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function ManageCoupon() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { data, isLoading } = useGetCoupons({
        start: (page - 1) * pageSize,
        limit: pageSize,
        search
    });

    const exportCoupons = useExportCoupons();

    const deleteMutation = useDeleteCoupon({
        onSuccess: () => {
            toast.success("Coupon deleted");
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
        },
        onError: () => toast.error("Failed to delete coupon")
    });

    const handleDelete = (id: number) => {
        if (window.confirm("Delete this coupon?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleExport = (type: string) => {
        if (!type) return;
        // exportCoupons(type.toLowerCase() as any, search);
        // Usually opens a new window or downloads
        const url = `/api/export/coupons/${type.toLowerCase()}?search=${search}`;
        window.open(url, '_blank');
    };

    const handleSubmit = (values: { search: string, export: string }) => {
        setSearch(values.search);
        if (values.export) {
            handleExport(values.export);
        }
    };

    const coupons = data?.data?.data?.data || [];
    // If pagination exists, it might be at data.data.meta or data.data.pagination. 
    // Based on Areas, it was data.data.pagination. 
    // Here we only saw "data": { "data": [...] }. 
    // I will check for data.data.pagination safely.
    // However, user snippet didn't show it.

    return (
        <main className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <div className="mb-10">
                <Formik
                    initialValues={{
                        search: '',
                        export: '',
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {({ values, submitForm }) => (
                        <Form>
                            <div className="flex justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-2 flex-1">
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
                                        to={"/services&extra/manage/coupon/addCoupon"}
                                        className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                    >
                                        Add Coupon
                                    </Link>
                                    <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                    <div className="w-full lg:w-[135px]">
                                        <FormDropdown
                                            name="export"
                                            label=""
                                            placeholder={'Export'}
                                            options={exportTypes}
                                            className="mb-2"
                                        // Handle change immediately or on submit?
                                        // Original code handled on submit
                                        />
                                    </div>
                                    {/* Export Button explicitly or rely on search submit? Added logic in submit */}
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {isLoading ? <div>Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {coupons.map((coupon: any) => (
                        <Coupon
                            key={coupon.id}
                            data={coupon}
                            onDelete={handleDelete}
                        />
                    ))}
                    {coupons.length === 0 && <div>No coupons found.</div>}
                </div>
            )}

            {/* Simple Pagination Controls */}
            <div className="flex justify-center mt-6 gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                    disabled={coupons.length < pageSize} // Crude check
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </main>
    )
}