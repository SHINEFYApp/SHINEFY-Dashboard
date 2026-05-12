import { Form, Formik } from "formik";
import { Button } from "../../../components/ui/button";
import type { addGroupProps } from "../../../types/users&staff";
import { FormInput } from "../../../common/FormInput";
import { X, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useAddGroup, useEditGroup } from "../../../api/features/groups.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import SelectUserModal from "./selectUserModal";

export default function AddGroup({ addGroup, setAddGroup, editingGroup, setEditingGroup }: addGroupProps) {
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [isSelectUserModalOpen, setIsSelectUserModalOpen] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editingGroup) {
            setSelectedUserIds(editingGroup.user_ids);
        } else if (!addGroup.state) {
            setSelectedUserIds([]);
        }
    }, [editingGroup, addGroup.state]);

    const { mutate: addGroupMutate, isPending: isAdding } = useAddGroup({
        onSuccess: () => {
            toast.success("Group added successfully");
            setAddGroup({ state: false, data: { groupName: "", users: [] } });
            setSelectedUserIds([]);
            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to add group");
        },
    });

    const { mutate: editGroupMutate, isPending: isEditing } = useEditGroup({
        onSuccess: () => {
            toast.success("Group updated successfully");
            setAddGroup({ state: false, data: { groupName: "", users: [] } });
            setSelectedUserIds([]);
            setEditingGroup?.(null);
            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to update group");
        },
    });

    const handleSubmitGroup = (groupName: string) => {
        if (editingGroup) {
            editGroupMutate({
                group_id: editingGroup.group_id,
                group_name: groupName,
                user_id: selectedUserIds,
            });
        } else {
            addGroupMutate({
                group_name: groupName,
                user_id: selectedUserIds,
            });
        }
    };

    const handleSelectUserSave = (users: { user_id: number; name: string }[]) => {
        setSelectedUserIds(users.map(u => u.user_id));
        setAddGroup({
            ...addGroup,
            data: {
                ...addGroup.data,
                users: users.map(u => u.name),
            },
        });
        setIsSelectUserModalOpen(false);
    };

    const initialSelectedUsers = editingGroup
        ? editingGroup.user_ids.map((id, idx) => ({
            user_id: id,
            name: addGroup.data.users[idx] || `User ${id}`,
        }))
        : selectedUserIds.map((id, idx) => ({
            user_id: id,
            name: addGroup.data.users[idx] || `User ${id}`,
        }));

    return (
        <>
            <section
                className={`
                    fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                    bg-black/30 backdrop-blur-xs transition-all duration-300
                    ${addGroup.state ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
                `}
            >
                <div
                    className={`w-[678px] min-h-[579px] max-h-[90vh] bg-[#F7F7F7] rounded-xl transition-transform duration-300 flex flex-col
                    ${addGroup.state ? "scale-100" : "scale-95"}
                `}
                >
                    <h1 className="text-[#242731] text-[25px] font-bold px-5 pt-5 shrink-0">
                        {addGroup.data.groupName ? "Edit Group" : "Add Group"}
                    </h1>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            groupName: addGroup.data.groupName || "",
                        }}
                        onSubmit={(values) => {
                            if (!values.groupName.trim()) {
                                toast.error("Please enter group name");
                                return;
                            }
                            if (selectedUserIds.length === 0) {
                                toast.error("Please choose at least one user");
                                return;
                            }
                            handleSubmitGroup(values.groupName);
                        }}
                    >
                        {() => (
                            <Form className="flex flex-col flex-1 min-h-0">
                                <div className="flex-1 overflow-y-auto px-5">
                                    <div className="mt-5">
                                        <FormInput
                                            name="groupName"
                                            label="Group Name"
                                            placeholder="Group Name"
                                            type="text"
                                        />
                                        <div className="mt-4">
                                            <label className="text-sm font-medium text-gray-700">Users</label>
                                            <button
                                                type="button"
                                                onClick={() => setIsSelectUserModalOpen(true)}
                                                className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 bg-black text-white rounded-xl font-medium hover:bg-black/85 transition-all"
                                            >
                                                <Users size={18} />
                                                Select User
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center flex-wrap mt-10">
                                        {addGroup.data.users.length > 0 &&
                                            addGroup.data.users.map((name, idx) => (
                                                <button
                                                    key={`${name}-${idx}`}
                                                    type="button"
                                                    onClick={() => {
                                                        const newUsers = [...addGroup.data.users];
                                                        newUsers.splice(idx, 1);
                                                        const newIds = [...selectedUserIds];
                                                        newIds.splice(idx, 1);
                                                        setSelectedUserIds(newIds);
                                                        setAddGroup({
                                                            ...addGroup,
                                                            data: {
                                                                ...addGroup.data,
                                                                users: newUsers,
                                                            },
                                                        });
                                                    }}
                                                    className="py-2 px-5 flex items-center gap-2 rounded-lg bg-[#F3F4F6] hover:bg-red-50 transition-colors"
                                                >
                                                    {name}
                                                    <X size={15} color="red" />
                                                </button>
                                            ))}
                                    </div>
                                </div>

                                <div className="w-full p-5 bg-white flex justify-between items-center shrink-0 rounded-b-xl">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setAddGroup({ ...addGroup, state: false })
                                        }
                                        className="w-[168px] border h-[54px] border-black rounded-[10px] text-[16px]"
                                    >
                                        Back
                                    </button>
                                    <Button
                                        type="submit"
                                        disabled={isAdding || isEditing}
                                        className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[429px] h-[54px] rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isAdding || isEditing ? "Saving..." : addGroup.data.groupName ? "Update" : "Add"}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
            {isSelectUserModalOpen && (
                <SelectUserModal
                    isOpen={isSelectUserModalOpen}
                    onClose={() => setIsSelectUserModalOpen(false)}
                    onSave={handleSelectUserSave}
                    initialSelectedUsers={initialSelectedUsers}
                />
            )}
        </>
    );
}
