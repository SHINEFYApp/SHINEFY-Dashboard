import { useState } from "react";
import { useParams, Link } from "react-router";
import { useGetCompany } from "../../../api/features/companies.hooks";
import { ArrowLeft, Calendar } from "lucide-react";
import { Form, Formik } from "formik";
import { FormDatePicker } from "../../../common/FormDatePicker";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

export default function ViewCompany() {
    const { id } = useParams();
    const companyId = Number(id);
    const [formDate, setFormDate] = useState("");
    const [toDate, setToDate] = useState("");

    const { data, isLoading } = useGetCompany(companyId, {
        form_date: formDate || undefined,
        to_date: toDate || undefined,
    });

    const detail = data?.data;
    const company = detail?.company;
    const bookings = detail?.bookings || [];
    const users = detail?.users || [];

    if (isLoading) {
        return (
            <main>
                <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen flex justify-center items-center">
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    if (!company) {
        return (
            <main>
                <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen flex justify-center items-center">
                    <p>Company not found</p>
                </div>
            </main>
        );
    }

    const details = [
        { label: "ID", value: company.id },
        { label: "Name", value: company.name },
        { label: "Code", value: company.code },
        { label: "Email Extension", value: company.email_extension || "-" },
        { label: "Number of Users", value: company.num_of_users },
        { label: "Discount Percentage", value: `${company.percentage}%` },
        { label: "Company Benefit Percentage", value: `${company.company_benefit_percentage}%` },
        { label: "Apply on Services", value: company.apply_on_services ? "Yes" : "No" },
        { label: "Apply on Extra Services", value: company.apply_on_extra_services ? "Yes" : "No" },
        { label: "Start Date", value: company.start_date },
        { label: "End Date", value: company.end_date },
        { label: "Created At", value: company.created_at },
        { label: "Service IDs", value: company.services_ids?.length ? company.services_ids.join(", ") : "-" },
        { label: "Extra Service IDs", value: company.extra_services_ids?.length ? company.extra_services_ids.join(", ") : "-" },
    ];

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen space-y-6">
                <Link
                    to="/technicalSupport/manage/companies"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Companies</span>
                </Link>

                <h1 className="text-xl font-bold text-secondary-900">Company Details</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {details.map((detail) => (
                        <div key={detail.label} className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{detail.label}</p>
                            <p className="text-sm font-medium text-gray-900">{detail.value}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-lg font-bold text-secondary-900">Charts</h2>
                        <Formik
                            initialValues={{ form_date: formDate, to_date: toDate }}
                            onSubmit={(values) => {
                                setFormDate(values.form_date);
                                setToDate(values.to_date);
                            }}
                        >
                            {() => (
                                <Form className="flex flex-col sm:flex-row items-end gap-3">
                                    <FormDatePicker name="form_date" label="From Date" placeholder="From" checkmark={false} />
                                    <FormDatePicker name="to_date" label="To Date" placeholder="To" checkmark={false} />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-black rounded-lg text-white text-sm font-semibold hover:bg-black/85 whitespace-nowrap"
                                    >
                                        Filter
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">Bookings</h3>
                            {bookings.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={bookings}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date_type" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total_operations" fill="#FFC107" name="Total Operations" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm">
                                    No booking data available
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">Users</h3>
                            {users.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={users}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date_type" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total" fill="#1976D2" name="Total Users" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm">
                                    No user data available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
