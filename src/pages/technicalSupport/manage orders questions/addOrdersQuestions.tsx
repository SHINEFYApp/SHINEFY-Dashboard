import { Form, Formik } from "formik";
import { TextArea } from "../../../common/textArea";
import { AddOrdersQuestionsSchema } from "../../../constants/validationSchema";
import { useAddOrderQuestion } from "../../../api/features/orderQuestions.hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export default function AddOrdersQuestions() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useAddOrderQuestion({
        onSuccess: () => {
            toast.success("Order question added successfully");
            queryClient.invalidateQueries({ queryKey: ["order-questions"] });
            navigate("/technicalSupport/manage/orderQuestions");
        },
        onError: (error: any) => {
            const msg =
                error?.response?.data?.data?.message ||
                "Failed to add order question";
            toast.error(msg);
        },
    });

    return (
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                <Formik
                    initialValues={{
                        questionEnglish: "",
                        questionArabic: "",
                    }}
                    validationSchema={AddOrdersQuestionsSchema}
                    onSubmit={(values) => {
                        mutate({
                            order_question_in_english: values.questionEnglish,
                            order_question_in_arabic: values.questionArabic,
                        });
                    }}
                >
                    {({ isValid }) => (
                        <Form>
                            <div className="flex justify-between">
                                <TextArea
                                    name="questionEnglish"
                                    label="Question (English)"
                                    placeholder="Enter Message"
                                    className="h-[200px] w-[49%]"
                                />
                                <TextArea
                                    name="questionArabic"
                                    label="Question Arabic"
                                    placeholder="Enter Message"
                                    className="h-[200px] w-[49%]"
                                />
                            </div>
                            <button
                                disabled={!isValid || isPending}
                                type="submit"
                                className="w-[376px] mt-30 font-bold text-[20px] rounded-xl bg-[#FFC107] py-3 disabled:opacity-50"
                            >
                                {isPending ? "Saving..." : "Save"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}
