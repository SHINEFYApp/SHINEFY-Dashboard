import { useTranslation } from 'react-i18next';
import type {
    BookingFormData,
    GetServiceResponse,
} from '../../types/bookings';
import { useGet } from '../../api/useGetData';
import { getServices } from '../../api/features/bookings';

const baseURL = import.meta.env.VITE_API_URL;

interface BookingSummaryProps {
    formData: BookingFormData;
}

function formatPrice(amount: number) {
    return `${amount.toFixed(2)} EGP`;
}

export default function BookingSummary({ formData }: BookingSummaryProps) {
    const { t } = useTranslation();
    const { data: servicesData } = useGet<GetServiceResponse>({
        queryKey: ['services'],
        queryFn: () => getServices(`${baseURL}/api/get_service/`),
        options: { staleTime: 1000 * 30 },
    });

    const allServices = servicesData?.all_service_arr?.sorted_main_services ?? [];
    const allExtras = servicesData?.all_service_arr?.sorted_extra_services ?? [];

    const mainServiceId =
        typeof formData.mainService === 'object' && formData.mainService !== null
            ? String((formData.mainService as any).service_id ?? '')
            : formData.mainService || '';

    const mainSvcObj =
        typeof formData.mainService === 'object' && formData.mainService !== null
            ? (formData.mainService as any)
            : allServices.find((s) => String(s.service_id) === mainServiceId);

    const mainServiceLabel = mainSvcObj?.service_name?.[0] || mainServiceId || '';
    const mainServicePrice = Number(mainSvcObj?.service_price || 0);

    const extrasTotal = formData.extraServices.reduce((sum, es) => {
        const found = allExtras.find((e) => String(e.extra_service_id) === es.id);
        return sum + (Number(found?.extra_service_price || 0) * (es.quantity || 1));
    }, 0);

    const subtotal = mainServicePrice + extrasTotal;

    const couponAmount = formData.coupon?.amount || 0;
    const couponPercent = formData.coupon?.discount_percent || 0;
    const couponDiscount =
        couponPercent > 0 ? (subtotal * couponPercent) / 100 : couponAmount;

    const walletAmount = Number(formData.walletAmount || 0);
    const grandTotal = Math.max(0, subtotal - couponDiscount - walletAmount);

    return (
        <aside className="w-80 shrink-0 space-y-5 self-start sticky top-8">
            {/* Customer Info */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t('bookings.createBooking.bookingSummary.customerInfo')}
                </h3>
                <div className="space-y-2.5 text-sm">
                    <Row label={t('bookings.createBooking.bookingSummary.name')} value={formData.userDetails?.name} placeholder={t('bookings.createBooking.bookingSummary.notYetEntered')} />
                    <Row label={t('bookings.createBooking.bookingSummary.phone')} value={formData.phoneNumber} placeholder={t('bookings.createBooking.bookingSummary.notYetEntered')} />
                    <Row label={t('bookings.createBooking.bookingSummary.address')} value={formData.address?.location} placeholder={t('bookings.createBooking.bookingSummary.notYetEntered')} />
                    <Row label={t('bookings.createBooking.bookingSummary.date')} value={formData.bookingDate} placeholder={t('bookings.createBooking.bookingSummary.notYetSelected')} />
                </div>
            </section>

            {/* Vehicles */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t('bookings.createBooking.bookingSummary.vehicles')}
                </h3>
                {formData.vehicles?.length > 0 ? (
                    <ul className="space-y-1.5">
                        {formData.vehicles.map((v, i) => (
                            <li key={v.vehicle_id || i} className="text-sm text-gray-700">
                                {v.vehicle_name || `Vehicle ${i + 1}`}
                                {v.plate_number && (
                                    <span className="text-gray-400 ml-1">({v.plate_number})</span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-300 italic">{t('bookings.createBooking.bookingSummary.noVehiclesAdded')}</p>
                )}
            </section>

            {/* Service Details */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t('bookings.createBooking.bookingSummary.serviceDetails')}
                </h3>
                <div className="space-y-2.5 text-sm">
                    <Row label={t('bookings.createBooking.bookingSummary.service')} value={mainServiceLabel} placeholder={t('bookings.createBooking.bookingSummary.notYetSelected')} />
                    <Row label={t('bookings.createBooking.bookingSummary.timeSlot')} value={formData.bookingTime} placeholder={t('bookings.createBooking.bookingSummary.notYetSelected')} />
                    <Row label={t('bookings.createBooking.bookingSummary.serviceBoy')} value={formData.serviceBoy?.name} placeholder={t('bookings.createBooking.bookingSummary.notYetAssigned')} />
                    {formData.extraServices.map((es) => {
                        const found = allExtras.find((e) => String(e.extra_service_id) === es.id);
                        const price = Number(found?.extra_service_price || 0);
                        return (
                            <div key={es.id} className="flex justify-between gap-2 text-sm ml-2">
                                <span className="text-gray-700">
                                    {es.name} <span className="text-gray-400">×{es.quantity}</span>
                                </span>
                                <span className="text-gray-900 font-medium">
                                    {formatPrice(price * es.quantity)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Payment & Price Summary */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t('bookings.createBooking.bookingSummary.payment')}
                </h3>
                <div className="space-y-2.5 text-sm">
                    <Row label={t('bookings.createBooking.bookingSummary.method')} value={formData.paymentMethod} placeholder={t('bookings.createBooking.bookingSummary.notYetSelected')} />
                    <Row label={t('bookings.createBooking.bookingSummary.coupon')} value={formData.coupon?.code} placeholder={t('bookings.createBooking.bookingSummary.notApplied')} />

                    {mainServiceId && (
                        <>
                            <div className="border-t border-gray-100 pt-2 mt-2 space-y-2">
                                <PriceRow label={t('bookings.createBooking.bookingSummary.mainService')} amount={mainServicePrice} />
                                {formData.extraServices.length > 0 && (
                                    <PriceRow label={t('bookings.createBooking.bookingSummary.extraServices')} amount={extrasTotal} />
                                )}
                                <PriceRow label={t('bookings.createBooking.bookingSummary.subtotal')} amount={subtotal} bold />

                                {couponDiscount > 0 && (
                                    <div className="flex justify-between gap-2 text-green-600">
                                        <span>{t('bookings.createBooking.bookingSummary.couponDiscount')}</span>
                                        <span className="font-medium">-{formatPrice(couponDiscount)}</span>
                                    </div>
                                )}

                                {walletAmount > 0 && (
                                    <div className="flex justify-between gap-2 text-blue-600">
                                        <span>{t('bookings.createBooking.bookingSummary.wallet')}</span>
                                        <span className="font-medium">-{formatPrice(walletAmount)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between gap-2 text-sm font-bold text-gray-900 border-t border-gray-200 pt-2">
                                    <span>{t('bookings.createBooking.bookingSummary.total')}</span>
                                    <span>{formatPrice(grandTotal)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Notes */}
            <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t('bookings.createBooking.bookingSummary.notes')}
                </h3>
                <div className="space-y-2.5 text-sm">
                    <Row label={t('bookings.createBooking.bookingSummary.userNote')} value={formData.userNote} placeholder={t('bookings.createBooking.bookingSummary.noNote')} />
                    <Row label={t('bookings.createBooking.bookingSummary.adminNote')} value={formData.adminNotes} placeholder={t('bookings.createBooking.bookingSummary.noNote')} />
                </div>
            </section>
        </aside>
    );
}

function Row({
    label,
    value,
    placeholder,
}: {
    label: string;
    value?: string;
    placeholder?: string;
}) {
    const display = value || placeholder || '';
    const isPlaceholder = !value;
    return (
        <div className="flex justify-between gap-2">
            <span className="text-gray-500 shrink-0">{label}</span>
            <span
                className={`text-right font-medium ${
                    isPlaceholder ? 'text-gray-300 italic' : 'text-gray-900'
                }`}
            >
                {display}
            </span>
        </div>
    );
}

function PriceRow({
    label,
    amount,
    bold,
}: {
    label: string;
    amount: number;
    bold?: boolean;
}) {
    return (
        <div className="flex justify-between gap-2">
            <span className={`text-gray-500 ${bold ? 'font-semibold' : ''}`}>{label}</span>
            <span className={`text-gray-900 ${bold ? 'font-bold' : 'font-medium'}`}>
                {formatPrice(amount)}
            </span>
        </div>
    );
}
