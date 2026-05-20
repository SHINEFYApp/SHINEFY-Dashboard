import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { FormDatePicker } from "../../common/FormDatePicker";
import { useGetBooking, useUpdateBooking } from "../../api/features/compounds.hooks";
import { useGetServiceBoys } from "../../api/features/serviceBoys.hooks";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Search, User, X, Check } from "lucide-react";
import { Button } from "../../components/ui/button";

const periodOptions = ["day", "night"];

const CompoundBookingDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const bookingId = Number(id);
    const [editMode, setEditMode] = useState(false);
    const [driverSearch, setDriverSearch] = useState("");
    const [selectedDriver, setSelectedDriver] = useState<{ user_id: number; name: string } | null>(null);
    const [showDriverResults, setShowDriverResults] = useState(false);

    const statusOptions = [
        { value: "0", label: t("compounds.bookingDetailsPage.statusLabels.pending") },
        { value: "1", label: t("compounds.bookingDetailsPage.statusLabels.inProgress") },
        { value: "2", label: t("compounds.bookingDetailsPage.statusLabels.completed") },
        { value: "3", label: t("compounds.bookingDetailsPage.statusLabels.cancelled") },
    ];

    const { data, isLoading } = useGetBooking(bookingId);
    const booking = data?.data?.data;

    const { data: serviceBoysData, isFetching: isSearchingBoys } = useGetServiceBoys(
        { search: driverSearch || undefined, limit: 10 },
        { enabled: driverSearch.length > 1 }
    );
    const driverResults = (serviceBoysData?.data?.data?.data || []) as any[];

    const updateMutation = useUpdateBooking({
        onSuccess: () => {
            toast.success(t("compounds.bookingDetailsPage.updateSuccess"));
            setEditMode(false);
            setSelectedDriver(null);
            setDriverSearch("");
            queryClient.invalidateQueries({ queryKey: ["compound-booking", bookingId] });
        },
        onError: () => toast.error(t("compounds.bookingDetailsPage.updateFailed")),
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
                service_boy_id: selectedDriver ? Number(selectedDriver.user_id) : undefined,
            },
        });
    };

    const statusLabels: Record<string, string> = {
        "0": t("compounds.bookingDetailsPage.statusLabels.pending"),
        "1": t("compounds.bookingDetailsPage.statusLabels.inProgress"),
        "2": t("compounds.bookingDetailsPage.statusLabels.completed"),
        "3": t("compounds.bookingDetailsPage.statusLabels.cancelled"),
    };

    const statusColors: Record<string, string> = {
        "0": "text-yellow-600 bg-yellow-50",
        "1": "text-blue-600 bg-blue-50",
        "2": "text-green-600 bg-green-50",
        "3": "text-red-600 bg-red-50",
    };

    if (isLoading) return <div className="p-8">{t("compounds.bookingDetailsPage.loading")}</div>;
    if (!booking) return <div className="p-8">{t("compounds.bookingDetailsPage.notFound")}</div>;

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
                                {t("compounds.bookingDetailsPage.title", { id: booking.id })}
                            </h1>
                            <p className="text-xs text-secondary-500">{t("compounds.bookingDetailsPage.subtitle")}</p>
                        </div>
                    </div>
                    {!editMode && (
                        <Button
                            className="bg-primary text-secondary-900 hover:bg-primary-600"
                            onClick={() => setEditMode(true)}
                        >
                            {t("compounds.bookingDetailsPage.edit")}
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
                        }}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormDropdown name="status" label={t("compounds.bookingDetailsPage.status")} placeholder={t("compounds.bookingDetailsPage.selectStatus")} options={statusOptions} />
                                    <FormDatePicker name="scheduled_date" label={t("compounds.bookingDetailsPage.date")} placeholder={t("compounds.bookingDetailsPage.selectDate")} checkmark={false} />
                                    <FormDropdown name="period" label={t("compounds.bookingDetailsPage.period")} placeholder={t("compounds.bookingDetailsPage.selectPeriod")} options={periodOptions} />
                                    <FormInput name="car_id" label={t("compounds.bookingDetailsPage.carId")} type="number" placeholder={t("compounds.bookingDetailsPage.enterCarId")} />
                                    <FormInput name="latitude" label={t("compounds.bookingDetailsPage.latitude")} type="text" placeholder="25.2048" />
                                    <FormInput name="longitude" label={t("compounds.bookingDetailsPage.longitude")} type="text" placeholder="55.2708" />
                                    <div className="md:col-span-2">
                                        <FormInput name="address" label={t("compounds.bookingDetailsPage.address")} placeholder={t("compounds.bookingDetailsPage.serviceAddress")} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <FormInput name="notes" label={t("compounds.bookingDetailsPage.notes")} placeholder={t("compounds.bookingDetailsPage.adminNotes")} />
                                    </div>

                                    <div className="md:col-span-2 space-y-2 relative">
                                        <label className="text-sm font-medium text-gray-700">{t("compounds.bookingDetailsPage.driver")}</label>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            <input
                                                type="text"
                                                value={selectedDriver ? selectedDriver.name : driverSearch}
                                                placeholder={t("compounds.bookingDetailsPage.searchDriver")}
                                                onChange={(e) => {
                                                    setDriverSearch(e.target.value);
                                                    setSelectedDriver(null);
                                                    setShowDriverResults(true);
                                                }}
                                                onFocus={() => setShowDriverResults(true)}
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                            {selectedDriver && (
                                                <button
                                                    type="button"
                                                    onClick={() => { setSelectedDriver(null); setDriverSearch(""); }}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                        {showDriverResults && !selectedDriver && driverSearch.length > 1 && (
                                            <div className="absolute z-50 w-full mt-1 rounded-xl border border-gray-200 bg-white shadow-lg max-h-48 overflow-auto">
                                                {isSearchingBoys ? (
                                                    <div className="px-4 py-3 text-sm text-gray-400">{t("compounds.bookingDetailsPage.searching")}</div>
                                                ) : driverResults.length > 0 ? (
                                                    driverResults.map((boy: any) => (
                                                        <button
                                                            key={boy.user_id}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedDriver({ user_id: boy.user_id, name: boy.name });
                                                                setShowDriverResults(false);
                                                                setDriverSearch("");
                                                            }}
                                                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3"
                                                        >
                                                            <User className="w-4 h-4 text-gray-400 shrink-0" />
                                                            <span className="font-medium">{boy.name}</span>
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-gray-400">{t("compounds.bookingDetailsPage.noDrivers")}</div>
                                                )}
                                            </div>
                                        )}

                                        {selectedDriver && (
                                            <div className="rounded-xl border border-green-200 bg-green-50 p-3 flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-green-600" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-800">{selectedDriver.name}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-8">
                                    <Button type="button" variant="outline" onClick={() => {
                                        setEditMode(false);
                                        setSelectedDriver(null);
                                        setDriverSearch("");
                                    }}>{t("compounds.bookingDetailsPage.cancel")}</Button>
                                    <Button type="submit" className="bg-primary text-secondary-900 hover:bg-primary-600" disabled={updateMutation.isPending}>
                                        {updateMutation.isPending ? t("compounds.bookingDetailsPage.saving") : t("compounds.bookingDetailsPage.saveChanges")}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <div className="space-y-6">
                        {/* Status Badge */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">{t("common.status")}:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status] || ""}`}>
                                {statusLabels[booking.status] || booking.status}
                            </span>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.user")}</p>
                                <p className="font-semibold">{booking.user?.name}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.compound")}</p>
                                <p className="font-semibold">{booking.compound?.name}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.package")}</p>
                                <p className="font-semibold">{booking.package?.name || "-"}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.service")}</p>
                                <p className="font-semibold">{booking.service_type}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.scheduled")}</p>
                                <p className="font-semibold">{booking.scheduled_date} ({booking.period})</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.serviceBoy")}</p>
                                <p className="font-semibold">{booking.service_boy?.name || t("compounds.bookingDetailsPage.notAssigned")}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.address")}</p>
                                <p className="font-semibold">{booking.address}</p>
                                {booking.latitude && booking.longitude && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {booking.latitude}, {booking.longitude}
                                    </p>
                                )}
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.cars")}</p>
                                <p className="font-semibold">{booking.car_ids?.join(", ") || "-"}</p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{t("compounds.bookingDetailsPage.infoCards.notes")}</p>
                                <p className="font-semibold">{booking.notes || t("compounds.bookingDetailsPage.none")}</p>
                            </div>
                        </div>

                        {/* Booking Images */}
                        {booking.booking_images && booking.booking_images.length > 0 && (
                            <div>
                                <h3 className="text-md font-bold text-gray-800 mb-3">{t("compounds.bookingDetailsPage.infoCards.images")}</h3>
                                <div className="flex gap-3 flex-wrap">
                                    {booking.booking_images.map((img: any) => (
                                        <img
                                            key={img.id}
                                            src={img.image}
                                            alt={t("common.image")}
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
                                        <p className="text-xs text-gray-500">{t("compounds.bookingDetailsPage.infoCards.onTheWay")}</p>
                                        <p className="text-sm font-semibold">{booking.on_the_way_at}</p>
                                    </div>
                                )}
                                {booking.arrived_at && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs text-gray-500">{t("compounds.bookingDetailsPage.infoCards.arrived")}</p>
                                        <p className="text-sm font-semibold">{booking.arrived_at}</p>
                                    </div>
                                )}
                                {booking.washing_at && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs text-gray-500">{t("compounds.bookingDetailsPage.infoCards.washingStarted")}</p>
                                        <p className="text-sm font-semibold">{booking.washing_at}</p>
                                    </div>
                                )}
                                {booking.completed_at && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs text-gray-500">{t("compounds.bookingDetailsPage.infoCards.completed")}</p>
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
