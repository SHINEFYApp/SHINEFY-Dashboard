import { ArrowUpToLine, Eye, Trash2 } from "lucide-react";

export default function Coupon({color='green'} : {color?: string}){

    return(
        <div className="flex overflow-hidden w-fit rounded-tl-2xl rounded-bl-2xl">
            <svg width="72" height="175" role="img" aria-label="Scalloped tag SHINEFYY100">
                <mask id="scallop-mask">
                    <rect x="0" y="0" width="72" height="180" fill="white"/>
                    <circle cx="0" cy="25"  r="14" fill="black"/>
                    <circle cx="0" cy="65"  r="14" fill="black"/>
                    <circle cx="0" cy="105" r="14" fill="black"/>
                    <circle cx="0" cy="145" r="14" fill="black"/>
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
                    mask="url(#scallop-mask)"/>

                <g opacity="0.06" fill="#ffffff">
                    <circle cx="8" cy="25"  r="12"/>
                    <circle cx="8" cy="65"  r="12"/>
                    <circle cx="8" cy="105" r="12"/>
                    <circle cx="8" cy="145" r="12"/>
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
                    SHINEFYY100
                </text>
            </svg>
            <div className=" p-5 bg-[#F3F4F6] w-[277px] h-[175px] space-y-2 rounded-tr-2xl rounded-br-2xl">
                <div className=" flex justify-between items-center">
                    <h2 className=" text-[14px]">Minimum Amount</h2>
                    <span className=" text-[8px]">19-Nov-22 07:46 AM</span>
                </div>
                <div className=" flex justify-between">
                    <h3 className="text-[18px] font-extrabold">20000 EGP | D: 200</h3>
                    <span className="text-[15px] text-[#4CAF50]">10/5</span>
                </div>
                <div className=" flex gap-10 text-[10px]">
                    <h4>Start Date & Time</h4>
                    <span className="text-red-600">: 2022-11-19 10:00:00 </span>
                </div>
                <div className=" flex gap-10 text-[10px]">
                    <h4>End Date & Time</h4>
                    <span className="text-green-600">: 2022-11-20 12:00:00</span>  
                </div>
                <div className=" flex justify-center gap-2">
                     <button
                            className="text-[8px] flex-1 py-1 bg-white flex justify-center items-center gap-2 rounded-[2.75px]"
                            onClick={() => alert('view item')}
                        >
                        <Eye width={13} color="#1976D2" /> View
                    </button>
                    {color === 'green' &&
                        <button
                            className="text-[8px] flex-1 py-1 bg-white flex justify-center items-center gap-2 rounded-[2.75px]"
                            onClick={() => alert('updated item')}
                        >
                            <ArrowUpToLine width={13} color="#4CAF50" /> update
                        </button>
                    }
                    <button
                        className="text-[8px] flex-1 py-1 bg-white flex justify-center items-center gap-2 rounded-[2.75px]"
                        onClick={() => alert('deleted item')}
                    >
                        <Trash2 width={13} color="#F44336" /> delete
                    </button>
                </div>
            </div>
        </div>
    )
}