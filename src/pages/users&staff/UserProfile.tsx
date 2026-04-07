import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, Eye, ArrowUpToLine, Trash2, SlidersHorizontal, Plus, Pencil, X } from "lucide-react";
import { Form, Formik } from "formik";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
    useUserDetails,
    useUserBookingHistory,
    useUserVehicles,
    useUserLocations,
    useUserWalletHistory,
    useUserPackages,
    useAddUserLocation,
    useEditUserLocation,
    useEditUserVehicle,
} from "../../api/features/ManageUsers.hooks";
import { CustomTable } from "../../common/CustomTable";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";

const tabs = [
    "User Details",
    "Booking History",
    "User Vehicle",
    "User Location",
    "Wallet History",
    "User Packages",
];

export default function UserProfile() {
    const { id } = useParams();
    const userId = id as string;
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("User Details");

    // Booking History state
    const [bookingPage, setBookingPage] = useState(1);
    const [bookingSearch, setBookingSearch] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const bookingPageSize = 10;

    // Wallet History state
    const [walletPage, setWalletPage] = useState(1);
    const [walletSearch, setWalletSearch] = useState("");
    const walletPageSize = 10;

    // User Packages state
    const [packagesPage, setPackagesPage] = useState(1);
    const [packagesSearch, setPackagesSearch] = useState("");
    const packagesPageSize = 10;

    // Modal states
    const [locationModal, setLocationModal] = useState<{ open: boolean; mode: "add" | "edit"; data?: any }>({
        open: false,
        mode: "add",
    });
    const [vehicleModal, setVehicleModal] = useState<{ open: boolean; data?: any }>({
        open: false,
    });

    // API calls
    const { data: userDetailsData, isLoading: isLoadingDetails } = useUserDetails({ user_id: userId });
    const { data: bookingData, isLoading: isLoadingBookings } = useUserBookingHistory({
        user_id: userId,
        limit: bookingPageSize,
        page: bookingPage,
    });
    const { data: vehiclesData, isLoading: isLoadingVehicles } = useUserVehicles({ user_id: userId });
    const { data: locationsData, isLoading: isLoadingLocations } = useUserLocations({ user_id: userId });
    const { data: walletData, isLoading: isLoadingWallet } = useUserWalletHistory({
        user_id: userId,
        search: walletSearch || "0",
    });
    const { data: packagesData, isLoading: isLoadingPackages } = useUserPackages({
        user_id: userId,
        search: packagesSearch || undefined,
    });

    // Mutations
    const { mutate: addLocation, isPending: isAddingLocation } = useAddUserLocation({
        onSuccess: () => {
            toast.success("Location added successfully");
            setLocationModal({ open: false, mode: "add" });
            queryClient.invalidateQueries({ queryKey: ["user-locations", userId] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to add location");
        },
    });

    const { mutate: editLocation, isPending: isEditingLocation } = useEditUserLocation({
        onSuccess: () => {
            toast.success("Location updated successfully");
            setLocationModal({ open: false, mode: "add" });
            queryClient.invalidateQueries({ queryKey: ["user-locations", userId] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update location");
        },
    });

    const { mutate: editVehicle, isPending: isEditingVehicle } = useEditUserVehicle({
        onSuccess: () => {
            toast.success("Vehicle updated successfully");
            setVehicleModal({ open: false });
            queryClient.invalidateQueries({ queryKey: ["user-vehicles", userId] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update vehicle");
        },
    });

    // Extract data
    const user = userDetailsData?.data;
    const bookings = bookingData?.data?.bookings || [];
    const bookingPagination = bookingData?.data?.pagination;
    const vehicles = vehiclesData?.data || [];
    const locations = locationsData?.data || [];
    const walletHistory = walletData?.data?.wallet_history || [];
    const walletPagination = walletData?.data?.pagination;
    const packages = packagesData?.data?.packages || [];
    const packagesPagination = packagesData?.data?.pagination;

    // Booking columns
    const bookingColumns = useMemo(() => [
        { key: "booking_no", title: "Booking Number" },
        { key: "customer_name", title: "Customer Name" },
        { key: "service_boy_name", title: "Service Boy Name" },
        { key: "service_name", title: "Service Name" },
        { key: "payment_method", title: "Payment Method" },
        { key: "total_price", title: "Total Amount(EGP)" },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center">
                    <Link
                        to={`/bookings/manage/${record.booking_id || record.booking_no}`}
                        className="bg-[#D0E8FF] flex items-center gap-1 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] px-2 py-1 text-xs font-semibold transition-colors"
                    >
                        <Eye className="w-3 h-3" /> View
                    </Link>
                    <button className="bg-[#C9FFCB] flex items-center gap-1 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-2 py-1 text-xs font-semibold transition-colors">
                        <ArrowUpToLine className="w-3 h-3" /> Update
                    </button>
                    <button className="bg-[#FFD5D2] flex items-center gap-1 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-2 py-1 text-xs font-semibold transition-colors">
                        <Trash2 className="w-3 h-3" /> Delete
                    </button>
                </div>
            ),
        },
    ], []);

    // Vehicle columns
    const vehicleColumns = useMemo(() => [
        {
            key: "vehicle_image",
            title: "Vehicle Image",
            render: (value: string) => (
                <div className="w-20 h-14 bg-gray-100 rounded overflow-hidden">
                    {value && <img src={value} alt="Vehicle" className="w-full h-full object-cover" />}
                </div>
            ),
        },
        {
            key: "color_name",
            title: "Vehicle Color",
            render: (value: string) => (
                <div className="flex items-center gap-2">
                    <div
                        className="w-5 h-5 rounded border border-gray-300"
                        style={{ backgroundColor: value?.toLowerCase() || "#ccc" }}
                    />
                    <span>{value}</span>
                </div>
            ),
        },
        { key: "plate_number", title: "Plate Number" },
        { key: "make_name", title: "Make" },
        { key: "model_name", title: "Model" },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <button
                    onClick={() => setVehicleModal({ open: true, data: record })}
                    className="bg-[#C9FFCB] flex items-center gap-1 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-2 py-1 text-xs font-semibold transition-colors"
                >
                    <Pencil className="w-3 h-3" /> Edit
                </button>
            ),
        },
    ], []);

    // Location columns
    const locationColumns = useMemo(() => [
        {
            key: "sno",
            title: "S.NO",
            render: (_: any, __: any, index: number) => index + 1,
        },
        { key: "location", title: "Location" },
        { key: "createtime", title: "Create Date & Time" },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center">
                    <a
                        href={`https://www.google.com/maps?q=${record.latitude},${record.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#D0E8FF] flex items-center gap-1 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] px-2 py-1 text-xs font-semibold transition-colors"
                    >
                        <Eye className="w-3 h-3" /> View
                    </a>
                    <button
                        onClick={() => setLocationModal({ open: true, mode: "edit", data: record })}
                        className="bg-[#C9FFCB] flex items-center gap-1 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-2 py-1 text-xs font-semibold transition-colors"
                    >
                        <Pencil className="w-3 h-3" /> Edit
                    </button>
                    <button className="bg-[#FFD5D2] flex items-center gap-1 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-2 py-1 text-xs font-semibold transition-colors">
                        <Trash2 className="w-3 h-3" /> Delete
                    </button>
                </div>
            ),
        },
    ], []);

    // Wallet columns
    const walletColumns = useMemo(() => [
        {
            key: "sno",
            title: "S.No",
            render: (_: any, __: any, index: number) => ((walletPage - 1) * walletPageSize) + index + 1,
        },
        {
            key: "amount_type",
            title: "Amount Type",
            render: (value: string) => (
                <span className={value === "Credit" ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                    {value}
                </span>
            ),
        },
        { key: "amount", title: "Amount" },
        { key: "reason", title: "Reason" },
        { key: "booking_number", title: "Booking" },
        { key: "createtime", title: "Create Date & Time" },
        { key: "direct_by", title: "Direct By" },
    ], [walletPage]);

    // Packages columns
    const packagesColumns = useMemo(() => [
        {
            key: "sno",
            title: "S.No",
            render: (_: any, __: any, index: number) => ((packagesPage - 1) * packagesPageSize) + index + 1,
        },
        { key: "package_name", title: "Package Name" },
        {
            key: "status",
            title: "Status",
            render: (value: string) => (
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    value === "active" ? "text-green-600" : value === "pending" ? "text-[#FFC107]" : "text-red-500"
                }`}>
                    {value ? value.charAt(0).toUpperCase() + value.slice(1) : "-"}
                </span>
            ),
        },
        { key: "payment_method", title: "Payment Method" },
        {
            key: "available_from",
            title: "Available",
            render: (_: any, record: any) => (
                <span className={record.available_from ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                    {record.available_from ? "Yes" : "No"}
                </span>
            ),
        },
        { key: "created_at", title: "Create Date & Time" },
        {
            key: "action",
            title: "Action",
            render: () => (
                <button className="bg-[#D0E8FF] flex items-center gap-1 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] px-2 py-1 text-xs font-semibold transition-colors">
                    <Eye className="w-3 h-3" /> View
                </button>
            ),
        },
    ], [packagesPage]);

    const statusText = user?.status === 1 ? "Activated" : "Deactivated";
    const statusColor = user?.status === 1 ? "bg-[#4CAF50]" : "bg-red-500";

    return (
        <>
            <div className="w-full min-h-screen bg-white rounded-xl pb-10">
                {/* Breadcrumb */}
                <div className="px-6 pt-4 pb-2 flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="text-primary hover:underline">🏠</Link>
                    <span>/</span>
                    <span>Users & Staff</span>
                    <span>/</span>
                    <Link to="/users&staff/manage/users" className="hover:underline">Manage Users</Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">User Profile</span>
                </div>

                {/* Header Card */}
                <div className="mx-6 bg-[#1C1C1E] rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 shadow-md">
                    <div className="flex items-center gap-5">
                        <div className="w-[84px] h-[84px] bg-white rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                            {user?.image && (
                                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div className="pt-1">
                            <h1 className="text-white text-[20px] font-bold tracking-wide mb-1">
                                {isLoadingDetails ? "Loading..." : user?.name || "Unknown User"}
                            </h1>
                            <p className="text-white text-[16px] font-semibold tracking-wider">
                                {user?.contact_number || "-"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-x-8 border-b-2 border-gray-100 mb-8 pt-1 overflow-x-auto px-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-[16px] font-bold transition-all relative whitespace-nowrap ${
                                activeTab === tab
                                    ? "text-gray-900 border-b-[3px] border-[#FFC107] -mb-[2px]"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "User Details" && (
                    <div className="px-6">
                        {isLoadingDetails ? (
                            <div className="py-10 text-center text-gray-500">Loading user details...</div>
                        ) : (
                            <div className="grid grid-cols-[160px_1fr] gap-y-[18px] text-[15px]">
                                <div className="text-[#848484] font-bold self-center">Name :</div>
                                <div>
                                    <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">
                                        {user?.name || "-"}
                                    </span>
                                </div>

                                <div className="text-[#848484] font-bold self-center">Email :</div>
                                <div>
                                    <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">
                                        {user?.email || "-"}
                                    </span>
                                </div>

                                <div className="text-[#848484] font-bold self-center">Contact :</div>
                                <div>
                                    <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">
                                        {user?.contact_number || "-"}
                                    </span>
                                </div>

                                <div className="text-[#848484] font-bold self-center">Groups :</div>
                                <div>
                                    <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">
                                        {user?.group_name || "-"}
                                    </span>
                                </div>

                                <div className="text-[#848484] font-bold self-center">Registration On :</div>
                                <div>
                                    <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">
                                        {user?.createtime || "-"}
                                    </span>
                                </div>

                                <div className="text-[#848484] font-bold self-center">Status :</div>
                                <div>
                                    <span className={`${statusColor} text-white px-4 py-1.5 rounded font-bold inline-block text-[13px] tracking-wide`}>
                                        {statusText}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "Booking History" && (
                    <div className="px-6">
                        <div className="mb-4">
                            <h3 className="text-sm text-gray-500 mb-3">Filter</h3>
                            <p className="text-xs text-gray-400 mb-3">Booking History</p>
                            <Formik
                                initialValues={{ search: "", date: "" }}
                                onSubmit={(values) => {
                                    setBookingSearch(values.search);
                                    setBookingDate(values.date);
                                    setBookingPage(1);
                                }}
                            >
                                {() => (
                                    <Form>
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                                            <div className="w-full md:w-52">
                                                <FormInput
                                                    name="search"
                                                    label=""
                                                    placeholder="Search"
                                                    icon={<Search className="w-5 h-5" />}
                                                    className="mb-0"
                                                    checkmark={false}
                                                />
                                            </div>
                                            <div className="w-full md:w-52">
                                                <FormInput
                                                    name="date"
                                                    label=""
                                                    placeholder="Date"
                                                    type="date"
                                                    className="mb-0"
                                                    checkmark={false}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Search
                                            </button>
                                            <button
                                                type="button"
                                                className="py-3 px-4 rounded-lg bg-[#F4F5FA]"
                                            >
                                                <SlidersHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <CustomTable
                            columns={bookingColumns}
                            data={bookings}
                            currentPage={bookingPage}
                            totalPages={bookingPagination?.total_pages || 1}
                            totalEntries={bookingPagination?.total_items || bookings.length}
                            pageSize={bookingPageSize}
                            onPageChange={setBookingPage}
                            isLoading={isLoadingBookings}
                        />
                    </div>
                )}

                {activeTab === "User Vehicle" && (
                    <div className="px-6">
                        {isLoadingVehicles ? (
                            <div className="py-10 text-center text-gray-500">Loading vehicles...</div>
                        ) : (
                            <CustomTable
                                columns={vehicleColumns}
                                data={vehicles}
                                currentPage={1}
                                totalPages={1}
                                totalEntries={vehicles.length}
                                pageSize={vehicles.length || 10}
                                onPageChange={() => {}}
                            />
                        )}
                    </div>
                )}

                {activeTab === "User Location" && (
                    <div className="px-6">
                        <div className="mb-4 flex justify-end">
                            <button
                                onClick={() => setLocationModal({ open: true, mode: "add" })}
                                className="flex items-center gap-2 bg-primary text-secondary-900 font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-600 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add Location
                            </button>
                        </div>
                        {isLoadingLocations ? (
                            <div className="py-10 text-center text-gray-500">Loading locations...</div>
                        ) : (
                            <CustomTable
                                columns={locationColumns}
                                data={locations}
                                currentPage={1}
                                totalPages={1}
                                totalEntries={locations.length}
                                pageSize={locations.length || 10}
                                onPageChange={() => {}}
                            />
                        )}
                    </div>
                )}

                {activeTab === "Wallet History" && (
                    <div className="px-6">
                        <div className="mb-4">
                            <h3 className="text-sm text-gray-500 mb-3">Filter</h3>
                            <p className="text-xs text-gray-400 mb-3">Wallet History</p>
                            <Formik
                                initialValues={{ search: "", date: "" }}
                                onSubmit={(values) => {
                                    setWalletSearch(values.search);
                                    setWalletPage(1);
                                }}
                            >
                                {() => (
                                    <Form>
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                                            <div className="w-full md:w-52">
                                                <FormInput
                                                    name="search"
                                                    label=""
                                                    placeholder="Search"
                                                    icon={<Search className="w-5 h-5" />}
                                                    className="mb-0"
                                                    checkmark={false}
                                                />
                                            </div>
                                            <div className="w-full md:w-52">
                                                <FormInput
                                                    name="date"
                                                    label=""
                                                    placeholder="Date"
                                                    type="date"
                                                    className="mb-0"
                                                    checkmark={false}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Search
                                            </button>
                                            <button
                                                type="button"
                                                className="py-3 px-10 rounded-lg bg-primary text-secondary-900 font-semibold"
                                            >
                                                Add Wallet amount
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <CustomTable
                            columns={walletColumns}
                            data={walletHistory}
                            currentPage={walletPagination?.current_page || 1}
                            totalPages={walletPagination?.total_pages || 1}
                            totalEntries={walletPagination?.total_items || walletHistory.length}
                            pageSize={walletPageSize}
                            onPageChange={setWalletPage}
                            isLoading={isLoadingWallet}
                        />
                    </div>
                )}

                {activeTab === "User Packages" && (
                    <div className="px-6">
                        <div className="mb-4">
                            <Formik
                                initialValues={{ search: "", date: "" }}
                                onSubmit={(values) => {
                                    setPackagesSearch(values.search);
                                    setPackagesPage(1);
                                }}
                            >
                                {() => (
                                    <Form>
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                                            <div className="w-full md:w-52">
                                                <FormInput
                                                    name="search"
                                                    label=""
                                                    placeholder="Search"
                                                    icon={<Search className="w-5 h-5" />}
                                                    className="mb-0"
                                                    checkmark={false}
                                                />
                                            </div>
                                            <div className="w-full md:w-52">
                                                <FormInput
                                                    name="date"
                                                    label=""
                                                    placeholder="Date"
                                                    type="date"
                                                    className="mb-0"
                                                    checkmark={false}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full md:w-[108px] py-3 bg-black rounded-lg text-white font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <CustomTable
                            columns={packagesColumns}
                            data={packages}
                            currentPage={packagesPagination?.current_page || 1}
                            totalPages={packagesPagination?.total_pages || 1}
                            totalEntries={packagesPagination?.total_items || packages.length}
                            pageSize={packagesPageSize}
                            onPageChange={setPackagesPage}
                            isLoading={isLoadingPackages}
                        />
                    </div>
                )}
            </div>

            {/* Add/Edit Location Modal */}
            <section
                className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30 backdrop-blur-xs transition-all duration-300 ${
                    locationModal.open ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"
                }`}
            >
                <div className={`w-[678px] relative px-10 py-8 bg-white rounded-xl transition-transform duration-300 ${
                    locationModal.open ? "scale-100" : "scale-95"
                }`}>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-[#242731] text-[20px] font-bold">
                            {locationModal.mode === "add" ? "Add Location" : "Edit Location"}
                        </h1>
                        <button
                            onClick={() => setLocationModal({ open: false, mode: "add" })}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: locationModal.data?.name || "",
                            location: locationModal.data?.location || "",
                            latitude: locationModal.data?.latitude || "",
                            longitude: locationModal.data?.longitude || "",
                        }}
                        onSubmit={(values) => {
                            if (locationModal.mode === "add") {
                                addLocation({
                                    user_id: userId,
                                    name: values.name,
                                    location: values.location,
                                    latitude: Number(values.latitude),
                                    longitude: Number(values.longitude),
                                });
                            } else {
                                editLocation({
                                    user_location_id: locationModal.data?.user_location_id,
                                    user_id: userId,
                                    name: values.name || undefined,
                                    location: values.location || undefined,
                                    latitude: values.latitude ? Number(values.latitude) : undefined,
                                    longitude: values.longitude ? Number(values.longitude) : undefined,
                                });
                            }
                        }}
                    >
                        {({ isValid }) => (
                            <Form className="space-y-4">
                                <FormInput
                                    name="name"
                                    label="Name"
                                    placeholder="Location name"
                                    checkmark={false}
                                />
                                <FormInput
                                    name="location"
                                    label="Location"
                                    placeholder="Full address"
                                    checkmark={false}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        name="latitude"
                                        label="Latitude"
                                        placeholder="e.g. 31.0288"
                                        type="text"
                                        checkmark={false}
                                    />
                                    <FormInput
                                        name="longitude"
                                        label="Longitude"
                                        placeholder="e.g. 31.3677"
                                        type="text"
                                        checkmark={false}
                                    />
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setLocationModal({ open: false, mode: "add" })}
                                        className="w-[168px] border text-[16px] py-3 border-black rounded-[10px]"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isAddingLocation || isEditingLocation}
                                        className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-10 py-3 rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {(isAddingLocation || isEditingLocation) ? "Saving..." : "Submit"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>

            {/* Edit Vehicle Modal */}
            <section
                className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30 backdrop-blur-xs transition-all duration-300 ${
                    vehicleModal.open ? "opacity-100 visible z-50" : "opacity-0 invisible z-[-1]"
                }`}
            >
                <div className={`w-[678px] relative px-10 py-8 bg-white rounded-xl transition-transform duration-300 ${
                    vehicleModal.open ? "scale-100" : "scale-95"
                }`}>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-[#242731] text-[20px] font-bold">Edit Vehicle</h1>
                        <button
                            onClick={() => setVehicleModal({ open: false })}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            car_category_id: vehicleModal.data?.car_category_id?.toString() || "",
                            make_id: vehicleModal.data?.make_id?.toString() || "",
                            model_id: vehicleModal.data?.model_id?.toString() || "",
                            color_id: vehicleModal.data?.color_id?.toString() || "",
                            plate_number: vehicleModal.data?.plate_number || "",
                        }}
                        onSubmit={(values) => {
                            editVehicle({
                                vehicle_id: vehicleModal.data?.vehicle_id,
                                user_id: userId,
                                car_category_id: Number(values.car_category_id),
                                make_id: Number(values.make_id),
                                model_id: Number(values.model_id),
                                color_id: Number(values.color_id),
                                plate_number: values.plate_number || undefined,
                            });
                        }}
                    >
                        {({ isValid }) => (
                            <Form className="space-y-4">
                                <FormInput
                                    name="car_category_id"
                                    label="Car Category ID"
                                    placeholder="Car category ID"
                                    type="text"
                                    checkmark={false}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        name="make_id"
                                        label="Make ID"
                                        placeholder="Make ID"
                                        type="text"
                                        checkmark={false}
                                    />
                                    <FormInput
                                        name="model_id"
                                        label="Model ID"
                                        placeholder="Model ID"
                                        type="text"
                                        checkmark={false}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        name="color_id"
                                        label="Color ID"
                                        placeholder="Color ID"
                                        type="text"
                                        checkmark={false}
                                    />
                                    <FormInput
                                        name="plate_number"
                                        label="Plate Number"
                                        placeholder="Plate number"
                                        type="text"
                                        checkmark={false}
                                    />
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setVehicleModal({ open: false })}
                                        className="w-[168px] border text-[16px] py-3 border-black rounded-[10px]"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isEditingVehicle}
                                        className="bg-primary hover:bg-primary-600 text-gray-900 font-bold px-10 py-3 rounded-xl text-[16px] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isEditingVehicle ? "Saving..." : "Submit"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    );
}
