import { Form, Formik } from "formik"
import { araeForms } from "../../../constants/initialValues"
import { mainAreaValidationSchema } from "../../../constants/validationSchema"
import { FormDropdown } from "../../../common/FormDropdown"
import { dummyCountries } from "../../../constants/data"
import DrawMap from "../../../common/map"
import { FormInput } from "../../../common/FormInput"
import { Button } from "../../../components/ui/button"

export default function AddMainArea(){

    return(
        <main className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <h1 className=" text-[#242731] text-[20px] py-5 font-bold">Main Areas Name</h1>
            <Formik
                initialValues={araeForms}
                validationSchema={mainAreaValidationSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ isValid }) => (
                    <Form>
                        <div className="z-0 relative grid grid-cols-1 overflow-hidden rounded-2xl bg-accent">
                            <DrawMap name="area" />
                        </div>
                        <div className=" grid grid-cols-2 mt-10 ">
                           <div className="grid grid-cols-1 gap-2">
                                <FormDropdown
                                    name="country"
                                    label="Select Country"
                                    placeholder="Select Country"
                                    options={dummyCountries}
                                />
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
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    className="bg-primary hover:bg-primary-600 mt-10 text-gray-900 font-bold h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    Save
                                </Button>
                           </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}