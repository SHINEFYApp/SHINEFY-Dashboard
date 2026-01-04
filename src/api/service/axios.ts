import axios from "axios";
import { store } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "sonner";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      toast.error('Your Session Is Ended Log In Again');
    }
    return Promise.reject(error.response)
  }
);

export default api;
