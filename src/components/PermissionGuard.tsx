import { Navigate } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";
import type { JSX } from "react";

interface PermissionGuardProps {
    permissionId: number | number[];
    children: JSX.Element;
}

/**
 * Wraps a route element. If the user lacks the required permission,
 * redirects to the dashboard ("/"). Otherwise renders children.
 */
export const PermissionGuard = ({ permissionId, children }: PermissionGuardProps) => {
    const { hasPermission } = usePermissions();

    if (!hasPermission(permissionId)) {
        return <Navigate to="/" replace />;
    }

    return children;
};
