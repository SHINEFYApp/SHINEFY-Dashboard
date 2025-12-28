import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authStorage } from '../../lib/cookies';
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: User ; access: string; refresh: string; }>
        ) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.access;
            state.refreshToken = action.payload.refresh;

            // Save to sessionStorage
            authStorage.setToken(action.payload.access);
            authStorage.setRefreshToken(action.payload.refresh);
            authStorage.setUser(action.payload.user);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.refreshToken = null;

            // Clear storage
            authStorage.clearAuth();
        },
        initializeAuth: (state) => {
            // Initialize from sessionStorage
            const token = authStorage.getToken();
            const refreshToken = authStorage.getRefreshToken();
            const user = authStorage.getUser();

            if (token && user) {
                state.isAuthenticated = true;
                state.token = token;
                state.refreshToken = refreshToken;
                state.user = user;
            }
        },
    },
});

export const { loginSuccess, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
