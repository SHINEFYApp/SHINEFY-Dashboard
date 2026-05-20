import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { servicesBookingSchema, packageBookingSchema } from '../../../../../constants/validationSchema';
import { Clock, Package, PersonStanding, Plus, X } from 'lucide-react';
import { Button } from '../../../../ui/button';
import type {
    ApiMainService,
    ApiExtraService,
    GetServiceResponse,
    stepsProps,
} from '../../../../../types/bookings';
import type { AdminSlot } from '../../../../../types/slots';
import { useGetAdminSlots } from '../../../../../api/features/slots.hooks';
import { SkeletonDemo } from '../../../../../common/loader';
import { DropDownToSendObject } from '../../../../../common/DropDownToSendObject ';
import { getPackage, getServices } from '../../../../../api/features/bookings';
import { useGet } from '../../../../../api/useGetData.tsx';
import { ExtraServiceModal } from '../ExtraServiceModal';
import { FormTimeSlots } from '../../../../../common/FormTimeSlots';

const extractAvailableBoys = (data: any): { user_id: number; name: string }[] => {
    const slots: AdminSlot[] = Array.isArray(data?.data?.data?.slots) ? data.data.data.slots : [];
    const seen = new Set<number>();
    const boys: { user_id: number; name: string }[] = [];
    for (const slot of slots) {
        for (const boy of slot.available_boys || []) {
            if (!seen.has(boy.user_id)) {
                seen.add(boy.user_id);
                boys.push({ user_id: boy.user_id, name: boy.name });
            }
        }
    }
    return boys;
};

