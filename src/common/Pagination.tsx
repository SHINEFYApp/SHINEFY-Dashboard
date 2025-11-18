import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "../types/common";
import { cn } from "../utils/utils";

export const Pagination = ({
    currentPage,
    totalPages,
    totalEntries,
    pageSize,
    onPageChange,
}: PaginationProps) => {
    const startEntry = (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalEntries);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Show second page if current is 1 or 2
            if (currentPage <= 2) {
                pages.push(2);
            }

            // Show third page if current is 1
            if (currentPage === 1) {
                pages.push(3);
            }

            // Show ellipsis if current page is far from start
            if (currentPage > 3) {
                pages.push("...");
            }

            // Show current page and neighbors if not at start or end
            if (currentPage > 2 && currentPage < totalPages - 1) {
                if (currentPage > 3) {
                    pages.push(currentPage);
                }
            }

            // Show ellipsis before last page
            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
            {/* Left Side - Showing entries */}
            <div className="text-sm text-gray-600">
                Showing {startEntry} to {endEntry} of {totalEntries} entries
            </div>

            {/* Right Side - Page numbers */}
            <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                    )}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => {
                    if (page === "...") {
                        return (
                            <div
                                key={`ellipsis-${index}`}
                                className="min-w-12 h-12 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-900 font-medium"
                            >
                                ...
                            </div>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={cn(
                                "min-w-12 h-12 px-4 font-medium transition-colors",
                                currentPage === page
                                    ? " text-secondary-900 border-b-[3px] border-primary"
                                    : " bg-white text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                    )}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};