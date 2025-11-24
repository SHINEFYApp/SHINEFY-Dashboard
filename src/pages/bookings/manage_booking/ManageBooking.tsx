import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import ManageBookingsAndSlots from "../../../components/booking/manageBooking/ManageBookingFilter";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";

const headTitle:{one : string , two : string} = {
    one : 'Filter',
    two : 'Manage Bookings'
} 

const ManageBooking = () => {
    return (
        <main>
            <ManageBookingsAndSlots headTitle={headTitle} manageSectionFromComponant={'manage bookings'} />
            <CompletedBookingChart />
            <RatedReportsChart />
        </main>
    );
};

export default ManageBooking;