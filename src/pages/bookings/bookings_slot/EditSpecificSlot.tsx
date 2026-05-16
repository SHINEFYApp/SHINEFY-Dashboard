import { Formik, Form, FieldArray } from 'formik';
import { Calendar, Clock, ListChecks, Plus, Trash2 } from 'lucide-react';
import { FormDatePicker } from '../../../common/FormDatePicker';
import { FormTimePicker } from '../../../common/FormTimePicker';
import { FormDropdown } from '../../../common/FormDropdown';
import { Button } from '../../../components/ui/button';
import { useViewSpecificSlot, useUpdateSpecificSlot } from '../../../api/features/slots.hooks';
import type { UpdateSpecificSlotPayload } from '../../../types/slots';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';

const EditSpecificSlot = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const slotId = Number(id);

    const { data: slotData, isLoading } = useViewSpecificSlot(slotId);
    const updateMutation = useUpdateSpecificSlot(slotId);

    const slot = slotData?.data?.data;

    const initialValues = {
        slot_date: slot?.slot_date ?? '',
        start_time: slot?.start_time ?? '',
        end_time: slot?.end_time ?? '',
        status: slot?.status !== undefined ? String(slot.status) : '',
        out_of_service_hours: slot?.out_of_service_hours ?? [],
    };

    const handleSubmit = (values: typeof initialValues) => {
        const payload: UpdateSpecificSlotPayload = {
            slot_date: values.slot_date || undefined,
            start_time: values.start_time || null,
            end_time: values.end_time || null,
            status: values.status ? Number(values.status) : undefined,
            out_of_service_hours: values.out_of_service_hours.filter(
                (h: any) => h.start_time && h.end_time
            ),
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
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {({ values, isValid }) => (
                        <Form className="space-y-8">
                            {/* Slot Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Slot Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDatePicker
                                        name="slot_date"
                                        label="Select Slot Date"
                                        placeholder="Select date"
                                        icon={<Calendar className="size-5" />}
                                        checkmark={true}
                                    />
                                    <FormDropdown
                                        name="status"
                                        label="Select Status"
                                        placeholder="Select Status"
                                        icon={<ListChecks className="size-5" />}
                                        options={[
                                            { label: 'Open', value: '0' },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Working Hours
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormTimePicker
                                        name="start_time"
                                        label="Start Time"
                                        icon={<Clock className="size-5" />}
                                    />
                                    <FormTimePicker
                                        name="end_time"
                                        label="End Time"
                                        icon={<Clock className="size-5" />}
                                    />
                                </div>
                            </div>

                            {/* Out of Service Hours */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Out of Service Hours
                                </h3>
                                <FieldArray name="out_of_service_hours">
                                    {({ push, remove }) => (
                                        <div className="space-y-4">
                                            {values.out_of_service_hours.map((_, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                        <FormTimePicker
                                                            name={`out_of_service_hours.${index}.start_time`}
                                                            label="Start Time"
                                                            icon={<Clock className="size-5" />}
                                                        />
                                                        <FormTimePicker
                                                            name={`out_of_service_hours.${index}.end_time`}
                                                            label="End Time"
                                                            icon={<Clock className="size-5" />}
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="mt-4 p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Remove"
                                                    >
                                                        <Trash2 className="size-5" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => push({ start_time: '', end_time: '' })}
                                                className="flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
                                            >
                                                <Plus className="size-5" />
                                                Add Out of Service Hours
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
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
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditSpecificSlot;
