import { Form, Formik } from "formik"
import { FormInput } from "../../../common/FormInput"
import { TextArea } from "../../../common/textArea"
import { addExtraServiceValidationSchema } from "../../../constants/validationSchema"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import { useExtraServiceDetails, useUpdateExtraService } from "../../../api/features/extraServices.hooks"
import FileUploader from "../../../common/fileUploader"
import { useEffect, useState } from "react"

export default function EditExtraService() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [initialValues, setInitialValues] = useState<any>({
        extraServiceNameEnglish: "",
        extarServicePrice: "",
        serviceNameArabic: "",
        extraServiceDiscount: "",
        extarServiceTime: "",
        englishServiceDescription: "",
        extraArabicServiceDescription: "",
        image: null,
    })

    const { data: serviceDetails, isLoading } = useExtraServiceDetails(id as string, {
        enabled: !!id,
    })

    const { mutate: updateExtraService, isPending } = useUpdateExtraService({
        onSuccess: () => {
            toast.success("Extra service updated successfully")
            navigate("/services&extra/manage/ExtreService")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to update extra service")
        },
    })

    useEffect(() => {
        if (serviceDetails) {
            const raw = serviceDetails.data || serviceDetails
            const svc = raw.service || raw
            setInitialValues({
                extraServiceNameEnglish: svc.extra_service_name || "",
                extarServicePrice: svc.extra_service_price ?? "",
                serviceNameArabic: svc.extra_service_name_arabic || "",
                extraServiceDiscount: svc.extra_service_discount ?? "",
                extarServiceTime: String(svc.extra_service_time ?? ""),
                englishServiceDescription: svc.extra_service_description || "",
                extraArabicServiceDescription: svc.extra_service_description_arabic || "",
                image: null,
            })
        }
    }, [serviceDetails])

    if (isLoading) {
        return (
            <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <div className="text-center py-10">Loading...</div>
            </main>
        )
    }

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
            <h1 className="text-[20px] font-bold mb-8">Edit Extra Service</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={addExtraServiceValidationSchema}
                enableReinitialize
                onSubmit={(values) => {
                    const formData = new FormData()
                    formData.append("extra_service_name", values.extraServiceNameEnglish)
                    formData.append("extra_service_description", values.englishServiceDescription)
                    formData.append("extra_service_name_arabic", values.serviceNameArabic)
                    formData.append("extra_service_description_arabic", values.extraArabicServiceDescription)
                    formData.append("extra_service_price", String(values.extarServicePrice))
                    formData.append("extra_service_time", String(values.extarServiceTime))
                    if (values.extraServiceDiscount !== "") {
                        formData.append("extra_service_discount", String(values.extraServiceDiscount ?? 0))
                    }

                    const files = values.image
                    if (files && files.length > 0 && files[0] instanceof File) {
                        formData.append("image", files[0])
                    }

                    updateExtraService({ id: id as string, data: formData })
                }}
            >
                {({ isValid, values }) => (
                    <Form>
                        <div className="grid grid-cols-3 gap-5 border-b border-[#E9EAEC] pb-10">
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
                                    moreOptions="%"
                                />
                            </div>
                            <div className="grid grid-cols-1 ps-20 gap-2">
                                <h2>Service Image</h2>
                                <FileUploader
                                    name="image"
                                    title="Service Image"
                                />
                            </div>
                            <div className="grid grid-cols-1">
                                <FormInput
                                    name="extarServiceTime"
                                    label="Extra Service Time"
                                    placeholder="Extra Service Time"
                                    type="text"
                                    moreOptions="m"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5 mt-5 pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="englishServiceDescription"
                                    label="Service Description (In English)"
                                    placeholder="Service Description (In English)"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="extraArabicServiceDescription"
                                    label="Extra Service Description (In Arabic)"
                                    placeholder="Extra Service Description (In Arabic)"
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
