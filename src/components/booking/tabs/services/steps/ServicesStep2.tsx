import { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import { servicesBookingSchema, packageBookingSchema } from '../../../../../constants/validationSchema';
import { Package, PersonStanding, Plus, X } from 'lucide-react';
import { Button } from '../../../../ui/button';
import type {
    ApiMainService,
    ApiExtraService,
    GetServiceResponse,
    servicesBoysPayload,
    servicesBoysResponse,
    stepsProps,
} from '../../../../../types/bookings';
import { usePost } from '../../../../../api/usePostData';
import { toast } from 'sonner';
import { SkeletonDemo } from '../../../../../common/loader';
import { DropDownToSendObject } from '../../../../../common/DropDownToSendObject ';
import { getPackage, getServices } from '../../../../../api/features/bookings';
import { useGet } from '../../../../../api/useGetData.tsx';
import { ExtraServiceModal } from '../ExtraServiceModal';

export default function ServicesStep2({
    onNext,
    onBack,
    userPackageInput,
    formData,
    setFormData
}: stepsProps) {
  
    const [isExtraModalOpen, setIsExtraModalOpen] = useState(false);
    const baseURL = import.meta.env.VITE_API_URL;

    // Fetch available service boys
    const getServicesBoys = usePost<servicesBoysResponse, servicesBoysPayload>({
        route: `${baseURL}/api/book/available-service-boys`,
        options: {
            onError: (err: any) => {
                toast.error(err.response?.data?.message ?? err.message);
            },
        },
    });

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

    useEffect(() => {
        if (!formData.address || !formData.mainService) return;
        const serviceId = String((formData.mainService as any)?.service_id ?? formData.mainService ?? '');
        getServicesBoys.mutate({
            latitude: formData.address.latitude,
            longitude: formData.address.longitude,
            booking_date: formData.bookingDate,
            booking_time: formData.bookingTime,
            service_duration: 60,
            service_id: serviceId
        } as servicesBoysPayload);
    }, [formData.address, formData.mainService]);

    const available_service_boys = getServicesBoys.data?.data.available_service_boys;
    
    // For package tab, use packages from formData (fetched in step 1)
    const userPackages = formData.userPackages || [];
    
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

    const isPending = getServicesBoys.isPending || getPackages.isPending || getServicesQuery.isLoading;

    return (
        <main className="relative">
            {isPending && (
                <div className="h-full w-full absolute top-0 left-0 z-500 bg-white">
                    <SkeletonDemo quantity={15} />
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-8">Enter reservation data</h2>

            <Formik
                initialValues={{
                    mainPackage: formData.mainPackage,
                    mainService: formData.mainService ?? '',
                    serviceBoy: formData.serviceBoy,
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
                                        label="User Packages"
                                        placeholder="Select User Package"
                                        icon={<Package className="w-5 h-5" />}
                                        options={userPackages}
                                        getOptionLabel={(opt: any) => {
                                            const name = opt.package?.name || 'Unknown Package';
                                            const isExpired = opt.available_to && new Date(opt.available_to) < new Date();
                                            const isInactive = opt.status !== 'active';
                                            const isExhausted = opt.remind_used !== null && opt.remind_used <= 0;
                                            
                                            let statusLabel = '';
                                            if (isInactive) statusLabel = '(Inactive)';
                                            else if (isExpired) statusLabel = '(Expired)';
                                            else if (isExhausted) statusLabel = '(Exhausted)';
                                            
                                            return `${name} ${statusLabel}`.trim();
                                        }}
                                        setFormData={setFormData}
                                    />
                                    <DropDownToSendObject
                                        name="mainService"
                                        label="Service"
                                        placeholder="Select Service from Package"
                                        icon={<Package className="w-5 h-5" />}
                                        options={allServices}
                                        setFormData={setFormData}
                                        getOptionLabel={(opt: any) => `${opt.service_name?.[0] || 'Unknown Service'} ${opt.remind_quantity !== undefined ? `(${opt.remind_quantity} left)` : ''}`}
                                        valueExtractor={(opt: any) => String(opt.service_id)}
                                        disabled={!formData.mainPackage?.id}
                                    />
                                </>
                            ) : (
                                <DropDownToSendObject
                                    name="mainService"
                                    label="Service"
                                    placeholder="Select Service"
                                    icon={<Package className="w-5 h-5" />}
                                    options={allServices}
                                    setFormData={setFormData}
                                    valueExtractor={(opt) => String(opt.service_id)}
                                    getOptionLabel={(opt) => opt.service_name?.[0] || 'Unknown'}
                                />
                            )}
                        </div>

                        {/* ── Extra Services ── */}
                        <div className="mb-8">
                            <label className="text-sm font-medium text-gray-700 block mb-3">
                                Extra Services
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
                                    ? (userPackageInput && !formData.mainPackage?.id ? 'Select a package first' : 'Select a service first')
                                    : 'Add Extra Service'}
                            </button>
                        </div>

                        {/* ── Service Boy ── */}
                        <div className="mb-8 md:w-1/2 w-full">
                            <DropDownToSendObject
                                name="serviceBoy"
                                label="Service Boy"
                                placeholder="Select Service Boy"
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
                                Back
                            </button>
                            <Button
                                type="submit"
                                disabled={!isValid}
                                className="flex-1 md:flex-none bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-4 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Next
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
