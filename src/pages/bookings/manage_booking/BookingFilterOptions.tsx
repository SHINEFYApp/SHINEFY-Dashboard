import { useTranslation } from "react-i18next";
import { GenericFilterModal } from "../../../common/GenericFilterModal";
import { FormDropdown } from "../../../common/FormDropdown";
import { bookingFilterInitialValues } from "../../../constants/initialValues";
import type { BookingFilterState } from "../../../types/bookings";

interface BookingFilterOptionsProps {
    filterOptions: BookingFilterState;
    setFilterOptions: (value: BookingFilterState) => void;
}

export default function BookingFilterOptions({ filterOptions, setFilterOptions }: BookingFilterOptionsProps) {
    const { t } = useTranslation();
    return (
        <GenericFilterModal
            isOpen={filterOptions.state}
            onClose={() => setFilterOptions(prev => ({ ...prev, state: false }))}
            onSubmit={(values) => {
                setFilterOptions({ data: values, state: false });
            }}
            initialValues={bookingFilterInitialValues}
            title={t('bookings.filterOptions.title')}
            subtitle={t('bookings.filterOptions.subtitle')}
        >
            <FormDropdown
                name="status"
                label={t('bookings.filterOptions.bookingStatus')}
                placeholder={t('bookings.filterOptions.selectStatus')}
                options={[
                    { value: '0', label: t('bookings.filterOptions.statusValues.pending') },
                    { value: '1', label: t('bookings.filterOptions.statusValues.inProgress') },
                    { value: '2', label: t('bookings.filterOptions.statusValues.completed') },
                    { value: '3', label: t('bookings.filterOptions.statusValues.canceled') },
                    { value: '4', label: t('bookings.filterOptions.statusValues.confirmed') },
                ]}
            />
            <FormDropdown
                name="booking_type"
                label={t('bookings.filterOptions.bookingType')}
                placeholder={t('bookings.filterOptions.selectBookingType')}
                options={[
                    { value: '0', label: t('bookings.filterOptions.bookingTypeValues.scheduled') },
                    { value: '1', label: t('bookings.filterOptions.bookingTypeValues.waiting') },
                ]}
            />
            <FormDropdown
                name="paymentMethod"
                label={t('bookings.filterOptions.paymentMethod')}
                placeholder={t('bookings.filterOptions.selectPaymentMethod')}
                options={[
                    { value: '0', label: t('bookings.filterOptions.paymentMethodValues.cash') },
                    { value: '1', label: t('bookings.filterOptions.paymentMethodValues.credit') },
                    { value: '2', label: t('bookings.filterOptions.paymentMethodValues.free') },
                    { value: '3', label: t('bookings.filterOptions.paymentMethodValues.package') },
                ]}
            />
        </GenericFilterModal>
    );
}
