import { Eye, ArrowUpToLine, Trash2, Shield } from "lucide-react";

export const manageSubAdminColumns = [
    {
        key: "image",
        title: "Image",
    },
    {
        key: "name",
        title: "Name",
    },
    {
        key: "email",
        title: "Email",
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
    },
    {
        key: "action",
        title: "Action",
        render: () => (
            <div className="flex gap-2 items-center">
                <button
                    className="bg-[#D0E8FF] flex items-center gap-2 rounded-[2.75px] text-[#1976D2] border border-[#1976D2] capitalize hover:text-[#D0E8FF] hover:bg-[#1976D2] px-2 py-3 font-semibold transition-colors"
                    onClick={() => alert('updated item')}
                >
                    <Eye /> View
                </button>
                <button
                    className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-2 py-3 font-semibold transition-colors"
                    onClick={() => alert('updated item')}
                >
                    <ArrowUpToLine /> Update
                </button>
                <button
                    className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-2 py-3 font-semibold transition-colors"
                    onClick={() => alert('deleted item')}
                >
                    <Trash2 /> Delete
                </button>
                <button
                    className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3 py-3 font-semibold transition-colors"
                    onClick={() => alert('deleted item')}
                >
                    <Shield /> Deactivated
                </button>
            </div>
        ),
    },
];
