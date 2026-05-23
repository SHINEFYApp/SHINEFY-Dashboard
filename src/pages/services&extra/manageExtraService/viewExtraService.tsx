import { useNavigate, useParams } from "react-router"
import { useExtraServiceDetails } from "../../../api/features/extraServices.hooks"
import { ArrowLeft } from "lucide-react"

export default function ViewExtraService() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: serviceDetails, isLoading } = useExtraServiceDetails(id as string, {
        enabled: !!id,
    })

    const svc = serviceDetails?.data || serviceDetails
    const imageBase = import.meta.env.VITE_IMAGES_URL

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
                    onClick={() => navigate("/services&extra/manage/ExtreService")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-[20px] font-bold">Extra Service Details</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Extra Service Name (English)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.extra_service_name || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Extra Service Price</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.extra_service_price || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Extra Service Time (minutes)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.extra_service_time ?? "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Extra Service Discount</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.extra_service_discount ? `${svc.extra_service_discount}%` : "No Discount"}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Extra Service Name (Arabic)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.extra_service_name_arabic || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Price Before Discount</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.extra_service_price_before_discount ?? "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Extra Service Description (English)</label>
                        <div className="w-full min-h-[58px] px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.extra_service_description || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Extra Service Description (Arabic)</label>
                        <div className="w-full min-h-[58px] px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.extra_service_description_arabic || "N/A"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center mb-8">
                <h2 className="font-bold capitalize mb-4">Service Image</h2>
                <div className="w-60 h-60 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                    {svc?.extra_service_image ? (
                        <img
                            src={svc.extra_service_image.startsWith("http") ? svc.extra_service_image : `${imageBase}/${svc.extra_service_image}`}
                            alt={svc.extra_service_name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400">No Image</span>
                    )}
                </div>
            </div>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => navigate(`/services&extra/manage/ExtreService/editExtraService/${id}`)}
                    className="px-8 py-3 bg-[#4CAF50] text-white font-bold rounded-[10px] hover:bg-[#388E3C] transition-colors"
                >
                    Edit Extra Service
                </button>
            </div>
        </main>
    )
}
