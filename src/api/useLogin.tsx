import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import api from "./service/axios";

const baseURL = import.meta.env.VITE_API_URL as string;

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
    "/admin/api/dashboard/login",
    values,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        app_type: "dashboard",
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
