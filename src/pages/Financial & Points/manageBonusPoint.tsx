import { Form, Formik } from "formik";
import { FormInput } from "../../common/FormInput";
import { manageBounusPointsSchema } from "../../constants/validationSchema";
import { FormDropdown } from "../../common/FormDropdown";
import { useGetBonusPoint, useUpdateBonusPoint } from "../../api/features/commissions.hooks";
import { toast } from "sonner";

export default function ManageBonusPoint() {
    const { data, isLoading } = useGetBonusPoint();
    const { mutate, isPending } = useUpdateBonusPoint({
        onSuccess: (res) => {
            toast.success(res.data.message || "Bonus point updated successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update bonus point");
        },
    });

    const status = data?.data?.data?.bonus_on_off_status;
    const initialStatus = status === 1 ? "On" : status === 0 ? "Off" : "";

    return (
        <main className="w-full bg-white flex justify-center items-center shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-[90vh]">
            <Formik
                initialValues={{
                    bounusPoints: initialStatus,
                    bonusPercentage: data?.data?.data?.bonus_percentage ?? "",
                }}
                validationSchema={manageBounusPointsSchema}
                enableReinitialize
                onSubmit={(values) => {
                    mutate({
                        status: values.bounusPoints === "On" ? 1 : 0,
                        bonus_percentage: values.bonusPercentage,
                    });
                }}
            >
                {() => (
                    <Form>
                        <div className="w-[376px]">
                            <FormDropdown
                                name="bounusPoints"
                                label="Select bonus point Status :"
                                placeholder="Select bonus point Status"
                                options={[
                                    'On',
                                    'Off',
                                ]}
                                disabled={isLoading}
                            />
                            <FormInput
                                name="bonusPercentage"
                                label="Bonus Percentage :"
                                placeholder="Bonus Percentage"
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
