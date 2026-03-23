import axios from "axios";
import { store } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "sonner";

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
    const errorResponse = error.response;
    const errorData = errorResponse?.data;

    // Handle 401 Unauthorized
    if (errorResponse?.status === 401) {
      store.dispatch(logout());
      toast.error(errorData?.message ?? "Session expired. Please login again.");
      return Promise.reject(errorResponse);
    }

    // Handle Validation Errors (422, 400)
    if ([422, 400].includes(errorResponse?.status)) {
      if (errorData?.status === 'fail' && errorData?.data && typeof errorData.data === 'object') {
        Object.values(errorData.data).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg: string) => toast.error(msg));
          } else if (typeof messages === 'string') {
            toast.error(messages);
          }
        });
      } else if (errorData?.message) {
        toast.error(errorData.message);
      }
    } else if (errorResponse?.status !== 401) {
      // Fallback for other errors (500, etc.)
      toast.error(errorData?.message || "Something went wrong. Please try again.");
    }

    return Promise.reject(errorResponse || error);
  }
);

export default api;
