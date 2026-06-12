import { useParams, useNavigate } from "react-router"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useGetCouponBookings } from "../../../api/features/coupons.hooks"
import type { CouponBookingItem } from "../../../api/features/coupons"

export default function CouponBookings() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [start, setStart] = useState(0)
    const limit = 20

    const { data: bookingsData, isLoading } = useGetCouponBookings(Number(id), { start, limit })

    const response = bookingsData?.data || bookingsData
    const couponCode = response?.coupon_code || ""
    const total = response?.total || 0
    const bookings: CouponBookingItem[] = Array.isArray(response?.data) ? response.data : []

    const completedBookings = bookings.filter((b) => b.completed_status === 1)
    const totalRevenue = completedBookings.reduce((sum, b) => sum + Number(b.total_price || 0), 0)

    const currentPage = Math.floor(start / limit) + 1
    const totalPages = Math.ceil(total / limit)

    return (
        <main className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(`/services&extra/manage/coupon/view/${id}`)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-[20px] font-bold">Coupon Bookings &mdash; {couponCode}</h1>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                    <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
                    <p className="text-2xl font-bold mt-1">{total}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4 bg-green-50">
                    <p className="text-sm text-green-600 font-medium">Completed</p>
                    <p className="text-2xl font-bold mt-1 text-green-700">{completedBookings.length}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4 bg-blue-50">
                    <p className="text-sm text-blue-600 font-medium">Total Revenue (EGP)</p>
                    <p className="text-2xl font-bold mt-1 text-blue-700">{totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading bookings...</div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No bookings found for this coupon</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-2 font-semibold text-gray-600">#</th>
                                <th className="text-left py-3 px-2 font-semibold text-gray-600">Customer</th>
                                <th className="text-left py-3 px-2 font-semibold text-gray-600">Mobile</th>
                                <th className="text-left py-3 px-2 font-semibold text-gray-600">Date</th>
                                <th className="text-left py-3 px-2 font-semibold text-gray-600">Amount (EGP)</th>
                                <th className="text-left py-3 px-2 font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking.booking_id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-2">{start + index + 1}</td>
                                    <td className="py-3 px-2 font-medium">{booking.customer_name}</td>
                                    <td className="py-3 px-2">{booking.customer_mobile}</td>
                                    <td className="py-3 px-2">{booking.createtime}</td>
                                    <td className="py-3 px-2">{Number(booking.total_price).toFixed(2)}</td>
                                    <td className="py-3 px-2">
                                        {booking.completed_status === 1 ? (
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStart(Math.max(0, start - limit))}
                            disabled={start === 0}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <button
                            onClick={() => setStart(start + limit)}
                            disabled={start + limit >= total}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}
