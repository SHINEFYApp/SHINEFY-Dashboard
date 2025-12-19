import { useState } from "react";
import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { Button } from "../../components/ui/button";
import { FormDropdown } from "../../common/FormDropdown";
import { dummyCountries } from "../../constants/data";
import DrawMap from "../../common/map";
import { araeForms } from "../../constants/initialValues";
import { areaValidationSchema } from "../../constants/validationSchema";

export default function ManageAreas(){
    const [openWindowArea, setOpenWindowArea] = useState<boolean>();
    const [whoTap , setWhoTap] = useState<string | undefined>('mainArea') 

    return(
        <>
            <main>
            </main>
            <section
                className={`
                    fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                    bg-black/30 backdrop-blur-xs transition-all duration-300
                    ${openWindowArea ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
                `}
            >
                <div className={`w-[678px] ${whoTap === 'subArea'? 'h-[855px]' : 'h-[750px]' } relative px-10 bg-white rounded-xl transition-transform duration-300 
                    ${openWindowArea ? "scale-100" : "scale-95"}
                `}>
                    <h1 className=" text-[#242731] text-[20px] py-5 font-bold">{whoTap === 'mainArea' ? 'Main Areas Name' : 'Add Sub Area'}</h1>
                    <div className="flex flex-col justify-center items-center">
                        <Formik
                            initialValues={araeForms}
                            validationSchema={areaValidationSchema(whoTap)}
                            onSubmit={(values) => {
                                console.log(values)
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
    )
}