import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { manageDriverCommissionSchema } from "../../constants/validationSchema";
import { useGetDefaultDriverCommission, useUpdateDefaultDriverCommission } from "../../api/features/commissions.hooks";
import { toast } from "sonner";

export default function ManageDriverCommission() {
    const { data, isLoading } = useGetDefaultDriverCommission();
    const { mutate, isPending } = useUpdateDefaultDriverCommission({
        onSuccess: (res) => {
            toast.success(res.data.message || "Driver commission updated successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update driver commission");
        },
    });

    return (
        <main className="w-full bg-white flex justify-center items-center shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-[90vh]">
            <Formik
                initialValues={{
                    service: data?.data?.data?.service_per ?? "",
                    extraService: data?.data?.data?.extra_service_per ?? "",
                }}
                validationSchema={manageDriverCommissionSchema}
                enableReinitialize
                onSubmit={(values) => {
                    mutate({
                        service_per: values.service,
                        extra_service_per: values.extraService,
                    });
                }}
            >
                {() => (
                    <Form>
                        <div className="w-[376px]">
                            <FormInput
                                name="service"
                                label="Service(in %)"
                                placeholder="Service(in %)"
                                type="text"
                                disabled={isLoading}
                            />
                            <FormInput
                                name="extraService"
                                label="Extra Service(in %)"
                                placeholder="Extra Service(in %)"
                                type="text"
                                className="mt-5"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isPending || isLoading}
                                className="py-3 bg-[#FFC107] w-full rounded-[10px] font-bold mt-5 disabled:opacity-50"
                            >
                                {isPending ? "Saving..." : "Submit"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
}
