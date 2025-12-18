import { Eye, MapPin, Clock, Trash2, Ban, ArrowUpToLine } from "lucide-react";
import { Link } from "react-router";

export const manageServiceBoyColumns = [
    {
        key: "image",
        title: "Image",
        render: (image: string) => (
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={image} alt="Service Boy" className="w-full h-full object-cover" />
            </div>
        ),
    },
    {
        key: "name",
        title: "Name",
    },
    {
        key: "phoneNumber",
        title: "Phone Number",
    },
    {
        key: "registrationOn",
        title: "Registration On",
    },
    {
        key: "status",
        title: "Status",
        render: (status: string) => (
            <span
                className={`font-bold ${status === "Activated" ? "text-green-600" : "text-red-600"
                    }`}
            >
                {status}
            </span>
        ),
    },
    {
        key: "action",
        title: "Action",
        width: "w-[600px]",
        render: (_: any, record: any) => (
            <div className="flex gap-2 items-center text-nowrap">
                <Link
                    to={`/users&staff/manageServiceBoy/${record.id}`}
                    className="bg-[#D2E3FF] flex items-center gap-2 rounded-[2.75px] text-[#2196F3] border border-[#2196F3] capitalize hover:text-[#D2E3FF] hover:bg-[#2196F3] px-3.5 py-3 font-semibold transition-colors"
                >
                    <Eye size={18} /> View
                </Link>
                <Link
                    to={`/users&staff/manageServiceBoy/${record.id}`}
                    state={{ mode: 'edit' }}
                    className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                >
                    <ArrowUpToLine size={18} /> update
                </Link>
                <button
                    className="bg-[#E1BEE7] flex items-center gap-2 rounded-[2.75px] text-[#9C27B0] border border-[#9C27B0] capitalize hover:text-[#E1BEE7] hover:bg-[#9C27B0] px-3.5 py-3 font-semibold transition-colors"
                    onClick={() => alert('Edit Areas')}
                >
                    <MapPin size={18} /> Edit Areas
                </button>
                <button
                    className="bg-[#FFE0B2] flex items-center gap-2 rounded-[2.75px] text-[#FF9800] border border-[#FF9800] capitalize hover:text-[#FFE0B2] hover:bg-[#FF9800] px-3.5 py-3 font-semibold transition-colors"
                    onClick={() => alert('Temporary Off Time')}
                >
                    <Clock size={18} /> Off Time
                </button>
                <button
                    className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                    onClick={() => alert('deleted item')}
                >
                    <Trash2 size={18} /> delete
                </button>
                <button
                    className="bg-[#F5F5F5] flex items-center gap-2 rounded-[2.75px] text-[#757575] border border-[#757575] capitalize hover:text-[#F5F5F5] hover:bg-[#757575] px-3.5 py-3 font-semibold transition-colors"
                    onClick={() => alert('Deactivate')}
                >
                    <Ban size={18} /> Deactivate
                </button>
            </div>
        ),
    },
];
