import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { ChevronDown, Calendar, FileDown } from "lucide-react";
import { Formik, Form } from "formik";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { FormDropdown } from "../../../common/FormDropdown";
import { dummyDays, dummyMonths, dummyYears } from "../../../constants/data";
import { generateChartData } from "../../../utils/utils";
import type { ReportFilters } from "../../../types/bookings";

const CompletedBookingChart = () => {
    const [selectedYear, setSelectedYear] = useState("2025");
    const [selectedMonth, setSelectedMonth] = useState("January");
    const [chartData] = useState(generateChartData(dummyDays));

    const initialValues: ReportFilters = {
        status: "",
        startDate: "",
        endDate: "",
    };

    const statuses = ["All", "Completed", "Pending", "Cancelled"];

    const getBarColor = (index: number) => index % 2 === 1 ? "#FFC107" : "#FF7043";

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload?.length) {
            return (
                <div className="bg-secondary-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                    {payload[0].value}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl mt-6">
            {/* Header with Filters */}
            <div className="mb-6">
                <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
                    <Form>
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Title */}
                            <h1 className="text-xl md:text-2xl font-bold text-secondary-900 mr-10">
                                Bookings Reports
                            </h1>

                            {/* Filters */}
                            <div className="w-36 -space-y-2">
                                <FormDropdown name="status" label="" placeholder="Status" options={statuses} className="mb-0" />
                            </div>

                            <div className="w-40 -space-y-2">
                                <FormDatePicker name="startDate" label="" placeholder="Start Date" icon={<Calendar className="w-5 h-5" />} className="mb-0" checkmark={false} />
                            </div>

                            <div className="w-40 -space-y-2">
                                <FormDatePicker name="endDate" label="" placeholder="End Date" icon={<Calendar className="w-5 h-5" />} className="mb-0" checkmark={false} />
                            </div>

                            <button type="submit" className="px-8 py-3 bg-primary rounded-lg text-secondary-900 font-semibold hover:bg-primary-600 mr-auto transition-all">
                                Search
                            </button>

                            <button type="button" className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                                <FileDown className="w-4 h-4 text-[#1B8354]" />
                                <span className="hidden lg:inline">Export Count</span>
                            </button>

                            <button type="button" className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                                <FileDown className="w-4 h-4 text-[#1B8354]" />
                                <span className="hidden lg:inline">Export Details</span>
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>

            {/* Chart */}
            <div className="bg-[#F4F5FA] px-6 md:px-8 py-6 rounded-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-secondary-900">
                        Completed Bookings
                    </h2>

                    <div className="flex gap-3">
                        <div className="relative">
                            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-gray-50">
                                {dummyYears.map((year) => <option key={year}>{year}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer hover:bg-gray-50">
                                {dummyMonths.map((month) => <option key={month}>{month}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="w-full h-[300px] md:h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="0" stroke="#E5E7EB" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} ticks={[0, 20, 40, 60, 80]} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {chartData.map((_, index) => <Cell key={`cell-${index}`} fill={getBarColor(index)} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CompletedBookingChart;
