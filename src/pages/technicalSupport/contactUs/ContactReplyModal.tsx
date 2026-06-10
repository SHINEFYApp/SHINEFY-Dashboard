import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Loader2, Send } from "lucide-react";
import { useSendContactReply } from "@/api/features/contactUs.hooks";

interface ContactReplyModalProps {
  contactId: number | null;
  open: boolean;
  onClose: () => void;
}

export default function ContactReplyModal({ contactId, open, onClose }: ContactReplyModalProps) {
  const { t } = useTranslation();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const sendMutation = useSendContactReply(contactId ?? 0);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    sendMutation.mutate(
      { subject, message },
      {
        onSuccess: () => {
          setSubject("");
          setMessage("");
          onClose();
        },
      }
    );
  };

  const isPending = sendMutation.isPending;

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center transition-all visible opacity-100">
      <div className="w-[500px] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#F2F2F2] h-[60px] p-5 flex justify-between items-center shrink-0">
          <h2 className="font-bold">{t("technicalSupport.contactUsReply.title")}</h2>
          <button type="button" onClick={onClose} disabled={isPending}>
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label htmlFor="reply-subject" className="block text-sm font-medium text-gray-700 mb-1">
              {t("technicalSupport.contactUsReply.subject")}
            </label>
            <input
              id="reply-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t("technicalSupport.contactUsReply.subjectPlaceholder")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="reply-message" className="block text-sm font-medium text-gray-700 mb-1">
              {t("technicalSupport.contactUsReply.message")}
            </label>
            <textarea
              id="reply-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("technicalSupport.contactUsReply.messagePlaceholder")}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              disabled={isPending}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {t("technicalSupport.contactUsReply.cancel")}
            </button>
            <button
              type="submit"
              disabled={!subject.trim() || !message.trim() || isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {t("technicalSupport.contactUsReply.send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
