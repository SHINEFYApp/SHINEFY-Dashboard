import { Form, Formik } from "formik"
import { FormDatePicker } from "../../../common/FormDatePicker"
import { FormTimePicker } from "../../../common/FormTimePicker"
import { FormInput } from "../../../common/FormInput"
import { Calendar, Clock } from "lucide-react"
import { addCouponValidationSchema } from "../../../constants/validationSchema"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import { useGetCoupon, useEditCoupon } from "../../../api/features/coupons.hooks"
import { FormDropdown } from "../../../common/FormDropdown"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

export default function EditCoupon() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [initialValues, setInitialValues] = useState({
        user: "",
        couponAnount: "",
        couponCode: "",
        discount: "",
        services: "",
        startDate: "",
        startTime: "",
        useCount: "",
        endDate: "",
        endTime: "",
    })

    const { data: couponData, isLoading } = useGetCoupon(Number(id))

    const { mutate: updateCoupon, isPending } = useEditCoupon({
        onSuccess: () => {
            toast.success("Coupon updated successfully")
            queryClient.invalidateQueries({ queryKey: ["coupons"] })
            navigate("/services&extra/manage/coupon")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to update coupon")
        },
    })

    useEffect(() => {
        if (couponData) {
            const coupon = couponData?.data?.data || couponData?.data || couponData
            setInitialValues({
                user: coupon.audience_type || "",
                couponAnount: coupon.amount?.toString() || "",
                couponCode: coupon.code || "",
                discount: coupon.discount_percent?.toString() || "",
                services: coupon.services_text || "",
                startDate: coupon.start_at || "",
                startTime: "",
                useCount: coupon.max_uses_per_user?.toString() || "",
                endDate: coupon.end_at || "",
                endTime: "",
            })
        }
    }, [couponData])

    if (isLoading) {
        return (
            <main className="min-h-screen w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="text-center py-10">Loading...</div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
            <h1 className="text-[20px] font-bold mb-8">Edit Coupon</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={addCouponValidationSchema}
                enableReinitialize
                onSubmit={(values) => {
                    updateCoupon({
                        id: Number(id),
                        code: values.couponCode,
                        amount: Number(values.couponAnount),
                        discount_percent: Number(values.discount),
                        audience_type: values.user,
                        max_uses_per_user: Number(values.useCount),
                        user_ids: [],
                        group_ids: [],
                        services_mode: "",
                        service_ids: [],
                        start_at: `${values.startDate} ${values.startTime}`.trim(),
                        end_at: `${values.endDate} ${values.endTime}`.trim(),
                        limit_to_hours: false,
                        start_hour: null,
                        end_hour: null,
                    })
                }}
            >
                {({ isValid }) => (
                    <Form>
                        <div className="grid grid-cols-3 gap-5 border-b border-[#E9EAEC] pb-10">
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
                        <div className="grid grid-cols-3 gap-5 mt-5 pb-10">
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
                            <button
                                disabled={!isValid || isPending}
                                type="submit"
                                className="h-12 text-[20px] font-bold bg-[#FFC107] rounded-[10px] disabled:opacity-50"
                            >
                                {isPending ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}
