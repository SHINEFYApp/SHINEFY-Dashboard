import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { dummyMainArea, dummySubArea, exportTypes, manageAreaTabs } from "../../constants/data";
import { Link, useSearchParams } from "react-router";
import { AnimatedTabs } from "../../components/booking/AnimatedTabs";
import { ArrowUpToLine, Search, Trash2 } from "lucide-react";
import type { FilterFormValuesOnlySearch } from "../../types/bookings";
import { CustomTable } from "../../common/CustomTable";

    const columns = { 
        mainArea : [
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
            },{
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
        ],
        subArea : [
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
            },{
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
    }


export default function ManageAreas(){
    const areaBtns = [
        {
            value: 'mainArea',
            layout: 'Add Main Areas'
        },{
            value: 'subArea',
            layout: 'Add Sub Areas'
        }
    ]
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

    const handleSubmit = (values: FilterFormValuesOnlySearch) => {
        console.log("Search values:", values);
    };
    
    return(
        <>
            <main>
                <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                    <div className="mb-6">
                        <Formik
                            initialValues={{
                                search : ''
                            }}
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
                                                return(
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
                    <CustomTable
                        columns={columns[activeTab as 'mainArea' | 'subArea']}
                        data={activeTab === 'mainArea' ? dummyMainArea : dummySubArea}
                    />
                </div>
            </main>
        </>
    )
}