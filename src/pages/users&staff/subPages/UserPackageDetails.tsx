import { useParams, Link, useNavigate } from "react-router-dom";
import { useUserPackageDetails } from "../../../api/features/ManageUsers.hooks";
import { CustomTable } from "../../../common/CustomTable";
import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const UserPackageDetails = () => {
    const { userId, packageId } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data: responseData, isLoading, isError } = useUserPackageDetails({ user_id: userId as string, user_package_id: packageId as string });
    const userPackage = responseData?.data?.user_package;
    const bookingsUsed = responseData?.data?.bookings_used || [];

    // Local pagination for bookings since it may not be paginated from backend
    const paginatedBookings = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return bookingsUsed.slice(start, start + pageSize);
    }, [bookingsUsed, currentPage]);

    const totalPages = Math.ceil(bookingsUsed.length / pageSize) || 1;

    const bookingColumns = useMemo(() => [
        { key: "booking_no", title: "Booking Number" },
        { 
            key: "service", 
            title: "Service Name",
            render: (_: any, record: any) => record.service?.service_name || "-"
        },
        { 
            key: "service_boy", 
            title: "Service Boy",
            render: (_: any, record: any) => record.service_boy?.name || "-"
        },
        { 
            key: "action", 
            title: "Action", 
            render: (_: any, record: any) => (
                <Link 
                    to={`/bookings/manage/${record.booking_id}`}
                    className="text-primary hover:underline font-bold text-sm"
                >
                    View Details
                </Link>
            )
        },
    ], []);

    if (isLoading) return <div className="p-10 text-center font-bold">Loading package details...</div>;
    if (isError) return <div className="p-10 text-center font-bold text-red-500">Failed to load package details.</div>;

    return (
        <div className="w-full min-h-screen bg-white rounded-xl pb-10">
            {/* Header Card */}
            <div className="bg-[#1C1C1E] rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 shadow-md">
                <div className="flex items-center gap-5">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="pt-1">
                        <h1 className="text-white text-[20px] font-bold tracking-wide mb-1">
                            User Package #{userPackage?.id || "-"}
                        </h1>
                        <p className="text-white text-[16px] font-semibold tracking-wider">
                            Status: <span className={`capitalize ${userPackage?.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>{userPackage?.status || "Unknown"}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-6 space-y-12">
                {/* Info Section */}
                <div className="grid grid-cols-[160px_1fr] gap-y-[18px] text-[15px]">
                    <div className="text-[#848484] font-bold self-center">Total Used :</div>
                    <div>
                        <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">{userPackage?.total_used ?? "-"}</span>
                    </div>

                    <div className="text-[#848484] font-bold self-center">Remind Used :</div>
                    <div>
                        <span className="bg-[#F8F9FA] border border-[#E9ECEF] px-4 py-2 rounded-md inline-block min-w-[240px] text-gray-800 font-medium">{userPackage?.remind_used ?? "-"}</span>
                    </div>
                </div>

                {/* Services Section */}
                <div className="pt-4 border-t border-gray-100">
                    <h2 className="text-[18px] font-extrabold text-[#1C1C1E] mb-6">Main Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userPackage?.all_main_services?.map((mainService: any, index: number) => (
                            <div key={index} className="bg-[#F8F9FA] border border-[#E9ECEF] p-5 rounded-xl shadow-sm">
                                <h3 className="font-bold text-lg text-gray-900 mb-3">{mainService.main_services?.service_name || "Unknown Service"}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 font-medium">Total Quantity:</span>
                                        <span className="font-bold">{mainService.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 font-medium">Used:</span>
                                        <span className="font-bold text-gray-900">{mainService.used_quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 font-medium">Remaining:</span>
                                        <span className="font-bold text-[#FFC107]">{mainService.remind_quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!userPackage?.all_main_services || userPackage.all_main_services.length === 0) && (
                            <div className="text-gray-500 font-medium py-4">No main services found.</div>
                        )}
                    </div>
                </div>

                {userPackage?.all_extra_services && userPackage.all_extra_services.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                        <h2 className="text-[18px] font-extrabold text-[#1C1C1E] mb-6">Extra Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userPackage.all_extra_services.map((extraService: any, index: number) => (
                                <div key={index} className="bg-[#F8F9FA] border border-[#E9ECEF] p-5 rounded-xl shadow-sm">
                                    <h3 className="font-bold text-lg text-gray-900 mb-3">{extraService.extra_services?.service_name || "Unknown Service"}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-medium">Total Quantity:</span>
                                            <span className="font-bold">{extraService.quantity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-medium">Used:</span>
                                            <span className="font-bold text-gray-900">{extraService.used_quantity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-medium">Remaining:</span>
                                            <span className="font-bold text-[#FFC107]">{extraService.remind_quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bookings Section */}
                <div className="pt-4 border-t border-gray-100">
                    <h2 className="text-[18px] font-extrabold text-[#1C1C1E] mb-6">Bookings Used</h2>
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        <CustomTable
                            columns={bookingColumns}
                            data={paginatedBookings}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={bookingsUsed.length}
                            pageSize={pageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                            isLoading={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPackageDetails;
