import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { FormDatePicker } from "../../common/FormDatePicker";
import { useGetBooking, useUpdateBooking } from "../../api/features/compounds.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

const statusOptions = [
    { value: "0", label: "Pending" },
    { value: "1", label: "In Progress" },
    { value: "2", label: "Completed" },
    { value: "3", label: "Cancelled" },
];

const periodOptions = ["day", "night"];

const CompoundBookingDetails = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const bookingId = Number(id);
    const [editMode, setEditMode] = useState(false);

    const { data, isLoading } = useGetBooking(bookingId);
    const booking = data?.data?.data;

    const updateMutation = useUpdateBooking({
        onSuccess: () => {
            toast.success("Booking updated successfully");
            setEditMode(false);
            queryClient.invalidateQueries({ queryKey: ["compound-booking", bookingId] });
        },
        onError: () => toast.error("Failed to update booking"),
    });

    const handleSubmit = (values: any) => {
        updateMutation.mutate({
            id: bookingId,
            data: {
                status: values.status,
                scheduled_date: values.scheduled_date,
                period: values.period,
                car_ids: [Number(values.car_id)],
                latitude: Number(values.latitude),
                longitude: Number(values.longitude),
                address: values.address,
                notes: values.notes || undefined,
                service_boy_id: values.service_boy_id ? Number(values.service_boy_id) : undefined,
            },
        });
    };

    const statusLabels: Record<string, string> = {
        "0": "Pending",
        "1": "In Progress",
        "2": "Completed",
        "3": "Cancelled",
    };

    const statusColors: Record<string, string> = {
        "0": "text-yellow-600 bg-yellow-50",
        "1": "text-blue-600 bg-blue-50",
        "2": "text-green-600 bg-green-50",
        "3": "text-red-600 bg-red-50",
    };

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (!booking) return <div className="p-8">Booking not found.</div>;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link to="/compounds/bookings" className="text-gray-500 hover:text-gray-700">
                            <ChevronLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-secondary-900">
                                Booking #{booking.id}
                            </h1>
                            <p className="text-xs text-secondary-500">Booking details</p>
                        </div>
                    </div>
                    {!editMode && (
                        <Button
                            className="bg-primary text-secondary-900 hover:bg-primary-600"
                            onClick={() => setEditMode(true)}
                        >
                            Edit
                        </Button>
                    )}
                </div>

                {editMode ? (
                    <Formik
                        initialValues={{
                            status: String(booking.status || "0"),
                            scheduled_date: booking.scheduled_date || "",
                            period: booking.period || "day",
                            car_id: booking.car_ids?.[0] || "",
                            latitude: booking.latitude || "",
                            longitude: booking.longitude || "",
                            address: booking.address || "",
                            notes: booking.notes || "",
                            service_boy_id: booking.service_boy?.id || "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDropdown name="status" label="Status *" placeholder="Select Status" options={statusOptions} />
                                    <FormDatePicker name="scheduled_date" label="Date *" placeholder="Select date" checkmark={false} />
                                    <FormDropdown name="period" label="Period *" placeholder="Select Period" options={periodOptions} />
                                    <FormInput name="car_id" label="Car ID *" type="number" placeholder="Enter car ID" />
                                    <FormInput name="latitude" label="Latitude *" type="text" placeholder="25.2048" />
                                    <FormInput name="longitude" label="Longitude *" type="text" placeholder="55.2708" />
                                    <div className="md:col-span-2">
                                        <FormInput name="address" label="Address *" placeholder="Service address" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <FormInput name="notes" label="Notes" placeholder="Admin notes" />
                                    </div>
                                    <FormInput name="service_boy_id" label="Service Boy ID" type="number" placeholder="Assign driver" />
                                </div>
                                <div className="flex justify-end gap-4 mt-8">
                                    <Button type="button" variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-primary text-secondary-900 hover:bg-primary-600" disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <div className="space-y-6">
                        {/* Status Badge */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status] || ""}`}>
                                {statusLabels[booking.status] || booking.status}
                            </span>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">User</p>
                                <p className="font-semibold">{booking.user?.name}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Compound</p>
                                <p className="font-semibold">{booking.compound?.name}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Package</p>
                                <p className="font-semibold">{booking.package?.name || "-"}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Service</p>
                                <p className="font-semibold">{booking.service_type}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Scheduled</p>
                                <p className="font-semibold">{booking.scheduled_date} ({booking.period})</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Service Boy</p>
                                <p className="font-semibold">{booking.service_boy?.name || "Not assigned"}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Address</p>
                                <p className="font-semibold">{booking.address}</p>
                                {booking.latitude && booking.longitude && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {booking.latitude}, {booking.longitude}
                                    </p>
                                )}
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Cars</p>
                                <p className="font-semibold">{booking.car_ids?.join(", ") || "-"}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Notes</p>
                                <p className="font-semibold">{booking.notes || "None"}</p>
                            </div>
                        </div>

                        {/* Booking Images */}
                        {booking.booking_images && booking.booking_images.length > 0 && (
                            <div>
                                <h3 className="text-md font-bold text-gray-800 mb-3">Images</h3>
                                <div className="flex gap-3 flex-wrap">
                                    {booking.booking_images.map((img: any) => (
                                        <img
                                            key={img.id}
                                            src={img.image}
                                            alt="Booking"
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Timestamps */}
                        {booking.on_the_way_at && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {booking.on_the_way_at && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs text-gray-500">On The Way</p>
                                        <p className="text-sm font-semibold">{booking.on_the_way_at}</p>
                                    </div>
                                )}
                                {booking.arrived_at && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs text-gray-500">Arrived</p>
                                        <p className="text-sm font-semibold">{booking.arrived_at}</p>
                                    </div>
                                )}
                                {booking.washing_at && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs text-gray-500">Washing Started</p>
                                        <p className="text-sm font-semibold">{booking.washing_at}</p>
                                    </div>
                                )}
                                {booking.completed_at && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs text-gray-500">Completed</p>
                                        <p className="text-sm font-semibold">{booking.completed_at}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default CompoundBookingDetails;
