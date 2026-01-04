import axios from "axios";
import { store } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        store.dispatch(logout());
        }
        return Promise.reject('Your Session Is Ended Log In Again');
    }
);

export default api;
