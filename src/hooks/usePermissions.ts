import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

/**
 * Hook to check user permissions based on privilege IDs from login response.
 * The user's `previlages` field is a comma-separated string of IDs (e.g. "1,29").
 */
export const usePermissions = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    const userPrivilegeIds: number[] = (() => {
        if (!user?.previlages) return [];
        if (Array.isArray(user.previlages)) return user.previlages.map(Number);
        if (typeof user.previlages === "string") {
            return user.previlages
                .split(",")
                .map((s) => Number(s.trim()))
                .filter(Boolean);
        }
        return [];
    })();

    const hasPermission = (permissionId: number | number[]): boolean => {
        // If user has no privileges at all (e.g. super admin), grant all access
        if (!user?.previlages) return true;

        if (Array.isArray(permissionId)) {
            return permissionId.some((id) => userPrivilegeIds.includes(id));
        }
        return userPrivilegeIds.includes(permissionId);
    };

    return { hasPermission, userPrivilegeIds };
};
