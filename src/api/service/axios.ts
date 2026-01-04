import axios from "axios";
import { store } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["app-type"] = "dashboard";

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401].includes(error.response?.status)) {
      store.dispatch(logout());
    }
    return Promise.reject(
      error.response?.data?.message ?? "Session expired. Please login again."
    );
  }
);

export default api;
