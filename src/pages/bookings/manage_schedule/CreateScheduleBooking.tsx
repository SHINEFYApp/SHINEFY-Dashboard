import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    User, Hash, MapPin, Car, UserX,
    Package, Wrench, CalendarDays, CheckCircle2,
    ChevronLeft, ChevronRight, Repeat2, ListChecks,
    Clock,
} from "lucide-react";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import {
    format, addMonths, startOfMonth, endOfMonth,
    eachDayOfInterval, getDay, isBefore, startOfDay, addDays,
} from "date-fns";
import { Formik, Form } from "formik";
import { cn } from "../../../utils/utils";
import { useGet } from "../../../api/useGetData.tsx";
import { getServices } from "../../../api/features/bookings";
import { useCreateSchedule } from "../../../api/features/scheduleBookings.hooks";
import { usePost } from "../../../api/usePostData";
import { SkeletonDemo } from "../../../common/loader";
import { FormInput } from "../../../common/FormInput";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormTimeSlots } from "../../../common/FormTimeSlots";
import { DropDownToSendObject } from "../../../common/DropDownToSendObject ";
import { FormSelectedVehicles } from "../../../components/booking/tabs/services/SelectedVehicles";
import { VehicleSelectionModal } from "../../../components/booking/tabs/services/VehicleSelectionModal";
import type { CreateSchedulePayload } from "../../../api/features/scheduleBookings";
import type { Vehicle } from "../../../types/bookings";

// ─── Constants ───────────────────────────────────────────────────────────────

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STEPS = [
    { id: 1, label: "Client & Date", icon: <User className="w-4 h-4" /> },
    { id: 2, label: "Service", icon: <Wrench className="w-4 h-4" /> },
    { id: 3, label: "Schedule", icon: <CalendarDays className="w-4 h-4" /> },
    { id: 4, label: "Confirm", icon: <CheckCircle2 className="w-4 h-4" /> },
];

// ─── Multi-select Calendar ────────────────────────────────────────────────────

function MultiCalendar({ selected, onChange }: { selected: string[]; onChange: (d: string[]) => void }) {
    const [viewMonth, setViewMonth] = useState(new Date());
    const today = startOfDay(new Date());
    const days = eachDayOfInterval({ start: startOfMonth(viewMonth), end: endOfMonth(viewMonth) });
    const firstDow = getDay(startOfMonth(viewMonth));

    const toggle = (date: Date) => {
        if (isBefore(date, today)) return;
        const key = format(date, "yyyy-MM-dd");
        onChange(selected.includes(key) ? selected.filter((d) => d !== key) : [...selected, key].sort());
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => setViewMonth(addMonths(viewMonth, -1))} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-gray-800">{format(viewMonth, "MMMM yyyy")}</span>
                <button onClick={() => setViewMonth(addMonths(viewMonth, 1))} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-7 mb-2">
                {DAY_NAMES.map((d) => <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
                {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}
                {days.map((day) => {
                    const key = format(day, "yyyy-MM-dd");
                    const isPast = isBefore(day, today);
                    const isSel = selected.includes(key);
                    return (
                        <button key={key} onClick={() => toggle(day)} disabled={isPast}
                            className={cn("w-9 h-9 mx-auto rounded-full text-xs font-medium transition-all",
                                isPast && "text-gray-300 cursor-not-allowed",
                                !isPast && !isSel && "text-gray-700 hover:bg-primary/10",
                                isSel && "bg-primary text-black shadow-sm font-bold"
                            )}>{format(day, "d")}</button>
                    );
                })}
            </div>
            {selected.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{selected.length} date{selected.length > 1 ? "s" : ""} selected</span>
                    <button onClick={() => onChange([])} className="text-xs text-red-400 hover:text-red-600 transition-colors">Clear all</button>
                </div>
            )}
        </div>
    );
}

// ─── Step Header ─────────────────────────────────────────────────────────────

