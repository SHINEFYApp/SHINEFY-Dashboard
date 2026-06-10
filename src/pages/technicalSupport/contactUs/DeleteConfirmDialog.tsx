import { useTranslation } from "react-i18next";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function DeleteConfirmDialog({ open, onClose, onConfirm, isLoading }: DeleteConfirmDialogProps) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center transition-all visible opacity-100">
      <div className="w-[400px] bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-gray-700 font-medium">{t("technicalSupport.deleteConfirm")}</p>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {t("technicalSupport.contactUsList.no")}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("technicalSupport.contactUsList.yes")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
