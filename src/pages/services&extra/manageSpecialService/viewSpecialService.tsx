import { useNavigate, useParams } from "react-router"
import { useSpecialServiceDetails } from "../../../api/features/specialServices.hooks"
import { ArrowLeft } from "lucide-react"

export default function ViewSpecialService() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: serviceDetails, isLoading } = useSpecialServiceDetails(id as string, {
        enabled: !!id,
    })

    const svc = serviceDetails?.data || serviceDetails

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
                    onClick={() => navigate("/services&extra/manage/SpecialService")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-[20px] font-bold">Special Service Details</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Name (English)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.name_en || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Price</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.price || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Label</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.label || "N/A"}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Name (Arabic)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.name_ar || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Description (English)</label>
                        <div className="w-full min-h-[58px] px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.description_en || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Description (Arabic)</label>
                        <div className="w-full min-h-[58px] px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {svc?.description_ar || "N/A"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center mb-8">
                <h2 className="font-bold capitalize mb-4">Service Image</h2>
                <div className="w-60 h-60 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                    {svc?.photo_url ? (
                        <img
                            src={svc.photo_url}
                            alt={svc.name_en}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400">No Image</span>
                    )}
                </div>
            </div>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => navigate(`/services&extra/manage/SpecialService/editSpecialService/${id}`)}
                    className="px-8 py-3 bg-[#4CAF50] text-white font-bold rounded-[10px] hover:bg-[#388E3C] transition-colors"
                >
                    Edit Special Service
                </button>
            </div>
        </main>
    )
}