function StepHeader({ current }: { current: number }) {
    return (
        <div className="flex items-center gap-0 mb-10">
            {STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                            current === step.id ? "bg-primary text-black shadow-lg shadow-primary/30 scale-110" :
                            current > step.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
                        )}>
                            {current > step.id ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                        </div>
                        <span className={cn("text-xs font-medium whitespace-nowrap",
                            current === step.id ? "text-gray-800" : current > step.id ? "text-green-600" : "text-gray-400"
                        )}>{step.label}</span>
                    </div>
                    {idx < STEPS.length - 1 && (
                        <div className={cn("flex-1 h-0.5 mx-2 mb-6 rounded-full transition-all duration-300",
                            current > step.id ? "bg-green-400" : "bg-gray-200"
                        )} />
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function CreateScheduleBooking() {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_URL;
    const [step, setStep] = useState(1);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
    const lastRequestedPhone = useRef<string | null>(null);

    // ── User data ──
    const [userInfo, setUserInfo] = useState<any>(null);
    const [clientNotFound, setClientNotFound] = useState(false);
    const [locations, setLocations] = useState<any[]>([]);
    const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
    const [userPackages, setUserPackages] = useState<any[]>([]);

    // ── Step 1 form state ──
    const [step1, setStep1] = useState({ phoneNumber: "", address: null as any, vehicles: [] as Vehicle[], bookingDate: "" });

    // ── Step 2 state ──
    const [scheduleType, setScheduleType] = useState<"normal" | "package">("normal");
    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedExtraService, setSelectedExtraService] = useState<any>(null);
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [selectedPackageService, setSelectedPackageService] = useState<any>(null);

    // ── Step 3 state ──
    const [dateMode, setDateMode] = useState<"specific" | "recurring">("specific");
    const [specificDates, setSpecificDates] = useState<string[]>([]);
    const [recurrenceDays, setRecurrenceDays] = useState<number[]>([]);
    const [recurrenceStart, setRecurrenceStart] = useState("");
    const [recurrenceEnd, setRecurrenceEnd] = useState("");
    const [infiniteStartDate, setInfiniteStartDate] = useState("");

    // ── Step 4 state ──
    const [bookingTime, setBookingTime] = useState("");

    // ── Services data ──
    const { data: servicesData } = useGet<any>({
        queryKey: ["schedule-services-list"],
        queryFn: () => getServices(`${baseURL}/api/get_service/`),
        options: { staleTime: 1000 * 60 * 5 },
    });

    const allServices = servicesData?.all_service_arr?.sorted_main_services ?? [];
    const allExtras   = servicesData?.all_service_arr?.sorted_extra_services ?? [];

    // ── User lookup ──
    const { mutate: lookupUser, isPending: lookingUp } = usePost<any, any>({
        route: `${baseURL}/api/book/user-details`,
        options: {
            onSuccess: (data) => {
                const info = data?.data?.user_info;
                if (!info) { toast.error("User not found"); setClientNotFound(true); return; }
                setUserInfo(info);
                setLocations(data?.data?.locations ?? []);
                setVehiclesData(data?.data?.vehicles ?? []);
                setUserPackages((data?.data?.packages ?? []).filter((p: any) => p.status === "active"));
                setClientNotFound(false);
            },
            onError: () => { setClientNotFound(true); setUserInfo(null); },
        },
    });

    const handlePhoneBlur = (phone: string) => {
        if (!phone) return;
        const clean = phone.replace(/\D/g, "");
        if (clean === lastRequestedPhone.current) return;
        lastRequestedPhone.current = clean;
        lookupUser({ phone_number: clean });
    };

    // ── Service time for slots ──
    const mainServiceTime = useMemo(() => {
        if (scheduleType === "package") return selectedPackageService?.service_time ?? 0;
        return selectedService?.service_time ?? 0;
    }, [scheduleType, selectedService, selectedPackageService]);

    const extraServiceTime = selectedExtraService?.extra_service_time ?? 0;
    const totalServiceTime = mainServiceTime + extraServiceTime;

    // ── Recurring count preview ──
    const recurringCount = useMemo(() => {
        if (!recurrenceStart || !recurrenceEnd || recurrenceDays.length === 0) return 0;
        const start = startOfDay(new Date(recurrenceStart));
        const end   = startOfDay(new Date(recurrenceEnd));
        if (isBefore(end, start)) return 0;
        let count = 0, cur = start;
        while (!isBefore(end, cur)) { if (recurrenceDays.includes(getDay(cur))) count++; cur = addDays(cur, 1); }
        return count;
    }, [recurrenceStart, recurrenceEnd, recurrenceDays]);

    // ── Validation ──
    const canProceed = (): boolean => {
        if (step === 1) return !!userInfo && !!step1.bookingDate;
        if (step === 2) return scheduleType === "normal" ? !!selectedService : !!selectedPackage;
        if (step === 3) {
            if (isInfinitePackage) return !!infiniteStartDate;
            if (dateMode === "specific") return specificDates.length > 0;
            return recurrenceDays.length > 0 && !!recurrenceStart && !!recurrenceEnd;
        }
        return true;
    };

    // ── Package services ──
    const activePackages = useMemo(() =>
        userPackages.filter((p: any) => p.status === "active"),
        [userPackages]
    );
    const packageMainServices = useMemo(() => {
        if (!selectedPackage) return [];
        return (selectedPackage.all_main_services ?? []).filter((s: any) => s.remind_quantity > 0);
    }, [selectedPackage]);

    const isInfinitePackage = useMemo(() =>
        scheduleType === "package" && selectedPackage?.package?.is_infinite == 1,
        [scheduleType, selectedPackage]
    );

    // ── Submit ──
    const { mutate: createSchedule, isPending: creating } = useCreateSchedule({
        onSuccess: (res: any) => {
            toast.success(`Schedule created! ${res?.data?.bookings_created ?? ""} bookings generated.`);
            navigate("/bookings/schedules");
        },
        onError: (err: any) => toast.error(err?.response?.data?.message ?? "Failed to create schedule"),
    });

    const handleSubmit = () => {
        const serviceId = scheduleType === "normal"
            ? selectedService?.service_id
            : selectedPackageService?.service_id ?? selectedPackageService?.main_services?.service_id;

        const resolvedDateMode = isInfinitePackage ? "auto" : dateMode;

        const payload: CreateSchedulePayload = {
            schedule_type: scheduleType,
            date_mode: resolvedDateMode,
            user_id: userInfo.user_id,
            vehicle_id: step1.vehicles[0]?.vehicle_id ?? 0,
            booking_time: bookingTime || undefined,
            address_loc: step1.address?.user_address_name || step1.address?.address || undefined,
            lat: step1.address?.latitude ? String(step1.address.latitude) : undefined,
            lon: step1.address?.longitude ? String(step1.address.longitude) : undefined,
        };

        if (scheduleType === "normal") {
            payload.service_id = serviceId;
            if (selectedExtraService) payload.extra_service_id = selectedExtraService.extra_service_id;
        } else {
            payload.user_package_id = selectedPackage?.id;
            payload.service_id = serviceId;
        }

        if (isInfinitePackage) {
            payload.recurrence_start = infiniteStartDate;
        } else if (dateMode === "specific") {
            payload.dates = specificDates;
        } else {
            payload.recurrence_days = recurrenceDays;
            payload.recurrence_start = recurrenceStart;
            payload.recurrence_end = recurrenceEnd;
        }

        createSchedule(payload);
    };

    const isPending = lookingUp;

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate("/bookings/schedules")}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back to Schedules
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Create Schedule Booking</h1>
                        <p className="text-sm text-gray-500 mt-1">Set up recurring bookings for a client</p>
                    </div>

                    <StepHeader current={step} />

                    {/* ══════════════ STEP 1: Client & Date ══════════════ */}
                    {step === 1 && (
                        <main className="relative">
                            {isPending && <div className="h-full w-full absolute top-0 left-0 z-50 bg-white"><SkeletonDemo quantity={10} /></div>}

                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Client Information</h2>

                            {/* User found card */}
                            {userInfo && (
                                <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4 animate-slide-up">
                                    <div className="shrink-0 w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                                        <User className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-green-800 mb-1">Client Found</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                            {[
                                                { icon: <User className="w-4 h-4 text-green-500" />, label: "Name", value: userInfo.name },
                                                { icon: <Hash className="w-4 h-4 text-green-500" />, label: "User ID", value: `#${userInfo.user_id}` },
                                                { icon: <MapPin className="w-4 h-4 text-green-500" />, label: "Locations", value: locations?.length ?? 0 },
                                                { icon: <Car className="w-4 h-4 text-green-500" />, label: "Vehicles", value: vehiclesData?.length ?? 0 },
                                            ].map((item) => (
                                                <div key={item.label} className="flex items-center gap-2">
                                                    {item.icon}
                                                    <div>
                                                        <p className="text-xs text-green-500">{item.label}</p>
                                                        <p className="text-sm font-medium text-gray-800">{item.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Not found card */}
                            {clientNotFound && !userInfo && (
                                <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 flex items-center gap-4 animate-slide-up">
                                    <div className="shrink-0 w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
                                        <UserX className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-red-700">Client Not Found</p>
                                        <p className="text-xs text-red-400 mt-0.5">No account linked to this number</p>
                                    </div>
                                </div>
                            )}

                            <Formik
                                initialValues={step1}
                                onSubmit={(values) => { setStep1(values as any); setStep(2); }}
                                enableReinitialize
                            >
                                {({ setFieldValue, values }) => (
                                    <Form>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <FormInput
                                                name="phoneNumber"
                                                label="Client Phone Number"
                                                placeholder="Enter phone number"
                                                type="tel"
                                                icon={<IoCallOutline className="w-5 h-5" />}
                                                onBlur={handlePhoneBlur}
                                            />
                                            <div className="mt-2">
                                                <DropDownToSendObject
                                                    name="address"
                                                    label="Address"
                                                    placeholder="Select client address"
                                                    icon={<IoLocationOutline className="w-5 h-5" />}
                                                    options={locations}
                                                    extraKey="user_address_name"
                                                    setFormData={setStep1 as any}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <FormSelectedVehicles
                                                name="vehicles"
                                                label="Select Vehicles"
                                                onAddClick={() => setIsVehicleModalOpen(true)}
                                            />
                                        </div>

                                        <div className="mb-8 md:w-1/2">
                                            <FormDatePicker
                                                name="bookingDate"
                                                label="Booking Date (used for time slots)"
                                                icon={<CalendarDays className="w-5 h-5" />}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <button type="button" onClick={() => navigate("/bookings/schedules")}
                                                className="flex-1 md:flex-none md:px-16 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                                                Cancel
                                            </button>
                                            <button type="submit" disabled={!userInfo || !values.bookingDate}
                                                className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-gray-900 font-bold px-16 py-4 rounded-xl text-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                                Next
                                            </button>
                                        </div>

                                        {isVehicleModalOpen && (
                                            <VehicleSelectionModal
                                                isOpen={isVehicleModalOpen}
                                                onClose={() => setIsVehicleModalOpen(false)}
                                                selectedVehicles={values.vehicles}
                                                setSelectedVehicles={(v) => { setFieldValue("vehicles", v); setStep1((s) => ({ ...s, vehicles: v })); }}
                                                dummyDataVehicles={vehiclesData}
                                                isSuccess={!!userInfo}
                                            />
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </main>
                    )}

                    {/* ══════════════ STEP 2: Service / Package ══════════════ */}
                    {step === 2 && (
                        <main>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Choose Booking Type</h2>

                            {/* Type toggle */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    { value: "normal", label: "Normal Service", icon: <Wrench className="w-5 h-5" />, desc: "Single service booking" },
                                    { value: "package", label: "Package", icon: <Package className="w-5 h-5" />, desc: activePackages.length === 0 ? "No active packages" : `${activePackages.length} active package(s)`, disabled: activePackages.length === 0 },
                                ].map((opt) => (
                                    <button key={opt.value} type="button"
                                        onClick={() => !opt.disabled && setScheduleType(opt.value as any)}
                                        disabled={opt.disabled as any}
                                        className={cn(
                                            "p-5 rounded-2xl border-2 text-left transition-all",
                                            scheduleType === opt.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300",
                                            opt.disabled && "opacity-40 cursor-not-allowed"
                                        )}>
                                        <div className={cn("mb-2", scheduleType === opt.value ? "text-primary" : "text-gray-400")}>{opt.icon}</div>
                                        <p className="font-bold text-sm text-gray-800">{opt.label}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                                    </button>
                                ))}
                            </div>

                            {/* Normal: service picker */}
                            {scheduleType === "normal" && (
                                <div className="space-y-6 mb-8">
                                    <div className="md:w-1/2">
                                        <label className="text-sm font-medium text-gray-700 block mb-2">Main Service *</label>
                                        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                                            {allServices.map((svc: any) => (
                                                <button key={svc.service_id} type="button"
                                                    onClick={() => { setSelectedService(svc); setSelectedExtraService(null); }}
                                                    className={cn(
                                                        "w-full flex items-center justify-between p-3.5 rounded-xl border text-sm text-left transition-all",
                                                        selectedService?.service_id === svc.service_id ? "border-primary bg-primary/5 font-semibold" : "border-gray-200 hover:border-gray-300"
                                                    )}>
                                                    <span>{svc.service_name}</span>
                                                    {svc.service_price && <span className="text-xs text-gray-400 font-normal">SAR {svc.service_price}</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Extra service */}
                                    {selectedService && allExtras.length > 0 && (
                                        <div className="md:w-1/2">
                                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                                Extra Service <span className="text-gray-400 font-normal">(optional)</span>
                                            </label>
                                            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                                <button type="button" onClick={() => setSelectedExtraService(null)}
                                                    className={cn("w-full p-3 rounded-xl border text-sm text-left transition-all",
                                                        !selectedExtraService ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                                                    )}>
                                                    <span className="text-gray-500">None</span>
                                                </button>
                                                {allExtras.map((es: any) => (
                                                    <button key={es.extra_service_id} type="button"
                                                        onClick={() => setSelectedExtraService(es)}
                                                        className={cn("w-full flex items-center justify-between p-3.5 rounded-xl border text-sm text-left transition-all",
                                                            selectedExtraService?.extra_service_id === es.extra_service_id ? "border-primary bg-primary/5 font-semibold" : "border-gray-200 hover:border-gray-300"
                                                        )}>
                                                        <span>{es.extra_service_name}</span>
                                                        {es.extra_service_price && <span className="text-xs text-gray-400 font-normal">SAR {es.extra_service_price}</span>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Package: picker */}
                            {scheduleType === "package" && (
                                <div className="space-y-6 mb-8">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-2">Active Package *</label>
                                        <div className="space-y-3">
                                            {activePackages.map((pkg: any) => (
                                                <button key={pkg.id} type="button"
                                                    onClick={() => { setSelectedPackage(pkg); setSelectedPackageService(null); }}
                                                    className={cn("w-full p-4 rounded-2xl border-2 text-left transition-all",
                                                        selectedPackage?.id === pkg.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                                                    )}>
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="font-bold text-sm text-gray-800">{pkg.package?.name ?? `Package #${pkg.id}`}</p>
                                                            {pkg.available_to && <p className="text-xs text-gray-400 mt-0.5">Expires: {pkg.available_to}</p>}
                                                        </div>
                                                        {pkg.remind_used != null && (
                                                            <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-1 font-semibold">
                                                                {pkg.remind_used} left
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedPackage && packageMainServices.length > 0 && (
                                        <div className="md:w-1/2">
                                            <label className="text-sm font-medium text-gray-700 block mb-2">Service from Package *</label>
                                            <div className="space-y-2">
                                                {packageMainServices.map((s: any) => {
                                                    const svcName = s.main_services?.service_name ?? s.service_name ?? "Service";
                                                    return (
                                                        <button key={s.service_id ?? s.id} type="button"
                                                            onClick={() => setSelectedPackageService(s)}
                                                            className={cn("w-full flex items-center justify-between p-3.5 rounded-xl border text-sm text-left transition-all",
                                                                selectedPackageService?.service_id === (s.service_id ?? s.id) ? "border-primary bg-primary/5 font-semibold" : "border-gray-200 hover:border-gray-300"
                                                            )}>
                                                            <span>{svcName}</span>
                                                            <span className="text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">{s.remind_quantity} left</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-4">
                                <button type="button" onClick={() => setStep(1)}
                                    className="flex-1 md:flex-none md:px-16 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                                    Back
                                </button>
                                <button type="button" onClick={() => setStep(3)} disabled={!canProceed()}
                                    className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-gray-900 font-bold px-16 py-4 rounded-xl text-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                    Next
                                </button>
                            </div>
                        </main>
                    )}

                    {/* ══════════════ STEP 3: Schedule dates ══════════════ */}
                    {step === 3 && (
                        <main>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Set Schedule</h2>

                            {/* ── Infinite package: auto-schedule ── */}
                            {isInfinitePackage ? (
                                <div className="mb-8 space-y-6">
                                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
                                        <Repeat2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-amber-800">Unlimited Package — Auto Schedule</p>
                                            <p className="text-xs text-amber-600 mt-1">
                                                The system will automatically generate bookings from your chosen start date
                                                until the package expires, respecting the fair-use interval and monthly quota.
                                            </p>
                                            {selectedPackage?.available_to && (
                                                <p className="text-xs text-amber-700 mt-1 font-medium">
                                                    Package expires: {selectedPackage.available_to}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="md:w-1/2">
                                        <label className="text-sm font-medium text-gray-700 block mb-1.5">First Booking Date *</label>
                                        <input type="date" value={infiniteStartDate}
                                            min={format(new Date(), "yyyy-MM-dd")}
                                            max={selectedPackage?.available_to || undefined}
                                            onChange={(e) => setInfiniteStartDate(e.target.value)}
                                            className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Mode toggle */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {[
                                            { value: "specific", label: "Specific Dates", icon: <ListChecks className="w-5 h-5" />, desc: "Pick exact dates manually" },
                                            { value: "recurring", label: "Recurring Pattern", icon: <Repeat2 className="w-5 h-5" />, desc: "Day(s) of week + date range" },
                                        ].map((opt) => (
                                            <button key={opt.value} type="button" onClick={() => setDateMode(opt.value as any)}
                                                className={cn("p-5 rounded-2xl border-2 text-left transition-all",
                                                    dateMode === opt.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                                                )}>
                                                <div className={cn("mb-2", dateMode === opt.value ? "text-primary" : "text-gray-400")}>{opt.icon}</div>
                                                <p className="font-bold text-sm text-gray-800">{opt.label}</p>
                                                <p className="text-xs text-gray-400">{opt.desc}</p>
                                            </button>
                                        ))}
                                    </div>

                                    {dateMode === "specific" && (
                                        <div className="mb-8">
                                            <MultiCalendar selected={specificDates} onChange={setSpecificDates} />
                                        </div>
                                    )}

                                    {dateMode === "recurring" && (
                                        <div className="mb-8 space-y-6">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 block mb-3">Days of Week *</label>
                                                <div className="flex gap-2 flex-wrap">
                                                    {DAY_NAMES.map((d, i) => (
                                                        <button key={d} type="button"
                                                            onClick={() => setRecurrenceDays((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])}
                                                            className={cn("w-12 h-12 rounded-full text-xs font-bold transition-all",
                                                                recurrenceDays.includes(i) ? "bg-primary text-black shadow-md shadow-primary/30" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                                            )}>{d}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Start Date *</label>
                                                    <input type="date" value={recurrenceStart} min={format(new Date(), "yyyy-MM-dd")}
                                                        onChange={(e) => setRecurrenceStart(e.target.value)}
                                                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50" />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">End Date *</label>
                                                    <input type="date" value={recurrenceEnd} min={recurrenceStart || format(new Date(), "yyyy-MM-dd")}
                                                        onChange={(e) => setRecurrenceEnd(e.target.value)}
                                                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50" />
                                                </div>
                                            </div>
                                            {recurringCount > 0 && (
                                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-2">
                                                    <CalendarDays className="w-5 h-5 text-primary flex-shrink-0" />
                                                    <p className="text-sm text-gray-700">
                                                        This will generate <span className="font-bold text-primary">{recurringCount}</span> booking{recurringCount > 1 ? "s" : ""}
                                                        {scheduleType === "package" && <span className="text-gray-500"> (limited by package quantity)</span>}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="flex items-center justify-between gap-4">
                                <button type="button" onClick={() => setStep(2)}
                                    className="flex-1 md:flex-none md:px-16 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                                    Back
                                </button>
                                <button type="button" onClick={() => setStep(4)} disabled={!canProceed()}
                                    className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-gray-900 font-bold px-16 py-4 rounded-xl text-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                    Next
                                </button>
                            </div>
                        </main>
                    )}

                    {/* ══════════════ STEP 4: Confirm ══════════════ */}
                    {step === 4 && (
                        <Formik initialValues={{ bookingTime: "" }} onSubmit={() => {}}>
                        {() => (
                        <main>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Review & Confirm</h2>

                            {/* Time slot selector */}
                            <div className="mb-8">
                                <FormTimeSlots
                                    name="bookingTime"
                                    label="Select Time Slot (applies to all bookings)"
                                    icon={<Clock className="w-5 h-5" />}
                                    date={step1.bookingDate}
                                    serviceTime={totalServiceTime > 0 ? totalServiceTime : undefined}
                                    latitude={step1.address?.latitude}
                                    longitude={step1.address?.longitude}
                                    onSelect={(time) => setBookingTime(time)}
                                />
                            </div>

                            {/* Summary */}
                            <div className="bg-gray-50 rounded-2xl border border-gray-200 divide-y divide-gray-100 mb-8">
                                {[
                                    { label: "Client", value: userInfo?.name, sub: userInfo?.phone_number },
                                    { label: "Vehicles", value: step1.vehicles.length > 0 ? step1.vehicles.map((v: any) => v.vehicle_name || v.model).join(", ") : "Not selected" },
                                    { label: "Address", value: step1.address?.user_address_name ?? step1.address?.address ?? "Not selected" },
                                    { label: "Type", value: scheduleType === "package" ? "Package Booking" : "Normal Booking" },
                                    { label: "Service", value: scheduleType === "package" ? (selectedPackage?.package?.name ?? `Package #${selectedPackage?.id}`) : selectedService?.service_name },
                                    { label: "Schedule",
                                      value: isInfinitePackage
                                        ? `Auto — starts ${infiniteStartDate}`
                                        : dateMode === "specific"
                                          ? `${specificDates.length} specific date${specificDates.length > 1 ? "s" : ""}`
                                          : `Recurring — ${recurrenceDays.map((d) => DAY_NAMES[d]).join(", ")}`,
                                      sub: isInfinitePackage
                                        ? `Until package expiry: ${selectedPackage?.available_to ?? "—"}`
                                        : dateMode === "recurring"
                                          ? `${recurrenceStart} → ${recurrenceEnd}`
                                          : specificDates.slice(0, 3).join(", ") + (specificDates.length > 3 ? ` +${specificDates.length - 3} more` : "") },
                                    { label: "Payment", value: "Cash on delivery" },
                                    { label: "Service Boy", value: "Unassigned — assigned later" },
                                ].map((row) => (
                                    <div key={row.label} className="px-5 py-3.5 flex items-start justify-between gap-4">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex-shrink-0">{row.label}</span>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-800">{row.value ?? "—"}</p>
                                            {row.sub && <p className="text-xs text-gray-400 mt-0.5">{row.sub}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <button type="button" onClick={() => setStep(3)}
                                    className="flex-1 md:flex-none md:px-16 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                                    Back
                                </button>
                                <button type="button" onClick={handleSubmit} disabled={creating}
                                    className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-gray-900 font-bold px-16 py-4 rounded-xl text-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                    {creating ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                            Creating...
                                        </span>
                                    ) : "Create Schedule"}
                                </button>
                            </div>
                        </main>
                        )}
                        </Formik>
                    )}
                </div>
            </div>
        </div>
    );
}
