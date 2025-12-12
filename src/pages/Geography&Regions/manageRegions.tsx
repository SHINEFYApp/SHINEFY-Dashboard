import { useState } from "react";
import { Button } from "../../components/ui/button";
import { FormInput } from "../../common/FormInput";
import { Form, Formik } from "formik";
import { addRegions } from "../../constants/initialValues";
import { addRegionsSchema } from "../../constants/validationSchema";
import { FormDropdown } from "../../common/FormDropdown";
import { dummyCountries, dummyRegions, exportTypes } from "../../constants/data";
import { TextArea } from "../../common/textArea";
import { CustomTable } from "../../common/CustomTable";
import { regionsColumns } from "../../columns/regionsColumns";
import { FilterHeader } from "../../common/FilterHeader";

export default function ManageRegions() {
    const [openWindowAddNewRegions, setOpenWindowAddNewRegions] = useState<boolean>();

    return (
        <>
            <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <FilterHeader
                    subtitle="Manage Regions"
                    searchInitialValues={{ search: '', export: '' }}
                    onSearchSubmit={(values) => console.log(values)}
                    filterInitialValues={{ search: '' }}
                    onFilterSubmit={(values) => console.log(values)}
                    actionButtons={[
                        {
                            label: "Add a new Region",
                            onClick: () => setOpenWindowAddNewRegions(true),
                            variant: "primary"
                        }
                    ]}
                    showExport={true}
                    exportOptions={exportTypes}
                />

                <CustomTable
                    page={'regions'}
                    columns={regionsColumns}
                    data={dummyRegions}
                    currentPage={1}
                    totalPages={Math.ceil(dummyRegions.length / 10)}
                    totalEntries={dummyRegions.length}
                    pageSize={10}
                    onPageChange={() => { }}
                />
            </main>
            <section
                className={`
                    fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                    bg-black/30 backdrop-blur-xs transition-all duration-300
                    ${openWindowAddNewRegions ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
                `}
            >
                <div className={`w-[678px] h-[579px] relative px-10 py-5 bg-white rounded-xl transition-transform duration-300 
                    ${openWindowAddNewRegions ? "scale-100" : "scale-95"}
                `}>
                    <h1 className=" text-[#242731] text-[20px] font-bold">Add a new Country</h1>
                    <div className="flex flex-col mt-10 justify-center items-center">
                        <Formik
                            initialValues={addRegions}
                            validationSchema={addRegionsSchema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {({ isValid }) => (
                                <Form>
                                    <div className=" grid grid-cols-1 w-[377px]">
                                        <FormDropdown
                                            name="country"
                                            label="Select Country"
                                            placeholder="Select Country"
                                            options={dummyCountries}
                                        />
                                        <div className=" mt-5">
                                            <FormInput
                                                name="name"
                                                label="Region Name"
                                                placeholder="Region Name"
                                                type="text"
                                            />
                                        </div>
                                        <div className=" mt-5">
                                            <TextArea
                                                name="description"
                                                label="Description"
                                                placeholder="Description"
                                            />
                                        </div>
                                        <div className=" w-full p-5 flex justify-between items-center absolute bottom-0 left-0">
                                            <button
                                                type="button"
                                                onClick={() => setOpenWindowAddNewRegions(false)}
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