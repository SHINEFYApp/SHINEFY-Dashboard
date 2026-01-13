import { ArrowUpToLine, Trash2 } from "lucide-react";

export const manageColorColumns = [
    {
        key: "color_code",
        title: "Color",
        render: (text: string) => <div className="w-20 h-6 rounded-b-sm" style={{ backgroundColor: text }}></div>,
    },
    {
        key: "color_code",
        title: "Color Code",
    },
    {
        key: "color_name",
        title: "English Color Name",
    },
    {
        key: "color_name_arabic",
        title: "Arabic Color Name",
    },
    {
        key: "createtime",
        title: "Create Date & Time",
    },
    {
        key: "action",
        title: "Action",
        render: (_: any, row: any) => (
            <div className="flex gap-2 items-center">
                <button
                    className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                    onClick={() => console.log('Update', row.color_id)}
                >
                    <ArrowUpToLine /> update
                </button>
                <button
                    className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                    onClick={() => console.log('Delete', row.color_id)}
                >
                    <Trash2 /> delete
                </button>
            </div>
        ),
    },
];

