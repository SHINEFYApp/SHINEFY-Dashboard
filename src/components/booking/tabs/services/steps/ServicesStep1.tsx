import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { Calendar, Clock, User, Hash, MapPin, Car, UserX } from 'lucide-react';
import { toast } from 'sonner';

import { servicesStep1Schema } from '../../../../../constants/validationSchema';
import { FormInput } from '../../../../../common/FormInput';
import { FormDatePicker } from '../../../../../common/FormDatePicker';
import { FormTimePicker } from '../../../../../common/FormTimePicker';
import { Button } from '../../../../ui/button';
import { FormSelectedVehicles } from '../SelectedVehicles';
import { VehicleSelectionModal } from '../VehicleSelectionModal';

import { usePost } from '../../../../../api/usePostData';
import type {
    getUserInfoByNumberPayload,
    getUserInfoByNumberResponse,
    stepsProps,
} from '../../../../../types/bookings';
import { SkeletonDemo } from '../../../../../common/loader';
import { DropDownToSendObject } from '../../../../../common/DropDownToSendObject ';

export default function ServicesStep1({
    onNext,
    formData,
    setFormData,
}: stepsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lastRequestedPhone, setLastRequestedPhone] = useState<string | null>(null);
    const baseURL = import.meta.env.VITE_API_URL;
    const { mutate, isPending, isSuccess, data, isError, error } = usePost<
        getUserInfoByNumberResponse,
        getUserInfoByNumberPayload
    >({
        route: `${baseURL}/api/book/user-details`,
        options: {
            onSuccess: (data) => console.log(data),
            onError: (err: any) => {
                console.log('API Error full response:', err.response);
                toast.error(err.response?.data?.message ?? err.message);
            },
        },
    });
    
    const handlePhoneBlur = (phone: string) => {
        if (!phone) return;

        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone === lastRequestedPhone) return;

        setLastRequestedPhone(cleanPhone);
        mutate({ phone_number: cleanPhone } as getUserInfoByNumberPayload);
    };

    const [clientNotFound, setClientNotFound] = useState(false);

    useEffect(() => {
        if (data?.data.user_info) {
            setFormData({ 
                ...formData, 
                userDetails: data.data.user_info,
                userPackages: data.data.packages || []
            });
            setClientNotFound(false);
        }
    }, [data]);

    useEffect(() => {
        if (isError && error) {
            setClientNotFound(true);
        }
    }, [isError, error]);

    const locations = data?.data.locations;
    const vehiclesData = data?.data.vehicles;
    const userInfo = data?.data.user_info;


    return (
        <main className=' relative'>
            {isPending &&
                <div className=' h-full w-full absolute top-0 left-0 z-500 bg-white'>
                    <SkeletonDemo quantity={15} />
                </div>
            }
            <main>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Enter reservation data
                </h2>
                  {/* Client info card */}
                            {userInfo && (
                                <div
                                    className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4 animate-slide-up"
                                >
                                    <div className="shrink-0 w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                                        <User className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-green-800 mb-1">Client Found</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
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
                                                <MapPin className="w-4 h-4 text-green-500" />
                                                <div>
                                                    <p className="text-xs text-green-500">Saved Locations</p>
                                                    <p className="text-sm font-medium text-gray-800">{locations?.length ?? 0}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Car className="w-4 h-4 text-green-500" />
                                                <div>
                                                    <p className="text-xs text-green-500">Vehicles</p>
                                                    <p className="text-sm font-medium text-gray-800">{vehiclesData?.length ?? 0}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Client not-found card */}
                            {clientNotFound && !userInfo && (
                                <div
                                    className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 flex items-center gap-4 animate-slide-up"
                                >
                                    <div className="shrink-0 w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
                                        <UserX className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-red-700">No client found</p>
                                        <p className="text-xs text-red-400 mt-0.5">No account is linked to this phone number.</p>
                                    </div>
                                </div>
                            )}


                <Formik
                    initialValues={{
                        phoneNumber: formData.phoneNumber || '',
                        address: formData.address,
                        vehicles: formData.vehicles || [],
                        bookingDate: formData.bookingDate || '',
                        bookingTime: formData.bookingTime || '',
                    }}
                    validationSchema={servicesStep1Schema}
                    onSubmit={(values) => {
                        setFormData((prev) => {
                            const updated = { ...prev, ...values };
                            return updated;
                        });
                        onNext();
                    }}
                >
                    {({ isValid, setFieldValue, values }) => (

                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormInput
                                    name="phoneNumber"
                                    label="User phone number"
                                    placeholder="User phone number"
                                    type="tel"
                                    icon={<IoCallOutline className="w-5 h-5" />}
                                    onBlur={(value) => {
                                        setClientNotFound(false);
                                        handlePhoneBlur(value);
                                    }}
                                />

                                <div className="mt-2">
                                    <DropDownToSendObject
                                        name="address"
                                        label="Address"
                                        placeholder="Select Address"
                                        icon={<IoLocationOutline className="w-5 h-5" />}
                                        options={locations}
                                    />
                                </div>
                            </div>

                          
                            <div className="mb-8">
                                <FormSelectedVehicles
                                    name="vehicles"
                                    onAddClick={() => setIsModalOpen(true)}
                                />
                            </div>

                            <VehicleSelectionModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                selectedVehicles={values.vehicles}
                                setSelectedVehicles={(newVehicles) => {
                                    setFieldValue('vehicles', newVehicles);
                                }}
                                dummyDataVehicles={vehiclesData}
                                isSuccess={isSuccess}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormDatePicker
                                    name="bookingDate"
                                    label="Select Booking Date"
                                    icon={<Calendar className="size-5" />}
                                    checkmark={false}
                                />

                                <FormTimePicker
                                    name="bookingTime"
                                    label="Select Booking Time"
                                    icon={<Clock className="size-5" />}
                                />
                            </div>

                            <div className="flex justify-start">
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-2 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </main>
        </main>
    );
}
