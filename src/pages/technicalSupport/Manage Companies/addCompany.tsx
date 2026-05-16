import { useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { FormInput } from "../../../common/FormInput";
import { FormDropdown } from "../../../common/FormDropdown";
import { FormDatePicker } from "../../../common/FormDatePicker";
import { addCompanyValidationSchema } from "../../../constants/validationSchema";
import { addCompanyInitialValues } from "../../../constants/initialValues";
import { useCreateCompany } from "../../../api/features/companies.hooks";
import { useGetServices } from "../../../api/features/services.hooks";
import { useGetExtraServices } from "../../../api/features/extraServices.hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { IoCheckmarkCircle, IoChevronDown, IoSearch } from "react-icons/io5";
import { X, Check } from "lucide-react";

const booleanOptions = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
];

function ServiceMultiSelect({ name, label, options, selected, onChange }: {
    name: string;
    label: string;
    options: { id: number; name: string }[];
    selected: number[];
    onChange: (ids: number[]) => void;
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        if (!search) return options;
        return options.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()));
    }, [options, search]);

    const toggle = (id: number) => {
        if (selected.includes(id)) {
            onChange(selected.filter((s) => s !== id));
        } else {
            onChange([...selected, id]);
        }
    };

    return (
        <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center rounded-xl border bg-gray-50 px-4 py-3.5 text-sm font-medium border-gray-200"
            >
                <span className={selected.length === 0 ? "text-gray-400" : "text-gray-900"}>
                    {selected.length === 0 ? "Select options" : `${selected.length} selected`}
                </span>
                <IoChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {options.filter((o) => selected.includes(o.id)).map((o) => (
                        <span key={o.id} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {o.name}
                            <button type="button" onClick={() => toggle(o.id)} className="hover:text-red-500">
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            {open && (
                <div className="absolute z-50 w-full mt-1 rounded-xl border bg-white shadow-lg max-h-72 overflow-hidden flex flex-col">
                    <div className="flex items-center gap-2 px-3 py-2 border-b">
                        <IoSearch className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full bg-transparent text-sm outline-none"
                            autoFocus
                        />
                    </div>
                    <div className="overflow-auto flex-1">
                        {filtered.length === 0 ? (
                            <div className="p-4 text-center text-sm text-gray-400">No options</div>
                        ) : (
                            filtered.map((o) => {
                                const isSelected = selected.includes(o.id);
                                return (
                                    <button
                                        key={o.id}
                                        type="button"
                                        onClick={() => toggle(o.id)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 text-left"
                                    >
                                        <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                                            {isSelected && <Check size={12} className="text-white" />}
                                        </span>
                                        <span className={isSelected ? "font-medium" : ""}>{o.name}</span>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AddCompany() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: servicesData } = useGetServices({ start: 0, length: 1000 });
    const { data: extraServicesData } = useGetExtraServices({ start: 0, length: 1000 });

    const serviceOptions = useMemo(() => {
        const list = servicesData?.data?.services || [];
        return list.map((s: any) => ({ id: s.service_id, name: s.service_name }));
    }, [servicesData]);

    const extraServiceOptions = useMemo(() => {
        const list = extraServicesData?.data?.services || [];
        return list.map((s: any) => ({ id: s.extra_service_id, name: s.extra_service_name }));
    }, [extraServicesData]);

    const { mutate, isPending } = useCreateCompany({
        onSuccess: () => {
            toast.success("Company added successfully");
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            navigate("/technicalSupport/manage/companies");
        },
        onError: (error: any) => {
            const msg =
                error?.response?.data?.data?.message ||
                error?.response?.data?.message ||
                "Failed to add company";
            toast.error(msg);
        },
    });

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl min-h-screen">
                <Formik
                    initialValues={addCompanyInitialValues}
                    validationSchema={addCompanyValidationSchema}
                    onSubmit={(values) => {
                        mutate({
                            name: values.name,
                            email_extension: values.email_extension || null,
                            code: values.code,
                            num_of_users: Number(values.num_of_users),
                            percentage: Number(values.percentage),
                            company_benefit_percentage: Number(values.company_benefit_percentage),
                            apply_on_services: values.apply_on_services === "1" ? true : values.apply_on_services === "0" ? false : null,
                            apply_on_extra_services: values.apply_on_extra_services === "1" ? true : values.apply_on_extra_services === "0" ? false : null,
                            start_date: values.start_date,
                            end_date: values.end_date,
                            services_ids: values.services_ids.length > 0 ? values.services_ids : null,
                            extra_services_ids: values.extra_services_ids.length > 0 ? values.extra_services_ids : null,
                        });
                    }}
                >
                    {({ isValid, values, setFieldValue }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <FormInput name="name" label="Company Name" placeholder="Enter company name" />
                                <FormInput name="email_extension" label="Email Extension" placeholder="e.g. company.com" />
                                <FormInput name="code" label="Company Code" placeholder="Enter company code" />
                                <FormInput name="num_of_users" label="Number of Users" type="number" placeholder="Enter max users" />
                                <FormInput name="percentage" label="Discount Percentage" type="number" placeholder="Enter percentage" />
                                <FormInput name="company_benefit_percentage" label="Company Benefit Percentage" type="number" placeholder="Enter benefit percentage" />
                                <FormDropdown name="apply_on_services" label="Apply on Services" placeholder="Select" options={booleanOptions} />
                                <FormDropdown name="apply_on_extra_services" label="Apply on Extra Services" placeholder="Select" options={booleanOptions} />
                                <FormDatePicker name="start_date" label="Start Date" placeholder="Select start date" checkmark={false} />
                                <FormDatePicker name="end_date" label="End Date" placeholder="Select end date" checkmark={false} />
                                <ServiceMultiSelect
                                    name="services_ids"
                                    label="Services"
                                    options={serviceOptions}
                                    selected={values.services_ids}
                                    onChange={(ids) => setFieldValue("services_ids", ids)}
                                />
                                <ServiceMultiSelect
                                    name="extra_services_ids"
                                    label="Extra Services"
                                    options={extraServiceOptions}
                                    selected={values.extra_services_ids}
                                    onChange={(ids) => setFieldValue("extra_services_ids", ids)}
                                />
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button
                                    disabled={!isValid || isPending}
                                    type="submit"
                                    className="w-full max-w-[376px] font-bold text-[20px] rounded-xl bg-[#FFC107] py-3 disabled:opacity-50 hover:bg-[#e6ae06] transition-colors"
                                >
                                    {isPending ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}
