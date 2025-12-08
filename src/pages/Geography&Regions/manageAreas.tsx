import { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { Button } from "../../components/ui/button";
import { FormDropdown } from "../../common/FormDropdown";
import { dummyCountries, dummyMainArea, dummySubArea, manageAreaTabs } from "../../constants/data";
import DrawMap from "../../common/map";
import { araeForms } from "../../constants/initialValues";
import { areaValidationSchema } from "../../constants/validationSchema";
import { CustomTable } from "../../common/CustomTable";
import { Search } from "lucide-react";
import { AnimatedTabs } from "../../components/booking/AnimatedTabs";
import { useSearchParams } from "react-router";
import { mainAreaColumns, subAreaColumns } from "../../columns/areaColumns";
import { exportTypes } from "../../constants/exportTypes";

const validTabs = ['mainArea', 'subArea'];

export default function ManageAreas() {
    const [openWindowArea, setOpenWindowArea] = useState<boolean>();
    const [whoTap, setWhoTap] = useState<string | undefined>('mainArea');


    const [searchParams, setSearchParams] = useSearchParams();

    const getValidTab = useCallback((): string => {
        const tabParam = searchParams.get('tab');
        return tabParam && validTabs.includes(tabParam) ? tabParam : 'mainArea';
    }, [searchParams]);

    const [activeTab, setActiveTab] = useState<string>(getValidTab());

    const updateURL = useCallback((tab: string) => {
        const params = new URLSearchParams();
        params.set('tab', tab);
        setSearchParams(params, { replace: true });
    }, [setSearchParams]);

    useEffect(() => {
        const tab = getValidTab();
        setActiveTab(tab);

        if (searchParams.get('tab') !== tab) {
            updateURL(tab);
        }
    }, [searchParams, getValidTab, updateURL]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        updateURL(tabId);
    };

    return (
        <>
            <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <div className="mb-6">
                    <Formik
                        initialValues={{ search: '' }}
                        onSubmit={(values) => console.log(values)}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
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

                                    <div className="flex flex-col lg:flex-row items-center gap-5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenWindowArea(true);
                                                setWhoTap('mainArea');
                                            }}
                                            className="w-full lg:w-[164px] py-3 bg-primary rounded-lg text-secondary-900 font-semibold transition-all hover:bg-primary-600 shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                        >
                                            Add Main Area
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenWindowArea(true);
                                                setWhoTap('subArea');
                                            }}
                                            className="w-full lg:w-[164px] py-3 bg-[#191919] rounded-lg text-[#FFC107] font-semibold transition-all hover:bg-[#191919d6] shadow-sm hover:shadow-md whitespace-nowrap text-center"
                                        >
                                            Add Sub Area
                                        </button>
                                        <span className="w-full h-px lg:w-px lg:h-10 bg-[#D2D2D2]"></span>
                                        <div className="w-full lg:w-[135px]">
                                            <FormDropdown name="export" label="" placeholder={'Export'} options={exportTypes} className="mb-2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <AnimatedTabs
                                        tabs={manageAreaTabs}
                                        activeTab={activeTab}
                                        onTabChange={handleTabChange}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <CustomTable
                    page={'area'}
                    columns={activeTab === 'mainArea' ? mainAreaColumns : subAreaColumns}
                    data={activeTab === 'mainArea' ? dummyMainArea : dummySubArea}
                    currentPage={1}
                    totalPages={Math.ceil((activeTab === 'mainArea' ? dummyMainArea : dummySubArea).length / 10)}
                    totalEntries={(activeTab === 'mainArea' ? dummyMainArea : dummySubArea).length}
                    pageSize={10}
                    onPageChange={() => { }}
                />
            </main>
            <section
                className={`
                    fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                    bg-black/30 backdrop-blur-xs transition-all duration-300
                    ${openWindowArea ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
                `}
            >
                <div className={`w-[678px] ${whoTap === 'subArea' ? 'h-[855px]' : 'h-[750px]'} relative px-10 bg-white rounded-xl transition-transform duration-300 
                    ${openWindowArea ? "scale-100" : "scale-95"}
                `}>
                    <h1 className=" text-[#242731] text-[20px] py-5 font-bold">{whoTap === 'mainArea' ? 'Main Areas Name' : 'Add Sub Area'}</h1>
                    <div className="flex flex-col justify-center items-center">
                        <Formik
                            initialValues={araeForms}
                            validationSchema={areaValidationSchema(whoTap)}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {({ isValid }) => (
                                <Form>
                                    <div className=" grid grid-cols-1 gap-2 w-[377px]">
                                        <FormDropdown
                                            name="country"
                                            label="Select Country"
                                            placeholder="Select Country"
                                            options={dummyCountries}
                                        />
                                        <div className=" w-[376px] h-60 overflow-hidden rounded-2xl">
                                            <DrawMap name="area" />
                                        </div>
                                        <FormDropdown
                                            name="regions"
                                            label="Select Regions"
                                            placeholder="Select Country"
                                            options={dummyCountries}
                                        />
                                        <FormInput
                                            name="areaName"
                                            label="Main Areas Name"
                                            placeholder="Area Name"
                                            type="text"
                                        />
                                        {whoTap === 'subArea' &&
                                            <FormInput
                                                name="subAreaName"
                                                label="Sub Areas Name"
                                                placeholder="Sub Area Name"
                                                type="text"
                                            />
                                        }
                                        <div className=" w-full p-5 flex justify-between items-center absolute bottom-0 left-0">
                                            <button
                                                type="button"
                                                onClick={() => setOpenWindowArea(false)}
                                                className="w-[168px] border text-[20px] py-3 border-black rounded-[10px]"
                                            >
                                                Back
                                            </button>

                                            <Button
                                                type="submit"
                                                disabled={!isValid}
                                                className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[429px] h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    );
}