import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Clock, User, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useBookingLogs } from "../../api/features/bookings.hooks";
import type { BookingLogActivity, BookingCompanyLog, BookingCustomLog } from "../../types/bookings";
import { Pagination } from "../../common/Pagination";
import { cn } from "../../utils/utils";

interface BookingLogsModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: number | string;
    fieldLabels?: Record<string, Record<string, string>>;
}

type LogTab = "activity" | "company" | "custom";

export const BookingLogsModal = ({ isOpen, onClose, bookingId, fieldLabels }: BookingLogsModalProps) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<LogTab>("activity");
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = useBookingLogs(bookingId, 10);

    const logsData = data?.data;
    const activityLogs = logsData?.activity_logs?.data ?? [];
    const pagination = logsData?.activity_logs?.pagination;
    const companyLogs = logsData?.company_logs ?? [];
    const customLogs = logsData?.custom_logs ?? [];

    useEffect(() => {
        if (isOpen) {
            setActiveTab("activity");
            setPage(1);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const tabs: { id: LogTab; label: string; count: number }[] = [
        { id: "activity", label: t("bookings.manageBookingDetails.logs.activityLogs"), count: pagination?.total ?? activityLogs.length },
        { id: "company", label: t("bookings.manageBookingDetails.logs.companyLogs"), count: companyLogs.length },
        { id: "custom", label: t("bookings.manageBookingDetails.logs.customLogs"), count: customLogs.length },
    ];

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 shrink-0">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {t("bookings.manageBookingDetails.logs.title")}
                            </h2>
                            {logsData?.booking && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {t("bookings.manageBookingDetails.logs.bookingRef", { no: logsData.booking.booking_no })}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 px-6 pt-4 border-b border-gray-200 shrink-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative pb-3 text-sm font-semibold transition-colors",
                                    activeTab === tab.id
                                        ? "text-gray-900"
                                        : "text-gray-400 hover:text-gray-600"
                                )}
                            >
                                {tab.label}
                                <span className="ml-1.5 text-xs opacity-60">({tab.count})</span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-sm" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto flex-1 min-h-0">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="size-8 animate-spin text-primary" />
                            </div>
                        ) : isError ? (
                            <div className="flex flex-col items-center justify-center py-20 text-red-500">
                                <AlertCircle className="size-10 mb-3" />
                                <p className="text-sm font-medium">{(error as any)?.message || t("common.error")}</p>
                            </div>
                        ) : !logsData ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <AlertCircle className="size-10 mb-3" />
                                <p className="text-sm font-medium">{t("bookings.manageBookingDetails.logs.noData")}</p>
                            </div>
                        ) : (
                            <>
                                {activeTab === "activity" && (
                                    <ActivityLogsSection logs={activityLogs} fieldLabels={fieldLabels} />
                                )}
                                {activeTab === "company" && (
                                    <CompanyLogsSection logs={companyLogs} />
                                )}
                                {activeTab === "custom" && (
                                    <CustomLogsSection logs={customLogs} />
                                )}
                            </>
                        )}
                    </div>

                    {/* Footer with pagination (activity tab only) */}
                    {activeTab === "activity" && pagination && pagination.last_page > 1 && (
                        <div className="shrink-0 border-t border-gray-200">
                            <Pagination
                                currentPage={pagination.current_page}
                                totalPages={pagination.last_page}
                                totalEntries={pagination.total}
                                pageSize={pagination.per_page}
                                onPageChange={setPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

/* ─── Activity Logs ─── */
function ActivityLogsSection({ logs, fieldLabels }: { logs: BookingLogActivity[]; fieldLabels?: Record<string, Record<string, string>> }) {
    const { t } = useTranslation();

    const resolveValue = (field: string, value: string | null): string => {
        if (value === null || value === undefined) return t("bookings.manageBookingDetails.logs.null");
        const labelMap = fieldLabels?.[field];
        if (labelMap && labelMap[value]) return labelMap[value];
        return value;
    };

    if (logs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <Clock className="size-12 mb-3 opacity-50" />
                <p className="text-sm font-medium">{t("bookings.manageBookingDetails.logs.noActivityLogs")}</p>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {logs.map((log) => (
                <div key={log.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                            <span className={cn(
                                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize",
                                log.event === "updated" ? "bg-blue-50 text-blue-700" :
                                log.event === "created" ? "bg-green-50 text-green-700" :
                                log.event === "deleted" ? "bg-red-50 text-red-700" :
                                "bg-gray-50 text-gray-700"
                            )}>
                                {log.event}
                            </span>
                            <span className="text-sm text-gray-500">{log.description}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <User className="size-3.5" />
                            <span>{log.causer.name}</span>
                        </div>
                    </div>
                    {/* Changes */}
                    {log.changes.length > 0 && (
                        <div className="px-4 py-3 space-y-2">
                            {log.changes.map((change, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm">
                                    <span className="font-medium text-gray-600 min-w-[100px]">{change.field}:</span>
                                    <span className="text-red-500 line-through bg-red-50 px-2 py-0.5 rounded text-xs">
                                        {resolveValue(change.field, change.old_value)}
                                    </span>
                                    <ArrowRight className="size-3.5 text-gray-300 shrink-0" />
                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-medium">
                                        {resolveValue(change.field, change.new_value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Timestamp */}
                    <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="size-3" />
                        {log.created_at}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─── Company Logs ─── */
function CompanyLogsSection({ logs }: { logs: BookingCompanyLog[] }) {
    const { t } = useTranslation();
    if (logs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <AlertCircle className="size-12 mb-3 opacity-50" />
                <p className="text-sm font-medium">{t("bookings.manageBookingDetails.logs.noCompanyLogs")}</p>
            </div>
        );
    }
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left font-semibold text-gray-600 pb-3 pr-4">{t("bookings.manageBookingDetails.logs.company")}</th>
                        <th className="text-left font-semibold text-gray-600 pb-3 pr-4">{t("bookings.manageBookingDetails.logs.user")}</th>
                        <th className="text-left font-semibold text-gray-600 pb-3 pr-4">{t("bookings.manageBookingDetails.logs.email")}</th>
                        <th className="text-right font-semibold text-gray-600 pb-3 pr-4">{t("bookings.manageBookingDetails.logs.subTotal")}</th>
                        <th className="text-right font-semibold text-gray-600 pb-3 pr-4">{t("bookings.manageBookingDetails.logs.benefit")}</th>
                        <th className="text-right font-semibold text-gray-600 pb-3">{t("bookings.manageBookingDetails.logs.benefitAmount")}</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id} className="border-b border-gray-100 last:border-0">
                            <td className="py-3 pr-4 font-medium text-gray-800">{log.company_name}</td>
                            <td className="py-3 pr-4 text-gray-600">{log.user_name}</td>
                            <td className="py-3 pr-4 text-gray-500">{log.user_email}</td>
                            <td className="py-3 pr-4 text-right font-medium text-gray-800">EGP {Number(log.sub_total).toFixed(2)}</td>
                            <td className="py-3 pr-4 text-right text-gray-600">{log.benefit_percentage}%</td>
                            <td className="py-3 text-right font-semibold text-green-600">EGP {Number(log.benefit_amount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {logs.length > 0 && (
                <p className="text-xs text-gray-400 mt-4 text-center">
                    {t("bookings.manageBookingDetails.logs.companyLogsCount", { count: logs.length })}
                </p>
            )}
        </div>
    );
}

/* ─── Custom Logs ─── */
function CustomLogsSection({ logs }: { logs: BookingCustomLog[] }) {
    const { t } = useTranslation();
    if (logs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <AlertCircle className="size-12 mb-3 opacity-50" />
                <p className="text-sm font-medium">{t("bookings.manageBookingDetails.logs.noCustomLogs")}</p>
            </div>
        );
    }
    return (
        <div className="space-y-3">
            {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-purple-50 flex items-center justify-center">
                            <User className="size-4 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {t("bookings.manageBookingDetails.logs.userId")}: #{log.user_id}
                            </p>
                            <p className="text-xs text-gray-400 capitalize">{log.type}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="size-3" />
                        {log.created_at}
                    </div>
                </div>
            ))}
            {logs.length > 0 && (
                <p className="text-xs text-gray-400 text-center pt-2">
                    {t("bookings.manageBookingDetails.logs.customLogsCount", { count: logs.length })}
                </p>
            )}
        </div>
    );
}
