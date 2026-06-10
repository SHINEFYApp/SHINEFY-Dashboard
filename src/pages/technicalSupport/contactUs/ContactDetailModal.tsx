import { useTranslation } from "react-i18next";
import { X, Loader2 } from "lucide-react";
import { useGetContactDetail } from "@/api/features/contactUs.hooks";

interface ContactDetailModalProps {
  contactId: number | null;
  open: boolean;
  onClose: () => void;
}

export default function ContactDetailModal({ contactId, open, onClose }: ContactDetailModalProps) {
  const { t } = useTranslation();
  const { data, isLoading } = useGetContactDetail(contactId, { enabled: open && !!contactId });
  const detail = data?.data?.data;

  if (!open) return null;

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center transition-all visible opacity-100">
      <div className="w-[600px] max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#F2F2F2] h-[60px] p-5 flex justify-between items-center shrink-0">
          <h2 className="font-bold">{t("technicalSupport.contactUsDetail.title")}</h2>
          <button type="button" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : detail ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">{t("technicalSupport.contactUsDetail.senderInfo")}</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-medium text-gray-700">{t("technicalSupport.contactUsList.name")}:</span> {detail.name}</p>
                  <p><span className="font-medium text-gray-700">{t("technicalSupport.contactUsList.email")}:</span> {detail.email}</p>
                  <p><span className="font-medium text-gray-700">{t("technicalSupport.contactUsList.phoneNumber")}:</span> {detail.phone_number}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">{t("technicalSupport.contactUsDetail.userInfo")}</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-medium text-gray-700">{t("technicalSupport.contactUsList.userName")}:</span> {detail.user_name}</p>
                  <p><span className="font-medium text-gray-700">{t("technicalSupport.contactUsList.email")}:</span> {detail.user_email}</p>
                  <p><span className="font-medium text-gray-700">{t("technicalSupport.contactUsList.phoneNumber")}:</span> {detail.user_phone}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">{t("technicalSupport.contactUsDetail.messageContent")}</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{detail.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{detail.created_at}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  {t("technicalSupport.contactUsDetail.replies")} ({detail.replies?.length ?? 0})
                </h3>
                {detail.replies && detail.replies.length > 0 ? (
                  <div className="space-y-3">
                    {detail.replies.map((reply) => (
                      <div key={reply.id} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <p className="font-medium text-gray-700">{t("technicalSupport.contactUsDetail.subject")}: {reply.subject}</p>
                        <p className="text-gray-600 mt-1 whitespace-pre-wrap">{reply.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{reply.created_at}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">{t("technicalSupport.contactUsDetail.noReplies")}</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400 py-16">{t("common.noDataAvailable")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
