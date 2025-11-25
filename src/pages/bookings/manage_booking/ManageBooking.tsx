import CompletedBookingChart from "../../../components/booking/manageBooking/CompletedBookingChart";
import RatedReportsChart from "../../../components/booking/manageBooking/RatedReportsChart";
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