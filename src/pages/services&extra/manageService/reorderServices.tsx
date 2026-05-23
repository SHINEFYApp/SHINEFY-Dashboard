import { useState, useCallback, useEffect } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Save } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getService, postService } from "../../../api/service/service-requests";

const IMAGE_BASE = import.meta.env.VITE_IMAGES_URL;

type TabType = "main" | "extra" | "packages";

interface SortableItem {
    id: number;
    name: string;
    name_arabic: string;
    price: string;
    image: string;
}

function SortableRow({ item, index }: { item: SortableItem; index: number }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 p-3 bg-white rounded-lg border ${
                isDragging ? "border-primary shadow-lg" : "border-gray-200"
            }`}
        >
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            >
                <GripVertical className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-400 w-8 text-center shrink-0">
                    #{index + 1}
                </span>
                {item.image && (
                    <img
                        src={
                            item.image
                                ? (item.image.startsWith("http") ? item.image : `${IMAGE_BASE}/${item.image}`)
                                : "/placeholder.png"
                        }
                        alt={item.name}
                        className="w-10 h-10 rounded object-cover shrink-0"
                    />
                )}
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {item.name_arabic}
                    </p>
                </div>
            </div>
            <span className="text-sm text-gray-600 font-medium whitespace-nowrap shrink-0">
                {item.price}
            </span>
        </div>
    );
}

function mapMainService(s: any): SortableItem {
    return {
        id: s.service_id,
        name: s.service_name || "",
        name_arabic: s.service_name_arabic || "",
        price: s.service_price != null ? `${s.service_price}` : "-",
        image: s.service_image || "",
    };
}

function mapExtraService(s: any): SortableItem {
    return {
        id: s.extra_service_id,
        name: s.extra_service_name || "",
        name_arabic: s.extra_service_name_arabic || "",
        price: s.extra_service_price != null ? `${s.extra_service_price}` : "-",
        image: s.extra_service_image || "",
    };
}

function mapPackage(s: any): SortableItem {
    return {
        id: s.id,
        name: s.name || "",
        name_arabic: s.name_ar || "",
        price: s.price != null ? `${s.price}` : "-",
        image: s.package_img || "",
    };
}

export default function ReorderServices() {
    const [activeTab, setActiveTab] = useState<TabType>("main");
    const [mainItems, setMainItems] = useState<SortableItem[]>([]);
    const [extraItems, setExtraItems] = useState<SortableItem[]>([]);
    const [packageItems, setPackageItems] = useState<SortableItem[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [saving, setSaving] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const mainQuery = useQuery({
        queryKey: ["services-reorder-main"],
        queryFn: async () => {
            const res = await getService("/api/services/main", { per_page: 100 });
            return res.data;
        },
    });

    const extraQuery = useQuery({
        queryKey: ["services-reorder-extra"],
        queryFn: async () => {
            const res = await getService("/api/services/extra", { per_page: 100 });
            return res.data;
        },
    });

    const packagesQuery = useQuery({
        queryKey: ["services-reorder-packages"],
        queryFn: async () => {
            const res = await getService("/api/packages/v2", { limit: 100 });
            return res.data;
        },
    });

    useEffect(() => {
        const data = mainQuery.data;
        if (!data?.data?.services) return;
        setMainItems(data.data.services.map(mapMainService));
        setHasChanges(false);
    }, [mainQuery.data]);

    useEffect(() => {
        const data = extraQuery.data;
        if (!data?.data?.services) return;
        setExtraItems(data.data.services.map(mapExtraService));
        setHasChanges(false);
    }, [extraQuery.data]);

    useEffect(() => {
        const data = packagesQuery.data;
        if (!data?.data?.data) return;
        setPackageItems(data.data.data.map(mapPackage));
        setHasChanges(false);
    }, [packagesQuery.data]);

    const getItems = useCallback(() => {
        switch (activeTab) {
            case "main": return mainItems;
            case "extra": return extraItems;
            case "packages": return packageItems;
        }
    }, [activeTab, mainItems, extraItems, packageItems]);

    const getSetItems = useCallback(() => {
        switch (activeTab) {
            case "main": return setMainItems;
            case "extra": return setExtraItems;
            case "packages": return setPackageItems;
        }
    }, [activeTab]);

    const getQuery = useCallback(() => {
        switch (activeTab) {
            case "main": return mainQuery;
            case "extra": return extraQuery;
            case "packages": return packagesQuery;
        }
    }, [activeTab, mainQuery, extraQuery, packagesQuery]);

    const getReorderEndpoint = useCallback(() => {
        switch (activeTab) {
            case "main": return "/api/services/main/reorder";
            case "extra": return "/api/services/extra/reorder";
            case "packages": return "/api/packages/reorder";
        }
    }, [activeTab]);

    const items = getItems();
    const query = getQuery();
    const isFetching = query.isLoading;
    const isError = query.isError;

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            const setter = getSetItems();
            const current = [...getItems()];

            const oldIndex = current.findIndex((i) => i.id === active.id);
            const newIndex = current.findIndex((i) => i.id === over.id);
            if (oldIndex === -1 || newIndex === -1) return;

            const [removed] = current.splice(oldIndex, 1);
            current.splice(newIndex, 0, removed);
            setter(current);
            setHasChanges(true);
        },
        [getItems, getSetItems]
    );

    const handleSave = async () => {
        setSaving(true);
        try {
            const current = getItems();
            const orders = current.map((item, index) => ({
                id: item.id,
                sort_order: index,
            }));

            await postService(getReorderEndpoint(), { orders });

            const labels = {
                main: "Main services",
                extra: "Extra services",
                packages: "Packages",
            };
            toast.success(`${labels[activeTab]} reordered successfully!`);
            setHasChanges(false);
            query.refetch();
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || "Failed to reorder services"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleTabChange = (tab: TabType) => {
        if (hasChanges && !window.confirm("You have unsaved changes. Switch tabs anyway?")) {
            return;
        }
        setActiveTab(tab);
        setHasChanges(false);
    };

    const tabs: { key: TabType; label: string }[] = [
        { key: "main", label: "Main Services" },
        { key: "extra", label: "Extra Services" },
        { key: "packages", label: "Packages" },
    ];

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                                activeTab === tab.key
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Save Bar */}
                {hasChanges && (
                    <div className="flex items-center justify-between mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <span className="text-sm text-amber-700">
                            You have unsaved changes to the order
                        </span>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-secondary-900 font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? "Saving..." : "Save Order"}
                        </button>
                    </div>
                )}

                {/* Loading */}
                {isFetching && (
                    <div className="text-center py-10 text-gray-500">
                        Loading...
                    </div>
                )}

                {/* Error */}
                {isError && !isFetching && (
                    <div className="text-center py-10">
                        <p className="text-red-500 mb-3">
                            Failed to load data
                        </p>
                        <button
                            onClick={() => query.refetch()}
                            className="px-4 py-2 bg-primary text-secondary-900 font-semibold rounded-lg hover:bg-primary-600 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!isFetching && !isError && items.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No items found
                    </div>
                )}

                {/* Sortable List */}
                {!isFetching && !isError && items.length > 0 && (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items.map((i) => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {items.map((item, index) => (
                                    <SortableRow
                                        key={item.id}
                                        item={item}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}

                {/* Bottom Save */}
                {hasChanges && items.length > 0 && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-secondary-900 font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? "Saving..." : "Save Order"}
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
