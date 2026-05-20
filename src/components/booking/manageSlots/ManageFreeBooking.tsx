import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { manageSlotSchema } from '../../../constants/validationSchema';
import { manageSlotInitialValues } from '../../../constants/initialValues';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { FormDatePicker } from '../../../common/FormDatePicker';
import { FormTimePicker } from '../../../common/FormTimePicker';
import { FormDropdown } from '../../../common/FormDropdown';
import { Button } from '../../ui/button';
import { calculateDuration } from '../../../utils/utils';
import { useAddSpecificSlot } from '../../../api/features/slots.hooks';
import type { AddSpecificSlotPayload } from '../../../types/slots';
import { toast } from 'sonner';

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
    const { t } = useTranslation();
    const addMutation = useAddSpecificSlot();

    const handleSubmit = (values: typeof manageSlotInitialValues, { resetForm }: any) => {
        const payload: AddSpecificSlotPayload = {
            start_date: values.startDate,
            start_time: values.startTime,
            end_date: values.endDate,
            end_time: values.endTime,
            city: values.city,
            area: values.area,
            slot_status: values.slotStatus,
            slot_type: values.slotType,
        };

        addMutation.mutate(payload, {
            onSuccess: () => {
                toast.success(t('bookings.manageFreeBooking.addSuccess'));
                resetForm();
            },
            onError: () => {
                toast.error(t('bookings.manageFreeBooking.addFailed'));
            },
        });
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <Formik
                initialValues={manageSlotInitialValues}
                validationSchema={manageSlotSchema}
                onSubmit={handleSubmit}
            >
                {({ values, isValid }) => {
                    return (
                        <Form className="space-y-8">
                            <DurationListener values={values} setDuration={setDuration} />
                            {/* Start Time Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    {t('bookings.manageFreeBooking.startTime')}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDatePicker
                                        name="startDate"
                                        label={t('bookings.manageFreeBooking.selectBookingDate')}
                                        placeholder="12/10/2025"
                                        icon={<Calendar className="size-5" />}
                                        checkmark={true}
                                    />
                                    <FormTimePicker
                                        name="startTime"
                                        label={t('bookings.manageFreeBooking.selectBookingTime')}
                                        icon={<Clock className="size-5" />}
                                    />
                                </div>
                            </div>

                            {/* End Time Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    {t('bookings.manageFreeBooking.endTime')}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <FormDatePicker
                                        name="endDate"
                                        label={t('bookings.manageFreeBooking.selectFreeBookingDate')}
                                        placeholder="12/10/2025"
                                        icon={<Calendar className="size-5" />}
                                        checkmark={true}
                                    />
                                    <FormTimePicker
                                        name="endTime"
                                        label={t('bookings.manageFreeBooking.selectFreeBookingTime')}
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
                                    {t('bookings.manageFreeBooking.address')}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDropdown
                                        name="city"
                                        label={t('bookings.manageFreeBooking.city')}
                                        placeholder={t('bookings.manageFreeBooking.selectCity')}
                                        icon={<MapPin className="size-5" />}
                                        options={[
                                            t('bookings.manageFreeBooking.cities.cairo'),
                                            t('bookings.manageFreeBooking.cities.alexandria'),
                                            t('bookings.manageFreeBooking.cities.giza'),
                                            t('bookings.manageFreeBooking.cities.newCairo'),
                                            t('bookings.manageFreeBooking.cities.maadi'),
                                            t('bookings.manageFreeBooking.cities.alShorouk'),
                                        ]}
                                    />
                                    <FormDropdown
                                        name="area"
                                        label={t('bookings.manageFreeBooking.area')}
                                        placeholder={t('bookings.manageFreeBooking.selectArea')}
                                        icon={<MapPin className="size-5" />}
                                        options={[
                                            t('bookings.manageFreeBooking.areas.nasrCity'),
                                            t('bookings.manageFreeBooking.areas.heliopolis'),
                                            t('bookings.manageFreeBooking.areas.downtown'),
                                            t('bookings.manageFreeBooking.areas.zamalek'),
                                            t('bookings.manageFreeBooking.areas.dokki'),
                                            t('bookings.manageFreeBooking.areas.mohandessin'),
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Slot Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    {t('bookings.manageFreeBooking.slot')}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDropdown
                                        name="slotStatus"
                                        label={t('bookings.manageFreeBooking.selectSlotStatus')}
                                        placeholder={t('bookings.manageFreeBooking.selectSlotStatus')}
                                        icon={<User className="size-5" />}
                                        options={[t('bookings.manageFreeBooking.open'), t('bookings.manageFreeBooking.close'), t('bookings.manageFreeBooking.activated'), t('bookings.manageFreeBooking.deactivated')]}
                                    />
                                    <FormDropdown
                                        name="slotType"
                                        label={t('bookings.manageFreeBooking.selectSlotType')}
                                        placeholder={t('bookings.manageFreeBooking.selectSlotType')}
                                        icon={<User className="size-5" />}
                                        options={[t('bookings.manageFreeBooking.regular'), t('bookings.manageFreeBooking.premium'), t('bookings.manageFreeBooking.vip'), t('bookings.manageFreeBooking.express')]}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-start pt-4">
                                <Button
                                    type="submit"
                                    disabled={!isValid || addMutation.isPending}
                                    className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-16 py-6 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {addMutation.isPending ? t('bookings.manageFreeBooking.adding') : t('bookings.manageFreeBooking.addSpecificSlot')}
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
