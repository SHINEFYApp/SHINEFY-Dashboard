import { GenericFilterModal } from "../../../common/GenericFilterModal";
import { FormDropdown } from "../../../common/FormDropdown";
import { bookingFilterInitialValues } from "../../../constants/initialValues";
import type { BookingFilterState } from "../../../types/bookings";

interface BookingFilterOptionsProps {
    filterOptions: BookingFilterState;
    setFilterOptions: (value: BookingFilterState) => void;
}

export default function BookingFilterOptions({ filterOptions, setFilterOptions }: BookingFilterOptionsProps) {
    return (
        <GenericFilterModal
            isOpen={filterOptions.state}
            onClose={() => setFilterOptions(prev => ({ ...prev, state: false }))}
            onSubmit={(values) => {
                setFilterOptions({ data: values, state: false });
            }}
            initialValues={bookingFilterInitialValues}
            title="Filter options"
            subtitle="Manage Bookings"
        >
            <FormDropdown
                name="status"
                label="Booking Status"
                placeholder="Select Status"
                options={[
                    { value: '0', label: 'Pending' },
                    { value: '1', label: 'In Progress' },
                    { value: '2', label: 'Completed' },
                    { value: '3', label: 'Canceled' },
                    { value: '4', label: 'Confirmed' },
                ]}
            />
            <FormDropdown
                name="booking_type"
                label="Booking Type"
                placeholder="Select Booking Type"
                options={[
                    { value: '0', label: 'Scheduled' },
                    { value: '1', label: 'Waiting' },
                ]}
            />
        </GenericFilterModal>
    );
}
