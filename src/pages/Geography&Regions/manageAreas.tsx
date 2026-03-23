import { useEffect, useState, useMemo } from "react";
import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes, manageAreaTabs } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatedTabs } from "../../components/booking/AnimatedTabs";
import { ArrowUpToLine, Search, Trash2 } from "lucide-react";
import { CustomTable } from "../../common/CustomTable";
import { useGetMainAreas, useGetSubAreas, useDeleteArea } from "../../api/features/areas.hooks";
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
    }), [handleDelete]);

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
            </main>
        </>
    )
}