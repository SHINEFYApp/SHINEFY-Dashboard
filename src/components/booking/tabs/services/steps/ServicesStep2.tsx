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
        if (!formData.address) return;
        getServicesBoys.mutate({
            latitude: formData.address.latitude,
            longitude: formData.address.longitude,
            booking_date: formData.bookingDate,
            booking_time: formData.bookingTime,
            service_duration: 60,
        } as servicesBoysPayload);
    }, [formData.address]);

    const available_service_boys = getServicesBoys.data?.data.available_service_boys;
    const packages = getPackages.data?.packages;
    const allServices: ApiMainService[] = getServicesQuery.data?.all_service_arr?.sorted_main_services ?? [];
    const allExtras: ApiExtraService[] = getServicesQuery.data?.all_service_arr?.sorted_extra_services ?? [];
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
                                <DropDownToSendObject
                                    name="mainPackage"
                                    label="User Packages"
                                    placeholder="Select User Package"
                                    icon={<Package className="w-5 h-5" />}
                                    options={packages}
                                />
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

                        {/* ── Extra Services (services tab only) ── */}
                        {!userPackageInput && (
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
                                        ? 'Select a service first'
                                        : 'Add Extra Service'}
                                </button>
                            </div>
                        )}

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
