import { Form, Formik } from "formik"
import { FormInput } from "../../../common/FormInput"
import { TextArea } from "../../../common/textArea"
import { manageServiceValidationSchema } from "../../../constants/validationSchema"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import { useServiceDetails, useUpdateService } from "../../../api/features/services.hooks"
import FileUploader from "../../../common/fileUploader"
import { useEffect, useState } from "react"

export default function EditService() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [initialValues, setInitialValues] = useState<any>({
        serviceNameEnglish: "",
        serviceLabelEnglish: "",
        serviceNameArabic: "",
        serviceLabelArabic: "",
        servicePrice: "",
        serviceTime: "",
        serviceDiscount: "",
        engishServiceDescription: "",
        arabicServiceDescription: "",
        image: null,
        apply_add_extra_service: "No",
    })

    const { data: serviceDetails, isLoading } = useServiceDetails(id as string, {
        enabled: !!id,
    })

    const { mutate: updateService, isPending } = useUpdateService({
        onSuccess: () => {
            toast.success("Service updated successfully")
            navigate("/services&extra/manage/Service")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to update service")
        },
    })

    useEffect(() => {
        if (serviceDetails) {
            const raw = serviceDetails.data || serviceDetails
            const svc = raw.service || raw
            setInitialValues({
                serviceNameEnglish: svc.service_name || "",
                serviceLabelEnglish: svc.service_label || "",
                serviceNameArabic: svc.service_name_arabic || "",
                serviceLabelArabic: svc.service_label_arabic || "",
                servicePrice: svc.service_price ?? "",
                serviceTime: String(svc.service_time ?? ""),
                serviceDiscount: svc.service_discount ?? "",
                engishServiceDescription: svc.service_description || "",
                arabicServiceDescription: svc.service_description_arabic || "",
                image: null,
                apply_add_extra_service: svc.apply_add_extra_service ? "Yes" : "No",
            })
        }
    }, [serviceDetails])

    if (isLoading) {
        return (
            <main className="min-h-screen w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="text-center py-10">Loading...</div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
            <h1 className="text-[20px] font-bold mb-8">Edit Service</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={manageServiceValidationSchema}
                enableReinitialize
                onSubmit={(values) => {
                    const formData = new FormData()
                    formData.append("service_name", values.serviceNameEnglish)
                    formData.append("service_label", values.serviceLabelEnglish)
                    formData.append("service_description", values.engishServiceDescription)
                    formData.append("service_name_arabic", values.serviceNameArabic)
                    formData.append("service_label_arabic", values.serviceLabelArabic)
                    formData.append("service_description_arabic", values.arabicServiceDescription)
                    formData.append("service_price", String(values.servicePrice))
                    formData.append("service_time", String(values.serviceTime))
                    if (values.serviceDiscount !== "") {
                        formData.append("service_discount", String(values.serviceDiscount ?? 0))
                    }
                    formData.append("apply_add_extra_service", values.apply_add_extra_service === "Yes" ? "1" : "0")

                    const files = values.image
                    if (files && files.length > 0 && files[0] instanceof File) {
                        formData.append("image", files[0])
                    }

                    updateService({ id: id as string, data: formData })
                }}
            >
                {({ isValid, values, setFieldValue }) => (
                    <Form>
                        <div className="grid grid-cols-3 gap-5 border-b border-[#E9EAEC] pb-10">
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
                                <FileUploader
                                    name="image"
                                    title="Service Image"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5 mt-5 border-b border-[#E9EAEC] pb-10">
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
                                    moreOptions="m"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="serviceDiscount"
                                    label="Service Discount"
                                    placeholder="Service Discount"
                                    type="text"
                                    moreOptions="%"
                                />
                                <div className="h-[76px] space-y-2">
                                    <h2 className="text-[14px] m-0 text-gray-700">Apply Add Extra Service</h2>
                                    <div className="grid grid-cols-2 gap-5">
                                        {["Yes", "No"].map((btn) => (
                                            <button
                                                onClick={() => setFieldValue("apply_add_extra_service", btn)}
                                                key={btn}
                                                type="button"
                                                className={`rounded-xl mt-2 border ${values.apply_add_extra_service === btn ? "border-[#FFC107] bg-[#FFF4D3] hover:bg-[#ffefb9]" : "border-gray-200 bg-gray-50 hover:bg-gray-100"} px-4 h-12 text-sm font-medium transition-all duration-200 text-[14px]`}
                                            >
                                                {btn}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5 mt-5 pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="engishServiceDescription"
                                    label="Service Description (in English)"
                                    placeholder="Service Description (in English)"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="arabicServiceDescription"
                                    label="Service Description (In Arabic)"
                                    placeholder="Service Description (In Arabic)"
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
