import { Form, Formik } from "formik"
import { FormDatePicker } from "../../../common/FormDatePicker"
import { FormTimePicker } from "../../../common/FormTimePicker"
import { FormInput } from "../../../common/FormInput"
import { Calendar, Clock } from "lucide-react"
import { FormDropdown } from "../../../common/FormDropdown"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useAddCoupon } from "../../../api/features/coupons.hooks"
import { useGetServiceBoys } from "../../../api/features/serviceBoys.hooks"
import type { AddCouponPayload } from "../../../api/features/coupons"
import { useEffect } from "react"
import { useFormikContext } from "formik"
import * as Yup from "yup"

const audienceTypeOptions = [
    { value: "all_users", label: "All Users" },
    { value: "specific_users", label: "Specific Users" },
    { value: "specific_groups", label: "Specific Groups" },
    { value: "new_users", label: "New Users" },
    { value: "first_booking", label: "First Booking Only" },
]

const servicesModeOptions = [
    { value: "all", label: "All Services" },
    { value: "specific", label: "Specific Services" },
]

function FirstBookingWatcher() {
    const { values, setFieldValue } = useFormikContext<any>()
    const isFirstBooking = values.audience_type === "first_booking"
    useEffect(() => {
        if (isFirstBooking) {
            setFieldValue("max_uses_per_user", "1")
        }
    }, [isFirstBooking])
    return null
}

const validationSchema = Yup.object({
    code: Yup.string().required("Coupon code is required"),
    amount: Yup.number().typeError("Must be a number").required("Amount is required").min(0),
    discount_percent: Yup.number().typeError("Must be a number").required("Discount is required").min(1).max(100),
    audience_type: Yup.string().required("Audience type is required"),
    services_mode: Yup.string().required("Services mode is required"),
    startDate: Yup.date().typeError("Invalid date").required("Start date is required"),
    startTime: Yup.string().required("Start time is required"),
    endDate: Yup.date().typeError("Invalid date").required("End date is required"),
    endTime: Yup.string().required("End time is required"),
    max_uses_per_user: Yup.number().typeError("Must be a number").required("Required").min(1),
})

const initialValues = {
    code: "",
    amount: "",
    discount_percent: "",
    audience_type: "",
    max_users: "",
    user_ids: "",
    group_ids: "",
    services_mode: "all",
    service_ids: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    max_uses_per_user: "1",
    service_boy_id: 0,
}

export default function AddCoupon() {
    const navigate = useNavigate()

    const { data: serviceBoysData } = useGetServiceBoys({ limit: 100, active_flag: 1 })
    const serviceBoys = serviceBoysData?.data?.data?.data || []
    const serviceBoyOptions = [
        { value: 0, label: "None (not a referral coupon)" },
        ...(Array.isArray(serviceBoys) ? serviceBoys.map((sb: any) => ({
            value: sb.user_id || sb.id,
            label: sb.name,
        })) : []),
    ]

    const { mutate: addCouponMutate, isPending } = useAddCoupon({
        onSuccess: () => {
            toast.success("Coupon added successfully")
            navigate("/services&extra/manage/coupon")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to add coupon")
        },
    })

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
            <h1 className="text-[20px] font-bold mb-8">Add Coupon</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const payload: AddCouponPayload = {
                        code: values.code,
                        amount: Number(values.amount),
                        discount_percent: Number(values.discount_percent),
                        audience_type: values.audience_type,
                        max_uses_per_user: Number(values.max_uses_per_user),
                        user_ids: values.audience_type === "specific_users"
                            ? values.user_ids.split(",").map(Number).filter(Boolean)
                            : [],
                        group_ids: values.audience_type === "specific_groups"
                            ? values.group_ids.split(",").map(Number).filter(Boolean)
                            : [],
                        services_mode: values.services_mode,
                        service_ids: values.services_mode === "specific"
                            ? values.service_ids.split(",").map(Number).filter(Boolean)
                            : [],
                        start_at: `${values.startDate} ${values.startTime}`,
                        end_at: `${values.endDate} ${values.endTime}`,
                        limit_to_hours: false,
                        start_hour: null,
                        end_hour: null,
                        service_boy_id: Number(values.service_boy_id),
                    }
                    if (["all_users", "new_users", "first_booking"].includes(values.audience_type)) {
                        payload.max_users = Number(values.max_users)
                    }
                    addCouponMutate(payload)
                }}
            >
                {({ values, isValid }) => {
                    const isFirstBooking = values.audience_type === "first_booking"

                    return (
                        <Form>
                            <FirstBookingWatcher />
                            <div className="grid grid-cols-3 gap-5 border-b border-[#E9EAEC] pb-10">
                                <div className="grid grid-cols-1 gap-5">
                                    <FormInput
                                        name="code"
                                        label="Coupon Code"
                                        placeholder="Coupon Code"
                                        type="text"
                                    />
                                    <FormInput
                                        name="amount"
                                        label="Amount (EGP)"
                                        placeholder="Amount"
                                        type="number"
                                    />
                                    <FormInput
                                        name="discount_percent"
                                        label="Discount Percent"
                                        placeholder="Discount %"
                                        type="number"
                                    />
                                    <FormDropdown
                                        name="audience_type"
                                        label="Audience Type"
                                        placeholder="Select Audience"
                                        options={audienceTypeOptions}
                                    />
                                    {["all_users", "new_users", "first_booking"].includes(values.audience_type) && (
                                        <FormInput
                                            name="max_users"
                                            label="Max Users"
                                            placeholder="Max Users"
                                            type="number"
                                        />
                                    )}
                                    {values.audience_type === "specific_users" && (
                                        <FormInput
                                            name="user_ids"
                                            label="User IDs (comma-separated)"
                                            placeholder="e.g. 1,2,3"
                                            type="text"
                                        />
                                    )}
                                    {values.audience_type === "specific_groups" && (
                                        <FormInput
                                            name="group_ids"
                                            label="Group IDs (comma-separated)"
                                            placeholder="e.g. 1,2,3"
                                            type="text"
                                        />
                                    )}
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    <FormDropdown
                                        name="service_boy_id"
                                        label="Referral Service Boy"
                                        placeholder="Select Service Boy"
                                        options={serviceBoyOptions}
                                    />
                                    <FormDropdown
                                        name="services_mode"
                                        label="Services Mode"
                                        placeholder="Select Mode"
                                        options={servicesModeOptions}
                                    />
                                    {values.services_mode === "specific" && (
                                        <FormInput
                                            name="service_ids"
                                            label="Service IDs (comma-separated)"
                                            placeholder="e.g. 1,2,3"
                                            type="text"
                                        />
                                    )}
                                    <FormInput
                                        name="max_uses_per_user"
                                        label="Max Uses Per User"
                                        placeholder="Max Uses"
                                        type="number"
                                        disabled={isFirstBooking}
                                    />
                                    {isFirstBooking && (
                                        <p className="text-xs text-blue-600 -mt-3">
                                            This coupon can only be used once per user, on their first booking
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 gap-5">
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
                            <div className="grid grid-cols-3 mt-8">
                                <button
                                    disabled={!isValid || isPending}
                                    type="submit"
                                    className="h-12 text-[20px] font-bold bg-[#FFC107] rounded-[10px] disabled:opacity-50"
                                >
                                    {isPending ? "Saving..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </main>
    )
}
