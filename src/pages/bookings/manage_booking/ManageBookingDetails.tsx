import { History, MapPin, FileText, CreditCard, Truck, Wrench, Save, Loader2, Package, Plus, X, ChevronDown, Check, ExternalLink } from "lucide-react";
import { CustomTable } from "../../../common/CustomTable";
import type {
    ApiResponse,
    ApiMainService,
    ApiExtraService,
    ExtraService,
    GetServiceResponse,
    UpdateBookingPayload,
    Vehicle,
    ServiceBoyStatus,
    ServiceBoyStatusItem,
} from "../../../types/bookings";
import { useGet } from "../../../api/useGetData";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useEffect, useMemo, useRef, useState } from "react";
import { getServices, singleBookingDetails } from "../../../api/features/bookings";
import { useUpdateBooking } from "../../../api/features/bookings.hooks";
import { useUserLocations, useUserVehicles } from "../../../api/features/ManageUsers.hooks";
import { useGetAdminSlots } from "../../../api/features/slots.hooks";
import type { AdminSlot } from "../../../types/slots";
import { SkeletonDemo } from "../../../common/loader";
import { cn } from "../../../utils/utils";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { ExtraServiceModal } from "../../../components/booking/tabs/services/ExtraServiceModal";
import { BookingLogsModal } from "../../../components/booking/BookingLogsModal";
import { useTranslation } from "react-i18next";



/*
 * The API returns status as a text label ("Pending", "Canceled", etc.)
 * but expects a numeric string ("0"-"5") when updating.
 * These helpers convert between the two.
 */
const STATUS_LABEL_TO_CODE: Record<string, string> = {
    "pending": "0",
    "in-progress": "1",
    "completed": "2",
    "canceled": "3",
    "confirmed": "4",
};

const DRIVER_LABEL_TO_CODE: Record<string, string> = {
    "assigned": "1",
    "on the way": "2",
    "arrived": "3",
    "working": "4",
    "done": "5",
};

/** Resolve status to a code "0"-"5" regardless of whether the value is already a code or a label */
const resolveStatusCode = (value: any, map: Record<string, string>): string => {
    if (value === null || value === undefined || value === "") return "";
    const str = String(value).trim();
    // Already a numeric code
    if (/^\d$/.test(str)) return str;
    // Try label lookup (case-insensitive)
    return map[str.toLowerCase()] ?? "";
};

/* ─── Form State ─── */
interface EditFormState {
    status: string;
    booking_type: number;
    booking_date: string;
    booking_time: string;
    service_boy_id: number | null;
    driver_status?: string;
    main_service: number | null;
    address_loc: string;
    lat: string;
    lon: string;
    coupan_amount: string;
    wallet_amount: string;
    booking_admin_note: string;
    note?: string;
    extra_services: ExtraService[];
    service_boy_status: ServiceBoyStatus | null;
}

