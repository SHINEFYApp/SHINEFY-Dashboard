import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { FormDatePicker } from "../../common/FormDatePicker";
import { SearchableFormDropdown } from "../../common/SearchableFormDropdown";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateSubscription, useGetCompoundPackages, useGetUserCars, useGetUserLocations } from "../../api/features/compounds.hooks";
import { useGetCompounds } from "../../api/features/compounds.hooks";
import { Button } from "../../components/ui/button";

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
        onSuccess: (res: any) => {
            toast.success("Subscription created successfully");
            navigate("/compounds/subscriptions");
        },
        onError: () => toast.error("Failed to create subscription"),
    });

    const handleSubmit = (values: any) => {
        const payload: any = {
            user_id: Number(values.user_id),
            compound_id: Number(values.compound_id),
            package_id: Number(values.package_id),
            car_ids: values.car_ids ? [Number(values.car_ids)] : [],
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

        createMutation.mutate(payload);
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-secondary-900">Add Subscription</h1>
                    <p className="text-xs text-secondary-500">Create a new subscription for a compound</p>
                </div>
                <Formik
                    initialValues={{
                        user_id: "",
                        compound_id: "",
                        package_id: "",
                        car_ids: "",
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
                                    name="user_id"
                                    label="User ID *"
                                    type="number"
                                    placeholder="Enter user ID"
                                    onBlur={(val: string) => setSelectedUserId(val ? Number(val) : null)}
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
                                {carsList.length > 0 && (
                                    <FormDropdown
                                        name="car_ids"
                                        label="Car"
                                        placeholder="Select Car"
                                        options={carsList.map((c: any) => ({
                                            value: String(c.vehicle_id),
                                            label: `${c.plate_number} - ${c.vehicle_name}`,
                                        }))}
                                    />
                                )}
                                {locationsList.length > 0 && (
                                    <FormDropdown
                                        name="location_id"
                                        label="Saved Location"
                                        placeholder="Select Location"
                                        options={locationsList.map((l: any) => ({
                                            value: String(l.user_location_id),
                                            label: l.user_address_name || l.location,
                                        }))}
                                    />
                                )}
                                <FormInput name="latitude" label="Latitude *" type="text" placeholder="25.2048" />
                                <FormInput name="longitude" label="Longitude *" type="text" placeholder="55.2708" />
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

                            <div className="flex justify-end gap-4 mt-8">
                                <Button type="button" variant="outline" onClick={() => navigate("/compounds/subscriptions")}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-primary text-secondary-900 hover:bg-primary-600" disabled={isSubmitting}>
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
