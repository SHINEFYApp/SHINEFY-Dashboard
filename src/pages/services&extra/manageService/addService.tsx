import { Form, Formik } from "formik"
import { FormInput } from "../../../common/FormInput"
import { TextArea } from "../../../common/textArea"
import { FormDatePicker } from "../../../common/FormDatePicker"
import { Calendar, Clock } from "lucide-react"
import { FormTimePicker } from "../../../common/FormTimePicker"
import { mangeServiceInitialValues } from "../../../constants/initialValues"
import { manageServiceValidationSchema } from "../../../constants/validationSchema"
import { useState } from "react"

export default function AddService(){
    const [formData , setFormData] = useState({
        Date : null,
        Time : null,
        arabicServiceDescription : '',
        engishServiceDescription : '',
        serviceDiscount : '',
        isApplyAddExtra : 'Yes' ,
        serviceLabelArabic : '',
        serviceLabelEnglish : '',
        serviceNameArabic : '',
        serviceNameEnglish : '',
        servicePrice : '',
        serviceTime : '',
    })
    console.log(formData)
    return(
        <main className="min-h-screen w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
            <h1 className="text-[20px] font-bold mb-8">Add Service</h1>
            <Formik
                initialValues={mangeServiceInitialValues}
                validationSchema={manageServiceValidationSchema}
                onSubmit={(values) => {
                    setFormData({...formData , ...values})
                }}
            >
                {({ isValid }) => (
                    <Form>
                        <div className=" grid grid-cols-3 gap-5 border-b border-[#E9EAEC] pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="serviceNameEnglish"
                                    label="Service Name ( In English )"
                                    placeholder="Service Name"
                                    type="text"
                                />
                                <FormInput
                                    name="serviceLabelEnglish"
                                    label="Service Label ( In English )"
                                    placeholder="Service Label"
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
                                    name="serviceLabelArabic"
                                    label="Service Label ( In Arabic )"
                                    placeholder="Service Label"
                                    type="text"
                                />
                            </div>
                            <div className="grid grid-cols-1 ps-20 gap-2">
                                <h2>Service Image</h2>
                                <div className="w-[117px] h-[117px] bg-black/20 rounded-[5px]">
                                    <img src={''} alt="" />
                                </div>
                                <div className=" flex gap-5">
                                    <button type="button" className="text-[#B0B0B0] text-[14px]">Delete</button>
                                    <button type="button" className="text-[#FFC107] text-[14px]">Update</button>
                                </div>
                            </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-5 mt-5 border-b border-[#E9EAEC] pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="servicePrice"
                                    label="Service price"
                                    placeholder="Service price"
                                    type="text"
                                />
                                <FormInput
                                    name="serviceTime"
                                    label="Service Time"
                                    placeholder="Service Time"
                                    type="text"
                                    moreOptions='m'
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="serviceDiscount"
                                    label="Service Discount"
                                    placeholder="Service Discount"
                                    type="text"
                                    moreOptions='%'
                                />
                                <div className=" h-[76px] space-y-2">
                                    <h2 className="text-[14px] m-0 text-gray-700">Apply Add Extra Service</h2>
                                    <div className=" grid grid-cols-2 gap-5">
                                        {['Yes' , 'No'].map((btn) => {
                                            return(
                                                <button onClick={() => {
                                                    setFormData({...formData , isApplyAddExtra : btn})
                                                }} key={btn} type="button" className={`rounded-xl mt-2 border ${formData.isApplyAddExtra === btn ? 'border-[#FFC107] bg-[#FFF4D3] hover:bg-[#ffefb9]' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}  px-4 h-12 text-sm font-medium transition-all duration-200 text-[14px]`}>{btn}</button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-5 mt-5 pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="engishServiceDescription"
                                    label="Service Description (in English)"
                                    placeholder="Service Description (in English)"
                                />
                                <FormDatePicker
                                    name="Date"
                                    label="Create Date"
                                    icon={<Calendar className="size-5" />} checkmark={false} 
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="arabicServiceDescription"
                                    label="Service Description (In Arabic)"
                                    placeholder="Service Description (In Arabic)"
                                />
                                <FormTimePicker
                                    name="Time"
                                    label="Create Time"
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