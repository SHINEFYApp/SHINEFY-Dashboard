import type { BookingFormData, createPackageBookingPayload, createServiceBookingPayload } from "../../types/bookings";
import type { CouponData } from "../../types/common";

const isCouponExpired = (coupon: CouponData | undefined): boolean => {
    if (!coupon || !coupon.end_at) return true;
    return new Date(coupon.end_at) <= new Date();
};

export const mutateBookingService = (
    formData: BookingFormData,
    vehicles_id: number[],
    extra_services: { id: string; quantity: number }[]
): createServiceBookingPayload => (
    {
        "booking_type": formData.booking_type,
        "booking_date": formData.bookingDate,
        "booking_time": formData.bookingTime,
        "latitude": formData.address.latitude,
        "longitude": formData.address.longitude,
        "address_loc": formData.address.location,
        "coupon_id": isCouponExpired(formData.coupon) ? undefined : formData.coupon.id,
        "service_id": Number(formData.mainService || 1),
        "area_id": 3,
        "vehicle_id": vehicles_id,
        "free_status": 0,
        "payment_option": formData.paymentMethod || "cash",
        "service_time": 45,
        "service_boy_id": formData.serviceBoy.user_id,
        "user_id": formData.userDetails.user_id,
        "wallet_amount": formData.walletAmount ? Number(formData.walletAmount) : 0,
        "note": formData.userNote,
        "booking_admin_note": formData.adminNotes,
        "extra_services": extra_services,
    }
);

export const mutateBookingPackage = (
    formData: BookingFormData,
    vehicles_id: number[],
    extra_services: { id: string; quantity: number }[]
): createPackageBookingPayload => (
    {
        'booking_type' : formData.booking_type,
        'user_package_id' : String(formData.mainPackage?.id || ''),
        'package_id' : String(formData.mainPackage?.package_id || '') ,
        'booking_date' : formData.bookingDate,
        'booking_time' : formData.bookingTime,
        'latitude' : formData.address.latitude,
        'longitude' : formData.address.longitude,
        'address_loc' : formData.address.location,
        'coupon_id' : isCouponExpired(formData.coupon) ? 0 : formData.coupon.id,
        'service_id' : Number(formData.mainService || 1),
        'area_id' : 4,
        'vehicle_id' : vehicles_id,
        'free_status' : 0,
        'payment_option' : formData.paymentMethod || 'cash' ,
        'service_time' : 45,
        'service_boy_id' : formData.serviceBoy.user_id,
        'user_id' : formData.userDetails.user_id,
        'extra_service' : extra_services,
    }
);