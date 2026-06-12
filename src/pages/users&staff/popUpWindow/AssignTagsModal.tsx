import { useState, useEffect } from "react";
import { Tag, X, Check } from "lucide-react";
import { toast } from "sonner";
import { useGetUserTags, useAssignUserTags } from "../../../api/features/userTags.hooks";
import type { UserTag } from "../../../api/features/userTags";

function textColor(hex: string): string {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? "#1f2937" : "#ffffff";
}

interface Props {
    user: { user_id: number; name: string; tags: UserTag[] };
    onClose: () => void;
}

export function AssignTagsModal({ user, onClose }: Props) {
    const { data: tagsData } = useGetUserTags();
    const allTags: UserTag[] = tagsData?.data?.tags ?? [];

    const [selected, setSelected] = useState<number[]>(() => user.tags.map((t) => t.id));

    useEffect(() => {
        setSelected(user.tags.map((t) => t.id));
    }, [user]);

    const { mutate: assign, isPending } = useAssignUserTags({
        onSuccess: () => {
            toast.success("Tags updated.");
            onClose();
        },
        onError: (e: any) => toast.error(e?.response?.data?.message ?? "Failed to update tags."),
    });

    const toggle = (id: number) => {
        setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-gray-800 text-sm">Assign Tags</span>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-5 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Customer: <span className="font-semibold text-gray-800">{user.name}</span></p>
                </div>

                {/* Tags */}
                <div className="px-5 py-4 max-h-64 overflow-y-auto">
                    {allTags.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">No tags available. Create tags first.</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => {
                                const isSelected = selected.includes(tag.id);
                                return (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => toggle(tag.id)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border-2"
                                        style={{
                                            backgroundColor: isSelected ? tag.color : "transparent",
                                            color: isSelected ? textColor(tag.color) : tag.color,
                                            borderColor: tag.color,
                                        }}
                                    >
                                        {isSelected && <Check className="w-3 h-3" />}
                                        {tag.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 px-5 py-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => assign({ userId: user.user_id, tagIds: selected })}
                        disabled={isPending}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors disabled:opacity-40"
                    >
                        {isPending ? "Saving..." : "Save Tags"}
                    </button>
                </div>
            </div>
        </div>
    );
}
