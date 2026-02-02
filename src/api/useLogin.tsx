import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import api from "./service/axios";
import { loginSuccess } from "../redux/slices/authSlice";
import { store } from "../redux/store";


interface LoginValues {
  email: string;
  password: string;
  remember?: boolean;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    user_id: number;
    name: string;
    email: string;
    user_type: number;
    previlages: string | null;
  };
}

const loginRequest = async (values: LoginValues): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    "/api/dashboard/login",
    values,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "app-type": "dashboard",
      },
    }
  );

  return data;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginValues>({
    mutationFn: loginRequest,
    onSuccess: (data, variables) => {
      toast.success("Login successful");

      store.dispatch(loginSuccess({ token: data.token, user: data.user }));

      if (variables.remember) {
        Cookies.set("token", data.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};
