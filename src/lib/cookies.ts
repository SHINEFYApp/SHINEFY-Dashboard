const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

export const authStorage = {
    // Set token
    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(TOKEN_KEY, token);
        }
    },

    // Get token
    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(TOKEN_KEY);
        }
        return null;
    },

    // Set refresh token
    setRefreshToken: (refreshToken: string) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
    },

    // Get refresh token
    getRefreshToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(REFRESH_TOKEN_KEY);
        }
        return null;
    },

    // Set user data
    setUser: (user: any) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        }
    },

    // Get user data
    getUser: (): any | null => {
        if (typeof window !== 'undefined') {
            const userStr = sessionStorage.getItem(USER_KEY);
            if (userStr) {
                try {
                    return JSON.parse(userStr);
                } catch {
                    return null;
                }
            }
        }
        return null;
    },

    // Clear all auth data
    clearAuth: () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem(TOKEN_KEY);
            sessionStorage.removeItem(REFRESH_TOKEN_KEY);
            sessionStorage.removeItem(USER_KEY);
        }
    },
};