/* ═══════════════════════════════════════════════════════ */
/*                        Component                        */
/* ═══════════════════════════════════════════════════════ */
const ManageBookingDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const baseURL = import.meta.env.VITE_API_URL;
    const route = `${baseURL}/api/book/get/${id}`;

    /* ─── Status Maps ─── */
    const BOOKING_STATUS: Record<string, { label: string; color: string }> = {
        "0": { label: t("bookings.manageBookingDetails.statusValues.pending"), color: "bg-yellow-50 text-yellow-700 border-yellow-300" },
        "1": { label: t("bookings.manageBookingDetails.statusValues.inProgress"), color: "bg-blue-50 text-blue-700 border-blue-300" },
        "2": { label: t("bookings.manageBookingDetails.statusValues.completed"), color: "bg-green-50 text-green-700 border-green-300" },
        "3": { label: t("bookings.manageBookingDetails.statusValues.canceled"), color: "bg-red-50 text-red-700 border-red-300" },
        "4": { label: t("bookings.manageBookingDetails.statusValues.confirmed"), color: "bg-indigo-50 text-indigo-700 border-indigo-300" },
    };

    const BOOKING_TYPE: Record<number, { label: string; color: string }> = {
        0: { label: t("bookings.manageBookingDetails.bookingTypeValues.suchdegle"), color: "bg-purple-50 text-purple-700 border-purple-300" },
        1: { label: t("bookings.manageBookingDetails.bookingTypeValues.waiting"), color: "bg-orange-50 text-orange-700 border-orange-300" },
    };

    const DRIVER_STATUS: Record<string, { label: string; color: string }> = {
        "1": { label: t("bookings.manageBookingDetails.driverStatus.assigned"), color: "bg-blue-50 text-blue-700 border-blue-300" },
        "2": { label: t("bookings.manageBookingDetails.driverStatus.onTheWay"), color: "bg-indigo-50 text-indigo-700 border-indigo-300" },
        "3": { label: t("bookings.manageBookingDetails.driverStatus.arrived"), color: "bg-purple-50 text-purple-700 border-purple-300" },
        "4": { label: t("bookings.manageBookingDetails.driverStatus.working"), color: "bg-yellow-50 text-yellow-700 border-yellow-300" },
        "5": { label: t("bookings.manageBookingDetails.driverStatus.done"), color: "bg-green-50 text-green-700 border-green-300" },
    };

    /* ─── Booking data ─── */
    const { data, isLoading, isError, error } = useGet<ApiResponse>({
        queryFn: () => singleBookingDetails(route),
        queryKey: ["booking", "details", id],
        options: { staleTime: 1000 * 10 },
    });

    const { mutate: updateMutate, isPending: isUpdating } = useUpdateBooking(id!);

    const booking = data?.data?.booking;
    const bookingExtraServices = data?.data?.extra_services;
    const bookingServiceBoyStatus = data?.data?.service_boy_status;
    /* ─── Fetch all services (same endpoint as create booking) ─── */
    const getServicesQuery = useGet<GetServiceResponse>({
        queryFn: () => getServices(`${baseURL}/api/get_service/`),
        queryKey: ["services"],
        options: { staleTime: 1000 * 30 },
    });

    const allServices: ApiMainService[] = getServicesQuery.data?.all_service_arr?.sorted_main_services ?? [];
    const allExtras: ApiExtraService[] = getServicesQuery.data?.all_service_arr?.sorted_extra_services ?? [];

    /* ─── Fetch user locations & vehicles via user_id ─── */
    const userId = booking?.user_id ?? booking?.user?.customer_id;

    const { data: locationsData, isLoading: isLoadingLocations } = useUserLocations(
        { user_id: userId! },
        { enabled: !!userId }
    );

    const { data: vehiclesData, isLoading: isLoadingVehicles } = useUserVehicles(
        { user_id: userId! },
        { enabled: !!userId }
    );

    const userLocations = locationsData?.data ?? locationsData?.locations ?? locationsData ?? [];
    const userVehicles = vehiclesData?.data ?? vehiclesData?.vehicles ?? vehiclesData ?? [];

    /* ─── Form state ─── */
    const [form, setForm] = useState<EditFormState>({
        status: "",
        booking_type: 0,
        driver_status: "",
        main_service: null,
        address_loc: "",
        lat: "",
        lon: "",
        coupan_amount: "",
        wallet_amount: "",
        booking_admin_note: "",
        note: "",
        extra_services: [],
        service_boy_status: null,
    });

    const [hasChanges, setHasChanges] = useState(false);
    const [initialForm, setInitialForm] = useState<EditFormState | null>(null);
    const [isExtraModalOpen, setIsExtraModalOpen] = useState(false);
    const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [isServiceBoyDropdownOpen, setIsServiceBoyDropdownOpen] = useState(false);

    /*
     * ─── Match initial main_service from the booking ───
     * The API doesn't return a service_id directly on the booking object.
     * We match by comparing the booking's service name against the fetched services list.
     */
    const resolveMainServiceId = (): number | null => {
        if (!booking) return null;
        // 1. Direct numeric field (if the API does return it)
        const directId = booking.main_service_id ?? booking.service_id ?? booking.main_service;
        if (directId && Number(directId) > 0) return Number(directId);
        // 2. Match by service_name from booking list data
        const bookingServiceName = booking.service_name;
        if (bookingServiceName && allServices.length > 0) {
            const match = allServices.find(
                (s) => s.service_name?.[0]?.toLowerCase() === String(bookingServiceName).toLowerCase()
            );
            if (match) return match.service_id;
        }
        return null;
    };

    /* ─── Init form from booking data ─── */
    useEffect(() => {
        if (!booking) return;

        const existingExtras: ExtraService[] = (bookingExtraServices ?? []).map((es: any) => ({
            id: String(es.extra_service_id),
            name: es.extra_service_name ?? "Unknown",
            quantity: es.extra_services_quantity ?? 1,
        }));

        const matchedServiceId = resolveMainServiceId();

        // Resolve status to a code "0"-"5" regardless of whether the value is already a code or a label
        const resolvedStatus = resolveStatusCode(booking.status, STATUS_LABEL_TO_CODE);


        const initial: EditFormState = {
            status: String(resolvedStatus),
            booking_type: booking.booking_type ?? 0,
            booking_date: booking.booking_date ?? "",
            booking_time: booking.booking_time ?? "",
            service_boy_id: booking.service_boy?.service_boy_id ?? null,
            main_service: matchedServiceId,
            address_loc: booking.address_loc ?? "",
            lat: String(booking.lat ?? booking.latitude ?? ""),
            lon: String(booking.lon ?? booking.longitude ?? ""),
            coupan_amount: String(booking.coupan_amount ?? ""),
            wallet_amount: String(booking.wallet_amount ?? ""),
            booking_admin_note: booking.booking_admin_note ?? "",
            note: booking.note ?? "",
            extra_services: existingExtras,
            service_boy_status: bookingServiceBoyStatus ?? null,
        };
        setForm(initial);
        setInitialForm(initial);
    }, [data, allServices]);


    /* ─── Track changes ─── */
    useEffect(() => {
        if (!initialForm) return;
        const changed =
            form.status !== initialForm.status ||
            form.booking_type !== initialForm.booking_type ||
            form.booking_date !== initialForm.booking_date ||
            form.booking_time !== initialForm.booking_time ||
            form.service_boy_id !== initialForm.service_boy_id ||
            form.driver_status !== initialForm.driver_status ||
            form.main_service !== initialForm.main_service ||
            form.address_loc !== initialForm.address_loc ||
            form.lat !== initialForm.lat ||
            form.lon !== initialForm.lon ||
            form.coupan_amount !== initialForm.coupan_amount ||
            form.wallet_amount !== initialForm.wallet_amount ||
            form.booking_admin_note !== initialForm.booking_admin_note ||
            form.note !== initialForm.note ||
            JSON.stringify(form.extra_services) !== JSON.stringify(initialForm.extra_services) ||
            JSON.stringify(form.service_boy_status) !== JSON.stringify(initialForm.service_boy_status);
        setHasChanges(changed);
    }, [form, initialForm]);

    const updateField = <K extends keyof EditFormState>(key: K, value: EditFormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    /* ─── Derived: selected service & available extras ─── */
    const selectedServiceObj = useMemo(
        () => allServices.find((s) => s.service_id === form.main_service),
        [allServices, form.main_service]
    );

    const selectedServiceName = selectedServiceObj?.service_name?.[0]
        ?? booking?.service_name
        ?? "—";

    const availableExtras = useMemo(
        () => (selectedServiceObj?.apply_add_extra_service == 1 ? allExtras : []),
        [selectedServiceObj, allExtras]
    );

    const serviceTime = useMemo(() => {
        const mainTime = selectedServiceObj?.service_time || 0;
        const extrasTime = form.extra_services.reduce((sum, es) => {
            const found = allExtras.find((e) => String(e.extra_service_id) === es.id);
            return sum + (found?.extra_service_time || 0) * (es.quantity || 1);
        }, 0);
        return mainTime + extrasTime;
    }, [selectedServiceObj, form.extra_services, allExtras]);

    const { data: slotsData, isLoading: slotsLoading } = useGetAdminSlots({
        date: form.booking_date || '',
        service_time: serviceTime > 0 ? serviceTime : undefined,
    });

    const slots: AdminSlot[] = Array.isArray(slotsData?.data?.data?.slots)
        ? slotsData.data.data.slots
        : [];

    const availableServiceBoys = useMemo(() => {
        if (!form.booking_time) return [];
        const seen = new Set<number>();
        const boys: { user_id: number; name: string }[] = [];
        const targetSlot = slots.find((s) => s.time === form.booking_time);
        if (!targetSlot) return [];
        for (const boy of targetSlot.available_boys || []) {
            if (!seen.has(boy.user_id)) {
                seen.add(boy.user_id);
                boys.push({ user_id: boy.user_id, name: boy.name });
            }
        }
        const currentBoy = booking?.service_boy;
        if (currentBoy?.service_boy_id && !seen.has(currentBoy.service_boy_id)) {
            boys.unshift({
                user_id: currentBoy.service_boy_id,
                name: currentBoy.service_boy_name ?? `Boy #${currentBoy.service_boy_id}`,
            });
        }
        return boys;
    }, [slotsData, booking, form.booking_time]);

    /* ─── Clear extras when main service changes (skip first render) ─── */
    const prevServiceRef = useRef<number | null>(null);
    const isFirstServiceSet = useRef(true);
    useEffect(() => {
        if (isFirstServiceSet.current) {
            isFirstServiceSet.current = false;
            prevServiceRef.current = form.main_service;
            return;
        }
        if (prevServiceRef.current !== null && prevServiceRef.current !== form.main_service) {
            updateField("extra_services", []);
        }
        prevServiceRef.current = form.main_service;
    }, [form.main_service]);

    const handleRemoveExtra = (extraId: string) => {
        updateField(
            "extra_services",
            form.extra_services.filter((s) => s.id !== extraId)
        );
    };

    /* ─── Save → sends numeric codes to backend ─── */
    const handleSave = () => {
        const payload: UpdateBookingPayload = {
            status: form.status, // "0"-"5"
            booking_type: form.booking_type,
        };

        if (form.booking_date) payload.booking_date = form.booking_date;
        if (form.booking_time) payload.booking_time = form.booking_time;
        if (form.main_service) payload.main_service = form.main_service;
        if (form.service_boy_id) payload.service_boy_id = form.service_boy_id;
        if (form.address_loc) payload.address_loc = form.address_loc;
        if (form.lat) payload.lat = form.lat;
        if (form.lon) payload.lon = form.lon;
        if (form.coupan_amount) payload.coupan_amount = Number(form.coupan_amount);
        if (form.wallet_amount) payload.wallet_amount = Number(form.wallet_amount);
        if (form.booking_admin_note) payload.booking_admin_note = form.booking_admin_note;
        if (form.note) payload.note = form.note;
        if (form.driver_status) payload.driver_status = form.driver_status; // "1"-"5"

        if (form.service_boy_status) payload.service_boy_status = form.service_boy_status;

        if (form.extra_services.length > 0) {
            payload.extra_service_id = form.extra_services.map((es) => Number(es.id));
            payload.extra_services_quantity = form.extra_services.map((es) => es.quantity);
        }

        updateMutate(payload, {
            onSuccess: () => {
                toast.success(t("bookings.manageBookingDetails.updateSuccess"));
                setInitialForm({ ...form });
                setHasChanges(false);
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || t("bookings.manageBookingDetails.updateFailed"));
            },
        });
    };

    /* ─── Loading / error ─── */
    if (isLoading) return <div className="h-screen"><SkeletonDemo /></div>;
    if (isError) {
        toast.error(error.message);
        return null;
    }
    if (!booking) return null;

    /* ─── Table columns ─── */
    const vehicleColumns: any[] = [
        { key: "car_category_image", title: t("bookings.manageBookingDetails.vehicleColumns.image"), width: "w-32" },
        { key: "make_name", title: t("bookings.manageBookingDetails.vehicleColumns.make"), render: (v: string) => <span className="text-gray-700 font-medium">{v}</span> },
        { key: "model_name", title: t("bookings.manageBookingDetails.vehicleColumns.model"), render: (v: string) => <span className="text-gray-700 font-medium">{v}</span> },
        { key: "plate_number", title: t("bookings.manageBookingDetails.vehicleColumns.plateNumber"), render: (v: string) => <span className="text-gray-700 font-medium" dir="rtl">{v}</span> },
        {
            key: "color_name", title: t("bookings.manageBookingDetails.vehicleColumns.color"),
            render: (v: string, row: Vehicle) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md border border-gray-300 shadow-sm" style={{ backgroundColor: row.color_name }} />
                    <span className="text-gray-700 font-medium">{v}</span>
                </div>
            ),
        },
    ];

    const serviceBoyColumns: any[] = [
        { key: "service_boy_name", title: t("bookings.manageBookingDetails.vehicleColumns.name"), render: (v: string) => <span className="font-medium">{v}</span> },
        { key: "service_boy_id ", title: t("bookings.manageBookingDetails.vehicleColumns.id") },
    ];



    /* ═══════════════════════════════════════════════════════ */
    /*                         RENDER                         */
    /* ═══════════════════════════════════════════════════════ */
    return (
        <div className="space-y-6 pb-24">
            {/* ══════════════ Header ══════════════ */}
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                            Booking #{booking.booking_no || booking.booking_id}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {booking.user?.customer_name} &middot; {booking.booking_date} &middot; {booking.booking_time}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges || isUpdating}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm",
                                hasChanges
                                    ? "bg-primary text-secondary-900 hover:bg-primary-600 hover:shadow-md cursor-pointer"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            )}
                        >
                            {isUpdating ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                            {isUpdating ? t("bookings.manageBookingDetails.saving") : t("bookings.manageBookingDetails.saveChanges")}
                        </button>
                        <button
                            onClick={() => setIsLogsModalOpen(true)}
                            className="flex items-center justify-center p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 transition-all"
                        >
                            <History className="size-4" />
                        </button>
                    </div>
                </div>

                {/* Read-only info cards */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <InfoCard label={t("bookings.manageBookingDetails.bookingId")} value={`#${booking.booking_id}`} />
                    <InfoCard label={t("bookings.manageBookingDetails.customer")} value={booking.user?.customer_name || "—"} />
                    <InfoCard label={t("bookings.manageBookingDetails.customerPhone")} value={booking.user?.customer_phone || "—"} />
                    <InfoCard label={t("bookings.manageBookingDetails.dateTime")} value={`${booking.booking_date || "—"} at ${booking.booking_time || "—"}`} />
                    <InfoCard label={t("bookings.manageBookingDetails.payment")} value={booking.payment_option || "—"} />
                    <InfoCard label={t("bookings.manageBookingDetails.totalPrice")} value={`EGP ${booking.total_price || "0"}`} highlight />
                    <InfoCard label={t("bookings.manageBookingDetails.orderType")} value={booking.order_pay_type || "—"} />
                    <InfoCard label={t("bookings.manageBookingDetails.currentService")} value={selectedServiceName} />
                    <InfoCard label={t("bookings.manageBookingDetails.collectStatus")} value={booking.payment_collect_status || "—"} />
                    <InfoCard label={t("bookings.manageBookingDetails.bookingType")} value={BOOKING_TYPE[booking.booking_type]?.label || "—"} />
                </div>
            </div>

            {/* ══════════════ Editable Sections ══════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ── Date & Time ── */}
                <SectionCard title={t("bookings.manageBookingDetails.dateTimeSection")} icon={<History className="size-5" />}>
                    <div className="space-y-5">
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                                {t("bookings.manageBookingDetails.bookingDate")}
                            </label>
                            <input
                                type="date"
                                value={form.booking_date}
                                onChange={(e) => updateField("booking_date", e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                                {t("bookings.manageBookingDetails.bookingTime")}
                                {!form.booking_date && (
                                    <span className="ml-2 text-xs text-gray-400 font-normal">{t("bookings.manageBookingDetails.selectDateFirst")}</span>
                                )}
                            </label>
                            {!form.booking_date ? (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
                                    {t("bookings.manageBookingDetails.selectDateToSeeSlots")}
                                </div>
                            ) : slotsLoading ? (
                                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                                    {t("bookings.manageBookingDetails.loadingSlots")}
                                </div>
                            ) : slots.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
                                    {t("bookings.manageBookingDetails.noSlotsAvailable")}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {slots.map((slot, i) => {
                                        const isSelected = form.booking_time === slot.time;
                                        const isDisabled = slot.available_count === 0;
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                disabled={isDisabled}
                                                onClick={() => updateField("booking_time", slot.time)}
                                                className={cn(
                                                    "flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all duration-200",
                                                    isSelected
                                                        ? "border-primary bg-primary/5 text-primary"
                                                        : isDisabled
                                                            ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                                                            : "border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5"
                                                )}
                                            >
                                                <span className="font-semibold">{slot.time}</span>
                                                <span className={cn("text-xs", isSelected ? "text-primary/70" : "text-gray-400")}>
                                                    {slot.available_count} {t("bookings.manageBookingDetails.available")}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {form.booking_time && (
                                <p className="text-xs text-green-600 mt-2">
                                    {t("bookings.manageBookingDetails.selectedDateTime", { date: form.booking_date, time: form.booking_time })}
                                </p>
                            )}
                        </div>

                        {/* ── Service Boy ── */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                                {t("bookings.manageBookingDetails.serviceBoy")}
                                {!form.booking_time && (
                                    <span className="ml-2 text-xs text-gray-400 font-normal">{t("bookings.manageBookingDetails.selectTimeSlotFirst")}</span>
                                )}
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsServiceBoyDropdownOpen(!isServiceBoyDropdownOpen)}
                                    disabled={!form.booking_time}
                                    className="w-full flex justify-between items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer enabled:hover:bg-gray-100"
                                >
                                    <span className={cn("truncate", form.service_boy_id ? "text-gray-800" : "text-gray-400")}>
                                        {form.service_boy_id
                                            ? (availableServiceBoys.find((b) => b.user_id === form.service_boy_id)?.name ?? `Boy #${form.service_boy_id}`)
                                            : t("bookings.manageBookingDetails.selectServiceBoy")
                                        }
                                    </span>
                                    <ChevronDown className={cn("size-4 text-gray-400 transition-transform", isServiceBoyDropdownOpen && "rotate-180")} />
                                </button>
                                {isServiceBoyDropdownOpen && (
                                    <>
                                        {availableServiceBoys.length === 0 ? (
                                            <div className="absolute z-50 w-full mt-1 rounded-xl border bg-white shadow-lg p-4 text-center text-sm text-gray-400">
                                                {slotsLoading ? t("bookings.manageBookingDetails.loadingServiceBoys") : t("bookings.manageBookingDetails.noServiceBoys")}
                                            </div>
                                        ) : (
                                            <div className="absolute z-50 w-full mt-1 rounded-xl border bg-white shadow-lg max-h-60 overflow-auto">
                                                {availableServiceBoys.map((boy, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => {
                                                            updateField("service_boy_id", boy.user_id);
                                                            setIsServiceBoyDropdownOpen(false);
                                                        }}
                                                        className={cn(
                                                            "w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-sm",
                                                            form.service_boy_id === boy.user_id && "bg-green-50 text-green-700 font-medium"
                                                        )}
                                                    >
                                                        {boy.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* ── Status ── */}
                <SectionCard title={t("bookings.manageBookingDetails.statusSection")} icon={<Truck className="size-5" />}>
                    <div className="space-y-5">
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-2 block">
                                {t("bookings.manageBookingDetails.bookingStatus")}
                                {form.status && (
                                    <span className={cn("ml-2 text-xs px-2 py-0.5 rounded-md border", BOOKING_STATUS[form.status]?.color)}>
                                        {BOOKING_STATUS[form.status]?.label}
                                    </span>
                                )}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(BOOKING_STATUS).map(([key, { label, color }]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => updateField("status", key)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                                            form.status === key
                                                ? `${color} ring-2 ring-offset-1 ring-current`
                                                : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Booking Type */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-2 block">
                                {t("bookings.manageBookingDetails.bookingTypeLabel")}
                                {BOOKING_TYPE[form.booking_type] && (
                                    <span className={cn("ml-2 text-xs px-2 py-0.5 rounded-md border", BOOKING_TYPE[form.booking_type]?.color)}>
                                        {BOOKING_TYPE[form.booking_type]?.label}
                                    </span>
                                )}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(BOOKING_TYPE).map(([key, { label, color }]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => updateField("booking_type", Number(key))}
                                        className={cn(
                                            "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                                            form.booking_type === Number(key)
                                                ? `${color} ring-2 ring-offset-1 ring-current`
                                                : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-2 block">
                                Driver Status
                                {form.driver_status && (
                                    <span className={cn("ml-2 text-xs px-2 py-0.5 rounded-md border", DRIVER_STATUS[form.driver_status]?.color)}>
                                        {DRIVER_STATUS[form.driver_status]?.label}
                                    </span>
                                )}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(DRIVER_STATUS).map(([key, { label, color }]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => updateField("driver_status", key)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                                            form.driver_status === key
                                                ? `${color} ring-2 ring-offset-1 ring-current`
                                                : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* ── Location ── */}
                <SectionCard title={t("bookings.manageBookingDetails.locationSection")} icon={<MapPin className="size-5" />}>
                    <div className="space-y-4">
                        {/* Location dropdown from user saved addresses */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                                {t("bookings.manageBookingDetails.savedLocations")}
                                {isLoadingLocations && <span className="ml-2 text-xs text-gray-400">{t("bookings.manageBookingDetails.loadingLocations")}</span>}
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    disabled={(!Array.isArray(userLocations) || userLocations.length === 0) && !isLoadingLocations}
                                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                                    className={cn(
                                        "w-full flex justify-between items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium transition-all",
                                        Array.isArray(userLocations) && userLocations.length > 0 ? "cursor-pointer hover:bg-gray-100" : "cursor-not-allowed opacity-60"
                                    )}
                                >
                                    <span className="text-gray-500 truncate">
                                        {isLoadingLocations
                                            ? t("bookings.manageBookingDetails.loadingUserLocations")
                                            : !Array.isArray(userLocations) || userLocations.length === 0
                                                ? t("bookings.manageBookingDetails.noSavedLocations")
                                                : t("bookings.manageBookingDetails.selectSavedLocation")
                                        }
                                    </span>
                                    <ChevronDown className={cn("size-4 text-gray-400 transition-transform", isLocationDropdownOpen && "rotate-180")} />
                                </button>
                                {isLocationDropdownOpen && Array.isArray(userLocations) && userLocations.length > 0 && (
                                    <div className="absolute z-50 w-full mt-1 rounded-xl border bg-white shadow-lg max-h-60 overflow-auto">
                                        {userLocations.map((loc: any, idx: number) => {
                                            const locName = loc.location ?? loc.address_loc ?? loc.address ?? "";
                                            const locLat = loc.latitude ?? loc.lat ?? "";
                                            const locLon = loc.longitude ?? loc.lon ?? "";
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => {
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            address_loc: locName,
                                                            lat: String(locLat),
                                                            lon: String(locLon),
                                                        }));
                                                        setIsLocationDropdownOpen(false);
                                                    }}
                                                    className={cn(
                                                        "w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-sm",
                                                        form.address_loc === locName && "bg-green-50 text-green-700 font-medium"
                                                    )}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <MapPin className="size-3.5 text-gray-400 shrink-0" />
                                                        {locName}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">{t("bookings.manageBookingDetails.address")}</label>
                            <Input
                                value={form.address_loc}
                                onChange={(e) => updateField("address_loc", e.target.value)}
                                placeholder={t("bookings.manageBookingDetails.enterAddress")}
                                className="border-gray-200 bg-gray-50 rounded-xl py-3 focus:border-primary"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 mb-1.5 block">{t("bookings.manageBookingDetails.latitude")}</label>
                                <Input
                                    value={form.lat}
                                    onChange={(e) => updateField("lat", e.target.value)}
                                    placeholder={t("bookings.manageBookingDetails.latPlaceholder")}
                                    className="border-gray-200 bg-gray-50 rounded-xl py-3"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 mb-1.5 block">{t("bookings.manageBookingDetails.longitude")}</label>
                                <Input
                                    value={form.lon}
                                    onChange={(e) => updateField("lon", e.target.value)}
                                    placeholder={t("bookings.manageBookingDetails.lonPlaceholder")}
                                    className="border-gray-200 bg-gray-50 rounded-xl py-3"
                                />
                            </div>
                        </div>
                        {(form.lat || booking?.lat || booking?.latitude) && (form.lon || booking?.lon || booking?.longitude) && (
                            <a
                                href={`https://www.google.com/maps?q=${form.lat || booking?.lat || booking?.latitude},${form.lon || booking?.lon || booking?.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-all"
                            >
                                <ExternalLink className="size-4" />
                                {t("bookings.manageBookingDetails.viewOnGoogleMaps")}
                            </a>
                        )}
                    </div>
                </SectionCard>

                {/* ── Main Service + Extras ── */}
                <SectionCard title={t("bookings.manageBookingDetails.servicesSection")} icon={<Package className="size-5" />}>
                    <div className="space-y-5">
                        {/* Main Service Dropdown */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">{t("bookings.manageBookingDetails.mainService")}</label>
                            {getServicesQuery.isLoading ? (
                                <div className="h-12 rounded-xl bg-gray-100 animate-pulse" />
                            ) : (
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                                        className="w-full flex justify-between items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-all"
                                    >
                                        <span className={cn("truncate", form.main_service ? "text-gray-800" : "text-gray-400")}>
                                            {selectedServiceObj
                                                ? selectedServiceObj.service_name?.[0]
                                                : form.main_service
                                                    ? `Service #${form.main_service}`
                                                    : t("bookings.manageBookingDetails.selectService")
                                            }
                                        </span>
                                        <ChevronDown className={cn("size-4 text-gray-400 transition-transform", isServiceDropdownOpen && "rotate-180")} />
                                    </button>
                                    {isServiceDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-1 rounded-xl border bg-white shadow-lg max-h-60 overflow-auto">
                                            {allServices.length === 0 ? (
                                                <div className="w-full h-20 flex justify-center items-center text-gray-300 text-sm">
                                                    {t("bookings.manageBookingDetails.noServices")}
                                                </div>
                                            ) : (
                                                allServices.map((svc) => (
                                                    <button
                                                        key={svc.service_id}
                                                        type="button"
                                                        onClick={() => {
                                                            updateField("main_service", svc.service_id);
                                                            setIsServiceDropdownOpen(false);
                                                        }}
                                                        className={cn(
                                                            "w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-sm",
                                                            form.main_service === svc.service_id && "bg-green-50 text-green-700 font-medium"
                                                        )}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span>{svc.service_name?.[0] || "Unknown"}</span>
                                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                                {svc.service_price && <span>EGP {svc.service_price}</span>}
                                                                {svc.service_time && <span>{svc.service_time} min</span>}
                                                            </div>
                                                        </div>
                                                        {svc.service_name?.[1] && (
                                                            <p className="text-xs text-gray-400 mt-0.5" dir="rtl">{svc.service_name[1]}</p>
                                                        )}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Extra Services */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-2 block">{t("bookings.manageBookingDetails.extraServices")}</label>

                            {form.extra_services.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {form.extra_services.map((s) => (
                                        <div
                                            key={s.id}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-green-400 bg-green-50 text-sm font-medium text-gray-800"
                                        >
                                            <span>{s.name}</span>
                                            <span className="text-xs text-green-600 font-semibold">&times;{s.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExtra(s.id)}
                                                className="ml-1 text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {form.extra_services.length === 0 && bookingExtraServices && bookingExtraServices.length === 0 && (
                                <p className="text-xs text-gray-400 mb-2">{t("bookings.manageBookingDetails.noExtraServicesOnBooking")}</p>
                            )}

                            <button
                                type="button"
                                onClick={() => setIsExtraModalOpen(true)}
                                disabled={availableExtras.length === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                {availableExtras.length === 0
                                    ? form.main_service ? t("bookings.manageBookingDetails.noExtrasForService") : t("bookings.manageBookingDetails.selectServiceFirst")
                                    : t("bookings.manageBookingDetails.addEditExtraServices")
                                }
                            </button>
                        </div>
                    </div>
                </SectionCard>

                {/* ── Payment ── */}
                <SectionCard title={t("bookings.manageBookingDetails.paymentSection")} icon={<CreditCard className="size-5" />}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">{t("bookings.manageBookingDetails.couponAmount")}</label>
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.coupan_amount}
                                onChange={(e) => updateField("coupan_amount", e.target.value)}
                                placeholder="0.00"
                                className="border-gray-200 bg-gray-50 rounded-xl py-3"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">{t("bookings.manageBookingDetails.walletAmount")}</label>
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.wallet_amount}
                                onChange={(e) => updateField("wallet_amount", e.target.value)}
                                placeholder="0.00"
                                className="border-gray-200 bg-gray-50 rounded-xl py-3"
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* ── Admin Note ── */}
                <SectionCard title={t("bookings.manageBookingDetails.adminNoteSection")} icon={<FileText className="size-5" />} fullWidth>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1.5 block">{t("bookings.manageBookingDetails.note")}</label>
                        <Textarea
                            value={form.booking_admin_note}
                            onChange={(e) => updateField("booking_admin_note", e.target.value)}
                            placeholder={t("bookings.manageBookingDetails.addNotes")}
                            className="border-gray-200 bg-gray-50 rounded-xl resize-none min-h-[120px]"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1.5 block">{t("bookings.manageBookingDetails.note")}</label>
                        <Textarea
                            value={form.note}
                            onChange={(e) => updateField("note", e.target.value)}
                            placeholder={t("bookings.manageBookingDetails.addNotes")}
                            className="border-gray-200 bg-gray-50 rounded-xl resize-none min-h-[120px]"
                        />
                    </div>
                </SectionCard>
            </div>

            {/* ══════════════ Tables ══════════════ */}

            {/* Booking Vehicle */}
            {booking.vehicle && (
                <SectionCard title={t("bookings.manageBookingDetails.bookingVehicle")} icon={<Wrench className="size-5" />} fullWidth>
                    <CustomTable
                        columns={vehicleColumns}
                        data={[booking.vehicle]}
                        currentPage={1}
                        totalPages={1}
                        totalEntries={1}
                        pageSize={10}
                        onPageChange={() => { }}
                        isLoading={false}
                    />
                </SectionCard>
            )}

            {/* All User Vehicles */}
            {Array.isArray(userVehicles) && userVehicles.length > 0 && (
                <SectionCard title={t("bookings.manageBookingDetails.allCustomerVehicles", { count: userVehicles.length })} icon={<Wrench className="size-5" />} fullWidth>
                    <CustomTable
                        columns={vehicleColumns}
                        data={userVehicles}
                        currentPage={1}
                        totalPages={1}
                        totalEntries={userVehicles.length}
                        pageSize={10}
                        onPageChange={() => { }}
                        isLoading={isLoadingVehicles}
                    />
                </SectionCard>
            )}

            {/* Service Boy */}
            {booking.service_boy && (
                <SectionCard title={t("bookings.manageBookingDetails.serviceBoySection")} icon={<Truck className="size-5" />} fullWidth>
                    <CustomTable
                        columns={serviceBoyColumns}
                        data={[booking.service_boy]}
                        currentPage={1}
                        totalPages={1}
                        totalEntries={1}
                        pageSize={10}
                        onPageChange={() => { }}
                        isLoading={false}
                    />
                </SectionCard>
            )}

            {/* ══════════════ Service Boy Status Progress ══════════════ */}
            {form.service_boy_status && (
                <SectionCard title={t("bookings.manageBookingDetails.serviceBoyProgress")} icon={<Truck className="size-5" />} fullWidth>
                    {(() => {
                        const steps = [
                            { key: "on_the_way", label: t("bookings.manageBookingDetails.serviceBoyStatusLabels.onTheWay") },
                            { key: "arrived", label: t("bookings.manageBookingDetails.serviceBoyStatusLabels.arrived") },
                            { key: "washing", label: t("bookings.manageBookingDetails.serviceBoyStatusLabels.washing") },
                            { key: "completed", label: t("bookings.manageBookingDetails.serviceBoyStatusLabels.completed") },
                            { key: "payment_collected", label: t("bookings.manageBookingDetails.serviceBoyStatusLabels.paymentCollected") },
                        ];
                        const total = steps.length;
                        const active = steps.filter((s) => {
                            const item = form.service_boy_status?.[s.key as keyof ServiceBoyStatus] as ServiceBoyStatusItem | undefined;
                            return item?.status;
                        }).length;
                        const pct = Math.round((active / total) * 100);
                        return (
                            <>
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-600">{t("bookings.manageBookingDetails.serviceBoyProgress")}</span>
                                        <span className="text-sm font-bold text-gray-800">{pct}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500 ease-out"
                                            style={{
                                                width: `${pct}%`,
                                                background: pct === 100
                                                    ? "linear-gradient(90deg, #22c55e, #16a34a)"
                                                    : "linear-gradient(90deg, #3b82f6, #22c55e)",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                    {steps.map(({ key, label }, idx) => {
                                        const item = form.service_boy_status?.[key as keyof ServiceBoyStatus] as ServiceBoyStatusItem | undefined;
                                        const isActive = item?.status ?? false;
                                        const datetime = item?.datetime;
                                        return (
                                            <div
                                                key={key}
                                                className="flex flex-col items-center text-center p-3 rounded-xl border bg-gray-50"
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 transition-colors",
                                                    isActive
                                                        ? "bg-green-500 border-green-500 text-white"
                                                        : "bg-white border-gray-300 text-gray-400"
                                                )}>
                                                    {isActive ? <Check className="w-5 h-5" /> : <div className="w-3 h-3 rounded-full bg-gray-300" />}
                                                </div>
                                                <p className={cn("text-xs font-semibold", isActive ? "text-green-700" : "text-gray-500")}>{label}</p>
                                                {datetime && <p className="text-[10px] text-gray-400 mt-1 leading-tight">{datetime}</p>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        );
                    })()}
                </SectionCard>
            )}

            {/* ══════════════ Booking Logs Modal ══════════════ */}
            {isLogsModalOpen && (
                <BookingLogsModal
                    isOpen={isLogsModalOpen}
                    onClose={() => setIsLogsModalOpen(false)}
                    bookingId={id!}
                    fieldLabels={{
                        status: Object.fromEntries(
                            Object.entries(BOOKING_STATUS).map(([k, v]) => [k, v.label])
                        ),
                        booking_type: Object.fromEntries(
                            Object.entries(BOOKING_TYPE).map(([k, v]) => [String(k), v.label])
                        ),
                        driver_status: Object.fromEntries(
                            Object.entries(DRIVER_STATUS).map(([k, v]) => [k, v.label])
                        ),
                    }}
                />
            )}

            {/* ══════════════ Extra Service Modal ══════════════ */}
            {isExtraModalOpen && (
                <ExtraServiceModal
                    onClose={() => setIsExtraModalOpen(false)}
                    availableExtras={availableExtras}
                    selectedExtras={form.extra_services}
                    onConfirm={(updated) => updateField("extra_services", updated)}
                />
            )}

            {/* ══════════════ Sticky Save Bar ══════════════ */}
            {hasChanges && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <p className="text-sm text-gray-600">{t("bookings.manageBookingDetails.unsavedChanges")}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { if (initialForm) setForm(initialForm); }}
                                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all"
                            >
                                {t("bookings.manageBookingDetails.discard")}
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isUpdating}
                                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-secondary-900 font-semibold text-sm hover:bg-primary-600 transition-all shadow-sm"
                            >
                                {isUpdating ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                                {isUpdating ? t("bookings.manageBookingDetails.saving") : t("bookings.manageBookingDetails.saveChanges")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ─── Helper Components ─── */

function InfoCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={cn(
            "rounded-xl border p-4",
            highlight ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100"
        )}>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={cn("text-sm font-semibold", highlight ? "text-green-700" : "text-gray-800")}>{value}</p>
        </div>
    );
}

function SectionCard({ title, icon, children, fullWidth = false }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    fullWidth?: boolean;
}) {
    return (
        <div className={cn("bg-white shadow-md rounded-2xl p-5 md:p-6", fullWidth && "col-span-full")}>
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
                <span className="text-gray-600">{icon}</span>
                <h2 className="text-lg font-bold text-secondary-900">{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default ManageBookingDetails;
