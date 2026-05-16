import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { manageVatSchema } from "../../constants/validationSchema";
import { useGetCommissionVat, useUpdateCommissionVat } from "../../api/features/commissions.hooks";
import { toast } from "sonner";

export default function ManageVat() {
    const { data, isLoading } = useGetCommissionVat();
    const { mutate, isPending } = useUpdateCommissionVat({
        onSuccess: (res) => {
            toast.success(res.data.message || "VAT updated successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update VAT");
        },
    });

    return (
        <main className="w-full bg-white flex justify-center items-center shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-[90vh]">
            <Formik
                initialValues={{ vat: data?.data?.data?.vat ?? "" }}
                validationSchema={manageVatSchema}
                enableReinitialize
                onSubmit={(values) => {
                    mutate({ vat: values.vat });
                }}
            >
                {() => (
                    <Form>
                        <div className="w-[376px]">
                            <FormInput
                                name="vat"
                                label="Manage VAT (%)"
                                placeholder="Manage VAT (%)"
                                type="text"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isPending || isLoading}
                                className="py-3 bg-[#FFC107] w-full rounded-[10px] font-bold mt-5 disabled:opacity-50"
                            >
                                {isPending ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
}
