import { Formik, Form, FieldArray } from 'formik';
import { Clock, Plus, X } from 'lucide-react';
import { FormTimePicker } from '../../../common/FormTimePicker';
import { Button } from '../../../components/ui/button';
import { useGetDailySlotSettings, useUpdateDailySlotSettings } from '../../../api/features/slots.hooks';
import type { DailySlotSettingsFormValues } from '../../../types/slots';
import { toast } from 'sonner';

const DailySlotSettings = () => {
    const { data: dailySlotData, isLoading } = useGetDailySlotSettings();
    const updateMutation = useUpdateDailySlotSettings();

    const slotData = dailySlotData?.data?.data;

    const initialValues: DailySlotSettingsFormValues = {
        start_time: slotData?.start_time ?? '',
        end_time: slotData?.end_time ?? '',
        out_of_service_hours: slotData?.out_of_service_hours
            ? Object.values(slotData.out_of_service_hours)
            : [],
    };

    const handleSubmit = (values: DailySlotSettingsFormValues) => {
        updateMutation.mutate(
            {
                start_time: values.start_time,
                end_time: values.end_time,
                out_of_service_hours: values.out_of_service_hours,
            },
            {
                onSuccess: () => {
                    toast.success('Daily slot settings updated successfully');
                },
                onError: () => {
                    toast.error('Failed to update daily slot settings');
                },
            }
        );
    };

    if (isLoading) {
        return <div className="flex justify-center items-center p-10">Loading...</div>;
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ values, isValid }) => (
                    <Form className="space-y-8">
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

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Out of Service Hours
                                </h3>
                            </div>
                            <FieldArray name="out_of_service_hours">
                                {({ push, remove }) => (
                                    <div className="space-y-4">
                                        {values.out_of_service_hours.map((_, index) => (
                                            <div key={index} className="relative p-4 border border-gray-200 rounded-xl bg-gray-50">
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <div className="flex justify-start pt-4">
                            <Button
                                type="submit"
                                disabled={!isValid || updateMutation.isPending}
                                className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-6 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {updateMutation.isPending ? 'Updating...' : 'Update Daily Slot Settings'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DailySlotSettings;
