import { Form, Formik } from "formik"
import { FormInput } from "../../../common/FormInput"
import { TextArea } from "../../../common/textArea"
import { addSpecialServiceValidationSchema } from "../../../constants/validationSchema"
import { addSpecialServiceInitialValues } from "../../../constants/initialValues"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useAddSpecialService } from "../../../api/features/specialServices.hooks"
import FileUploader from "../../../common/fileUploader"

export default function AddSpecialService() {
    const navigate = useNavigate()

    const { mutate: addSpecialService, isPending } = useAddSpecialService({
        onSuccess: () => {
            toast.success("Special service added successfully")
            navigate("/services&extra/manage/SpecialService")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to add special service")
        },
    })

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
            <h1 className="text-[20px] font-bold mb-8">Add Special Service</h1>
            <Formik
                initialValues={{
                    ...addSpecialServiceInitialValues,
                    photo: null,
                }}
                validationSchema={addSpecialServiceValidationSchema}
                onSubmit={(values) => {
                    const formData = new FormData()
                    formData.append("name_en", values.nameEnglish)
                    formData.append("name_ar", values.nameArabic)
                    formData.append("price", String(values.price))
                    if (values.descriptionEnglish) {
                        formData.append("description_en", values.descriptionEnglish)
                    }
                    if (values.descriptionArabic) {
                        formData.append("description_ar", values.descriptionArabic)
                    }
                    if (values.label) {
                        formData.append("label", values.label)
                    }

                    const files = values.photo
                    if (files && files.length > 0 && files[0] instanceof File) {
                        formData.append("photo", files[0])
                    }

                    addSpecialService(formData)
                }}
            >
                {({ isValid, values }) => (
                    <Form>
                        <div className="grid grid-cols-3 gap-5 border-b border-[#E9EAEC] pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="nameEnglish"
                                    label="Name (In English)"
                                    placeholder="Service Name"
                                    type="text"
                                />
                                <FormInput
                                    name="price"
                                    label="Price"
                                    placeholder="Price"
                                    type="text"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="nameArabic"
                                    label="Name (In Arabic)"
                                    placeholder="اسم الخدمة"
                                    type="text"
                                />
                                <FormInput
                                    name="label"
                                    label="Label"
                                    placeholder="Label"
                                    type="text"
                                />
                            </div>
                            <div className="grid grid-cols-1 ps-20 gap-2">
                                <h2>Service Image</h2>
                                <FileUploader
                                    name="photo"
                                    title="Service Image"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5 mt-5 pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="descriptionEnglish"
                                    label="Description (In English)"
                                    placeholder="Description (In English)"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <TextArea
                                    name="descriptionArabic"
                                    label="Description (In Arabic)"
                                    placeholder="الوصف (بالعربية)"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 mb-10">
                            <button
                                disabled={!isValid || isPending}
                                type="submit"
                                className="h-12 text-[20px] font-bold bg-[#FFC107] rounded-[10px] disabled:opacity-50"
                            >
                                {isPending ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}
