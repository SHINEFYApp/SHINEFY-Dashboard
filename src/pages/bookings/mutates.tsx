import type { BookingFormData, createPackageBookingPayload, createServiceBookingPayload } from "../../types/bookings";

export const mutateBookingService = (
    formData: BookingFormData,
    vehicles_id: number[],
    extra_services: { id: string; quantity: number }[]
): createServiceBookingPayload => (
    {
        "booking_date": formData.bookingDate,
        "booking_time": formData.bookingTime,
        "latitude": formData.address.latitude,
        "longitude": formData.address.longitude,
        "address_loc": formData.address.location,
        // "coupon_id": formData.coupon?.id || undefined,
        "coupon_id": undefined,
        "service_id": 1,
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
        'user_package_id' : String(formData.mainPackage?.id || ''),
        'package_id' : String(formData.mainPackage?.package_id || '') ,
        'booking_date' : formData.bookingDate,
        'booking_time' : formData.bookingTime,
        'latitude' : formData.address.latitude,
        'longitude' : formData.address.longitude,
        'address_loc' : formData.address.location,
        'coupon_id' : formData.coupon?.id || 0,
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