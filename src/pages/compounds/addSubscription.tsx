import { useState } from "react";
import { Formik, Form } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { FormDatePicker } from "../../common/FormDatePicker";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateSubscription, useGetCompoundPackages, useGetUserCars, useGetUserLocations, useGetCompounds } from "../../api/features/compounds.hooks";
import { previewSchedule } from "../../api/features/compounds";
import { Button } from "../../components/ui/button";
import { usePost } from "../../api/usePostData";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { User, Hash, MapPin, Car, UserX, Phone, CalendarDays, Loader2 } from "lucide-react";
import { SkeletonDemo } from "../../common/loader";
import { FormSelectedVehicles } from "../../components/booking/tabs/services/SelectedVehicles";
import { VehicleSelectionModal } from "../../components/booking/tabs/services/VehicleSelectionModal";

const frequencyOptions = [
    { value: "1", label: "Daily" },
    { value: "2", label: "Every 2 Days" },
    { value: "3", label: "Every 3 Days" },
];
const shiftOptions = ["day", "night"];
const paymentMethodOptions = [
    { value: "0", label: "Wallet/Cash" },
    { value: "1", label: "Online" },
];

const AddCompoundSubscription = () => {
    const navigate = useNavigate();
    const [selectedCompoundId, setSelectedCompoundId] = useState<number | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [lastRequestedPhone, setLastRequestedPhone] = useState<string | null>(null);
    const [clientNotFound, setClientNotFound] = useState(false);
    const [userLookupData, setUserLookupData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewData, setPreviewData] = useState<any>(null);
    const baseURL = import.meta.env.VITE_API_URL;

    const { mutate: lookupUser, isPending: isLookingUp } = usePost<any, any>({
        route: `${baseURL}/api/book/user-details`,
        options: {
            onSuccess: (res: any) => {
                if (res?.data?.user_info) {
                    setUserLookupData(res.data);
                    setSelectedUserId(res.data.user_info.user_id);
                    setClientNotFound(false);
                }
            },
            onError: () => {
                setClientNotFound(true);
                setUserLookupData(null);
                setSelectedUserId(null);
            },
        },
    });

    const previewMutation = useMutation<any, AxiosError, any>({
        mutationFn: (data) => previewSchedule(data),
    });

    const handlePhoneBlur = (phone: string) => {
        if (!phone) return;
        const cleanPhone = phone.replace(/\D/g, "");
        if (cleanPhone === lastRequestedPhone) return;
        setLastRequestedPhone(cleanPhone);
        setClientNotFound(false);
        setUserLookupData(null);
        lookupUser({ phone_number: cleanPhone });
    };

    const { data: compoundsData } = useGetCompounds({ limit: 200 });
    const compoundsList = (compoundsData?.data?.data?.compounds || []) as any[];

    const { data: packagesData } = useGetCompoundPackages(selectedCompoundId!, {
        enabled: !!selectedCompoundId,
    });
    const packagesList = (packagesData?.data?.data?.packages || []) as any[];

    const { data: carsData } = useGetUserCars(selectedUserId!, {
        enabled: !!selectedUserId,
    });
    const carsList = (carsData?.data?.data?.cars || []) as any[];

    const { data: locationsData } = useGetUserLocations(selectedUserId!, {
        enabled: !!selectedUserId,
    });
    const locationsList = (locationsData?.data?.data?.locations || []) as any[];

    const createMutation = useCreateSubscription({
        onSuccess: () => {
            toast.success("Subscription created successfully");
            navigate("/compounds/subscriptions");
        },
        onError: () => toast.error("Failed to create subscription"),
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        if (!selectedUserId) {
            toast.error("Please look up a user by phone number first");
            setSubmitting(false);
            return;
        }
        const carIds = (values.vehicles || []).map((v: any) => Number(v.vehicle_id));
        const payload: any = {
            user_id: selectedUserId,
            compound_id: Number(values.compound_id),
            package_id: Number(values.package_id),
            car_ids: carIds.length > 0 ? carIds : [],
            latitude: Number(values.latitude),
            longitude: Number(values.longitude),
            address: values.address,
            frequency: Number(values.frequency),
            shift: values.shift,
            start_date: values.start_date,
        };
        if (values.location_id) payload.location_id = Number(values.location_id);
        if (values.payment_method) payload.payment_method = Number(values.payment_method);
        if (values.total_price) payload.total_price = Number(values.total_price);
        if (values.amount_paid) payload.amount_paid = Number(values.amount_paid);
        if (values.wallet_amount) payload.wallet_amount = Number(values.wallet_amount);

        try {
            await createMutation.mutateAsync(payload);
        } catch {
            // Error toast handled by mutation onError / axios interceptor
        }
        setSubmitting(false);
    };

    const handlePreview = (values: any) => {
        if (!selectedUserId || !values.compound_id || !values.package_id || !values.start_date) {
            toast.error("Please select user, compound, package, and start date first");
            return;
        }
        const carIds = (values.vehicles || []).map((v: any) => Number(v.vehicle_id));
        setPreviewData(null);
        previewMutation.mutate(
            {
                user_id: selectedUserId,
                compound_id: Number(values.compound_id),
                package_id: Number(values.package_id),
                car_ids: carIds.length > 0 ? carIds : [],
                frequency: Number(values.frequency),
                shift: values.shift,
                start_date: values.start_date,
            },
            {
                onSuccess: (res: any) => {
                    const body = res?.data;
                    if (!body) { setPreviewData([]); return; }
                    const raw = body?.data?.schedule ?? body?.schedule ?? [];
                    setPreviewData(Array.isArray(raw) ? raw : []);
                },
                onError: (err: any) => {
                    const msg = err?.response?.data?.message || err?.message || "Failed to preview schedule";
                    toast.error(msg);
                },
            }
        );
    };

    const userInfo = userLookupData?.user_info;
    const lookupLocations = userLookupData?.locations || [];
    const lookupVehicles = userLookupData?.vehicles || [];

    return (
        <main className="relative">
            {isLookingUp && (
                <div className="h-full w-full absolute top-0 left-0 z-50 bg-white/80">
                    <SkeletonDemo quantity={15} />
                </div>
            )}
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-secondary-900">Add Subscription</h1>
                    <p className="text-xs text-secondary-500">Create a new subscription for a compound</p>
                </div>

                {userInfo && (
                    <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4 animate-slide-up">
                        <div className="shrink-0 w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-green-800 mb-1">Client Found</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-green-500" />
                                    <div>
                                        <p className="text-xs text-green-500">Name</p>
                                        <p className="text-sm font-medium text-gray-800">{userInfo.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-green-500" />
                                    <div>
                                        <p className="text-xs text-green-500">User ID</p>
                                        <p className="text-sm font-medium text-gray-800">#{userInfo.user_id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-green-500" />
                                    <div>
                                        <p className="text-xs text-green-500">Saved Locations</p>
                                        <p className="text-sm font-medium text-gray-800">{lookupLocations.length}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Car className="w-4 h-4 text-green-500" />
                                    <div>
                                        <p className="text-xs text-green-500">Vehicles</p>
                                        <p className="text-sm font-medium text-gray-800">{lookupVehicles.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {clientNotFound && !userInfo && (
                    <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 flex items-center gap-4 animate-slide-up">
                        <div className="shrink-0 w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
                            <UserX className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-red-700">No client found</p>
                            <p className="text-xs text-red-400 mt-0.5">No account is linked to this phone number.</p>
                        </div>
                    </div>
                )}

                <Formik
                    initialValues={{
                        phoneNumber: "",
                        compound_id: "",
                        package_id: "",
                        vehicles: [] as any[],
                        location_id: "",
                        latitude: "",
                        longitude: "",
                        address: "",
                        frequency: "1",
                        shift: "day",
                        start_date: "",
                        payment_method: "0",
                        total_price: "",
                        amount_paid: "",
                        wallet_amount: "0",
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    name="phoneNumber"
                                    label="Phone Number *"
                                    type="tel"
                                    placeholder="Enter phone number"
                                    icon={<Phone className="w-5 h-5" />}
                                    onBlur={(val: string) => handlePhoneBlur(val)}
                                />
                                <FormDropdown
                                    name="compound_id"
                                    label="Compound *"
                                    placeholder="Select Compound"
                                    options={compoundsList.map((c: any) => ({
                                        value: String(c.id),
                                        label: c.name_en,
                                    }))}
                                    onChangeExternal={(val: string) => {
                                        setSelectedCompoundId(val ? Number(val) : null);
                                        setFieldValue("package_id", "");
                                    }}
                                />
                                <FormDropdown
                                    name="package_id"
                                    label="Package *"
                                    placeholder="Select Package"
                                    options={packagesList.map((p: any) => ({
                                        value: String(p.id),
                                        label: `${p.name_en} - ${p.price}`,
                                    }))}
                                />

                                {userInfo && (
                                    <div className="md:col-span-2">
                                        <FormSelectedVehicles
                                            name="vehicles"
                                            onAddClick={() => setIsModalOpen(true)}
                                        />
                                    </div>
                                )}

                                <VehicleSelectionModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    selectedVehicles={values.vehicles}
                                    setSelectedVehicles={(newVehicles) => {
                                        setFieldValue("vehicles", newVehicles);
                                    }}
                                    dummyDataVehicles={lookupVehicles}
                                    isSuccess={true}
                                />

                                {locationsList.length > 0 && (
                                    <FormDropdown
                                        name="location_id"
                                        label="Saved Location"
                                        placeholder="Select Location"
                                        options={locationsList.map((l: any) => ({
                                            value: String(l.user_location_id),
                                            label: l.user_address_name || l.location,
                                        }))}
                                        onChangeExternal={(val: string) => {
                                            const selected = locationsList.find(
                                                (l: any) => String(l.user_location_id) === val
                                            );
                                            if (selected) {
                                                if (selected.latitude) setFieldValue("latitude", selected.latitude);
                                                if (selected.longitude) setFieldValue("longitude", selected.longitude);
                                            }
                                        }}
                                    />
                                )}
                                <FormInput name="latitude" label="Latitude *" type="text" placeholder="25.2048" disabled />
                                <FormInput name="longitude" label="Longitude *" type="text" placeholder="55.2708" disabled />
                                <div className="md:col-span-2">
                                    <FormInput name="address" label="Address *" placeholder="Villa 12, Al Reem Compound" />
                                </div>
                                <FormDropdown name="frequency" label="Frequency *" placeholder="Select Frequency" options={frequencyOptions} />
                                <FormDropdown name="shift" label="Shift *" placeholder="Select Shift" options={shiftOptions} />
                                <FormDatePicker name="start_date" label="Start Date *" placeholder="Select start date" checkmark={false} />
                                <FormDropdown name="payment_method" label="Payment Method" placeholder="Select Method" options={paymentMethodOptions} />
                                <FormInput name="total_price" label="Total Price" type="number" placeholder="0.00" />
                                <FormInput name="amount_paid" label="Amount Paid" type="number" placeholder="0.00" />
                                <FormInput name="wallet_amount" label="Wallet Amount" type="number" placeholder="0" />
                            </div>

                            {previewData && previewData.length > 0 && (
                                <div className="mt-8 p-4 rounded-2xl border border-blue-200 bg-blue-50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CalendarDays className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-sm font-bold text-blue-800">Schedule Preview</h3>
                                        <span className="text-xs text-blue-500">({previewData.length} booking(s))</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {previewData.map((b: any, i: number) => (
                                            <div key={i} className="px-3 py-2 bg-white rounded-lg border border-blue-200 text-sm text-blue-700">
                                                <span className="font-semibold">{b.date}</span>
                                                {b.service_type && <span className="ml-2 text-blue-500">· {b.service_type}</span>}
                                                {b.cars_count != null && <span className="ml-2 text-blue-400">({b.cars_count} car(s))</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-4 mt-8">
                                <Button type="button" variant="outline" onClick={() => navigate("/compounds/subscriptions")}>
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                                    onClick={() => handlePreview(values)}
                                    disabled={previewMutation.isPending}
                                >
                                    {previewMutation.isPending ? (
                                        <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Preview</>
                                    ) : (
                                        "Preview Schedule"
                                    )}
                                </Button>
                                <Button type="submit" className="bg-primary text-secondary-900 hover:bg-primary-600" disabled={isSubmitting || !selectedUserId}>
                                    {isSubmitting ? "Creating..." : "Create Subscription"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default AddCompoundSubscription;
