import { Form, Formik } from "formik";
import { Button } from "../../../components/ui/button";
import type { addGroupProps, addGroupTypes } from "../../../types/users&staff";
import { FormInput } from "../../../common/FormInput";
import { FormDataList } from "../../../common/dataList";
import { Check, SlidersHorizontal, X } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { cn } from "../../../utils/utils";
import { useAddGroup, useEditGroup } from "../../../api/features/groups.hooks";
import { useGetUsers } from "../../../api/features/ManageUsers.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface renderProps {
    wordOfreder: string;
    setAddGroup: Dispatch<SetStateAction<addGroupTypes>>;
    addGroup: addGroupTypes;
    setWordToRender: Dispatch<SetStateAction<string>>;
    selectedUserIds: number[];
    setSelectedUserIds: Dispatch<SetStateAction<number[]>>;
    onSubmitGroup: (groupName: string) => void;
    isSubmitting: boolean;
    usersList: any[];
}

const render = ({
    wordOfreder,
    setAddGroup,
    addGroup,
    setWordToRender,
    selectedUserIds,
    setSelectedUserIds,
    onSubmitGroup,
    isSubmitting,
    usersList,
}: renderProps) => {
    if (wordOfreder === "orginal") {
        return (
            <>
                <h1 className="text-[#242731] text-[25px] font-bold">
                    {addGroup.data.groupName ? "Edit Group" : "Add Group"}
                </h1>
                <div className="flex flex-col justify-center items-center">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            groupName: addGroup.data.groupName || "",
                            chooseUser: "",
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
                            onSubmitGroup(values.groupName);
                        }}
                    >
                        {() => (
                            <Form>
                                <div className="grid grid-cols-1 w-[523px]">
                                    <div className="mt-5">
                                        <FormInput
                                            name="groupName"
                                            label="Group Name"
                                            placeholder="Group Name"
                                            type="text"
                                        />
                                        <div className="flex gap-5 mt-2 items-end">
                                            <FormDataList
                                                name="chooseUser"
                                                label="Choose User"
                                                placeholder="Choose User"
                                                options={usersList.map((u: any) => u.name || `User ${u.user_id}`)}
                                                className="w-[90%]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setWordToRender("select users")}
                                                className="w-[10%] flex h-[47px] mb-0.5 justify-center items-center bg-black rounded-lg"
                                            >
                                                <SlidersHorizontal color="white" />
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
                                                        const userIndex = addGroup.data.users.indexOf(name);
                                                        const newUsers = [...addGroup.data.users];
                                                        newUsers.splice(userIndex, 1);
                                                        const newIds = [...selectedUserIds];
                                                        newIds.splice(userIndex, 1);
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

                                    <div className="w-full p-5 bg-white flex justify-between items-center absolute bottom-0 left-0">
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
                                            disabled={isSubmitting}
                                            className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[429px] h-[54px] rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            {isSubmitting ? "Saving..." : addGroup.data.groupName ? "Update" : "Add"}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h1 className="text-[#242731] text-[25px] font-bold">Choose User</h1>
                <div className="flex flex-col justify-center items-center">
                    <div className="grid grid-cols-1 w-[523px]">
                        <div className="bg-[#F4F5FA] flex p-5 rounded-xl flex-col gap-2 mt-10 overflow-auto h-[400px]">
                            {usersList.map((user: any) => {
                                const userId = user.user_id || user.id;
                                const userName = user.name || `User ${userId}`;
                                const isSelected = selectedUserIds.includes(userId);
                                return (
                                    <button
                                        key={userId}
                                        type="button"
                                        onClick={() => {
                                            if (isSelected) {
                                                const idx = selectedUserIds.indexOf(userId);
                                                const newIds = [...selectedUserIds];
                                                newIds.splice(idx, 1);
                                                setSelectedUserIds(newIds);
                                                const newUsers = [...addGroup.data.users];
                                                newUsers.splice(idx, 1);
                                                setAddGroup({
                                                    ...addGroup,
                                                    data: { ...addGroup.data, users: newUsers },
                                                });
                                            } else {
                                                setSelectedUserIds([...selectedUserIds, userId]);
                                                setAddGroup({
                                                    ...addGroup,
                                                    data: {
                                                        ...addGroup.data,
                                                        users: [...addGroup.data.users, userName],
                                                    },
                                                });
                                            }
                                        }}
                                        className="flex justify-between items-center py-2 px-5 rounded-lg transition-all"
                                    >
                                        {userName}
                                        <div
                                            className={cn(
                                                "w-5 h-5 rounded flex justify-center items-center",
                                                isSelected ? "bg-green-600" : "bg-black/10"
                                            )}
                                        >
                                            {isSelected && <Check size={15} color="white" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="w-full p-5 bg-white flex justify-between items-center absolute bottom-0 left-0">
                            <button
                                type="button"
                                onClick={() => setWordToRender("orginal")}
                                className="w-[168px] border h-[54px] border-black rounded-[10px] text-[16px]"
                            >
                                Back
                            </button>
                            <Button
                                type="button"
                                onClick={() => setWordToRender("orginal")}
                                className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[429px] h-[54px] rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default function AddGroup({ addGroup, setAddGroup, editingGroup, setEditingGroup }: addGroupProps) {
    const [wordToRender, setWordToRender] = useState<string>("orginal");
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const queryClient = useQueryClient();

    // Fetch users list for selection
    const { data: usersData } = useGetUsers({ page: 1, limit: 100 });
    const usersList = usersData?.data?.users || [];

    const { mutate: addGroupMutate, isPending: isAdding } = useAddGroup({
        onSuccess: () => {
            toast.success("Group added successfully");
            setAddGroup({ state: false, data: { groupName: "", users: [] } });
            setSelectedUserIds([]);
            setWordToRender("orginal");
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
            setWordToRender("orginal");
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

    return (
        <section
            className={`
                fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                bg-black/30 backdrop-blur-xs transition-all duration-300
                ${addGroup.state ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
            `}
        >
            <div
                className={`${
                    wordToRender === "orginal"
                        ? "w-[678px] h-[579px] bg-[#F7F7F7]"
                        : "h-[90%] w-[678px] bg-[#FFFFFF]"
                } p-5 relative overflow-hidden rounded-xl transition-transform duration-300
                ${addGroup.state ? "scale-100" : "scale-95"}
            `}
            >
                {render({
                    wordOfreder: wordToRender,
                    setAddGroup,
                    addGroup,
                    setWordToRender,
                    selectedUserIds,
                    setSelectedUserIds,
                    onSubmitGroup: handleSubmitGroup,
                    isSubmitting: isAdding || isEditing,
                    usersList,
                })}
            </div>
        </section>
    );
}
