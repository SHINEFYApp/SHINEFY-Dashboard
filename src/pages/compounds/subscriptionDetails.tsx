import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetSubscription, useUpdateSubscriptionBalances, useUpdateSubscriptionStatus, useGetSubscriptionBookings } from "../../api/features/compounds.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { GenericModal } from "../../common/GenericModal";
import { Button } from "../../components/ui/button";
import { ChevronLeft } from "lucide-react";

const statusOptions = ["active", "pending", "paused", "cancelled", "completed", "expired"];

const CompoundSubscriptionDetails = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const subscriptionId = Number(id);

    const [balancesModalOpen, setBalancesModalOpen] = useState(false);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [newStatus, setNewStatus] = useState("");
    const [balanceData, setBalanceData] = useState<any>({
        main: {},
        extra: {},
        special: {},
    });

    const { data, isLoading } = useGetSubscription(subscriptionId);
    const { data: bookingsData } = useGetSubscriptionBookings(subscriptionId);
    const sub = data?.data?.data;
    const bookings = bookingsData?.data?.data?.bookings || [];

    const balancesMutation = useUpdateSubscriptionBalances({
        onSuccess: () => {
            toast.success("Balances updated successfully");
            setBalancesModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["compound-subscription", subscriptionId] });
        },
        onError: () => toast.error("Failed to update balances"),
    });

    const statusMutation = useUpdateSubscriptionStatus({
        onSuccess: () => {
            toast.success("Status updated successfully");
            setStatusModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["compound-subscription", subscriptionId] });
        },
        onError: () => toast.error("Failed to update status"),
    });

    const openBalancesModal = () => {
        const balances = sub?.balances || { main: [], extra: [], special: [] };
        const mapped: any = { main: {}, extra: {}, special: {} };
        ["main", "extra", "special"].forEach((type) => {
            (balances[type] || []).forEach((svc: any) => {
                mapped[type][svc.id] = {
                    initial: svc.initial,
                    remaining: svc.remaining,
                };
            });
        });
        setBalanceData(mapped);
        setBalancesModalOpen(true);
    };

    const handleBalanceChange = (type: string, id: number, field: string, value: string) => {
        setBalanceData((prev: any) => ({
            ...prev,
            [type]: {
                ...prev[type],
                [id]: {
                    ...(prev[type]?.[id] || {}),
                    [field]: Number(value),
                },
            },
        }));
    };

    const handleBalancesSave = () => {
        balancesMutation.mutate({
            id: subscriptionId,
            data: { balances: balanceData },
        });
    };

    const handleStatusSave = () => {
        if (!newStatus) return;
        statusMutation.mutate({
            id: subscriptionId,
            data: { status: newStatus },
        });
    };

    const statusColors: Record<string, string> = {
        active: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        paused: "bg-orange-100 text-orange-800",
        cancelled: "bg-red-100 text-red-800",
        completed: "bg-blue-100 text-blue-800",
        expired: "bg-gray-100 text-gray-800",
    };

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (!sub) return <div className="p-8">Subscription not found.</div>;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/compounds/subscriptions" className="text-gray-500 hover:text-gray-700">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-secondary-900">
                            Subscription #{sub.id}
                        </h1>
                        <p className="text-xs text-secondary-500">Subscription details</p>
                    </div>
                </div>

                {/* Status & Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[sub.status] || ""}`}>
                                {sub.status}
                            </span>
                            <button
                                onClick={() => { setNewStatus(sub.status); setStatusModalOpen(true); }}
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">User</p>
                        <p className="font-semibold">{sub.user?.name}</p>
                        <p className="text-sm text-gray-500">{sub.user?.phone}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Period</p>
                        <p className="font-semibold">{sub.start_date} → {sub.end_date}</p>
                        <p className="text-sm text-gray-500">Frequency: {sub.frequency} | Shift: {sub.shift}</p>
                    </div>
                </div>

                {/* Compound & Package */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Compound</p>
                        <p className="font-semibold">{sub.compound?.name}</p>
                        <p className="text-sm text-gray-500">{sub.compound?.address}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Package</p>
                        <p className="font-semibold">{sub.package?.name}</p>
                        <p className="text-sm text-gray-500">Period: {sub.package?.period_days} days</p>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Total Price</p>
                        <p className="font-bold text-lg">{Number(sub.total_price).toFixed(2)}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Amount Paid</p>
                        <p className="font-bold text-lg">{Number(sub.amount_paid).toFixed(2)}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                        <p className="font-semibold">{sub.payment_method === 1 ? "Online" : "Wallet/Cash"}</p>
                    </div>
                </div>

                {/* Balances */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-md font-bold text-gray-800">Balances</h3>
                        <button
                            onClick={openBalancesModal}
                            className="text-xs text-blue-600 hover:underline font-semibold"
                        >
                            Edit Balances
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["main", "extra", "special"].map((type) => {
                            const items = sub.balances?.[type] || [];
                            return (
                                <div key={type} className="p-4 rounded-xl border border-gray-200">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{type}</p>
                                    {items.length === 0 ? (
                                        <p className="text-sm text-gray-400">No services</p>
                                    ) : (
                                        items.map((svc: any) => (
                                            <div key={svc.id} className="flex justify-between text-sm py-1">
                                                <span className="text-gray-600">{svc.name || svc.name_ar}</span>
                                                <span className="font-semibold">{svc.remaining}/{svc.initial}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Cars */}
                {sub.cars && sub.cars.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-md font-bold text-gray-800 mb-3">Cars</h3>
                        <div className="flex gap-3">
                            {sub.cars.map((car: any) => (
                                <div key={car.id} className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
                                    <p className="font-semibold text-sm">{car.plate}</p>
                                    <p className="text-xs text-gray-500">{car.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bookings */}
                {bookings.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-md font-bold text-gray-800 mb-3">Bookings</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">ID</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Service</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((bk: any) => (
                                        <tr key={bk.id} className="border-b border-gray-100">
                                            <td className="px-4 py-2">{bk.id}</td>
                                            <td className="px-4 py-2">{bk.service_type}</td>
                                            <td className="px-4 py-2">{bk.scheduled_date}</td>
                                            <td className="px-4 py-2">{bk.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Address & Location */}
                <div className="p-4 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Service Address</p>
                    <p className="font-semibold">{sub.address}</p>
                    {sub.latitude && sub.longitude && (
                        <p className="text-sm text-gray-500">
                            {sub.latitude}, {sub.longitude}
                        </p>
                    )}
                </div>
            </div>

            {/* Balances Modal */}
            <GenericModal
                isOpen={balancesModalOpen}
                onClose={() => setBalancesModalOpen(false)}
                title="Edit Balances"
                subtitle="Update service balances for this subscription"
            >
                {["main", "extra", "special"].map((type) => {
                    const entries = Object.entries(balanceData[type] || {});
                    if (entries.length === 0) return null;
                    return (
                        <div key={type} className="mb-6">
                            <h4 className="text-sm font-bold text-gray-700 uppercase mb-3">{type}</h4>
                            {entries.map(([svcId, data]: [string, any]) => (
                                <div key={svcId} className="flex gap-4 items-center mb-3">
                                    <span className="text-sm text-gray-600 w-20">ID {svcId}</span>
                                    <input
                                        type="number"
                                        value={data.initial}
                                        onChange={(e) => handleBalanceChange(type, Number(svcId), "initial", e.target.value)}
                                        className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        placeholder="Initial"
                                    />
                                    <input
                                        type="number"
                                        value={data.remaining}
                                        onChange={(e) => handleBalanceChange(type, Number(svcId), "remaining", e.target.value)}
                                        className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        placeholder="Remaining"
                                    />
                                </div>
                            ))}
                        </div>
                    );
                })}
                <div className="flex justify-end gap-4 mt-4">
                    <Button variant="outline" onClick={() => setBalancesModalOpen(false)}>Cancel</Button>
                    <Button
                        className="bg-primary text-secondary-900 hover:bg-primary-600"
                        onClick={handleBalancesSave}
                        disabled={balancesMutation.isPending}
                    >
                        {balancesMutation.isPending ? "Saving..." : "Save Balances"}
                    </Button>
                </div>
            </GenericModal>

            {/* Status Modal */}
            <GenericModal
                isOpen={statusModalOpen}
                onClose={() => setStatusModalOpen(false)}
                title="Change Status"
                subtitle="Select a new status for this subscription"
            >
                <div className="flex flex-col gap-3">
                    {statusOptions.map((s) => (
                        <label
                            key={s}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                                newStatus === s
                                    ? "border-primary bg-amber-50"
                                    : "border-gray-200 bg-white hover:bg-gray-50"
                            }`}
                        >
                            <input
                                type="radio"
                                name="status"
                                value={s}
                                checked={newStatus === s}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="w-4 h-4 accent-[#FFC107]"
                            />
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[s] || ""}`}>
                                {s}
                            </span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <Button variant="outline" onClick={() => setStatusModalOpen(false)}>Cancel</Button>
                    <Button
                        className="bg-primary text-secondary-900 hover:bg-primary-600"
                        onClick={handleStatusSave}
                        disabled={statusMutation.isPending}
                    >
                        {statusMutation.isPending ? "Saving..." : "Save Status"}
                    </Button>
                </div>
            </GenericModal>
        </main>
    );
};

export default CompoundSubscriptionDetails;
