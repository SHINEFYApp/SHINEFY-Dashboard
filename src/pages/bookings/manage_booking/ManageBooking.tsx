import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import ManageBookingFilter from "../../../components/booking/manageBooking/ManageBookingFilter";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";

const ManageBooking = () => {
    return (
        <main>
            <ManageBookingFilter />
            <CompletedBookingChart />
            <RatedReportsChart />
        </main>
    );
};

export default ManageBooking;