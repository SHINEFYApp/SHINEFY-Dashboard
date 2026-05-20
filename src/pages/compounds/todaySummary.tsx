import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetTodaySummary } from "../../api/features/compounds.hooks";
import { CalendarDays, Building2, Clock, CheckCircle, Circle } from "lucide-react";

const CompoundTodaySummary = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetTodaySummary();
    const summary = data?.data?.data;
    const compounds = summary?.compounds || [];
    const todayDate = summary?.date || new Date().toISOString().split("T")[0];

    const totalToday = useMemo(
        () => compounds.reduce((sum: number, c: any) => sum + (c.total_today || 0), 0),
        [compounds]
    );

    const totalPending = useMemo(
        () => compounds.reduce((sum: number, c: any) => sum + (c.pending || 0), 0),
        [compounds]
    );

    if (isLoading) return <div className="p-8">{t("compounds.todaySummaryPage.loading")}</div>;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-secondary-900">{t("compounds.todaySummaryPage.title")}</h1>
                    <p className="text-xs text-secondary-500">{t("compounds.todaySummaryPage.subtitle", { date: todayDate })}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                        <div className="flex items-center gap-3">
                            <CalendarDays className="w-8 h-8 text-amber-600" />
                            <div>
                                <p className="text-2xl font-bold text-amber-800">{totalToday}</p>
                                <p className="text-sm text-amber-600">{t("compounds.todaySummaryPage.totalBookingsToday")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                        <div className="flex items-center gap-3">
                            <Circle className="w-8 h-8 text-blue-600" />
                            <div>
                                <p className="text-2xl font-bold text-blue-800">{totalPending}</p>
                                <p className="text-sm text-blue-600">{t("compounds.todaySummaryPage.pending")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                        <div className="flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="text-2xl font-bold text-green-800">{compounds.length}</p>
                                <p className="text-sm text-green-600">{t("compounds.todaySummaryPage.compounds")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Per-Compound Breakdown */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t("compounds.todaySummaryPage.tableHeaders.compound")}</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">{t("compounds.todaySummaryPage.tableHeaders.totalToday")}</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">{t("compounds.todaySummaryPage.tableHeaders.pending")}</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t("compounds.todaySummaryPage.tableHeaders.serviceBoys")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compounds.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">{t("compounds.todaySummaryPage.noData")}</td>
                                </tr>
                            ) : (
                                compounds.map((c: any, i: number) => (
                                    <tr key={c.compound_id || i} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{c.compound_name}</td>
                                        <td className="px-4 py-3 text-center font-bold">{c.total_today || 0}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                                {c.pending || 0}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{c.assigned_service_boys || "-"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default CompoundTodaySummary;
