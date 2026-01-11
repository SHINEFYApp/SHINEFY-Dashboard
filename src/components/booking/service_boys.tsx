import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { CustomTable } from "../../common/CustomTable"
import { CalenderList } from "../../common/clalenderList"
import { cn } from "../../utils/utils"
import { ArrowUpFromLine, Trash2 } from "lucide-react"
import type { JSX } from "react/jsx-runtime"
import type { BookingState } from "../../types/bookings"
import { SkeletonDemo } from "../../common/loader"

type FieldKey = keyof BookingState

interface ServiceBoysProps {
    data: any[]
    vehicleColumns: any[]
    extraServices: any[]
    allData: BookingState | null
    setAllData: (data: BookingState) => void
}

function toInputValue(val: any): string {
    if (val === null || val === undefined) return ''
    if (val instanceof Date) return val.toLocaleString()
    return String(val)
}

export default function ServiceBoys({
    data,
    vehicleColumns,
    allData,
    setAllData,
    extraServices
}: ServiceBoysProps) {

    const extraServicesColumns: any[] = [
        { key: "extra_service_name", title: "Extra Service Name" },
        { key: "extra_service_name_arabic", title: "Extra Service Name Arabic" },
        { key: "extra_service_description", title: "Extra Service Description" },
        { key: "extra_services_total_price", title: "Extra Services total Price" },
        { key: "extra_services_quantity", title: "Extra Services Quantity" },
        {
            key: "action",
            title: "Action",
            width: "w-48",
            render: (_: any, row: any) => (
                <div className="flex items-center gap-2">
                <button
                    onClick={() => console.log(row)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-500 rounded-lg text-green-700 font-medium text-xs hover:bg-green-100 transition-all"
                >
                    <ArrowUpFromLine className="w-3 h-3" /> Update
                </button>
                <button
                    onClick={() => alert(row)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-300 rounded-lg text-red-700 font-medium text-xs hover:bg-red-100 transition-all"
                >
                    <Trash2 className="w-3 h-3" /> Delete
                </button>
                </div>
            ),
        }
    ]

    const sectionFields: {
            sectionKey: string
            title: string
            render: () => JSX.Element
            feilds?: {
            feildKey: FieldKey
            label: string
            type: "text" | "number" | "textArea" | "date" | "time"
            placeholder: string
            name: FieldKey
            className?: string
        }[]
    }[] = [
        {
        sectionKey: 'Services_Boys',
        title: 'Services Boys',
        render: () => (
            <CustomTable
                columns={vehicleColumns}
                data={data}
                currentPage={1}
                totalPages={1}
                totalEntries={data.length}
                pageSize={10}
                onPageChange={(page) => console.log("Page changed:", page)}
                isLoading={false}
            />
        )
        },
        {
        sectionKey: 'Extra_Services',
        title: 'Extra Services',
        render: () => (
            <CustomTable
                columns={extraServicesColumns}
                data={extraServices}
                currentPage={1}
                totalPages={1}
                totalEntries={extraServices.length}
                pageSize={10}
                onPageChange={(page) => console.log("Page changed:", page)}
                isLoading={false}
            />
        )
        },
        {
        sectionKey: 'Services',
        title: 'Services',
        render: () => (
            <CustomTable
                columns={vehicleColumns}
                data={data}
                currentPage={1}
                totalPages={1}
                totalEntries={data.length}
                pageSize={10}
                onPageChange={(page) => console.log("Page changed:", page)}
                isLoading={false}
            />
        ),
        feilds: [
            { feildKey: 'Coupon_Applied', label: 'Coupon Applied :', type: 'text', placeholder: 'Coupon', name: 'Coupon_Applied', className: 'border border-[#E9EAEC] bg-[#F4F5FA]' },
            { feildKey: 'Coupon_Code', label: 'Coupon Code :', type: 'text', placeholder: 'Coupon Code', name: 'Coupon_Code', className: 'border border-[#E9EAEC] bg-[#F4F5FA]' },
            { feildKey: 'Coupon_Amount', label: 'Coupon Amount :', type: 'number', placeholder: 'Coupon Amount', name: 'Coupon_Amount', className: 'border border-[#E9EAEC] bg-[#F4F5FA]' },
            { feildKey: 'Sub_Total', label: 'Sub Total :', type: 'number', placeholder: 'Sub Total', name: 'Sub_Total', className: 'border border-[#06880B] bg-[#DAFFDC]' },
            { feildKey: 'Wallet_Amount', label: 'Wallet Amount :', type: 'number', placeholder: 'Wallet Amount', name: 'Wallet_Amount', className: 'border border-[#E9EAEC] bg-[#F4F5FA]' },
            { feildKey: 'Gradn_Total', label: 'Gradn Total :', type: 'number', placeholder: 'Gradn Total', name: 'Gradn_Total', className: 'border border-[#06880B] bg-[#DAFFDC]' },
            { feildKey: 'User_Note', label: 'User Note :', type: 'textArea', placeholder: 'User Note', name: 'User_Note', className: 'h-30' },
            { feildKey: 'Admin_Note', label: 'Admin Note :', type: 'textArea', placeholder: 'Admin Note', name: 'Admin_Note', className: 'h-50' },
            { feildKey: 'Create_Date', label: 'Create Date :', type: 'date', placeholder: 'Create Date', name: 'Create_Date', className: 'border border-[#E9EAEC] bg-[#F4F5FA]' },
            { feildKey: 'Create_Time', label: 'Create Time :', type: 'time', placeholder: 'Create Time', name: 'Create_Time', className: 'border border-[#E9EAEC] bg-[#F4F5FA]' },
        ]
        }
    ]

    if (!allData) return <SkeletonDemo />

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                {sectionFields.map(section => (
                    <div key={section.sectionKey}>
                        <h1 className="text-xl md:text-2xl font-bold text-secondary-900 pb-6 border-b border-gray-200 mt-10">{section.title}</h1>
                        <div className="w-full mt-4">{section.render()}</div>

                        {section.feilds && (
                            <div className="grid grid-cols-3 mt-5">
                                <div className="grid grid-cols-1 gap-5">
                                {section.feilds.map(el => {
                                    const rawValue = allData[el.feildKey]
                                    const dateValue = rawValue instanceof Date ? rawValue : rawValue ? new Date(rawValue) : undefined;
                                    const timeValue = rawValue instanceof Date ? rawValue.toISOString().substring(11, 16) : (typeof rawValue === 'string' ? rawValue : '')

                                    // textarea
                                    if (el.type === 'textArea') {
                                        return (
                                            <div key={el.feildKey}>
                                            <label htmlFor={el.feildKey} className="text-black font-bold text-[16px]">{el.label}</label>
                                            <Textarea
                                                value={toInputValue(rawValue)}
                                                placeholder={el.placeholder}
                                                onChange={(e) => setAllData({...allData, [el.feildKey]: e.target.value})}
                                                className={cn('resize-none mt-5 max-w-full bg-[#F4F5FA] border border-[#E9EAEC] py-[22px] px-[14px]', el.className)}
                                            />
                                            </div>
                                        )
                                    }

                                    // date
                                    if (el.type === 'date') {
                                        return (
                                            <div key={el.feildKey} className="flex justify-between items-center">
                                            <label className="text-[#8B8D97] text-[16px]">{el.label}</label>
                                            <CalenderList
                                                date={dateValue}
                                                setDate={(d) => setAllData({...allData, [el.feildKey]: d ?? null})}
                                                className={cn('w-[212px]', el.className)}
                                            />
                                            </div>
                                        )
                                    }

                                    // time
                                    if (el.type === 'time') {
                                        return (
                                            <div key={el.feildKey} className="flex justify-between items-center">
                                            <label className="text-[#8B8D97] text-[16px]">{el.label}</label>
                                            <Input
                                                type="time"
                                                step="1"
                                                value={timeValue}
                                                onChange={(e) => {
                                                    const t = e.target.value
                                                    setAllData({...allData, [el.feildKey]: t ? new Date(`1970-01-01T${t}`) : null})
                                                }}
                                                className={cn("cursor-text w-[212px] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none", el.className)}
                                            />
                                            </div>
                                        )
                                    }

                                    // default input (text/number)
                                        return (
                                            <div key={el.feildKey} className={`py-2 flex justify-between items-center ${el.feildKey === 'Wallet_Amount' ? 'border-y border-gray-200 py-5' : el.feildKey === 'Gradn_Total' ? 'border-b border-gray-200 pb-5' : ''}`}>
                                                <label htmlFor={el.feildKey} className="text-[#8B8D97] text-[16px]">{el.label}</label>
                                                <Input
                                                    value={toInputValue(rawValue)}
                                                    type={el.type}
                                                    placeholder={el.placeholder}
                                                    id={el.feildKey}
                                                    onChange={(e) => setAllData({...allData, [el.feildKey]: e.target.value})}
                                                    className={cn("outline-0 w-[212px] h-10", el.className)}
                                                />
                                            </div>
                                        )
                                })}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </form>
        </div>
    )
}
