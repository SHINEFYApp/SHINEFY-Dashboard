import type { NavigateFunction } from "react-router";

export const getManageBookingColumns = (navigate: NavigateFunction) => [
    {
        key: "bookingNumber",
        title: "Booking Number",
    },
    {
        key: "customerName",
        title: "Customer Name",
    },
    {
        key: "serviceBoyName",
        title: "Service Boy Name",
    },
    {
        key: "serviceName",
        title: "Service Name",
    },
    {
        key: "paymentMethod",
        title: "Payment Method",
    },
    {
        key: "totalAmount",
        title: "Total Amount(EGP)",
    },
    {
        key: "action",
        title: "Action",
        render: () => (
            <button
                className="text-primary hover:text-primary-700 font-semibold transition-colors"
                onClick={() => navigate('/bookings/manage/id')}
            >
                View Details
            </button>
        ),
    },
];
