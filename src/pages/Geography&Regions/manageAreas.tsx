import { useEffect, useState, useMemo } from "react";
import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes, manageAreaTabs } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatedTabs } from "../../components/booking/AnimatedTabs";
import { ArrowUpToLine, Navigation, Search, Trash2 } from "lucide-react";
import { CustomTable } from "../../common/CustomTable";
import { useGetMainAreas, useGetSubAreas, useDeleteArea, useGetNearestAreas, useUpdateNearestAreas } from "../../api/features/areas.hooks";
import { GenericModal } from "../../common/GenericModal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function ManageAreas() {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();
    const validTabs = ['mainArea', 'subArea'];
    const getValidTab = (): string => {
        const tabParam = searchParams.get('tab');
        return tabParam && validTabs.includes(tabParam) ? tabParam : 'mainArea';
    };
    const [activeTab, setActiveTab] = useState<string>(getValidTab());
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [search, setSearch] = useState("");
    const [nearestModalOpen, setNearestModalOpen] = useState(false);
    const [selectedSubAreaId, setSelectedSubAreaId] = useState<number | null>(null);
    const [selectedNearest, setSelectedNearest] = useState<number[]>([]);
    const pageSize = 10;

    useEffect(() => {
        const tab = getValidTab();
        setActiveTab(tab);
        if (searchParams.get('tab') !== tab) {
            updateURL(tab);
        }
    }, [searchParams]);

    const updateURL = (tab: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('tab', tab);
        setSearchParams(params, { replace: true });
    };

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        updateURL(tabId);
        setCurrentPage(1); // Reset page on tab change
    };

    const handleSubmit = (values: any) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    // Data Fetching
    const isMain = activeTab === 'mainArea';
    const params = {
        limit: pageSize,
        page: currentPage,
        search_text: search
    };

    const { data: mainData, isLoading: mainLoading } = useGetMainAreas(params);
    const { data: subData, isLoading: subLoading } = useGetSubAreas(params);

    const isLoading = isMain ? mainLoading : subLoading;
    const currentData = isMain ? mainData : subData;

    // Debug log
    // console.log("Current Area Data:", currentData);

    const areasRaw = isMain ? currentData?.data?.data?.main_areas : currentData?.data?.data?.sub_areas;
    const areas = Array.isArray(areasRaw) ? areasRaw : [];

    // Assuming pagination structure is standard
    const pagination = currentData?.data?.data?.pagination;
    const totalEntries = pagination?.total_items || areas.length;
    const totalPages = pagination?.total_pages || Math.ceil(totalEntries / pageSize);

    // Delete Mutation
    const deleteMutation = useDeleteArea({
        onSuccess: () => {
            toast.success("Area deleted successfully");
            queryClient.invalidateQueries({ queryKey: isMain ? ["main-areas"] : ["sub-areas"] });
        },
        onError: () => toast.error("Failed to delete")
    });

    // Nearest Areas
    const { data: nearestData, isLoading: nearestLoading } = useGetNearestAreas(selectedSubAreaId!, {
        enabled: !!selectedSubAreaId && nearestModalOpen,
    });

    const nearestResponse = nearestData?.data?.data || nearestData?.data || {};
    const currentNearestIds: number[] = nearestResponse?.nearest_areas || [];
    const allAreasList: { id: number; name: string }[] = nearestResponse?.all_areas || [];

    const updateNearestMutation = useUpdateNearestAreas({
        onSuccess: () => {
            toast.success("Nearest areas updated successfully");
            setNearestModalOpen(false);
            setSelectedSubAreaId(null);
            queryClient.invalidateQueries({ queryKey: ["nearest-areas", selectedSubAreaId] });
        },
        onError: () => toast.error("Failed to update nearest areas")
    });

    const handleNearestClick = (id: number) => {
        setSelectedSubAreaId(id);
        setSelectedNearest([]);
        setNearestModalOpen(true);
    };

    // Initialize selectedNearest when nearest data loads
    useEffect(() => {
        if (nearestModalOpen && currentNearestIds.length > 0 && selectedNearest.length === 0) {
            setSelectedNearest(currentNearestIds);
        }
    }, [currentNearestIds, nearestModalOpen, selectedNearest.length]);

    const handleNearestToggle = (areaId: number) => {
        setSelectedNearest(prev =>
            prev.includes(areaId)
                ? prev.filter(id => id !== areaId)
                : [...prev, areaId]
        );
    };

    const handleNearestConfirm = () => {
        if (!selectedSubAreaId) return;
        updateNearestMutation.mutate({
            id: selectedSubAreaId,
            nearest_areas: selectedNearest,
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteMutation.mutate({
                id,
                area_type: isMain ? 'main_area' : 'sub_area'
            });
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const areaBtns = [
        { value: 'mainArea', layout: 'Add Main Areas' },
        { value: 'subArea', layout: 'Add Sub Areas' }
    ];

    const columns = useMemo(() => ({
        mainArea: [
            {
                key: "country_name",
                title: "Countries",
            },
            {
                key: "region",
                title: "Regions",
                render: (region: any) => region?.name || '-'
            },
            { key: "main_area_name", title: "Area Name" },
            { key: "createtime", title: "Create Date & Time" },
            {
                key: "action",
                title: "Action",
                render: (_: any, record: any) => (
                    <div className="flex gap-2 items-center text-nowrap">
                        <Link
                            to={`/geography&regions/manage/area/edit/main/${record.id}`}
                            className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                        >
                            <ArrowUpToLine size={18} /> update
                        </Link>
                        <button
                            className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => handleDelete(record.id)}
                        >
                            <Trash2 size={18} /> delete
                        </button>
                    </div>
                ),
            },
        ],
        subArea: [
            {
                key: "main_area_name",
                title: "Main Area Name",
            },
            { key: "area_name", title: "Area Name" },
            { key: "createtime", title: "Create Date & Time" },
            {
                key: "action",
                title: "Action",
                render: (_: any, record: any) => (
                    <div className="flex gap-2 items-center text-nowrap">
                        <button
                            className="bg-[#E8F5E9] flex items-center gap-2 rounded-[2.75px] text-[#2E7D32] border border-[#2E7D32] capitalize hover:text-[#E8F5E9] hover:bg-[#2E7D32] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => handleNearestClick(record.id)}
                        >
                            <Navigation size={18} /> nearest
                        </button>
                        <Link
                            to={`/geography&regions/manage/area/edit/sub/${record.id}`}
                            className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                        >
                            <ArrowUpToLine size={18} /> update
                        </Link>
                        <button
                            className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                            onClick={() => handleDelete(record.id)}
                        >
                            <Trash2 size={18} /> delete
                        </button>
                    </div>
                ),
            },
        ]
    }), [handleDelete, handleNearestClick]);

    return (
        <>
            <main>
                <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                    <div className="mb-6">
                        <Formik
                            initialValues={{ search: '' }}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form>
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                                            {/* left side  */}
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
                                        {/* right side  */}
                                        <div className="flex flex-col lg:flex-row items-center gap-5">

                                            {areaBtns.map((btn) => {
                                                return (
                                                    <Link
                                                        key={btn.value}
                                                        to={`/geography&regions/manage/area/add/${btn.value}`}
                                                        className={`w-full lg:w-[164px] py-3 ${btn.value == 'mainArea' ? 'bg-primary text-secondary-900 hover:bg-primary-600' : ' bg-[#191919] text-primary hover:bg-[#191919]'} rounded-lg  font-semibold transition-all shadow-sm hover:shadow-md whitespace-nowrap text-center`}
                                                    >
                                                        {btn.layout}
                                                    </Link>
                                                )
                                            })}
                                            <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                            <div className="w-full lg:w-[135px]">
                                                <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2 w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {/* animated taps */}
                    <div className=" my-5">
                        <AnimatedTabs
                            tabs={manageAreaTabs}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                    </div>
                    {/* table  */}
                    {isLoading ? <div>Loading...</div> : (
                        <CustomTable
                            columns={columns[activeTab as 'mainArea' | 'subArea']}
                            data={areas}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>

                {/* Nearest Areas Modal */}
                <GenericModal
                    isOpen={nearestModalOpen}
                    onClose={() => { setNearestModalOpen(false); setSelectedSubAreaId(null); }}
                    title="Nearest Areas"
                    subtitle="Select the nearest areas for this sub area."
                >
                    {nearestLoading ? (
                        <div className="text-center py-8 text-gray-500">Loading areas...</div>
                    ) : allAreasList.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">No areas available.</div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-3">
                                {allAreasList
                                    .filter(area => area.id !== selectedSubAreaId)
                                    .map(area => (
                                        <label
                                            key={area.id}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${selectedNearest.includes(area.id)
                                                    ? "border-[#2E7D32] bg-[#E8F5E9]"
                                                    : "border-gray-200 bg-white hover:bg-gray-50"
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedNearest.includes(area.id)}
                                                onChange={() => handleNearestToggle(area.id)}
                                                className="w-5 h-5 accent-[#2E7D32]"
                                            />
                                            <Navigation size={16} className="text-[#2E7D32]" />
                                            <span className="font-medium text-gray-800">{area.name}</span>
                                        </label>
                                    ))}
                            </div>
                            <div className="flex justify-between items-center mt-8">
                                <span className="text-sm text-gray-500">
                                    {selectedNearest.length} area{selectedNearest.length !== 1 ? "s" : ""} selected
                                </span>
                                <div className="flex gap-4">
                                    <button
                                        className="px-6 py-2 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                        onClick={() => { setNearestModalOpen(false); setSelectedSubAreaId(null); }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-6 py-2 rounded-lg font-bold text-white bg-[#2E7D32] hover:bg-[#1B5E20] transition-colors disabled:opacity-50"
                                        onClick={handleNearestConfirm}
                                        disabled={updateNearestMutation.isPending}
                                    >
                                        {updateNearestMutation.isPending ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </GenericModal>
            </main>
        </>
    )
}