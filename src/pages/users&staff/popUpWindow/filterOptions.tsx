import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { Button } from "../../../components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { manageUsersInitioalValue } from "../../../constants/initialValues";
import type { filteroptionsProps } from "../../../types/users&staff";


export default function FillterOptions({filterOptions , setFilterOptions} : filteroptionsProps){
    return(
        <section
            className={`
                fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                bg-black/30 backdrop-blur-xs transition-all duration-300
                ${filterOptions.state ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"}
            `}
        >
            <div className={`w-[583px] h-[90%] relative overflow-hidden bg-[#F7F7F7] rounded-xl transition-transform duration-300 
                ${filterOptions.state ? "scale-100" : "scale-95"}
            `}>
                <div className=" flex gap-5 w-full h-[129px] items-center p-5 bg-white">
                    <button
                    onClick={() => setFilterOptions({...filterOptions , state : false})}
                    type="button" className="rounded-lg size-fit p-3 bg-[#F7F7F7]">
                        <ChevronLeft />
                    </button>
                    <div>
                        <h1 className=" text-[#242731] text-[25px] font-bold">Filter options</h1>
                        <h2 className=" text-[#242731] text-[20px]">Manage Users</h2>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Formik
                        initialValues={manageUsersInitioalValue}
                        onSubmit={(values) => {
                            setFilterOptions({data : values , state : false})
                        }}
                    >
                        {({ }) => (
                            <Form>
                                <div className=" grid grid-cols-1 w-[523px]">
                                    <div className=" mt-5">
                                        <FormInput
                                            name="groupName"
                                            label="Group Name"
                                            placeholder="Group Name"
                                            type="text"
                                        />
                                        <FormDropdown
                                            name="companyName"
                                            label="Company Name"
                                            placeholder="Company Name"
                                            options={[
                                                'Company one',
                                                'Company two',
                                                'Company three'
                                            ]}
                                        />
                                        <FormDropdown
                                            name="areaName"
                                            label="Area Name"
                                            placeholder="Area Name"
                                            options={[
                                                'Area one',
                                                'Area two',
                                                'Area three'
                                            ]}
                                        />
                                        <FormDropdown
                                            name="deviceType"
                                            label="Device Type"
                                            placeholder="Device Type"
                                            options={[
                                                'Type one',
                                                'Type two',
                                                'Type three'
                                            ]}
                                        />
                                        <FormDatePicker
                                            name="registrationStart"
                                            label="Registration Start"
                                            checkmark={false}
                                        />
                                        <FormDatePicker
                                            name="registrationEnd"
                                            label="Registration End"
                                            checkmark={false}
                                        />
                                    </div>
                                    <div className=" w-full p-5 bg-white flex justify-between items-center absolute bottom-0 left-0">
                                        <Button
                                            type="submit"
                                            className="bg-primary hover:bg-primary-600 text-gray-900 font-bold w-[321px] h-[54px] rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            Research
                                        </Button>
                                        <button
                                            type="reset"
                                            className="w-[206px] border h-[54px] border-black rounded-[10px] text-[16px]"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}