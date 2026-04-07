import { useState } from "react";
import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { ArrowUpToLine, Search, Trash2 } from "lucide-react";
import { FormDropdown } from "../../../common/FormDropdown";
import { exportTypes } from "../../../constants/data";
import { CustomTable } from "../../../common/CustomTable";
import AddGroup from "../popUpWindow/addGroup";
import type { addGroupTypes } from "../../../types/users&staff";
import { useGetGroups, useDeleteGroup, useExportGroups } from "../../../api/features/groups.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function ManageGroup() {
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const pageSize = 10;

    const [addGroup, setAddGroup] = useState<addGroupTypes>({
        state: false,
        data: {
            groupName: "",
            users: [],
        },
    });

    // Edit mode state: when editing, store the group data
    const [editingGroup, setEditingGroup] = useState<{ group_id: number; group_name: string; user_ids: number[] } | null>(null);

    const { data, isLoading, isError, error } = useGetGroups({
        page: currentPage,
        limit: pageSize,
        search_text: searchText || undefined,
    });

    const { mutate: deleteGroupMutate } = useDeleteGroup({
        onSuccess: () => {
            toast.success("Group deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to delete group");
        },
    });

    const { mutate: exportGroupsMutate } = useExportGroups({
        onSuccess: (data: any) => {
            if (data instanceof Blob) {
                const url = window.URL.createObjectURL(data);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Groups_Export_${Date.now()}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                toast.success("Export successful!");
            }
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to export groups");
        },
    });

    const groups = data?.data?.groups || [];
    const pagination = data?.data?.pagination;
    const totalEntries = pagination?.total_items || groups.length;
    const totalPages = pagination?.total_pages || 1;

    const handleSubmit = (values: { search: string }) => {
        setSearchText(values.search);
        setCurrentPage(1);
    };

    const handleExport = (type: string) => {
        if (type) {
            toast.info(`Exporting as ${type}...`);
            exportGroupsMutate({ search_text: searchText || undefined });
        }
    };

    const handleDelete = (groupId: number) => {
        if (window.confirm("Are you sure you want to delete this group?")) {
            deleteGroupMutate({ group_id: groupId });
        }
    };

    const handleEdit = (record: any) => {
        // Extract user IDs from the group record
        const userIds = record.user_ids || record.users?.map((u: any) => u.user_id || u.id) || [];
        const userNames = record.users
            ? (Array.isArray(record.users)
                ? (typeof record.users[0] === "string" ? record.users : record.users.map((u: any) => u.name || u))
                : [])
            : [];

        setEditingGroup({
            group_id: record.group_id,
            group_name: record.group_name,
            user_ids: userIds,
        });
        setAddGroup({
            state: true,
            data: {
                groupName: record.group_name,
                users: userNames,
            },
        });
    };

    const columns = [
        {
            key: "group_name",
            title: "Group Name",
        },
        {
            key: "users",
            title: "Users",
            render: (value: any) => {
                if (!value) return "-";
                if (Array.isArray(value)) {
                    return (
                        <div className="flex items-center gap-2 flex-wrap max-w-[550px]">
                            {value.map((u: any, idx: number) => {
                                const name = typeof u === "string" ? u : u?.name || "";
                                return (
                                    <span key={idx} className="p-2 flex gap-1 items-center rounded-2xl bg-[#FFF5D9] text-sm">
                                        {name}
                                    </span>
                                );
                            })}
                        </div>
                    );
                }
                if (typeof value === "object") return value.name || "-";
                return value;
            },
        },
        {
            key: "createtime",
            title: "Create Date & Time",
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                        onClick={() => handleEdit(record)}
                    >
                        <ArrowUpToLine className="w-4 h-4" /> update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] p-2 font-semibold transition-colors"
                        onClick={() => handleDelete(record.group_id)}
                    >
                        <Trash2 className="w-4 h-4" /> delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
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
                                            <div className="flex flex-col lg:flex-row items-center gap-5">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingGroup(null);
                                                        setAddGroup({
                                                            state: true,
                                                            data: { groupName: "", users: [] },
                                                        });
                                                    }}
                                                    className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                                >
                                                    Add Group
                                                </button>
                                                <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                                <div className="w-full lg:w-[135px]">
                                                    <FormDropdown
                                                        name="export"
                                                        label=""
                                                        placeholder="Export"
                                                        options={exportTypes}
                                                        className="mb-2"
                                                        onChangeExternal={(val) => handleExport(val)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center py-10">Loading...</div>
                    ) : isError ? (
                        <div className="text-red-500 text-center py-10">
                            Error loading groups: {(error as any)?.message}
                        </div>
                    ) : (
                        <CustomTable
                            columns={columns}
                            data={groups}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </main>
            <AddGroup
                addGroup={addGroup}
                setAddGroup={setAddGroup}
                editingGroup={editingGroup}
                setEditingGroup={setEditingGroup}
            />
        </>
    );
}
