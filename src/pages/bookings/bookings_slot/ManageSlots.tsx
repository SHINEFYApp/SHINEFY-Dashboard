import { Form, Formik } from "formik";
import { ArrowUpToLine, Calendar, Trash2 } from "lucide-react";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { CustomTable } from "../../../common/CustomTable";
import { exportTypes, status, types } from "../../../constants/data";
import type { FilterFormValuesManageSlots } from "../../../types/bookings";
import { useState } from "react";
import { FormDropdown } from "../../../common/FormDropdown";
import { Link, useNavigate } from "react-router";
import { useGetSpecificSlots, useDeleteSpecificSlot } from "../../../api/features/slots.hooks";
import type { GetSpecificSlotsParams } from "../../../types/slots";
import { toast } from "sonner";

const columns = [
    {
        key: "slot_date",
        title: "Slot Date",
    },
    {
        key: "create_date",
        title: "Create Date & Time",
    },
    {
        key: "type",
        title: "Type",
    },
    {
        key: "start_time",
        title: "Start Time",
    },
    {
        key: "end_time",
        title: "End Time",
    },
    {
        key: "status",
        title: "Status",
    },
];

export default function ManageSlot() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const navigate = useNavigate();

    const [filters, setFilters] = useState<GetSpecificSlotsParams>({
        page: 1,
        limit: pageSize,
    });

    const { data, isLoading } = useGetSpecificSlots(filters);
    const deleteMutation = useDeleteSpecificSlot();

    const slotsData = data?.data?.data?.slots ?? [];
    const pagination = data?.data?.data?.pagination;
    const totalEntries = pagination?.total_items ?? 0;
    const totalPages = pagination?.total_pages ?? 1;

    const handleSubmit = (values: FilterFormValuesManageSlots) => {
        setFilters({
            ...filters,
            type: values.type || undefined,
            status: values.status || undefined,
            date: values.date || undefined,
            page: 1,
        });
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setFilters({ ...filters, page });
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this slot?")) {
            deleteMutation.mutate(id, {
                onSuccess: () => {
                    toast.success("Slot deleted successfully");
                },
                onError: () => {
                    toast.error("Failed to delete slot");
                },
            });
        }
    };

    const columnsWithActions = [
        ...columns,
        {
            key: "action",
            title: "Action",
            render: (_: any, row: any) => (
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => navigate(`/bookings/slot/edit/${row.id}`)}
                    >
                        <ArrowUpToLine /> update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => handleDelete(row.id)}
                        disabled={deleteMutation.isPending}
                    >
                        <Trash2 /> delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl`}>
                <div className="mb-6">
                    <Formik
                        initialValues={{
                            type: "",
                            status: "",
                            date: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                        <div className={`flex flex-col min-w-[140px]`}>
                                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                                                Filter
                                            </h1>
                                            <p className="text-xs md:text-sm text-secondary-500">
                                                Manage Slots
                                            </p>
                                        </div>
                                        <div className={`w-full md:w-[178px] -space-y-2`}>
                                            <FormDropdown name="type" label="" placeholder="Type" options={types} className="mb-2" />
                                        </div>
                                        <div className="w-full md:w-[178px] -space-y-2">
                                            <FormDropdown name="status" label="" placeholder="Status" options={status} className="mb-2" />
                                        </div>
                                        <div className={`w-full md:w-[150px] -space-y-2`}>
                                            <FormDatePicker
                                                name="date"
                                                label=""
                                                placeholder="Date"
                                                icon={<Calendar className="w-5 h-5" />}
                                                className="mb-0"
                                                checkmark={false}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-6 lg:px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap"
                                        >
                                            Search
                                        </button>
                                    </div>
                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <div className="w-full lg:w-[135px]">
                                            <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                        </div>
                                        <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                        <Link
                                            to={"/bookings/slot/create"}
                                            className="w-full lg:w-[94px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                        >
                                            Add Slot
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <CustomTable
                    columns={columnsWithActions}
                    data={slotsData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                />
            </div>
        </main>
    );
}
