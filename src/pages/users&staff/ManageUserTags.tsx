import { useState } from "react";
import { Tag, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useGetUserTags, useCreateUserTag, useUpdateUserTag, useDeleteUserTag } from "../../api/features/userTags.hooks";
import { type UserTag } from "../../api/features/userTags";
import { SkeletonDemo } from "../../common/loader";

const PRESET_COLORS = [
    "#6366f1", "#8b5cf6", "#ec4899", "#ef4444", "#f97316",
    "#eab308", "#22c55e", "#14b8a6", "#3b82f6", "#64748b",
];

function textColor(hex: string): string {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? "#1f2937" : "#ffffff";
}

function TagForm({
    initial,
    onSave,
    onCancel,
    loading,
}: {
    initial?: Partial<UserTag>;
    onSave: (name: string, color: string) => void;
    onCancel: () => void;
    loading: boolean;
}) {
    const [name, setName] = useState(initial?.name ?? "");
    const [color, setColor] = useState(initial?.color ?? PRESET_COLORS[0]);

    return (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tag name..."
                className="flex-1 min-w-[160px] px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                onKeyDown={(e) => { if (e.key === "Enter") onSave(name, color); }}
            />
            <div className="flex items-center gap-1.5">
                {PRESET_COLORS.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                        style={{
                            backgroundColor: c,
                            borderColor: color === c ? "#1f2937" : "transparent",
                        }}
                    />
                ))}
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border border-gray-200"
                    title="Custom color"
                />
            </div>
            {/* Preview */}
            <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: color, color: textColor(color) }}
            >
                {name || "Preview"}
            </span>
            <button
                onClick={() => onSave(name, color)}
                disabled={!name.trim() || loading}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-40 transition-colors"
            >
                <Check className="w-4 h-4" />
                {loading ? "Saving..." : "Save"}
            </button>
            <button
                onClick={onCancel}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

export default function ManageUserTags() {
    const [showCreate, setShowCreate] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const { data, isLoading } = useGetUserTags();
    const tags: UserTag[] = data?.data?.tags ?? [];

    const { mutate: createTag, isPending: creating } = useCreateUserTag({
        onSuccess: () => { toast.success("Tag created."); setShowCreate(false); },
        onError: (e: any) => toast.error(e?.response?.data?.message ?? "Failed to create tag."),
    });

    const { mutate: updateTag, isPending: updating } = useUpdateUserTag({
        onSuccess: () => { toast.success("Tag updated."); setEditingId(null); },
        onError: (e: any) => toast.error(e?.response?.data?.message ?? "Failed to update tag."),
    });

    const { mutate: deleteTag, isPending: deleting } = useDeleteUserTag({
        onSuccess: () => { toast.success("Tag deleted."); setDeletingId(null); },
        onError: (e: any) => toast.error(e?.response?.data?.message ?? "Failed to delete tag."),
    });

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-3xl mx-auto space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Tag className="w-6 h-6 text-primary" />
                            User Tags
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">Create and manage tags to label customers</p>
                    </div>
                    {!showCreate && (
                        <button
                            onClick={() => setShowCreate(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-semibold rounded-xl text-sm shadow-sm hover:bg-primary/90 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            New Tag
                        </button>
                    )}
                </div>

                {/* Create form */}
                {showCreate && (
                    <TagForm
                        onSave={(name, color) => {
                            if (!name.trim()) return;
                            createTag({ name: name.trim(), color });
                        }}
                        onCancel={() => setShowCreate(false)}
                        loading={creating}
                    />
                )}

                {/* Tags list */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="p-6"><SkeletonDemo /></div>
                    ) : tags.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-medium">No tags yet</p>
                            <p className="text-xs mt-1">Create your first tag to start labelling customers</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {tags.map((tag) => (
                                <div key={tag.id}>
                                    {editingId === tag.id ? (
                                        <div className="p-3">
                                            <TagForm
                                                initial={tag}
                                                onSave={(name, color) => {
                                                    if (!name.trim()) return;
                                                    updateTag({ id: tag.id, data: { name: name.trim(), color } });
                                                }}
                                                onCancel={() => setEditingId(null)}
                                                loading={updating}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                                                    style={{ backgroundColor: tag.color, color: textColor(tag.color) }}
                                                >
                                                    {tag.name}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {tag.users_count ?? 0} user{(tag.users_count ?? 0) !== 1 ? "s" : ""}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setEditingId(tag.id)}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                {deletingId === tag.id ? (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-lg">
                                                        <span className="text-xs text-red-600 font-medium">Delete?</span>
                                                        <button
                                                            onClick={() => deleteTag(tag.id)}
                                                            disabled={deleting}
                                                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            onClick={() => setDeletingId(null)}
                                                            className="text-xs text-gray-400 hover:text-gray-600"
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setDeletingId(tag.id)}
                                                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
