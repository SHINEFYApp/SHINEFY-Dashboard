import { Pen, X } from "lucide-react";
import type { BookingState, DetailItem } from "../../types/bookings";
import { cn } from "../../utils/utils";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Input } from "../ui/input";
import Loader from "../../common/loader";
import { CalenderList } from "../../common/clalenderList";
import { Textarea } from "../ui/textarea";

interface userBookingDetailsProps {
    data : BookingState | null
    setData : Dispatch<SetStateAction<BookingState | null >>
    details : any
}

export default function UserDetails({data , setData , details} : userBookingDetailsProps) {
    const badgeColors = {
        yellow: "bg-[#fff9e6] border-primary text-secondary-900 px-3.5 py-[9px] border rounded-lg",
        green: "bg-green-50 border-green-200 text-green-700 px-3.5 py-[9px] border rounded-lg",
        blue: "bg-blue-50 border-blue-200 text-blue-700 px-3.5 py-[9px] border rounded-lg",
        red: "bg-red-50 border-red-200 text-red-700 px-3.5 py-[9px] border rounded-lg",
        purple: "bg-purple-50 border-purple-200 text-purple-700 px-3.5 py-[9px] border rounded-lg",
    };

    const [selectList , setSelectList] = useState({
        list: '',
        state: false
    })


    const renderValue = (value: string | number | Date | null) => {
        if (value === null || value === undefined) return "—"; 
        if (value instanceof Date) return value.toLocaleDateString("en-GB");
        return String(value); 
    };

    if (!data) return <Loader />;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center py-3">
            {/* Label */}
            <div className="text-gray-500 sm:text-lg w-full sm:w-auto sm:shrink-0 text-sm!">
            </div>

            {/* Value */}
            <form
                className="space-y-10"
                onSubmit={(e) => {
                    e.preventDefault()
            }}>
                {details.map((item: DetailItem) => {
                        const value = data[item.key];
                        return(
                            <div key={item.key} className=" flex items-center gap-2">
                                <p className=" text-[#8B8D97] text-[16px] w-50">{item.label} :</p>
                                {item.type === 'badge' ?
                                    <div className=" flex gap-5">
                                        <div 
                                            className={cn(
                                                'px-5 py-[9px] border size-fit rounded-lg',
                                                badgeColors[item.badgeColor ?? "yellow"]
                                            )}
                                        >{renderValue(value)}</div>
                                        {item.actionButton &&
                                            <button onClick={item.actionButton.onClick} className={cn(
                                                "flex items-center gap-2",
                                                badgeColors.blue
                                            )}><item.actionButton.icon size='15'/>{item.actionButton.text}</button>
                                        }
                                    </div>
                                    :
                                    item.type === 'text'?
                                        <Input
                                            className={cn(

                                                    badgeColors[item.badgeColor ?? "yellow"]
                                                )}
                                            type="text" value={renderValue(value)} onChange={(e) => {
                                            setData?.({...data , [item.key] : e.target.value})
                                        }} />
                                        :
                                    item.type === 'select' ?
                                        <div className="relative flex gap-2 items-center">
                                            <span className={cn(
                                                'capitalize',
                                                badgeColors[item.badgeColor ?? 'yellow']
                                            )}>
                                                {renderValue(value)}
                                            </span>         
                                            <button
                                            onClick={() => {
                                                setSelectList(prev => ({
                                                    list: item.key,
                                                    state: prev.list === item.key ? !prev.state : true
                                                }));

                                            }}
                                            className='p-2 rounded-lg'>
                                                {(selectList.state && selectList.list === item.key) ?
                                                    <X size='15'/>
                                                    :
                                                    <Pen size='15'/>
                                                }
                                            </button>
                                            {(selectList.list === item.key && selectList.state) &&
                                                <div className={cn(
                                                    'absolute top-15 left-0 flex flex-col gap-2 z-10',
                                                    badgeColors[item.badgeColor ?? "yellow"]
                                                )}>
                                                    {item.options.map((opt) => {
                                                        return(
                                                            <button key={opt}
                                                            onClick={() => {
                                                                setData({...data , [item.key] : opt })
                                                            }}
                                                            className={`${opt.toLowerCase() === renderValue(value).toLowerCase() ? 'bg-black text-white' : ' hover:bg-black/10'} rounded-lg py-3 px-5 w-50`}>{opt}</button>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                        :
                                    item.type === 'date' ?
                                        <div>
                                            <CalenderList
                                                date={renderValue(value) ? new Date(renderValue(value)) : undefined}
                                                setDate={(e) => {
                                                    setData({
                                                    ...data,
                                                    [item.key]: e ? e.toLocaleString() : null,
                                                    });
                                                }}
                                                className={cn(
                                                    badgeColors[item.badgeColor ?? 'yellow']
                                                )}
                                            />
                                        </div>
                                        :
                                    item.type === 'time' ?
                                        <div>
                                            <Input
                                                type="time"
                                                id="time-picker"
                                                step="1"
                                                defaultValue={renderValue(value)}
                                                onChange={(e) => {
                                                    setData({...data , [item.key] : e.target.value })
                                                }}
                                                className={cn(
                                                    "cursor-text appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
                                                    badgeColors[item.badgeColor ?? 'yellow']
                                                )}
                                            />
                                        </div>
                                        :
                                        <div>
                                            <Textarea 
                                                className={cn(
                                                    'resize-none max-w-[300px]',
                                                    badgeColors[item.badgeColor ?? 'yellow']
                                                )} 
                                                placeholder={`Type Your ${item.label} Here.`}
                                                value={renderValue(value)}
                                                onChange={(e) => {
                                                    setData({...data , [item.key] : e.target.value })
                                                }}
                                            />
                                        </div>
                                }   
                            </div>
                        )
                    })}
            </form>
        </div>
    );
};
