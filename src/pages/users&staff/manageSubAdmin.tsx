import { Form, Formik } from "formik";
import { exportTypes, franchise } from "../../constants/data";
import { FormDropdown } from "../../common/FormDropdown";
import { ArrowUpToLine, Eye, Search, Shield, Trash2, Ban, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomTable } from "../../common/CustomTable";
import { useState, useMemo } from "react";
import { FormInput } from "../../common/FormInput";
import { useGetSubAdmins, useDeleteSubAdmin, useExportSubAdmins } from "../../api/features/subAdmins.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ManageSubAdmin() {
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 10;

    const handleSubmit = (values: any) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    // Data Fetching
    const { data, isLoading } = useGetSubAdmins({
        limit: pageSize,
        start: (currentPage - 1) * pageSize,
        search: search
    });

    const subAdminsRaw = data?.data?.data?.data || data?.data?.data || [];
    const subAdmins = (Array.isArray(subAdminsRaw) ? subAdminsRaw : []) as any[];

    const pagination = data?.data?.pagination;
    const totalEntries = pagination?.total_items || subAdmins.length; // Fallback
    const totalPages = pagination?.total_pages || Math.ceil(totalEntries / pageSize);

    // Mutations
    const deleteMutation = useDeleteSubAdmin({
        onSuccess: () => {
            toast.success("Sub Admin deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["sub-admins"] });
        },
        onError: () => toast.error("Failed to delete")
    });

    const exportMutation = useExportSubAdmins({
        onSuccess: () => toast.success("Export successful"),
        onError: () => toast.error("Export failed")
    });

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleExport = (type: string) => {
        const exportType = type.toLowerCase() as 'csv' | 'excel' | 'pdf';
        exportMutation.mutate({
            type: exportType,
            params: { search }
        });
    };

    // Columns
    const columns = useMemo(() => [
        {
            key: "image_url", // API uses image_url likely? or image? Postman create uses 'image'. Service Boys used 'image_url'. I'll try image_url, fallback image
            title: "Image",
            render: (image: string) => (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    {image ? <img src={image} alt="Sub Admin" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200"></div>}
                </div>
            )
        },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" }, // Sub Admin has email
        { key: "phone_number", title: "Phone Number" },
        { key: "created_at", title: "Registration On" }, // Verify field
        {
            key: "active_flag", // Assuming active_flag exists
            title: "Status",
            render: (status: number) => (
                <span className={`font-bold ${status === 1 ? 'text-green-600' : 'text-red-500'}`}>
                    {status === 1 ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            key: "action",
            title: "Action",
            width: "w-[500px]",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center text-nowrap">
                    <Link
                        to={`/users&staff/manage/subAdmin/view/${record.user_id || record.id}`}
                        className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] px-3 py-3 font-semibold transition-colors"
                    >
                        <Eye size={18} /> View
                    </Link>
                    <Link
                        to={`/users&staff/manage/subAdmin/edit/${record.user_id || record.id}`}
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3 py-3 font-semibold transition-colors"
                    >
                        <ArrowUpToLine size={18} /> Update
                    </Link>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3 py-3 font-semibold transition-colors"
                        onClick={() => handleDelete(record.user_id || record.id)}
                    >
                        <Trash2 size={18} /> Delete
                    </button>
                </div>
            ),
        },
    ], [handleDelete]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl`}>
                <div className="mb-6">
                    <Formik
                        initialValues={{
                            search: '',
                            franchise: ''
                        }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    {/* rigt side */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        <div className="w-full md:w-52 lg:w-60 mb-2 -space-y-2">
                                            <FormInput
                                                name="search"
                                                label=""
                                                placeholder="Search"
                                                icon={<Search className="w-5 h-5" />}
                                                className="mb-0"
                                                checkmark={false}
                                            />
                                        </div>
                                        <div className="w-full md:w-52 lg:w-60 -space-y-2">
                                            <FormDropdown name="franchise" label="" placeholder="Franchise" options={franchise} className="mb-2" />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                            Search
                                        </button>
                                    </div>
                                    {/* left side */}
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <div className="flex flex-col lg:flex-row items-center gap-5">
                                            <Link to="/users&staff/manage/subAdmin/addSubAdmin"
                                                className="w-full lg:w-[179px] py-3 flex justify-center items-center bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Add Sub Admin
                                            </Link>
                                            <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                            <div className="w-full lg:w-[135px]">
                                                <FormDropdown
                                                    name="export"
                                                    label=""
                                                    placeholder={'Export'}
                                                    options={exportTypes}
                                                    onChangeExternal={handleExport}
                                                    className="mb-2 w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                {/* table */}
                {isLoading ? <div>Loading...</div> : (
                    <CustomTable
                        columns={columns}
                        data={subAdmins}
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
};
