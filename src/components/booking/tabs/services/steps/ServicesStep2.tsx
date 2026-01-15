import { Formik, Form } from 'formik';
import { servicesBookingSchema, packageBookingSchema } from '../../../../../constants/validationSchema';
import { IoCarSportOutline } from 'react-icons/io5';
import { FormDropdown } from '../../../../../common/FormDropdown';
import { Button } from '../../../../ui/button';
import type { servicesBoysPayload, servicesBoysResponse, stepsProps } from '../../../../../types/bookings';
import { availableExtraServices } from '../../../../../constants/data';
import { Package, PersonStanding } from 'lucide-react';
import { usePost } from '../../../../../api/usePostData';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { SkeletonDemo } from '../../../../../common/loader';
import { DropDownToSendObject } from '../../../../../common/DropDownToSendObject ';
import { getPackage } from '../../../../../api/features/bookings';
import { useGet } from '../../../../../api/useGetData';

export default function ServicesStep2({ 
    onNext, 
    onBack, 
    userPackageInput, 
    formData ,
    setFormData
}: stepsProps){

    // Fetch data

    const baseURL = import.meta.env.VITE_API_URL;
    const getServicesBoys = usePost<
        servicesBoysResponse,
        servicesBoysPayload
    >({
        route: `${baseURL}/admin/api/book/available-service-boys`,
        options: {
            onSuccess: (data) => console.log(data),
            onError: (err: any) => {
                console.log('API Error full response:', err.response);
                toast.error(err.response?.data?.message ?? err.message);
            },
        },
    });

    const route = `${baseURL}/admin/api/packages`;
    const getPackages = useGet({
        queryFn: () => getPackage(route),
        queryKey: ["packages"],
        options: { staleTime: 1000 * 10 },
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

    const handleQuantityChange = (serviceId: string, newQuantity: number) => {
        setFormData((prev) => {
            const existingServices = prev.extraServices || [];
            const serviceIndex = existingServices.findIndex((s) => s.id === serviceId);

            let updatedServices = [...existingServices];
            if (serviceIndex >= 0) {
                if (newQuantity <= 0) {
                    updatedServices.splice(serviceIndex, 1);
                } else {
                    updatedServices[serviceIndex].quantity = newQuantity;
                }
            } else if (newQuantity > 0) {
                const service = availableExtraServices.find((s) => s.id === serviceId);
                if (service) {
                    updatedServices.push({ id: serviceId, name: service.name, quantity: newQuantity });
                }
            }

            return { ...prev, extraServices: updatedServices };
        });
    };

    const getQuantity = (serviceId: string) => {
        const service = formData.extraServices?.find((s) => s.id === serviceId);
        return service?.quantity || 0;
    };

    useEffect(() => {
        if (getServicesBoys.isError || getPackages.isError && getServicesBoys.error || getPackages.error) {
            toast.error(getServicesBoys.error?.message || getPackages.error?.message);
        }
    }, [getServicesBoys.isError, getServicesBoys.error , getPackages.isError, getPackages.error]);

    useEffect(() => {
        if (getServicesBoys.isSuccess || getPackages.isSuccess) {
            toast.success('The Process Of Fetchong Data Has Successfuly');
        }
    }, [getServicesBoys.isSuccess , getPackages.isSuccess]);


    const available_service_boys = getServicesBoys.data?.data.available_service_boys
    const packages = getPackages.data?.packages


    console.log(packages)

    return (
        <main className=' relative'>
            {(getServicesBoys.isPending || getPackages.isPending) &&
                <div className=' h-full w-full absolute top-0 left-0 z-500 bg-white'>
                    <SkeletonDemo quantity={15} />
                </div>
            }

            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Enter reservation data
            </h2>

            <Formik
                initialValues={{
                    mainPackage: formData.mainPackage,
                    mainService: formData.mainService || '',
                    serviceBoy: formData.serviceBoy,
                }}
                validationSchema={userPackageInput ? packageBookingSchema : servicesBookingSchema}
                enableReinitialize
                onSubmit={(values) => {
                    setFormData((prev) => {
                        const updated = { ...prev, ...values};
                        console.log(updated);
                        return updated;
                    });
                    onNext();
                }}
            >
                {({ isValid , values }) => {
                    console.log('values' , values)
                    return (
                    <Form>
                        <div className={`mb-8 ${userPackageInput ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ' md:w-1/2 w-full'}`}>
                            {userPackageInput && (
                                <DropDownToSendObject
                                    name="mainPackage"
                                    label="User Packages"
                                    placeholder="Select User Package"
                                    icon={<Package className="w-5 h-5" />}
                                    options={packages}
                                />
                            )}
                            <FormDropdown
                                name="mainService"
                                label="Services"
                                placeholder="Select Services"
                                className='w-full'
                                icon={<IoCarSportOutline className="w-5 h-5" />}
                                options={[
                                    'service one' ,
                                    'service two' ,
                                    'service three' ,
                                    'service four' ,
                                ]}
                            />
                        </div>

                        <div className="space-y-6 mb-8">
                            {availableExtraServices.map((service) => {
                                const quantity = getQuantity(service.id);
                                return (
                                    <div key={service.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Extra Services
                                            </label>
                                            <div className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-600">
                                                {service.name}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Qty
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(service.id, parseInt(e.target.value) || 0)
                                                }
                                                className="w-full rounded-xl border-2 bg-gray-50 px-4 py-3.5 text-sm font-medium border-gray-200"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mb-8 md:w-1/2 w-full">
                            <DropDownToSendObject
                                name="serviceBoy"
                                label="Service Boy"
                                placeholder="Select Service Boy"
                                icon={<PersonStanding className="w-5 h-5" />}
                                options={available_service_boys}
                            />
                        </div>

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
                    </Form>
                    );
                }}
            </Formik>
        </main>
    );
}
