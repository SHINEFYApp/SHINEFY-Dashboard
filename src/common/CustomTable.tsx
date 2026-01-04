import type { TableProps } from "../types/common";
import { cn } from "../utils/utils";
import { Pagination } from "./Pagination";
import KsaMan from '../assets/images/a2d5b399907e9638f3692bc625edb48bf22a9919.jpg'

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
}: TableProps<T>) {


    return (
        <div className="w-full bg-white rounded-lg border border-[#cfcfcf] overflow-hidden">
            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Table Header */}
                    <thead>
                        <tr className="border-b border-[#cfcfcf] bg-[#f0f0f0]">
                            {columns.map((column, index) => (
                                <th
                                    key={column.key}
                                    className={cn(
                                        "px-6 py-4 text-left text-nowrap text-sm font-semibold text-gray-700",
                                        index !== columns.length - 1 && "border-r border-[#cfcfcf]",
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
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="border-b border-[#cfcfcf] hover:bg-gray-50 transition-colors"
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={column.key}
                                            className={cn(
                                                "px-6 py-4 text-sm text-gray-600",
                                              (row[column.key] === 'Close' || row[column.key] === 'Deactivated' || row[column.key] === 'false') && 'text-red-600 font-bold text-[15px]' ,
                                              (row[column.key] === 'Open' || row[column.key] === 'Activated' || row[column.key] === 'true') && 'text-green-600 font-bold text-[15px]' ,
                                              (column.key === 'users') && 'max-w-[550px] overflow-hidden' ,
                                              (row[column.key] === 'Open' || row[column.key] === 'Activated' || row[column.key] === 'true' || row[column.key] === 'All') && 'text-green-600 font-bold text-[15px]' ,
                                              (row[column.key] === 'Pending') && 'text-[#FFC107] font-bold text-[15px]' ,
                                              (column.key === 'customers') && 'max-w-[300px] overflow-hidden' ,
                                                colIndex !== columns.length - 1 && "border-r border-[#cfcfcf]"
                                            )}
                                        >
                                            {/* {column.render ? column.render( row[column.key], row, rowIndex) : row[column.key]} */}
                                            {column.render 
                                                ? column.render(row[column.key], row, rowIndex) 
                                                : column.key.toLowerCase() === "image" || column.key.toLowerCase() === "flag" || column.key.toLowerCase() === "countries" || column.key.toLowerCase() === "mainareaname" || column.key.toLowerCase() === "customer" ? 
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-[36.4px] h-[26px] bg-black/30 rounded-[5.2px] overflow-hidden">
                                                            {row[column.key] &&
                                                                <img src={column.key.toLowerCase() === "flag" ? row[column.key] : column.key.toLowerCase() === "customer" ? row[column.key]?.image : row[column.key]?.flag} alt="flag" />
                                                            }
                                                        </div>
                                                        
                                                        {row[column.key]?.title || row[column.key]?.name &&
                                                            <p>{row[column.key].title || row[column.key]?.name}</p>
                                                        }
                                                    </div>
                                                    :
                                                    Array.isArray(row[column.key]) ?
                                                        <div className=" flex items-center gap-5">
                                                            {row[column.key].map((el : string , idx : number) => {
                                                                return(
                                                                    <div key={idx} className="p-2 flex gap-1 items-center rounded-2xl bg-[#FFF5D9]">
                                                                        {el === 'Eid Fathy' ? 
                                                                        <>
                                                                            <img src={KsaMan} alt="" className="w-5 h-5 rounded-2xl" />
                                                                            <p className="w-20">{el}</p>
                                                                        </>
                                                                        : el}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        :
                                                        row[column.key]
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalEntries={totalEntries}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                    />
                )
            }
        </div>
    );
}
