import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface User {
  user_id: number;
  name: string;
  email: string;
  user_type: number;
  previlages: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      Cookies.remove('token');
      Cookies.remove('user');
    },
    initializeAuth: (state) => {
        const token = Cookies.get("token");
        const user = Cookies.get("user");

        if (token && user) {
            state.isAuthenticated = true;
            state.token = token;
            state.user = JSON.parse(user);
        }

        state.isInitialized = true;
    }

  },
});

export const { loginSuccess, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
