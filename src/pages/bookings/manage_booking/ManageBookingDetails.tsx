import { ArrowUpFromLine, Trash2, History } from "lucide-react";
import { CustomTable } from "../../../common/CustomTable";
import { dummyVehicles, mainDetails, statusDetails } from "../../../constants/data";
import type { BookingState, Vehicle } from "../../../types/bookings";
import UserDetails from "../../../components/booking/DetailRow";
import type { ApiResponse } from "./ManageBooking";
import { useGet } from "../../../api/useGetData";
import { useParams } from "react-router";
import Loader from "../../../common/loader";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ServiceBoys from "../../../components/booking/service_boys";



const ManageBookingDetails = () => {
    const { id } = useParams()
    const baseURL = import.meta.env.VITE_API_URL
    const { data, isLoading, isError, error } = useGet<ApiResponse>({
        route: `${baseURL}/admin/api/book/get/${id}`,
        queryKey: ["booking" , 'details' , id],
        options: {
            staleTime: 1000 * 10,
        },
    });

    
    const booking = data?.data.booking
    const extra_services = data?.data.extra_services
    const rating = data?.data.rating
    const service_boys = data?.data.service_boys
    const vehicles = data?.data.vehicles
    
    const [allData, setAllData] = useState<BookingState | null>(null);
    console.log(allData)

    useEffect(() => {
        if (!data?.data.booking) return;

        const booking = data.data.booking;

        setAllData({
            id: booking.booking_id,
            customer_name: booking.user.customer_name,
            type: booking.order_pay_type,
            booking_date: booking.booking_date,
            booking_time: booking.booking_time,
            address_type: "Home",
            address: booking.address_loc,
            booking_status: booking.status,
            note: booking.note,
            pay_option: booking.payment_option,
            mony_status: booking.payment_collect_status,
            total: `EGP ${booking.total_price}`,
            Coupon_Applied : 0 ,
            Coupon_Code : '',
            Coupon_Amount : 0,
            Sub_Total : 0,
            Wallet_Amount : 0,
            Gradn_Total : 0,
            User_Note : '',
            Admin_Note : '',
            Create_Date : new Date,
            Create_Time : new Date ,
        });
    }, [data]);

    if(isLoading) return <Loader />
    if (isError) {
        toast.error(error.message);
        return null;
    }

    console.log(extra_services)

    // Handle vehicle actions
    const handleUpdateVehicle = (vehicle: any) => {
        console.log("Update vehicle:", vehicle);
    };

    const handleDeleteVehicle = (vehicle: any) => {
        console.log("Delete vehicle:", vehicle);
    };

    // Define vehicle table columns
    const vehicleColumns: any[] = [
        {
            key: "car_category_image",
            title: "Image",
            width: "w-32",
        },
        {
            key: "make_name",
            title: "Make",
            render: (value: string) => (
                <span className="text-gray-700 font-medium">{value}</span>
            ),
        },
        {
            key: "model_name",
            title: "Model",
            render: (value: string) => (
                <span className="text-gray-700 font-medium">{value}</span>
            ),
        },
        {
            key: "plate_number",
            title: "Plate Number",
            render: (value: string) => (
                <span className="text-gray-700 font-medium" dir="rtl">
                    {value}
                </span>
            ),
        },
        {
            key: "color_name",
            title: "Color",
            render: (value: string, row: Vehicle) => (
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-md border border-gray-300 shadow-sm"
                        style={{ backgroundColor: row.colorHex }}
                    />
                    <span className="text-gray-700 font-medium">{value}</span>
                </div>
            ),
        },
        {
            key: "action",
            title: "Action",
            width: "w-48",
            render: (_: any, row: Vehicle) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleUpdateVehicle(row)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-500 rounded-lg text-green-700 font-medium text-xs hover:bg-green-100 transition-all"
                    >
                        <ArrowUpFromLine className="w-3 h-3" />
                        Update
                    </button>
                    <button
                        onClick={() => handleDeleteVehicle(row)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-300 rounded-lg text-red-700 font-medium text-xs hover:bg-red-100 transition-all"
                    >
                        <Trash2 className="w-3 h-3" />
                        Delete
                    </button>
                </div>
            ),
        },
    ];
    
    return (
        <div className="space-y-6">
            {/* Booking Details Section */}
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
                    <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                        Booking Details
                    </h1>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="px-6 py-2.5 bg-primary rounded-lg text-secondary-900 font-semibold hover:bg-primary-600 transition-all shadow-sm hover:shadow-md whitespace-nowrap text-sm">
                            Track Booking
                        </button>

                        <button type="submit" className="flex items-center gap-2 px-4 py-2.5 bg-[#C9FFCB] border border-[#4CAF50] rounded-lg text-green-700 font-medium text-xs transition-all whitespace-nowrap">
                            <ArrowUpFromLine className="size-3" />
                            Update
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium text-xs transition-all whitespace-nowrap">
                            <Trash2 className="size-3" />
                            Delete
                        </button>

                        <button className="flex items-center justify-center p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 transition-all">
                            <History className="size-4" />
                        </button>
                    </div>
                </div>

                {/* Booking Details Grid */}
                <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-x-[5%] gap-y-4">
                    <UserDetails data={allData} setData={setAllData} details={mainDetails}  />                    
                    <UserDetails data={allData} setData={setAllData} details={statusDetails}/>                    
                </div>

                {/* Vehicle Table Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 mt-10">
                    <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                        User Cars Details
                    </h1>

                    <button className="flex items-center justify-center p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 transition-all">
                        <History className="size-4" />
                    </button>
                </div>

                <div className="w-full mt-4">
                    <CustomTable
                        columns={vehicleColumns}
                        data={booking.vehicle ? [booking.vehicle] : []}
                        currentPage={1}
                        totalPages={1}
                        totalEntries={dummyVehicles.length}
                        pageSize={10}
                        onPageChange={(page) => console.log("Page changed:", page)}
                        isLoading={false}
                    />
                </div>
  
                <div>
                    <ServiceBoys data={service_boys} vehicleColumns={vehicleColumns} extraServices={extra_services} allData={allData} setAllData={setAllData} />
                </div>
            </div>
        </div>
    );
};

export default ManageBookingDetails;
