import type { TableProps } from "../types/common";
import { cn } from "../utils/utils";
import { Pagination } from "./Pagination";

export function CustomTable<T extends Record<string, any>>({
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
                                              (row[column.key] === 'Close' || row[column.key] === 'Deactivated') && 'text-red-600 font-bold text-[15px]' ,
                                              (row[column.key] === 'Open' || row[column.key] === 'Activated') && 'text-green-600 font-bold text-[15px]' ,
                                                colIndex !== columns.length - 1 && "border-r border-[#cfcfcf]"
                                            )}
                                        >
                                            {/* {column.render ? column.render( row[column.key], row, rowIndex) : row[column.key]} */}
                                            {column.render 
                                                ? column.render(row[column.key], row, rowIndex) 
                                                : column.key.toLowerCase() === "image" ? 
                                                    <div className="w-10 h-10 bg-black/30 rounded-xl"></div>
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
            )}
        </div>
    );
}
