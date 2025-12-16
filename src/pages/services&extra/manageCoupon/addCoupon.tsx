import { Form, Formik } from "formik"
import { FormDatePicker } from "../../../common/FormDatePicker"
import { FormTimePicker } from "../../../common/FormTimePicker"
import { FormInput } from "../../../common/FormInput"
import { Calendar, Clock } from "lucide-react"
import { addCouponValidationSchema } from "../../../constants/validationSchema"
import { FormDropdown } from "../../../common/FormDropdown"
import { addCouponInitialValues } from "../../../constants/initialValues"


export default function AddCoupon(){
    return(
        <main className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen }`}>
            <h1 className="text-[20px] font-bold mb-8">Add Coupon</h1>
            <Formik
                initialValues={addCouponInitialValues}
                validationSchema={addCouponValidationSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ isValid }) => (
                    <Form>
                        <div className=" grid grid-cols-3 gap-5 border-b border-[#E9EAEC] pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <FormDropdown
                                    name="user"
                                    label="Select User"
                                    placeholder="Select Users"
                                    options={[
                                        'user one',
                                        'user two',
                                        'user three'
                                    ]}
                                />
                                <FormInput
                                    name="couponAnount"
                                    label="Coupon Amount"
                                    placeholder="Coupon Amount"
                                    type="text"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="couponCode"
                                    label="Coupon Code"
                                    placeholder="Coupon Code"
                                    type="text"
                                />
                                <FormInput
                                    name="discount"
                                    label="Discount"
                                    placeholder="Discount"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className=" grid grid-cols-3 gap-5 mt-5 pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <FormDropdown
                                    name="services"
                                    label="Select Services"
                                    placeholder="Select Services"
                                    options={[
                                        'Service one',
                                        'Service two',
                                        'Service three'
                                    ]}
                                />
                                <FormDatePicker
                                    name="startDate"
                                    label="Start Date"
                                    icon={<Calendar className="size-5" />} checkmark={false} 
                                />
                                <FormTimePicker
                                    name="startTime"
                                    label="Start Time"
                                    icon={<Clock className="size-5" />}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="useCount"
                                    label="Max Use For User"
                                    placeholder="Max Use For User"
                                    type="text"
                                />
                                <FormDatePicker
                                    name="endDate"
                                    label="End Date"
                                    icon={<Calendar className="size-5" />} checkmark={false} 
                                />
                                <FormTimePicker
                                    name="endTime"
                                    label="End Time"
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