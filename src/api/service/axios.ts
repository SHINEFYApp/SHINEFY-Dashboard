import axios, { type AxiosInstance, type InternalAxiosRequestConfig, AxiosError } from 'axios';
import { authStorage } from '../../lib/cookies';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'user-type': 'driver',
        'app-version': 50,
        'cookie': ''
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = authStorage.getToken();

        const authEndpoints = ['login', 'register', 'request-otp', 'verify-otp', 'refresh'];
        const isAuthEndpoint = authEndpoints.some((endpoint) => config.url?.includes(endpoint));

        if (token && !isAuthEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor - Token Refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean; };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = authStorage.getRefreshToken();

                if (!refreshToken) {
                    authStorage.clearAuth();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                const response = await axios.post(`${baseURL}/auth/refresh/`, {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                authStorage.setToken(access);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                authStorage.clearAuth();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
