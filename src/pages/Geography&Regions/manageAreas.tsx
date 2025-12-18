import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { dummyMainArea, dummySubArea, exportTypes, manageAreaTabs } from "../../constants/data";
import { Link, useSearchParams } from "react-router";
import { AnimatedTabs } from "../../components/booking/AnimatedTabs";
import { ArrowUpToLine, Search, Trash2 } from "lucide-react";
import { CustomTable } from "../../common/CustomTable";

export default function ManageAreas(){
    const [searchParams, setSearchParams] = useSearchParams();
    const validTabs = ['mainArea', 'subArea'];
    const getValidTab = (): string => {
        const tabParam = searchParams.get('tab');
        return tabParam && validTabs.includes(tabParam) ? tabParam : 'mainArea';
    };
    const [activeTab, setActiveTab] = useState<string>(getValidTab());
    
    useEffect(() => {
        const tab = getValidTab();
        setActiveTab(tab);

        if (searchParams.get('tab') !== tab) {
            updateURL(tab);
        }
    }, [searchParams]);

    const updateURL = (tab: string) => {
        const params = new URLSearchParams();
        params.set('tab', tab);
        setSearchParams(params, { replace: true });
    };

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        updateURL(tabId);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    
    const totalEntries = 205;
    const totalPages = Math.ceil(totalEntries / pageSize);
    
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    

    const mainAreaColumns = [
        {
            key: "countries",
            title: "Countries",
        },
        {
            key: "regions",
            title: "Regions",
        },
        {
            key: "createDateAndTime",
            title: "Create Date & Time",
        },
        {
            key: "action",
            title: "Action",
            render: () => (
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => alert('updated item')}
                    >
                        <ArrowUpToLine /> update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => alert('deleted item')}
                    >
                        <Trash2 /> delete
                    </button>
                </div>
            ),
        },
    ]
    const subAreaColumns = [
        {
            key: "mainAreaName",
            title: "Main Area Name",
        },
        {
            key: "areaName",
            title: "Area Name",
        },
        {
            key: "createDateAndTime",
            title: "Create Date & Time",
        },
        {
            key: "action",
            title: "Action",
            render: () => (
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => alert('updated item')}
                    >
                        <ArrowUpToLine /> update
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => alert('deleted item')}
                    >
                        <Trash2 /> delete
                    </button>
                </div>
            ),
        },
    ]

    return(

        <main className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <Formik
                initialValues={{}}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({}) => (
                    <Form>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
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
                                    className="w-full md:w-[108px] h-fit py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                    >
                                    Search
                                </button>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-5">
                                <Link
                                    to={"/geography&regions/manage/area/addMainArea"}
                                    className="w-[164px] lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                    >
                                    Add Main Areas
                                </Link>
                                <Link
                                    to={"/geography&regions/manage/area/addSubArea"}
                                    className="w-[164px] lg:w-[164px] py-3 bg-[#191919] rounded-lg text-primary font-semibold transition-all hover:bg-[#191919]/80 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                    >
                                    Add Sub Areas
                                </Link>
                                <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                <div className="w-full lg:w-[135px]">
                                    <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <AnimatedTabs
                tabs={manageAreaTabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                className=" mt-5"
            />

            <div className=" mt-5">
                <CustomTable
                    page="manageArea"
                    columns={activeTab === 'mainArea' ? mainAreaColumns : subAreaColumns }
                    data={activeTab === 'mainArea' ? dummyMainArea : dummySubArea}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </div>
        </main>
    )
}