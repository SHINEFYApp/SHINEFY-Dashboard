import { Form, Formik } from "formik"
import { FormInput } from "../../common/FormInput"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import { useAddAd, useUpdateAd, useAdDetails } from "../../api/features/ads.hooks"
import FileUploader from "../../common/fileUploader"
import { useEffect, useState } from "react"

export default function ManageAddAds() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [initialValues, setInitialValues] = useState<any>({
        title: "",
        type: "",
        description: "",
        start_date: "",
        end_date: "",
        is_active: "1",
        link: "",
        image: null,
    })

    const { data: adDetails, isLoading: isLoadingDetails } = useAdDetails(id as string, {
        enabled: isEdit,
    })

    const { mutate: addAd, isPending: isAdding } = useAddAd({
        onSuccess: () => {
            toast.success("Ad added successfully")
            navigate("/advertising/manage")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to add ad")
        },
    })

    const { mutate: updateAd, isPending: isUpdating } = useUpdateAd({
        onSuccess: () => {
            toast.success("Ad updated successfully")
            navigate("/advertising/manage")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to update ad")
        },
    })

    useEffect(() => {
        if (adDetails) {
            const raw = adDetails.data || adDetails
            const ad = raw.ad || raw
            setInitialValues({
                title: ad.title || "",
                type: ad.type || "",
                description: ad.description || "",
                start_date: ad.start_date || "",
                end_date: ad.end_date || "",
                is_active: String(ad.is_active ?? "1"),
                link: ad.link || "",
                image: null,
            })
        }
    }, [adDetails])

    if (isEdit && isLoadingDetails) {
        return (
            <main className="min-h-screen w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="text-center py-10">Loading...</div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
            <h1 className="text-[20px] font-bold mb-8">{isEdit ? "Edit Ad" : "Add Ad"}</h1>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values) => {
                    const formData = new FormData()
                    formData.append("title", values.title)
                    formData.append("type", values.type)
                    formData.append("description", values.description)
                    formData.append("start_date", values.start_date)
                    formData.append("end_date", values.end_date)
                    formData.append("is_active", String(values.is_active))
                    formData.append("link", values.link)

                    const files = values.image
                    if (files && files.length > 0 && files[0] instanceof File) {
                        formData.append("image", files[0])
                    }

                    if (isEdit) {
                        updateAd({ id: id as string, data: formData })
                    } else {
                        addAd(formData)
                    }
                }}
            >
                {({ isValid, values, setFieldValue }) => (
                    <Form>
                        <div className="grid grid-cols-2 gap-5 border-b border-[#E9EAEC] pb-10">
                            <div className="grid grid-cols-1 gap-5">
                                <FormInput
                                    name="title"
                                    label="Title"
                                    placeholder="Ad Title"
                                    type="text"
                                />
                                <div className="space-y-2">
                                    <h2 className="text-[14px] m-0 text-gray-700">Type</h2>
                                    <div className="grid grid-cols-2 gap-5">
                                        {[
                                            { label: "Homepage Ad", value: "homepage" },
                                            { label: "Popup Ad", value: "pop_up" },
                                        ].map((btn) => (
                                            <button
                                                onClick={() => setFieldValue("type", btn.value)}
                                                key={btn.value}
                                                type="button"
                                                className={`rounded-xl mt-2 border ${values.type === btn.value ? "border-[#FFC107] bg-[#FFF4D3] hover:bg-[#ffefb9]" : "border-gray-200 bg-gray-50 hover:bg-gray-100"} px-4 h-12 text-sm font-medium transition-all duration-200 text-[14px]`}
                                            >
                                                {btn.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <FormInput
                                    name="start_date"
                                    label="Start Date"
                                    type="date"
                                />
                                <FormInput
                                    name="end_date"
                                    label="End Date"
                                    type="date"
                                />
                                <FormInput
                                    name="link"
                                    label="Link (URL)"
                                    placeholder="https://example.com"
                                    type="text"
                                />
                                <div className="space-y-2">
                                    <h2 className="text-[14px] m-0 text-gray-700">Active</h2>
                                    <div className="grid grid-cols-2 gap-5">
                                        {[
                                            { label: "Active", value: "1" },
                                            { label: "Inactive", value: "0" },
                                        ].map((btn) => (
                                            <button
                                                onClick={() => setFieldValue("is_active", btn.value)}
                                                key={btn.value}
                                                type="button"
                                                className={`rounded-xl mt-2 border ${values.is_active === btn.value ? "border-[#FFC107] bg-[#FFF4D3] hover:bg-[#ffefb9]" : "border-gray-200 bg-gray-50 hover:bg-gray-100"} px-4 h-12 text-sm font-medium transition-all duration-200 text-[14px]`}
                                            >
                                                {btn.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <div className="space-y-2">
                                    <h2 className="text-[14px] m-0 text-gray-700">Description</h2>
                                    <textarea
                                        name="description"
                                        value={values.description}
                                        onChange={(e) => setFieldValue("description", e.target.value)}
                                        placeholder="Ad Description"
                                        rows={4}
                                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107]"
                                    />
                                </div>
                                <div className="ps-0 gap-2">
                                    <h2 className="text-[14px] m-0 text-gray-700 mb-2">Ad Image</h2>
                                    <FileUploader
                                        name="image"
                                        title="Ad Image"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 mb-10 mt-10">
                            <button
                                disabled={!isValid || isAdding || isUpdating}
                                type="submit"
                                className="h-12 text-[20px] font-bold bg-[#FFC107] rounded-[10px] disabled:opacity-50"
                            >
                                {isAdding || isUpdating ? "Submitting..." : isEdit ? "Update" : "Submit"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}
