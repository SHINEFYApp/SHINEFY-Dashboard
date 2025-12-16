import { ArrowUpToLine, Trash2 } from "lucide-react";

export const countriesColumns = [
    {
        key: "flag",
        title: "Flag",
    },
    {
        key: "name",
        title: "Name",
    },
    {
        key: "createDateAndTime",
        title: "Create Date & Time",
    },
    {
        key: "action",
        title: "Action",
        render: () => (
            <div className="flex gap-2 items-center">
                <button
                    className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                    onClick={() => alert('updated item')}
                >
                    <ArrowUpToLine /> update
                </button>
                <button
                    className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                    onClick={() => alert('deleted item')}
                >
                    <Trash2 /> delete
                </button>
            </div>
        ),
    },
];
