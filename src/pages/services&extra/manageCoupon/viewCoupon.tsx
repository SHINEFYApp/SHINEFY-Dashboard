import { useNavigate, useParams } from "react-router"
import { useGetCoupon } from "../../../api/features/coupons.hooks"
import { ArrowLeft } from "lucide-react"

export default function ViewCoupon() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: couponData, isLoading } = useGetCoupon(Number(id))

    const coupon = couponData?.data?.data || couponData?.data || couponData

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
                    onClick={() => navigate("/services&extra/manage/coupon")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-[20px] font-bold">Coupon Details</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Coupon Code</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.code || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Amount (EGP)</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.amount ?? "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Discount Percent</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.discount_percent ? `${coupon.discount_percent}%` : "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Audience Type</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.audience_type || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Max Uses Per User</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.max_uses_per_user ?? "N/A"}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Status</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.status === 1 ? "Active" : coupon?.status === 0 ? "Inactive" : "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Services</label>
                        <div className="w-full min-h-[58px] px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.services_text || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Total Bookings</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.total_booking ?? "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Start Date</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.start_at || "N/A"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">End Date</label>
                        <div className="w-full h-[58px] px-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center font-medium">
                            {coupon?.end_at || "N/A"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => navigate(`/services&extra/manage/coupon/edit/${id}`)}
                    className="px-8 py-3 bg-[#4CAF50] text-white font-bold rounded-[10px] hover:bg-[#388E3C] transition-colors"
                >
                    Edit Coupon
                </button>
            </div>
        </main>
    )
}
