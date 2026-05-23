import { useTranslation } from "react-i18next";
import type { Column, TableProps } from "../types/common";
import { cn } from "../utils/utils";
import { Pagination } from "./Pagination";
import KsaMan from '../assets/images/a2d5b399907e9638f3692bc625edb48bf22a9919.jpg'
import { Link } from "react-router";
import { ChevronUp, ChevronDown } from "lucide-react";

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
    sortBy,
    sortOrder,
    onSort,
}: TableProps<T>) {
    const { t } = useTranslation();

    const handleHeaderClick = (column: Column<T>) => {
        if (!onSort || !column.sortable) return;
        const key = column.sortKey || column.key;
        if (sortBy === key) {
            onSort(key, sortOrder === "asc" ? "desc" : "asc");
        } else {
            onSort(key, "desc");
        }
    };

    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            {columns.map((column, index) => {
                                const sortKey = column.sortKey || column.key;
                                const isActive = column.sortable && sortBy === sortKey;
                                return (
                                    <th
                                        key={column.key}
                                        onClick={() => handleHeaderClick(column)}
                                        className={cn(
                                            "px-5 py-3.5 ltr:text-left rtl:text-right text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider",
                                            column.width,
                                            column.sortable && "cursor-pointer select-none hover:text-gray-700 transition-colors"
                                        )}
                                    >
                                        <span className="inline-flex items-center gap-1">
                                            {column.title}
                                            {column.sortable && isActive && (
                                                sortOrder === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                                            )}
                                            {column.sortable && !isActive && (
                                                <ChevronUp className="w-3.5 h-3.5 text-gray-300" />
                                            )}
                                        </span>
                                    </th>
                                );
                            })}
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
                                    {t('common.loading')}
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-16 text-center text-gray-400 text-sm"
                                >
                                    {t('common.noDataAvailable')}
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
                                                                {t('common.viewDetails')}
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
