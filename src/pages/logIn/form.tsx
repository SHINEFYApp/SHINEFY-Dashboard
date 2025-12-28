import { Form, Formik, Field, ErrorMessage } from "formik";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import type { LoginFormInitialValues } from "../../constants/initialValues";
import { LoginFormValidationSchema } from "../../constants/validationSchema";
import { Checkbox } from "../../components/ui/checkbox";
import { useDispatch } from 'react-redux';
import { useLogin } from "../../api/useLogin";
import { loginSuccess } from "../../redux/slices/authSlice";

export default function LogInForm() {
    const [showPass, setShowPass] = useState<boolean>(false);

    const initialValues: LoginFormInitialValues = {
        email: "",
        password: "",
        remember: false
    };

    const dispatch = useDispatch();
    const loginMutation = useLogin();

    const handleSubmit = async (values: LoginFormInitialValues) => {
        const data = await loginMutation.mutateAsync(values);
        dispatch(loginSuccess({ user: data.user, token: data.token }));
    };

    return (
        <Formik initialValues={initialValues} validationSchema={LoginFormValidationSchema} onSubmit={handleSubmit}>
        {({ isValid, isSubmitting , values , setFieldValue }) => (
            <Form>
            <div className="w-full flex flex-col gap-[30px]">
                <div className="w-full rounded-[10px] border border-[#F4F5F6] p-5 bg-[#FFFFFF] flex flex-col justify-between">
                    {/* Email Field */}
                    <div className=" w-full flex flex-col gap-1">
                        <Label htmlFor="email" className="text-[16px] font-medium text-[#242731]">Email</Label>
                        <Field
                            as={Input}
                            name="email"
                            type="email"
                            id="email"
                            className="h-[59px] placeholder:text-[16px] outline-0 placeholder:text-[#616161] rounded-[10px] border border-[#616161] py-[19px] px-5"
                            placeholder="uistore@gmail.com"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Password Field */}
                    <div className=" w-full flex flex-col gap-1">
                        <Label htmlFor="password" className="text-[16px] font-medium text-[#242731]">Password</Label>
                        <div className="w-full h-[59px] relative">
                            <Field
                                as={Input}
                                name="password"
                                type={showPass ? "text" : "password"}
                                id="password"
                                className="size-full placeholder:text-[16px] outline-0 placeholder:text-[#616161] rounded-[10px] border border-[#616161] py-[19px] px-5"
                                placeholder="password"
                            />
                            <div className="h-full w-[15%] flex justify-center items-center absolute top-0 right-0">
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="cursor-pointer"
                                >
                                    {showPass ? <EyeClosed /> : <Eye />}
                                </button>
                            </div>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                 {/* Remember Me */}
                <div className="mb-4 flex items-center gap-2">
                    <Checkbox
                        id="remember"
                        checked={values.remember}
                        onCheckedChange={(checked) => setFieldValue("remember", checked)}
                    />
                    <Label htmlFor="remember">Remember Me</Label>
                </div>

                {/* Submit Button */}
                <div className="w-full h-[60px] rounded-[10px] overflow-hidden">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="size-full bg-[#FFC107] cursor-pointer text-[#FFFAF7] text-[20px] font-bold"
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                </div>
            </div>
            </Form>
        )}
        </Formik>
    );
}
