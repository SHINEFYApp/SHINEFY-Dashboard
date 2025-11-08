// NAVBAR
export interface NavbarProps {
    onMenuClick: () => void;
    isCollapsed: boolean;
    currentPath?: string;
}

export interface BreadcrumbItem {
    label: string;
    path: string;
    isActive: boolean;
}

//  SIDEBAR
export interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    currentPath?: string;
}

export interface SubItem {
    icon: React.ReactNode;
    label: string;
    path: string;
}

export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path?: string;
    subItems?: SubItem[];
    isActive?: boolean;
}

// LAYOUT
export interface LayoutProps {
    children: React.ReactNode;
}