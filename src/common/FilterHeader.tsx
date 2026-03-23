import { useState } from "react";
import { Formik, Form } from "formik";
import { Search, SlidersHorizontal } from "lucide-react";
import { FormInput } from "./FormInput";
import { FormDropdown } from "./FormDropdown";
import { GenericFilterModal } from "./GenericFilterModal";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface ActionButton {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary";
    className?: string;
}

interface FilterHeaderProps {
    // Header
    subtitle?: string;

    // Search
    searchInitialValues: any;
    onSearchSubmit: (values: any) => void;
    searchPlaceholder?: string;

    // Filter Modal
    filterInitialValues: any;
    onFilterSubmit: (values: any) => void;
    filterModalTitle?: string;
    filterModalSubtitle?: string;
    filterFields?: ReactNode;

    // Action Buttons (optional)
    actionButtons?: ActionButton[];

    // Export Dropdown (optional)
    showExport?: boolean;
    exportOptions?: string[];
    onExport?: (value: string) => void;
}

export const FilterHeader = ({
    subtitle,
    searchInitialValues,
    onSearchSubmit,
    searchPlaceholder = "Search",
    filterInitialValues,
    onFilterSubmit,
    filterModalTitle = "Filter Options",
    filterModalSubtitle,
    filterFields,
    actionButtons = [],
    showExport = true,
    exportOptions = ['PDF', 'Excel', 'CSV'],
    onExport
}: FilterHeaderProps) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    return (
        <>
            <div className="mb-6 px-4">
                <Formik
                    initialValues={searchInitialValues}
                    onSubmit={onSearchSubmit}
                >
                    {() => (
                        <Form>
                            <div className="flex flex-col gap-4">
                                {/* Filters and Actions Row */}
                                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                                    {/* Left Side - Header + Search */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex flex-col shrink-0">
                                            <h1 className="text-lg md:text-xl font-bold text-secondary-900">
                                                Filter
                                            </h1>
                                            <p className="text-xs text-secondary-500 whitespace-nowrap">
                                                {subtitle}
                                            </p>
                                        </div>

                                        {/* Search */}
                                        <div className="flex flex-col sm:flex-row gap-3 items-center flex-1 min-w-0">
                                            <div className="w-full sm:max-w-[300px] -space-y-2">
                                                <FormInput
                                                    name="search"
                                                    label=""
                                                    placeholder={searchPlaceholder}
                                                    icon={<Search className="w-5 h-5" />}
                                                    className="mb-0"
                                                    checkmark={false}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full sm:w-auto px-6 py-3 h-fit bg-black rounded-lg text-white text-sm font-semibold transition-all hover:bg-black/85 shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Side - Filter & Action Buttons */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 xl:gap-4 shrink-0">
                                        {/* Filter Button */}
                                        {filterFields && <button
                                            type="button"
                                            onClick={() => setIsFilterModalOpen(true)}
                                            className="w-full sm:w-auto py-3 px-10 border border-gray-200 rounded-lg bg-[#F4F5FA] transition-colors hover:bg-gray-100 shrink-0"
                                        >
                                            <SlidersHorizontal className="w-5 h-5 text-secondary-700 mx-auto sm:mx-0" />
                                        </button>}

                                        {/* Action Buttons */}
                                        {actionButtons.map((button, index) => {
                                            const baseClasses = "w-full sm:w-auto px-4 py-3 flex justify-center items-center rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md whitespace-nowrap";
                                            const variantClasses = button.variant === "primary"
                                                ? "bg-primary text-secondary-900 hover:bg-primary-600"
                                                : "bg-secondary-900 text-white hover:bg-secondary-800";

                                            const className = button.className || `${baseClasses} ${variantClasses}`;

                                            if (button.href) {
                                                return (
                                                    <Link
                                                        key={index}
                                                        to={button.href}
                                                        className={className}
                                                    >
                                                        {button.label}
                                                    </Link>
                                                );
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={button.onClick}
                                                    className={className}
                                                >
                                                    {button.label}
                                                </button>
                                            );
                                        })}

                                        {/* Divider (only show if there are action buttons and export) */}
                                        {actionButtons.length > 0 && showExport && (
                                            <span className="hidden xl:block w-px h-10 bg-[#D2D2D2]"></span>
                                        )}

                                        {/* Export Dropdown */}
                                        {showExport && (
                                            <div className="w-full sm:w-auto sm:min-w-[120px] sm:max-w-[140px]">
                                                <FormDropdown
                                                    name="export"
                                                    label=""
                                                    placeholder="Export"
                                                    options={exportOptions}
                                                    onChangeExternal={onExport}
                                                    className="mb-2 w-full"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Filter Modal */}
            <GenericFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onSubmit={onFilterSubmit}
                initialValues={filterInitialValues}
                title={filterModalTitle}
                subtitle={filterModalSubtitle || subtitle}
            >
                {filterFields}
            </GenericFilterModal>
        </>
    );
};
