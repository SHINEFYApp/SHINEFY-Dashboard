import { useNavigate, useParams } from "react-router"
import { useServiceDetails } from "../../../api/features/services.hooks"
import { ArrowLeft } from "lucide-react"

export default function ViewService() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: serviceDetails, isLoading } = useServiceDetails(id as string, {
        enabled: !!id,
    })

    const svc = serviceDetails?.data || serviceDetails
    const imageBase = import.meta.env.VITE_API_URL

    if (isLoading) {
        return (
            <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <div className="text-center py-10">Loading...</div>
            </main>
        )
    }

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate("/services&extra/manage/Service")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-[20px] font-bold">Service Details</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Name (English)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_name || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Label (English)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_label || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Price</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_price || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Time (minutes)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_time ?? "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Discount</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_discount ? `${svc.service_discount}%` : "No Discount"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Apply Add Extra Service</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.apply_add_extra_service ? "Yes" : "No"}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Name (Arabic)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_name_arabic || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Label (Arabic)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_label_arabic || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Price Before Discount</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_price_before_discount ?? "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Description (English)</label>
                        <div className="w-full min-h-[58px] px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_description || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Service Description (Arabic)</label>
                        <div className="w-full min-h-[58px] px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.service_description_arabic || "N/A"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center mb-8">
                <h2 className="font-bold capitalize mb-4">Service Image</h2>
                <div className="w-60 h-60 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                    {svc?.service_image ? (
                        <img
                            src={`${imageBase}/uploads/service_image/${svc.service_image}`}
                            alt={svc.service_name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400">No Image</span>
                    )}
                </div>
            </div>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => navigate(`/services&extra/manage/Service/editService/${id}`)}
                    className="px-8 py-3 bg-[#4CAF50] text-white font-bold rounded-[10px] hover:bg-[#388E3C] transition-colors"
                >
                    Edit Service
                </button>
            </div>
        </main>
    )
}
