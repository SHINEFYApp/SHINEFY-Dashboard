import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { FormInput } from '../../../../../common/FormInput';
import { FormDropdown } from '../../../../../common/FormDropdown';
import { FormDatePicker } from '../../../../../common/FormDatePicker';
import { FormTimePicker } from '../../../../../common/FormTimePicker';
import { Button } from '../../../../ui/button';
import { SelectedVehicles } from '../SelectedVehicles';
import { VehicleSelectionModal } from '../VehicleSelectionModal';
import type { ServicesStep1Props, Vehicle } from '../../../../../types/bookings';
import { Calendar, Clock } from 'lucide-react';

const ServicesStep1 = ({
    onNext,
    formData,
    onDataChange,
    onRemoveVehicle,
    registerValidation,
    onValidationChange
}: ServicesStep1Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const validationSchema = Yup.object({
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
            .required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        vehicles: Yup.array().min(1, 'Please select at least one vehicle'),
        bookingDate: Yup.string().required('Booking date is required'),
        bookingTime: Yup.string().required('Booking time is required'),
    });

    const handleVehicleSelect = (vehicles: Vehicle[]) => {
        onDataChange({ vehicles });
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Enter reservation data
            </h2>

            <Formik
                initialValues={{
                    phoneNumber: formData.phoneNumber,
                    address: formData.address,
                    vehicles: formData.vehicles || [],
                    bookingDate: formData.bookingDate,
                    bookingTime: formData.bookingTime,
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values) => {
                    console.log('Services Step 1 values:', values);
                    onDataChange(values);
                    onNext();
                }}
            >
                {({ isValid, values, validateForm, setTouched }) => {
                    // Register validation with parent
                    useEffect(() => {
                        registerValidation(async () => {
                            setTouched({
                                phoneNumber: true,
                                address: true,
                                vehicles: [],
                                bookingDate: true,
                                bookingTime: true,
                            });

                            const errors = await validateForm();
                            const isValidForm = Object.keys(errors).length === 0;

                            if (isValidForm) {
                                onDataChange(values);
                            }

                            return isValidForm;
                        });
                    }, [values, validateForm, setTouched]);

                    // Auto-save on value change
                    useEffect(() => {
                        onDataChange(values);
                    }, [values]);

                    // Notify parent about validation status
                    useEffect(() => {
                        onValidationChange(isValid);
                    }, [isValid]);

                    return (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormInput
                                    name="phoneNumber"
                                    label="User phone number"
                                    placeholder="User phone number"
                                    type="tel"
                                    icon={<IoCallOutline className="w-5 h-5" />}
                                />

                                <FormDropdown
                                    name="address"
                                    label="Address"
                                    placeholder="Select Address"
                                    icon={<IoLocationOutline className="w-5 h-5" />}
                                    options={[
                                        'Cairo',
                                        'Alexandria',
                                        'Giza',
                                        'New Cairo',
                                        'Maadi',
                                        'Al Shorouk City',
                                    ]}
                                />
                            </div>

                            <div className="mb-8">
                                <SelectedVehicles
                                    vehicles={formData.vehicles || []}
                                    onAddClick={() => setIsModalOpen(true)}
                                    onRemoveVehicle={onRemoveVehicle}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <FormDatePicker
                                    name="bookingDate"
                                    label="Select Booking Date"
                                    icon={<Calendar className="size-5" />}
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
                    );
                }}
            </Formik>

            <VehicleSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleVehicleSelect}
                selectedVehicles={formData.vehicles || []}
            />
        </>
    );
};

export default ServicesStep1;
