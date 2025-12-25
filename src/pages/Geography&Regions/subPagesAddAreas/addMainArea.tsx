import { Form, Formik } from "formik"
import { araeForms } from "../../../constants/initialValues"
import { areaValidationSchema } from "../../../constants/validationSchema"
import { FormDropdown } from "../../../common/FormDropdown"
import { dummyCountries } from "../../../constants/data"
import DrawMap from "../../../common/map"
import { FormInput } from "../../../common/FormInput"
import { Button } from "../../../components/ui/button"
import { Link } from "react-router"

export default function AddMainArea(){

    return(
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                <h1 className=" text-[#242731] text-[20px] mb-5 font-bold">Main Area Name</h1>
                <div className="flex flex-col justify-center items-center">
                    <Formik
                        initialValues={araeForms}
                        validationSchema={areaValidationSchema('mainArea')}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {({ isValid }) => (
                            <Form className=" w-full">
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="z-0 overflow-hidden rounded-2xl">
                                        <DrawMap name="area" />
                                    </div>
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
                                    <div className="grid grid-cols-2 gap-5 mt-10">
                                        <Link
                                            to={'/geography&regions/manage/area'}
                                            className="border text-[20px] py-3 text-center border-black rounded-[10px]"
                                        >
                                            Back
                                        </Link>

                                        <Button
                                            type="submit"
                                            disabled={!isValid}
                                            className="bg-primary hover:bg-primary-600 text-gray-900 font-bold h-[58px] rounded-xl text-[20px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
        </main>
    )
}