export default function ServicesStep2({
    onNext,
    onBack,
    userPackageInput,
    formData,
    setFormData
}: stepsProps) {
    const { t } = useTranslation();
    const [isExtraModalOpen, setIsExtraModalOpen] = useState(false);
    const baseURL = import.meta.env.VITE_API_URL;

    // Fetch packages (for package tab)
    const getPackages = useGet({
        queryFn: () => getPackage(`${baseURL}/api/packages`),
        queryKey: ['packages'],
        options: { staleTime: 1000 * 10 },
    });

    // Fetch services (for services tab only)
    const getServicesQuery = useGet<GetServiceResponse>({
        queryFn: () => getServices(`${baseURL}/api/get_service/`),
        queryKey: ['services'],
        options: { staleTime: 1000 * 30, enabled: !userPackageInput },
    });
    
    // For package tab, use packages from formData (fetched in step 1)
    const userPackages = useMemo(() => {
        const pkgs = formData.userPackages || [];
        return pkgs.filter((pkg) => {
            const isExpired = pkg.available_to && new Date(pkg.available_to) < new Date();
            const isInactive = pkg.status !== 'active';
            const isExhausted = pkg.remind_used !== null && pkg.remind_used <= 0;
            return !isExpired && !isInactive && !isExhausted;
        });
    }, [formData.userPackages]);
    
    // Transform package main services to match ApiMainService structure
    const packageMainServices: any[] = formData.mainPackage?.all_main_services?.filter(s => s.remind_quantity > 0).map(s => ({
        service_id: s.service_id || 0,
        service_name: [s.main_services?.service_name || '', s.main_services?.service_name_arabic || ''],
        service_image: s.main_services?.service_image,
        service_price: s.main_services?.service_price,
        service_time: s.main_services?.service_time,
        service_description: [s.main_services?.service_description || '', s.main_services?.service_description_arabic || ''],
        apply_add_extra_service: s.main_services?.apply_add_extra_service,
        remind_quantity: s.remind_quantity
    })) || [];

    // Transform package extra services to match ApiExtraService structure
    const packageExtraServices: ApiExtraService[] = formData.mainPackage?.all_extra_services?.filter(s => s.remind_quantity > 0).map(s => ({
        extra_service_id: s.extra_service_id || 0,
        extra_service_name: [s.extra_services?.extra_service_name || '', s.extra_services?.extra_service_name_arabic || ''],
        extra_service_image: s.extra_services?.extra_service_image,
        extra_service_price: s.extra_services?.extra_service_price,
        extra_service_time: s.extra_services?.extra_service_time,
        extra_service_description: [s.extra_services?.extra_service_description || '', s.extra_services?.extra_service_description_arabic || ''],
    })) || [];

    const allServices: ApiMainService[] = userPackageInput 
        ? packageMainServices 
        : (getServicesQuery.data?.all_service_arr?.sorted_main_services ?? []);
        
    const allExtras: ApiExtraService[] = userPackageInput
        ? packageExtraServices
        : (getServicesQuery.data?.all_service_arr?.sorted_extra_services ?? []);

    console.log(allExtras)
    // Derive the extra services available for the currently selected main service
    // formData.mainService is now an object due to DropDownToSendObject sending the full object
    console.log(formData.mainService  , "formData.mainService ")
    const selectedServiceId = String((formData.mainService as any)?.service_id ?? formData.mainService ?? '');
    const selectedServiceObj = allServices.find((s) => String(s.service_id) === selectedServiceId);
    const availableExtras = selectedServiceObj?.apply_add_extra_service == 1 ? allExtras : [];
    console.log(selectedServiceId , "d")
    console.log(selectedServiceObj?.apply_add_extra_service)
    // Clear extra services when the main service changes
    const prevServiceIdRef = useRef<any>(null);
    useEffect(() => {
        const currentId = String((formData.mainService as any)?.service_id ?? formData.mainService ?? '');
        if (prevServiceIdRef.current !== null && prevServiceIdRef.current !== currentId) {
            setFormData((prev) => ({ ...prev, extraServices: [] }));
        }
        prevServiceIdRef.current = currentId;
    }, [formData.mainService]);

    const handleRemoveExtra = (id: string) => {
        setFormData((prev) => ({
            ...prev,
            extraServices: prev.extraServices.filter((s) => s.id !== id),
        }));
    };

    const selectedServiceIdForTime = String((formData.mainService as any)?.service_id ?? formData.mainService ?? '');
    const mainSvcObj = allServices.find((s) => String(s.service_id) === selectedServiceIdForTime);
    const totalServiceTime = useMemo(() => {
        const mainTime = mainSvcObj?.service_time || 0;
        const extrasTime = formData.extraServices.reduce((sum, es) => {
            const found = allExtras.find((e) => String(e.extra_service_id) === es.id);
            return sum + (found?.extra_service_time || 0) * (es.quantity || 1);
        }, 0);
        return mainTime + extrasTime;
    }, [mainSvcObj, formData.extraServices, allExtras]);

    const { data: slotsData, isLoading: slotsLoading } = useGetAdminSlots({
        date: formData.bookingDate || '',
        service_time: totalServiceTime > 0 ? totalServiceTime : undefined,
        latitude: formData.address?.latitude || undefined,
        longitude: formData.address?.longitude || undefined,
    });

    const available_service_boys = useMemo(
        () => extractAvailableBoys(slotsData),
        [slotsData]
    );

    const isPending = getPackages.isPending || getServicesQuery.isLoading || slotsLoading;

    return (
        <main className="relative">
            {isPending && (
                <div className="h-full w-full absolute top-0 left-0 z-500 bg-white">
                    <SkeletonDemo quantity={15} />
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('bookings.createBooking.reservationData')}</h2>

            <Formik
                initialValues={{
                    mainPackage: formData.mainPackage,
                    mainService: formData.mainService ?? '',
                    serviceBoy: formData.serviceBoy,
                    bookingTime: formData.bookingTime || '',
                }}
                validationSchema={userPackageInput ? packageBookingSchema : servicesBookingSchema}
                enableReinitialize
                onSubmit={(values) => {
                    setFormData((prev) => ({ ...prev, ...values }));
                    onNext();
                }}
            >
                {({ isValid }) => (
                    <Form>
                        {/* ── Main service / package selection ── */}
                        <div className={`mb-8 ${userPackageInput ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'md:w-1/2 w-full'}`}>
                            {userPackageInput ? (
                                <>
                                    <DropDownToSendObject
                                        name="mainPackage"
                                        label={t('bookings.createBooking.step2.userPackages')}
                                        placeholder={t('bookings.createBooking.step2.selectUserPackage')}
                                        icon={<Package className="w-5 h-5" />}
                                        options={userPackages}
                                        getOptionLabel={(opt: any) => {
                                            const name = opt.package?.name || t('bookings.createBooking.step2.unknownPackage');
                                            const isExpired = opt.available_to && new Date(opt.available_to) < new Date();
                                            const isInactive = opt.status !== 'active';
                                            const isExhausted = opt.remind_used !== null && opt.remind_used <= 0;
                                            
                                            let statusLabel = '';
                                            if (isInactive) statusLabel = t('bookings.createBooking.step2.inactive');
                                            else if (isExpired) statusLabel = t('bookings.createBooking.step2.expired');
                                            else if (isExhausted) statusLabel = t('bookings.createBooking.step2.exhausted');
                                            
                                            return `${name} ${statusLabel}`.trim();
                                        }}
                                        setFormData={setFormData}
                                    />
                                    <DropDownToSendObject
                                        name="mainService"
                                        label={t('bookings.createBooking.step2.service')}
                                        placeholder={t('bookings.createBooking.step2.selectServiceFromPackage')}
                                        icon={<Package className="w-5 h-5" />}
                                        options={allServices}
                                        setFormData={setFormData}
                                        getOptionLabel={(opt: any) => `${opt.service_name?.[0] || t('bookings.createBooking.step2.unknownService')} ${opt.remind_quantity !== undefined ? `(${opt.remind_quantity} ${t('bookings.createBooking.step2.left')})` : ''}`}
                                        valueExtractor={(opt: any) => String(opt.service_id)}
                                        disabled={!formData.mainPackage?.id}
                                    />
                                </>
                            ) : (
                                <DropDownToSendObject
                                    name="mainService"
                                    label={t('bookings.createBooking.step2.service')}
                                    placeholder={t('bookings.createBooking.step2.selectService')}
                                    icon={<Package className="w-5 h-5" />}
                                    options={allServices}
                                    setFormData={setFormData}
                                    valueExtractor={(opt) => String(opt.service_id)}
                                    getOptionLabel={(opt) => opt.service_name?.[0] || t('bookings.createBooking.step2.unknownService')}
                                />
                            )}
                        </div>

                        {/* ── Extra Services ── */}
                        <div className="mb-8">
                            <label className="text-sm font-medium text-gray-700 block mb-3">
                                {t('bookings.createBooking.step2.extraServices')}
                            </label>

                            {/* Selected extras chips */}
                            {formData.extraServices.length > 0 && (
                                <div className="flex flex-wrap gap-3 mb-4">
                                    {formData.extraServices.map((s) => (
                                        <div
                                            key={s.id}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-green-400 bg-green-50 text-sm font-medium text-gray-800 animate-slide-up"
                                        >
                                            <span>{s.name}</span>
                                            <span className="text-xs text-green-600 font-semibold">×{s.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExtra(s.id)}
                                                className="ml-1 text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add button */}
                            <button
                                type="button"
                                onClick={() => setIsExtraModalOpen(true)}
                                disabled={availableExtras.length === 0}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                {availableExtras.length === 0
                                    ? (userPackageInput && !formData.mainPackage?.id ? t('bookings.createBooking.step2.selectPackageFirst') : t('bookings.createBooking.step2.selectServiceFirst'))
                                    : t('bookings.createBooking.step2.addExtraService')}
                            </button>
                        </div>

                        {/* ── Time Slot Selection ── */}
                        <div className="mb-8">
                            <FormTimeSlots
                                name="bookingTime"
                                label={t('bookings.createBooking.step2.selectBookingTime')}
                                icon={<Clock className="size-5" />}
                                date={formData.bookingDate}
                                serviceTime={totalServiceTime}
                                latitude={formData.address?.latitude}
                                longitude={formData.address?.longitude}
                                onSelect={(time) => {
                                    setFormData((prev) => ({ ...prev, bookingTime: time }));
                                }}
                            />
                        </div>

                        {/* ── Service Boy ── */}
                        <div className="mb-8 md:w-1/2 w-full">
                            <DropDownToSendObject
                                name="serviceBoy"
                                label={t('bookings.createBooking.step2.serviceBoy')}
                                placeholder={t('bookings.createBooking.step2.selectServiceBoy')}
                                setFormData={setFormData}
                                icon={<PersonStanding className="w-5 h-5" />}
                                options={available_service_boys}
                            />
                        </div>

                        {/* ── Navigation ── */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 md:flex-none md:px-16 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200"
                            >
                                {t('bookings.createBooking.back')}
                            </button>
                            <Button
                                type="submit"
                                disabled={!isValid}
                                className="flex-1 md:flex-none bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-4 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {t('bookings.createBooking.next')}
                            </Button>
                        </div>

                        {/* ── Extra Service Modal ── */}
                        {isExtraModalOpen && (
                            <ExtraServiceModal
                                onClose={() => setIsExtraModalOpen(false)}
                                availableExtras={availableExtras}
                                selectedExtras={formData.extraServices}
                                onConfirm={(updated) =>
                                    setFormData((prev) => ({ ...prev, extraServices: updated }))
                                }
                            />
                        )}
                    </Form>
                )}
            </Formik>
        </main>
    );
}
