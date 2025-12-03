import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '../../utils/utils';
import type { LayoutProps } from '../../types/layout';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
                setIsCollapsed(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                isCollapsed={isCollapsed}
                onToggle={toggleSidebar}
                currentPath={currentPath}
            />
            <Navbar
                onMenuClick={toggleSidebar}
                isCollapsed={isCollapsed}
                currentPath={currentPath}
            />

            {/* Main Content */}
            <main
                className={cn(
                    "pt-20 min-h-screen transition-all duration-300 ease-in-out",
                    isCollapsed ? 'ml-20' : 'ml-72'
                )}
            >
                <div className="p-6 animate-fade-in">
                    {children}
                </div>
            </main>

            {/* Mobile Overlay */}
            {isMobile && !isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden animate-fade-in"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
        </div>
    );
};
