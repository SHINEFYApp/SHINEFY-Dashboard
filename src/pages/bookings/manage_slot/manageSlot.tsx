import ManageBookingFilter from "../../../components/booking/manageBooking/ManageBookingFilter";

const headTitle:{one : string , two : string} = {
    one : 'Filter',
    two : 'Manage Slot'
} 

const ManageSlot = () => {
    return (
        <main>
            <ManageBookingFilter headTitle={headTitle} manageSectionFromComponant={'manage slots'} />
        </main>
    );
};

export default ManageSlot;