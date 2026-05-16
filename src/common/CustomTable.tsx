import type { TableProps } from "../types/common";
import { cn } from "../utils/utils";
import { Pagination } from "./Pagination";
import KsaMan from '../assets/images/a2d5b399907e9638f3692bc625edb48bf22a9919.jpg'
import { Link } from "react-router";

export function CustomTable<T extends Record<string, any>>({
    page ,
    columns,
    data,
    currentPage,
    totalPages,
    totalEntries,
    pageSize,
    onPageChange,
    isLoading = false,
    onRowClick,
}: TableProps<T>) {


    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            {columns.map((column, index) => (
                                <th
                                    key={column.key}
                                    className={cn(
                                        "px-5 py-3.5 text-left text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                        column.width
                                    )}
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-16 text-center text-gray-400 text-sm"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-16 text-center text-gray-400 text-sm"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => onRowClick?.(row)}
                                    className={cn(
                                        "border-b border-gray-100 transition-colors",
                                        rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/40",
                                        "hover:bg-blue-50/40",
                                        onRowClick && "cursor-pointer"
                                    )}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={column.key}
                                            className={cn(
                                                "px-5 py-3.5 text-sm text-gray-600",
                                              (row[column.key] === 'Close' || row[column.key] === 'Deactivated' || row[column.key] === 'false') && 'text-red-600 font-bold text-[15px]' ,
                                              (row[column.key] === 'Open' || row[column.key] === 'Activated' || row[column.key] === 'true') && 'text-green-600 font-bold text-[15px]' ,
                                              (column.key === 'users') && 'max-w-[550px] overflow-hidden' ,
                                              (row[column.key] === 'Open' || row[column.key] === 'Activated' || row[column.key] === 'true' || row[column.key] === 'All') && 'text-green-600 font-bold text-[15px]' ,
                                              (row[column.key] === 'Pending') && 'text-[#FFC107] font-bold text-[15px]' ,
                                              (column.key === 'customers') && 'max-w-[300px] overflow-hidden'
                                            )}
                                        >
                                            {column.render 
                                                ? column.render(row[column.key], row, rowIndex) 
                                                : column.key.toLowerCase() === "image" || column.key.toLowerCase() === "flag" || column.key.toLowerCase() === "countries" || column.key.toLowerCase() === "mainareaname" || column.key.toLowerCase() === "customer" ? 
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-[36px] h-[26px] bg-gray-200 rounded-md overflow-hidden shrink-0">
                                                            {row[column.key] &&
                                                                <img src={column.key.toLowerCase() === "flag" ? row[column.key] : column.key.toLowerCase() === "customer" ? row[column.key]?.image : row[column.key]?.flag} alt="flag" className="w-full h-full object-cover" />
                                                            }
                                                        </div>
                                                        
                                                        {row[column.key]?.title || row[column.key]?.name &&
                                                            <p className="text-sm font-medium text-gray-700">{row[column.key].title || row[column.key]?.name}</p>
                                                        }
                                                    </div>
                                                    :
                                                    Array.isArray(row[column.key]) ?
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            {row[column.key].map((el : string , idx : number) => {
                                                                return(
                                                                    <div key={idx} className="px-3 py-1 flex gap-1 items-center rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                                                                        {el === 'Eid Fathy' ? 
                                                                        <>
                                                                            <img src={KsaMan} alt="" className="w-4 h-4 rounded-full" />
                                                                            <span>{el}</span>
                                                                        </>
                                                                        : <span>{el}</span>}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        :
                                                        column.dynmincPage === 'single_booking_details' ? 
                                                            <Link to={`/bookings/manage/${row.booking_id}`} className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                                                                View Details
                                                            </Link>
                                                            :
                                                            column.key === 'car_category_image'?
                                                                <img src={KsaMan} alt="" className="w-16 h-16 rounded-xl object-cover" />
                                                                :
                                                                <span className="text-gray-700">{row[column.key]}</span>
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!isLoading && data.length > 0 && (
                <div className="border-t border-gray-200">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={totalEntries}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
}
