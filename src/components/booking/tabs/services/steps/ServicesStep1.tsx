import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { Calendar, Clock } from 'lucide-react';
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

    useEffect(() => {
        if (data?.data.user_info) {
            setFormData({ ...formData, userDetails: data.data.user_info });
        }
    }, [data]);

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message);
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('The Process Of Fetchong Data Has Successfuly');
        }
    }, [isSuccess]);

    const locations = data?.data.locations;
    const vehiclesData = data?.data.vehicles;


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
                            console.log(updated);
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
                                    onBlur={(value) => handlePhoneBlur(value)}
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
