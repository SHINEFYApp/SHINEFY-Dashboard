import { useMemo } from 'react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IoChevronDown } from 'react-icons/io5';
import { BsGrid } from 'react-icons/bs';
import { cn } from '../../utils/utils';
import type { BreadcrumbItem, NavbarProps } from '../../types/layout';
import { routeConfig } from '../../constants/data';

export const Navbar: React.FC<NavbarProps> = ({ isCollapsed, currentPath = '/dashboard' }) => {

    const { pageTitle, breadcrumbs } = useMemo(() => {
        const config = routeConfig[currentPath] || {
            title: 'Dashboard',
            breadcrumbs: ['Dashboard']
        };

        const breadcrumbItems: BreadcrumbItem[] = config.breadcrumbs.map((label, index) => ({
            label,
            path: currentPath,
            isActive: index === config.breadcrumbs.length - 1
        }));

        return {
            pageTitle: config.title,
            breadcrumbs: breadcrumbItems
        };
    }, [currentPath]);

    return (
        <header
            className={cn(
                "fixed top-0 right-0 h-20 bg-white transition-all duration-300 ease-in-out shadow-md z-20",
                isCollapsed ? 'left-20' : 'left-72'
            )}
        >
            <div className="h-full flex items-center justify-between px-6">
                {/* Left Section - Page Title */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl md:text-3xl mb-4 font-bold text-secondary-900">
                            {pageTitle}
                        </h1>
                    </div>
                </div>

                {/* Right Section - Dropdowns & Submit */}
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="hidden md:flex items-center gap-2 bg-transparent border-gray-300 hover:border-primary hover:bg-white/50 transition-all"
                            >
                                <span className="text-sm font-medium">Egypt</span>
                                <IoChevronDown className="w-4 h-4 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 bg-white/95 backdrop-blur-md">
                            <DropdownMenuItem className="cursor-pointer">Egypt</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Saudi Arabia</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">UAE</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="hidden md:flex items-center gap-2 bg-transparent border-gray-300 hover:border-primary hover:bg-white/50 transition-all"
                            >
                                <span className="text-sm font-medium">Al Shorouk City</span>
                                <IoChevronDown className="w-4 h-4 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-md">
                            <DropdownMenuItem className="cursor-pointer">Al Shorouk City</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">New Cairo</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Nasr City</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Maadi</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        className="bg-primary hover:bg-primary-700 text-[#1a1a1a] font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-xl px-8"
                    >
                        Submit
                    </Button>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="hidden sm:flex absolute bottom-0 left-6 items-center gap-2 text-sm text-gray-500 pb-2">
                <BsGrid className="w-4 h-4 text-primary" />
                {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span
                            className={cn(
                                "transition-colors",
                                crumb.isActive
                                    ? "text-secondary-900 font-medium"
                                    : ""
                            )}
                        >
                            {crumb.label}
                        </span>
                        {index < breadcrumbs.length - 1 && (
                            <span className="text-gray-400">/</span>
                        )}
                    </div>
                ))}
            </div>
        </header>
    );
};
