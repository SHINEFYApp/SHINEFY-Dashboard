import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';

import { manageSlotSchema } from '../../../constants/validationSchema';
import { manageSlotInitialValues } from '../../../constants/initialValues';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { FormDatePicker } from '../../../common/FormDatePicker';
import { FormTimePicker } from '../../../common/FormTimePicker';
import { FormDropdown } from '../../../common/FormDropdown';
import { Button } from '../../ui/button';
import { calculateDuration } from '../../../utils/utils';

const DurationListener = ({ values, setDuration }: { values: typeof manageSlotInitialValues, setDuration: (d: string) => void; }) => {
    useEffect(() => {
        const dur = calculateDuration(
            values.startDate,
            values.startTime,
            values.endDate,
            values.endTime
        );
        setDuration(dur);
    }, [values.startDate, values.startTime, values.endDate, values.endTime, setDuration]);

    return null;
};

const ManageFreeBooking = () => {
    const [duration, setDuration] = useState<string>('');





    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <Formik
                initialValues={manageSlotInitialValues}
                validationSchema={manageSlotSchema}
                onSubmit={(values) => {
                    console.log('Free Booking values:', values);
                    console.log('Duration:', duration);
                    // Handle submission
                }}
            >
                {({ values, isValid }) => {
                    return (
                        <Form className="space-y-8">
                            <DurationListener values={values} setDuration={setDuration} />
                            {/* Start Time Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Start Time :
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDatePicker
                                        name="startDate"
                                        label="Select Booking Date"
                                        placeholder="12/10/2025"
                                        icon={<Calendar className="size-5" />}
                                        checkmark={true}
                                    />
                                    <FormTimePicker
                                        name="startTime"
                                        label="Select Booking Time"
                                        icon={<Clock className="size-5" />}
                                    />
                                </div>
                            </div>

                            {/* End Time Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    End Time :
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <FormDatePicker
                                        name="endDate"
                                        label="Select Free Booking Date"
                                        placeholder="12/10/2025"
                                        icon={<Calendar className="size-5" />}
                                        checkmark={true}
                                    />
                                    <FormTimePicker
                                        name="endTime"
                                        label="Select Free Booking Time"
                                        icon={<Clock className="size-5" />}
                                    />
                                    {duration && (
                                        <div className="flex items-end">
                                            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-700">
                                                {duration}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Address Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Address :
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDropdown
                                        name="city"
                                        label="City"
                                        placeholder="Select City"
                                        icon={<MapPin className="size-5" />}
                                        options={[
                                            'Cairo',
                                            'Alexandria',
                                            'Giza',
                                            'New Cairo',
                                            'Maadi',
                                            'Al Shorouk City',
                                        ]}
                                    />
                                    <FormDropdown
                                        name="area"
                                        label="Area"
                                        placeholder="Select Area"
                                        icon={<MapPin className="size-5" />}
                                        options={[
                                            'Nasr City',
                                            'Heliopolis',
                                            'Downtown',
                                            'Zamalek',
                                            'Dokki',
                                            'Mohandessin',
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Slot Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Slot :
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDropdown
                                        name="slotStatus"
                                        label="Select Slot Status"
                                        placeholder="Select Slot Status"
                                        icon={<User className="size-5" />}
                                        options={['Open', 'Close', 'Activated', 'Deactivated']}
                                    />
                                    <FormDropdown
                                        name="slotType"
                                        label="Select Slot Type"
                                        placeholder="Select Slot Type"
                                        icon={<User className="size-5" />}
                                        options={['Regular', 'Premium', 'VIP', 'Express']}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-start pt-4">
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-6 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    Add Free Booking
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ManageFreeBooking;
