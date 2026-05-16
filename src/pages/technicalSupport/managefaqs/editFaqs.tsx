import { Form, Formik } from "formik";
import { TextArea } from "../../../common/textArea";
import { AddFqsValidationSchema } from "../../../constants/validationSchema";
import { useGetFaq, useUpdateFaq } from "../../../api/features/faqs.hooks";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export default function EditFaqs() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const faqId = Number(id);

    const { data, isLoading } = useGetFaq(faqId);
    const faq = data?.data;

    const { mutate, isPending } = useUpdateFaq({
        onSuccess: () => {
            toast.success("FAQ updated successfully");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
            navigate("/technicalSupport/manage/faqs");
        },
        onError: (error: any) => {
            const msg =
                error?.response?.data?.data?.errors?.question_in_english?.[0] ||
                error?.response?.data?.data?.message ||
                "Failed to update FAQ";
            toast.error(msg);
        },
    });

    return (
        <main>
            <div className={`w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen`}>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <p>Loading...</p>
                    </div>
                ) : !faq ? (
                    <div className="flex justify-center items-center h-64">
                        <p>FAQ not found</p>
                    </div>
                ) : (
                    <Formik
                        initialValues={{
                            englishQuestion: faq.question_in_english || "",
                            arabicQuestion: faq.question_in_arabic || "",
                            englishAnswar: faq.answer_in_english || "",
                            arabicAnswar: faq.answer_in_arabic || "",
                        }}
                        validationSchema={AddFqsValidationSchema}
                        enableReinitialize
                        onSubmit={(values) => {
                            mutate({
                                id: faqId,
                                data: {
                                    question_in_english: values.englishQuestion,
                                    question_in_arabic: values.arabicQuestion,
                                    answer_in_english: values.englishAnswar,
                                    answer_in_arabic: values.arabicAnswar,
                                },
                            });
                        }}
                    >
                        {({ isValid }) => (
                            <Form>
                                <div className="flex flex-wrap space-y-5 justify-between">
                                    <TextArea
                                        name="englishQuestion"
                                        label="English Question"
                                        placeholder="English Question"
                                        className="h-[200px] w-[49%]"
                                    />
                                    <TextArea
                                        name="englishAnswar"
                                        label="English Answer"
                                        placeholder="English Answer"
                                        className="h-[200px] w-[49%]"
                                    />
                                    <TextArea
                                        name="arabicQuestion"
                                        label="Arabic Question"
                                        placeholder="Arabic Question"
                                        className="h-[200px] w-[49%]"
                                    />
                                    <TextArea
                                        name="arabicAnswar"
                                        label="Arabic Answer"
                                        placeholder="Arabic Answer"
                                        className="h-[200px] w-[49%]"
                                    />
                                </div>
                                <button
                                    disabled={!isValid || isPending}
                                    type="submit"
                                    className="w-[376px] mt-30 font-bold text-[20px] rounded-xl bg-[#FFC107] py-3 disabled:opacity-50"
                                >
                                    {isPending ? "Saving..." : "Update"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </main>
    );
}
