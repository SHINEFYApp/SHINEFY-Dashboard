import { Check } from "lucide-react";
import type { PrivilegeItem } from "../api/features/subAdmins";

interface PrivilegeSelectorProps {
    privileges: PrivilegeItem[];
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
    disabled?: boolean;
}

export default function DropDownAndSelect({ privileges, selectedIds, setSelectedIds, disabled }: PrivilegeSelectorProps) {
    function togglePrivilege(id: number) {
        if (disabled) return;
        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((pId) => pId !== id);
            }
            return [...prev, id];
        });
    }

    return (
        <section>
            <h2 className="text-[20px] text-[#191919] font-bold mb-10">Privileges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {privileges.map((priv) => {
                    const isSelected = selectedIds.includes(priv.id);

                    return (
                        <div
                            key={priv.id}
                            className="w-full h-fit border border-gray-200 bg-[#F4F5FA] px-2 md:px-5 py-2 rounded-2xl"
                        >
                            <div className="w-full relative flex justify-between items-center py-3">
                                <button
                                    onClick={() => togglePrivilege(priv.id)}
                                    type="button"
                                    className={`flex gap-2 font-medium text-[15px] items-center ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
                                    disabled={disabled}
                                >
                                    <span
                                        className={`w-5 h-5 rounded flex justify-center items-center text-white ${
                                            isSelected ? "bg-green-600" : "bg-gray-300 text-transparent"
                                        }`}
                                    >
                                        <Check size={14} />
                                    </span>
                                    {priv.value}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
