import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";
import { dummyTableData } from "../../../constants/data";
import { manageBookingSearchInitialValues, bookingFilterInitialValues } from "../../../constants/initialValues";
import { FilterHeader } from "../../../common/FilterHeader";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormTimePicker } from "../../../common/FormTimePicker";
import Table from "../../../components/tables/table";


const ManageBooking = () => {
    return (
        <main>
            <Table manageSectionFromComponant={'manageBookings'} />
            <CompletedBookingChart />
            <RatedReportsChart />
        </main>
    );
};

export default ManageBooking;