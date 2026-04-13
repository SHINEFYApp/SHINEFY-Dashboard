import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { manageSlotSchema } from '../../../constants/validationSchema';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { FormDatePicker } from '../../../common/FormDatePicker';
import { FormTimePicker } from '../../../common/FormTimePicker';
import { FormDropdown } from '../../../common/FormDropdown';
import { Button } from '../../../components/ui/button';
import { calculateDuration } from '../../../utils/utils';
import { useViewSpecificSlot, useUpdateSpecificSlot } from '../../../api/features/slots.hooks';
import type { UpdateSpecificSlotPayload } from '../../../types/slots';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';

const DurationListener = ({ values, setDuration }: { values: any, setDuration: (d: string) => void; }) => {
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

const EditSpecificSlot = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const slotId = Number(id);
    const [duration, setDuration] = useState<string>('');

    const { data: slotData, isLoading } = useViewSpecificSlot(slotId);
    const updateMutation = useUpdateSpecificSlot(slotId);

    const slot = slotData?.data?.data;

    const initialValues = {
        startDate: slot?.start_date ?? '',
        startTime: slot?.start_time ?? '',
        endDate: slot?.end_date ?? '',
        endTime: slot?.end_time ?? '',
        city: slot?.city ?? '',
        area: slot?.area ?? '',
        slotStatus: slot?.slot_status ?? '',
        slotType: slot?.slot_type ?? '',
    };

    const handleSubmit = (values: typeof initialValues) => {
        const payload: UpdateSpecificSlotPayload = {
            start_date: values.startDate,
            start_time: values.startTime,
            end_date: values.endDate,
            end_time: values.endTime,
            city: values.city,
            area: values.area,
            slot_status: values.slotStatus,
            slot_type: values.slotType,
        };

        updateMutation.mutate(payload, {
            onSuccess: () => {
                toast.success('Slot updated successfully');
                navigate('/bookings/slot');
            },
            onError: () => {
                toast.error('Failed to update slot');
            },
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center p-10">Loading...</div>;
    }

    return (
        <div className="w-full animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Specific Slot</h2>
            <div className="w-full max-w-6xl mx-auto p-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={manageSlotSchema}
                    enableReinitialize
                    onSubmit={handleSubmit}
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
                                            label="Select End Date"
                                            placeholder="12/10/2025"
                                            icon={<Calendar className="size-5" />}
                                            checkmark={true}
                                        />
                                        <FormTimePicker
                                            name="endTime"
                                            label="Select End Time"
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
                                <div className="flex justify-start gap-4 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={!isValid || updateMutation.isPending}
                                        className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-6 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {updateMutation.isPending ? 'Updating...' : 'Update Slot'}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => navigate('/bookings/slot')}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold px-16 py-6 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default EditSpecificSlot;
