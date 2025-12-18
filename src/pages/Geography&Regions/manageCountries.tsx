import { useState } from "react";
import Table from "../../components/tables/table";
import { Button } from "../../components/ui/button";
import { FormInput } from "../../common/FormInput";
import { Form, Formik } from "formik";
import { addCountry } from "../../constants/initialValues";
import { addCountrySchema } from "../../constants/validationSchema";
import FileUploader from "../../common/fileUploader";
import { CustomTable } from "../../common/CustomTable";
import { dummyCountries, exportTypes } from "../../constants/data";
import { FilterHeader } from "../../common/FilterHeader";

export default function ManageCountries() {
    const [openWindowAddNewCountry, setOpenWindowAddNewCountry] = useState<boolean>();


    return (
        <>
            <main>
                <Table openWindow={openWindowAddNewCountry} setOpenWindow={setOpenWindowAddNewCountry} manageSectionFromComponant={'countries'} />
            </main>
            <section
                className={`
                    fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                    bg-black/30 backdrop-blur-xs transition-all duration-300
                    ${openWindowAddNewCountry ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
                `}
            >
                <div className={`w-[678px] h-[579px] relative px-10 py-5 bg-white rounded-xl transition-transform duration-300 
                    ${openWindowAddNewCountry ? "scale-100" : "scale-95"}
                `}>
                    <h1 className=" text-[#242731] text-[20px] font-bold">Add a new Country</h1>
                    <div className="flex flex-col mt-10 justify-center items-center">
                        <Formik
                            initialValues={addCountry}
                            validationSchema={addCountrySchema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {({ isValid }) => (
                                <Form>
                                    <div className=" grid grid-cols-1 w-[377px]">
                                        <FileUploader name="flag" title='Flags Upload' />
                                        <div className=" mt-5">
                                            <FormInput
                                                name="name"
                                                label="Country Name"
                                                placeholder="Country Name"
                                                type="text"
                                            />
                                        </div>
                                        <div className=" w-full p-5 flex justify-between items-center absolute bottom-0 left-0">
                                            <button
                                                type="button"
                                                onClick={() => setOpenWindowAddNewCountry(false)}
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