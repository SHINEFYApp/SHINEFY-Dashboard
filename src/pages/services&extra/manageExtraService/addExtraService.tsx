import { Form, Formik } from "formik"
import { FormDatePicker } from "../../../common/FormDatePicker"
import { FormTimePicker } from "../../../common/FormTimePicker"
import { FormInput } from "../../../common/FormInput"
import { Calendar, Clock } from "lucide-react"
import { TextArea } from "../../../common/textArea"
import { addExtraServiceValidationSchema } from "../../../constants/validationSchema"


export default function AddExtraService(){
    return(
        <main className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <h1 className="text-[20px] font-bold mb-8">Add Extra Service</h1>
            <Formik
                initialValues={{extraServiceNameEnglish: "",
                extarServicePrice: "",
                serviceNameArabic: "",
                extraServiceDiscount: "",
                extarServiceTime: "",
                englishServiceDescription: "",
                extraArabicServiceDescription: "",
                Date: "",
                Time: "",}}
                validationSchema={addExtraServiceValidationSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ isValid }) => (
                    <Form>
                        <div className=" grid grid-cols-3 gap-5 border-b border-[#E9EAEC] pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="extraServiceNameEnglish"
                                    label="Extra Service Name ( In English )"
                                    placeholder="Extra Service Name"
                                    type="text"
                                />
                                <FormInput
                                    name="extarServicePrice"
                                    label="Extra Service Price"
                                    placeholder="Extra Service Price"
                                    type="text"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="serviceNameArabic"
                                    label="Service Name ( In Arabic )"
                                    placeholder="Service Name"
                                    type="text"
                                />
                                <FormInput
                                    name="extraServiceDiscount"
                                    label="Extra Service Discount"
                                    placeholder="Extra Service Discount"
                                    type="text"
                                    moreOptions='%'
                                />
                            </div>
                            <div className="grid grid-cols-1 ps-20 gap-2">
                                <h2>Service Image</h2>
                                <div className="w-[117px] h-[117px] bg-black/20 rounded-[5px]">
                                    {/* <img src={''} alt="" /> */}
                                </div>
                                <div className=" flex gap-5">
                                    <button type="button" className="text-[#B0B0B0] text-[14px]">Delete</button>
                                    <button type="button" className="text-[#FFC107] text-[14px]">Update</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1">
                                <FormInput
                                    name="extarServiceTime"
                                    label="Extra Service Time"
                                    placeholder="Extra Service Time"
                                    type="text"
                                    moreOptions='m'
                                />
                            </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-5 mt-5 pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="englishServiceDescription"
                                    label="Service Description (In English)"
                                    placeholder="Service Description (In English)"
                                />
                                <FormDatePicker
                                    name="Date"
                                    label="Create Extra Service Date"
                                    icon={<Calendar className="size-5" />} checkmark={false} 
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="extraArabicServiceDescription"
                                    label="Extra Service Description (In Arabic)"
                                    placeholder="Extra Service Description (In Arabic)"
                                />
                                <FormTimePicker
                                    name="Time"
                                    label="Create Extar Service Time"
                                    icon={<Clock className="size-5" />}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 mb-10">
                            <button disabled={!isValid} type="submit" className="h-12 text-[20px] font-bold bg-[#FFC107] rounded-[10px]">Submit</button>
                        </div>
                    </Form>
                )}

            </Formik>
        </main>
    )
}