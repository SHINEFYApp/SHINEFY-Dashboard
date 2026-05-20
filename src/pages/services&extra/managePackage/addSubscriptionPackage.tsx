import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useGetPackages } from "../../../api/features/packages.hooks"
import { useGetCoupons } from "../../../api/features/coupons.hooks"
import {
    usePurchasePackage,
    useResendPaymentLink,
} from "../../../api/features/subscriptionPackage.hooks"
import { usePost } from "../../../api/usePostData"
import type { PurchasePackageResponse } from "../../../api/features/subscriptionPackage"
import type { PackageResponseItem } from "../../../api/features/packages"
import type { CouponItem } from "../../../api/features/coupons"
import type { getUserInfoByNumberPayload, getUserInfoByNumberResponse, Vehicle } from "../../../types/bookings"
import { User, Package, Tag, Car, CreditCard, ExternalLink, Copy, CheckCircle, X, Hash, UserX, Phone, ChevronDown } from "lucide-react"
import { IoCallOutline } from "react-icons/io5"

export default function AddSubscriptionPackage() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [lastRequestedPhone, setLastRequestedPhone] = useState<string | null>(null)
    const [userInfo, setUserInfo] = useState<{ user_id: number; name: string; phone?: string } | null>(null)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [clientNotFound, setClientNotFound] = useState(false)
    const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null)
    const [selectedCouponCode, setSelectedCouponCode] = useState("")
    const [selectedVehicleId, setSelectedVehicleId] = useState<number | string>("")
    const [paymentResult, setPaymentResult] = useState<PurchasePackageResponse | null>(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [linkCopied, setLinkCopied] = useState(false)

    const baseURL = import.meta.env.VITE_API_URL

    const { mutate: searchUser, isPending: userLoading, data: userSearchData, isError: userError } = usePost<
        getUserInfoByNumberResponse,
        getUserInfoByNumberPayload
    >({
        route: `${baseURL}/api/book/user-details`,
        options: {
            onError: () => {
                setClientNotFound(true)
                setUserInfo(null)
                setVehicles([])
            },
        },
    })

    useEffect(() => {
        if (userSearchData?.data?.user_info) {
            setUserInfo({
                user_id: userSearchData.data.user_info.user_id,
                name: userSearchData.data.user_info.name,
                phone: phoneNumber,
            })
            setVehicles(userSearchData.data.vehicles || [])
            setClientNotFound(false)
            setSelectedVehicleId("")
        }
    }, [userSearchData])

    useEffect(() => {
        if (userError) {
            setUserInfo(null)
            setVehicles([])
            setClientNotFound(true)
        }
    }, [userError])

    const handlePhoneSearch = (phone: string) => {
        if (!phone) return
        const cleanPhone = phone.replace(/\D/g, "")
        if (cleanPhone === lastRequestedPhone) return
        setLastRequestedPhone(cleanPhone)
        setClientNotFound(false)
        searchUser({ phone_number: cleanPhone } as getUserInfoByNumberPayload)
    }

    const { data: packagesData, isLoading: packagesLoading } = useGetPackages({})
    const { data: couponsData } = useGetCoupons({})

    const packages: PackageResponseItem[] = packagesData?.data?.data || []
    const allCoupons: CouponItem[] = couponsData?.data?.data?.data || []
    const now = new Date()
    const coupons = allCoupons.filter((c) => {
        const endDate = new Date(c.end_at.replace(" ", "T"))
        return endDate >= now
    })

    const selectedPackage = packages.find((p) => p.id === selectedPackageId)
    const originalPrice = selectedPackage?.price || 0
    const selectedCoupon = coupons.find((c) => c.code === selectedCouponCode)
    const discount = selectedCoupon
        ? selectedCoupon.discount_percent > 0
            ? Math.round(originalPrice * selectedCoupon.discount_percent / 100)
            : selectedCoupon.amount
        : 0
    const total = Math.max(0, originalPrice - discount)

    const { mutate: purchaseMutate, isPending: purchasePending } = usePurchasePackage({
        onSuccess: (data: PurchasePackageResponse) => {
            setPaymentResult(data)
            setShowPaymentModal(true)
            toast.success("Payment link generated successfully")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to create subscription")
        },
    })

    const { mutate: resendLinkMutate, isPending: resendPending } = useResendPaymentLink({
        onSuccess: (data: any) => {
            setPaymentResult((prev) => prev ? { ...prev, payment_url: data.payment_url, tran_ref: data.tran_ref } : null)
            toast.success("New payment link generated")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to resend payment link")
        },
    })

    const handlePurchase = () => {
        if (!userInfo) {
            toast.error("Please search for a user first")
            return
        }
        if (!selectedPackageId) {
            toast.error("Please select a package")
            return
        }

        purchaseMutate({
            user_id: userInfo.user_id,
            package_id: selectedPackageId,
            ...(selectedCouponCode ? { coupon_code: selectedCouponCode } : {}),
            ...(selectedVehicleId ? { vehicle_id: selectedVehicleId } : {}),
        })
    }

    const handleResendLink = () => {
        if (!paymentResult?.user_package_id) return
        resendLinkMutate({ user_package_id: paymentResult.user_package_id })
    }

    const copyPaymentLink = () => {
        if (paymentResult?.payment_url) {
            navigator.clipboard.writeText(paymentResult.payment_url)
            setLinkCopied(true)
            setTimeout(() => setLinkCopied(false), 2000)
            toast.success("Link copied to clipboard")
        }
    }

    const isFormValid = !!userInfo && !!selectedPackageId

    return (
        <main className="min-h-screen w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
            <h1 className="text-[20px] font-bold mb-8">Add Subscription Package</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - User & Package Selection */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Section 1: User Selection by Phone */}
                    <div className="border border-[#E9EAEC] rounded-2xl p-5">
                        <h2 className="text-[16px] font-semibold mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-gray-500" />
                            Select User
                        </h2>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            <div className="relative">
                                <IoCallOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    onBlur={(e) => handlePhoneSearch(e.target.value)}
                                    placeholder="Enter phone number"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {userLoading && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                            </div>
                        )}

                        {clientNotFound && !userInfo && (
                            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-5 flex items-center gap-4 animate-slide-up">
                                <div className="shrink-0 w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
                                    <UserX className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-red-700">Client Not Found</p>
                                    <p className="text-xs text-red-400 mt-0.5">No account linked to this phone number</p>
                                </div>
                            </div>
                        )}

                        {userInfo && !userLoading && (
                            <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4 animate-slide-up">
                                <div className="shrink-0 w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                                    <User className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-green-800 mb-1">Client Found</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-green-500" />
                                            <div>
                                                <p className="text-xs text-green-500">Name</p>
                                                <p className="text-sm font-medium text-gray-800">{userInfo.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-green-500" />
                                            <div>
                                                <p className="text-xs text-green-500">User ID</p>
                                                <p className="text-sm font-medium text-gray-800">#{userInfo.user_id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-green-500" />
                                            <div>
                                                <p className="text-xs text-green-500">Phone</p>
                                                <p className="text-sm font-medium text-gray-800">{userInfo.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Section 2: Package Selection */}
                    <div className="border border-[#E9EAEC] rounded-2xl p-5">
                        <h2 className="text-[16px] font-semibold mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-gray-500" />
                            Select Package
                        </h2>

                        {packagesLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-28 bg-gray-50 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : packages.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">No packages available</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {packages.map((pkg) => {
                                    const isSelected = selectedPackageId === pkg.id
                                    return (
                                        <button
                                            key={pkg.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedPackageId(pkg.id)
                                                setSelectedCouponCode("")
                                            }}
                                            className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                                                isSelected
                                                    ? "border-primary bg-[#FFF8E1] shadow-sm"
                                                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                                            }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-[15px]">{pkg.name}</h3>
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                )}
                                            </div>
                                            <div className="flex gap-4 mt-3 text-xs text-gray-500">
                                                <span>Price: <strong className="text-gray-800">{pkg.price}</strong></span>
                                                {pkg.total_days && <span>Duration: <strong className="text-gray-800">{pkg.total_days} days</strong></span>}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Section 3: Optional Fields */}
                    <div className="border border-[#E9EAEC] rounded-2xl p-5">
                        <h2 className="text-[16px] font-semibold mb-4 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-gray-500" />
                            Optional Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Coupon</label>
                                <div className="relative">
                                    <select
                                        value={selectedCouponCode}
                                        onChange={(e) => setSelectedCouponCode(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 cursor-pointer pr-10"
                                    >
                                        <option value="">Select a coupon</option>
                                        {coupons.map((c) => (
                                            <option key={c.id} value={c.code}>
                                                {c.code} {c.discount_percent > 0 ? `(${c.discount_percent}% off)` : `($${c.amount} off)`}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                {selectedCoupon && (
                                    <p className="text-xs text-green-600 mt-1">
                                        Discount: {discount} | Total after coupon: {total}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Vehicle <span className="text-gray-400 font-normal">(if required)</span>
                                </label>
                                <div className="relative">
                                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <select
                                        value={selectedVehicleId}
                                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                                        disabled={vehicles.length === 0}
                                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 py-3.5 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <option value="">{vehicles.length === 0 ? "Search user to load vehicles" : "Select a vehicle"}</option>
                                        {vehicles.map((v) => (
                                            <option key={v.vehicle_id} value={v.vehicle_id}>
                                                {v.vehicle_name || v.make_name} - {v.plate_number}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Summary & Submit */}
                <div className="lg:col-span-1">
                    <div className="border border-[#E9EAEC] rounded-2xl p-5 sticky top-24">
                        <h2 className="text-[16px] font-semibold mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-gray-500" />
                            Payment Summary
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-[#E9EAEC]">
                                <span className="text-gray-500">User</span>
                                <span className="font-medium">{userInfo?.name || "Not selected"}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E9EAEC]">
                                <span className="text-gray-500">Package</span>
                                <span className="font-medium">{selectedPackage?.name || "Not selected"}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E9EAEC]">
                                <span className="text-gray-500">Original Price</span>
                                <span className="font-medium">{originalPrice}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between py-2 border-b border-[#E9EAEC]">
                                    <span className="text-gray-500">Discount</span>
                                    <span className="font-medium text-green-600">-{discount}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-2">
                                <span className="text-gray-700 font-semibold">Total</span>
                                <span className="font-bold text-[18px] text-primary">{total}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePurchase}
                            disabled={!isFormValid || purchasePending}
                            className="w-full mt-6 h-12 text-[16px] font-bold bg-primary rounded-xl disabled:opacity-50 hover:bg-[#e6ae06] transition-colors flex items-center justify-center gap-2"
                        >
                            {purchasePending ? (
                                "Processing..."
                            ) : (
                                <>
                                    <ExternalLink className="w-4 h-4" />
                                    Generate Payment Link
                                </>
                            )}
                        </button>

                        {!userInfo && (
                            <p className="text-xs text-gray-400 mt-3 text-center">Search for a user and select a package to proceed</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Link Modal */}
            {showPaymentModal && paymentResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 relative animate-scale-up">
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold">Payment Link Generated</h2>
                            <p className="text-sm text-gray-500 mt-1">Share this link with the user to complete payment</p>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-[#E9EAEC]">
                                <span className="text-gray-500">Transaction Ref</span>
                                <span className="font-mono font-medium">{paymentResult.tran_ref}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E9EAEC]">
                                <span className="text-gray-500">Amount</span>
                                <span className="font-semibold text-green-600">{paymentResult.amount}</span>
                            </div>
                            {Number(paymentResult.discount) > 0 && (
                                <div className="flex justify-between py-2 border-b border-[#E9EAEC]">
                                    <span className="text-gray-500">Discount</span>
                                    <span className="font-medium">{paymentResult.discount}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-2 border-b border-[#E9EAEC]">
                                <span className="text-gray-500">Original Price</span>
                                <span className="font-medium">{paymentResult.original_price}</span>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-[#E9EAEC] break-all">
                            <p className="text-xs text-gray-500 mb-1">Payment URL</p>
                            <p className="text-sm text-primary font-medium">{paymentResult.payment_url}</p>
                        </div>

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={copyPaymentLink}
                                className="flex-1 h-11 flex items-center justify-center gap-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                                <Copy className="w-4 h-4" />
                                {linkCopied ? "Copied!" : "Copy Link"}
                            </button>
                            <a
                                href={paymentResult.payment_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 h-11 flex items-center justify-center gap-2 bg-primary rounded-xl text-sm font-medium hover:bg-[#e6ae06] transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Open Link
                            </a>
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                onClick={handleResendLink}
                                disabled={resendPending}
                                className="text-sm text-primary font-medium hover:underline disabled:opacity-50"
                            >
                                {resendPending ? "Generating..." : "Lost the link? Generate a new one"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
