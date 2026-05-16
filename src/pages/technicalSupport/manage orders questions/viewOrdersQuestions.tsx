import { useParams, useNavigate } from "react-router";
import { useGetOrderQuestion } from "../../../api/features/orderQuestions.hooks";
import { ArrowLeft, ArrowUpToLine } from "lucide-react";

export default function ViewOrdersQuestions() {
    const { id } = useParams();
    const navigate = useNavigate();
    const orderQuestionId = Number(id);

    const { data, isLoading } = useGetOrderQuestion(orderQuestionId);
    const question = data?.data;

    if (isLoading) {
        return (
            <main>
                <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen flex justify-center items-center">
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    if (!question) {
        return (
            <main>
                <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen flex justify-center items-center">
                    <p>Order question not found</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <button
                    onClick={() => navigate("/technicalSupport/manage/orderQuestions")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>

                <h1 className="text-2xl font-bold mb-6">Order Question Details</h1>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Question (English)</label>
                        <div className="p-3 bg-gray-50 rounded-lg">{question.order_question_in_english || "N/A"}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Question (Arabic)</label>
                        <div className="p-3 bg-gray-50 rounded-lg" dir="rtl">{question.order_question_in_arabic || "N/A"}</div>
                    </div>
                    {question.created_at && (
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
                            <div className="p-3 bg-gray-50 rounded-lg">{question.created_at}</div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => navigate(`/technicalSupport/manage/orderQuestions/edit/${id}`)}
                    className="mt-6 bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] p-2 font-semibold transition-colors"
                >
                    <ArrowUpToLine /> Edit
                </button>
            </div>
        </main>
    );
}
