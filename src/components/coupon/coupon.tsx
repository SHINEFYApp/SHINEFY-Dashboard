import { ArrowUpToLine, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { CouponItem } from "../../api/features/coupons";

interface CouponProps {
    data: CouponItem;
    onDelete: (id: number) => void;
}

export default function Coupon({ data, onDelete }: CouponProps) {
    const isActive = data.status === 1; // Assuming 1 is active
    const color = isActive ? 'green' : 'red';

    // Format dates if needed, or use raw string
    // data.start_at

    return (
        <div className="flex overflow-hidden w-fit rounded-tl-2xl rounded-bl-2xl">
            <svg width="72" height="175" role="img" aria-label={`Coupon ${data.code}`}>
                <mask id={`scallop-mask-${data.id}`}>
                    <rect x="0" y="0" width="72" height="180" fill="white" />
                    <circle cx="0" cy="25" r="14" fill="black" />
                    <circle cx="0" cy="65" r="14" fill="black" />
                    <circle cx="0" cy="105" r="14" fill="black" />
                    <circle cx="0" cy="145" r="14" fill="black" />
                </mask>

                <path d="
                    M 0 0
                    L 106 0
                    Q 120 0 120 14
                    L 120 157
                    Q 120 180 106 180
                    L 0 180
                    Z"
                    fill={color}
                    mask={`url(#scallop-mask-${data.id})`} />

                <g opacity="0.06" fill="#ffffff">
                    <circle cx="8" cy="25" r="12" />
                    <circle cx="8" cy="65" r="12" />
                    <circle cx="8" cy="105" r="12" />
                    <circle cx="8" cy="145" r="12" />
                </g>

                <text
                    x="125" y="135"
                    transform="rotate(-90 60 155)"
                    fill="#ffffff"
                    fontFamily="Inter, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="18"
                    textAnchor="middle"
                    dominantBaseline="central">
                    {data.code}
                </text>
            </svg>
            <div className=" p-5 bg-[#F3F4F6] w-[277px] h-[175px] space-y-2 rounded-tr-2xl rounded-br-2xl">
                <div className=" flex justify-between items-center">
                    <h2 className=" text-[14px]">Minimum Amount</h2>
                    <span className=" text-[8px]">{data.start_at}</span>
                </div>
                <div className=" flex justify-between">
                    <h3 className="text-[18px] font-extrabold">{data.amount} EGP | D: {data.discount_percent}</h3>
                    {/* Assuming usage count logic if available, using placeholder or data field */}
                    <span className="text-[15px] text-[#4CAF50]">-</span>
                </div>
                <div className=" flex gap-10 text-[10px]">
                    <h4>Start Date & Time</h4>
                    <span className="text-red-600">: {data.start_at} </span>
                </div>
                <div className=" flex gap-10 text-[10px]">
                    <h4>End Date & Time</h4>
                    <span className="text-green-600">: {data.end_at}</span>
                </div>
                <div className=" flex justify-center gap-2">
                    <Link
                        to={`/services&extra/manage/coupon/view/${data.id}`}
                        className="text-[8px] flex-1 py-1 bg-white flex justify-center items-center gap-2 rounded-[2.75px] text-[#1976D2]"
                    >
                        <Eye width={13} /> View
                    </Link>
                    <Link
                        to={`/services&extra/manage/coupon/edit/${data.id}`}
                        className="text-[8px] flex-1 py-1 bg-white flex justify-center items-center gap-2 rounded-[2.75px] text-[#4CAF50]"
                    >
                        <ArrowUpToLine width={13} /> update
                    </Link>

                    <button
                        className="text-[8px] flex-1 py-1 bg-white flex justify-center items-center gap-2 rounded-[2.75px] text-[#F44336]"
                        onClick={() => onDelete(data.id)}
                    >
                        <Trash2 width={13} /> delete
                    </button>
                </div>
            </div>
        </div>
    )
}