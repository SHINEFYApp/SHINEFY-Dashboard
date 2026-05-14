import { Formik, Form, FieldArray } from "formik";
import { FormInput } from "../../common/FormInput";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPackage, useUpdatePackage } from "../../api/features/compounds.hooks";
import { Button } from "../../components/ui/button";
import { Trash2, Plus } from "lucide-react";

const EditCompoundPackage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const packageId = Number(id);

    const { data, isLoading } = useGetPackage(packageId);
    const updateMutation = useUpdatePackage({
        onSuccess: () => {
            toast.success("Package updated successfully");
            navigate("/compounds/packages");
        },
        onError: () => toast.error("Failed to update package"),
    });

    const pkg = data?.data?.data;

    const handleSubmit = (values: any) => {
        const payload: any = {
            name_en: values.name_en,
            name_ar: values.name_ar,
            price: Number(values.price),
            period_days: Number(values.period_days),
        };
        if (values.description_en) payload.description_en = values.description_en;
        if (values.description_ar) payload.description_ar = values.description_ar;

        const mainServices = (values.main_services || [])
            .filter((s: any) => s.id)
            .map((s: any) => ({ id: Number(s.id), quantity: Number(s.quantity) }));
        const extraServices = (values.extra_services || [])
            .filter((s: any) => s.id)
            .map((s: any) => ({ id: Number(s.id), quantity: Number(s.quantity) }));
        const specialServices = (values.special_services || [])
            .filter((s: any) => s.id)
            .map((s: any) => ({ id: Number(s.id), quantity: Number(s.quantity) }));

        if (mainServices.length > 0) payload.main_services = mainServices;
        if (extraServices.length > 0) payload.extra_services = extraServices;
        if (specialServices.length > 0) payload.special_services = specialServices;

        updateMutation.mutate({ id: packageId, data: payload });
    };

    const mapServices = (services: any[]) =>
        (services || []).map((s: any) => ({
            id: String(s.pivot?.service_master_id || s.id || ""),
            quantity: String(s.pivot?.quantity || "1"),
        }));

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (!pkg) return <div className="p-8">Package not found.</div>;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-secondary-900">Edit Package</h1>
                    <p className="text-xs text-secondary-500">Update package details</p>
                </div>
                <Formik
                    initialValues={{
                        name_en: pkg.name_en || "",
                        name_ar: pkg.name_ar || "",
                        description_en: pkg.description_en || "",
                        description_ar: pkg.description_ar || "",
                        price: pkg.price || "",
                        period_days: pkg.period_days || "30",
                        main_services: mapServices(pkg.main_services),
                        extra_services: mapServices(pkg.extra_services),
                        special_services: mapServices(pkg.special_services),
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput name="name_en" label="Name (English) *" placeholder="Package name in English" />
                                <FormInput name="name_ar" label="Name (Arabic) *" placeholder="اسم الباقة بالعربية" />
                                <FormInput name="price" label="Price *" type="number" placeholder="0.00" />
                                <FormInput name="period_days" label="Period (Days) *" type="number" placeholder="30" />
                                <div className="md:col-span-2">
                                    <FormInput name="description_en" label="Description (English)" placeholder="Package description" />
                                </div>
                                <div className="md:col-span-2">
                                    <FormInput name="description_ar" label="Description (Arabic)" placeholder="وصف الباقة" />
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-md font-bold text-gray-800 mb-3">Main Services</h3>
                                <FieldArray name="main_services">
                                    {({ push, remove }) => (
                                        <div className="space-y-3">
                                            {values.main_services.map((_, index) => (
                                                <div key={index} className="flex gap-4 items-start">
                                                    <FormInput name={`main_services.${index}.id`} label="Service ID" type="number" placeholder="ID" className="flex-1" checkmark={false} />
                                                    <FormInput name={`main_services.${index}.quantity`} label="Quantity" type="number" placeholder="Qty" className="flex-1" checkmark={false} />
                                                    <button type="button" onClick={() => remove(index)} className="mt-8 p-2 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => push({ id: "", quantity: "1" })} className="flex items-center gap-2 text-sm text-[#4CAF50] font-semibold"><Plus size={16} /> Add Main Service</button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-md font-bold text-gray-800 mb-3">Extra Services</h3>
                                <FieldArray name="extra_services">
                                    {({ push, remove }) => (
                                        <div className="space-y-3">
                                            {values.extra_services.map((_, index) => (
                                                <div key={index} className="flex gap-4 items-start">
                                                    <FormInput name={`extra_services.${index}.id`} label="Service ID" type="number" placeholder="ID" className="flex-1" checkmark={false} />
                                                    <FormInput name={`extra_services.${index}.quantity`} label="Quantity" type="number" placeholder="Qty" className="flex-1" checkmark={false} />
                                                    <button type="button" onClick={() => remove(index)} className="mt-8 p-2 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => push({ id: "", quantity: "1" })} className="flex items-center gap-2 text-sm text-[#4CAF50] font-semibold"><Plus size={16} /> Add Extra Service</button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-md font-bold text-gray-800 mb-3">Special Services</h3>
                                <FieldArray name="special_services">
                                    {({ push, remove }) => (
                                        <div className="space-y-3">
                                            {values.special_services.map((_, index) => (
                                                <div key={index} className="flex gap-4 items-start">
                                                    <FormInput name={`special_services.${index}.id`} label="Service ID" type="number" placeholder="ID" className="flex-1" checkmark={false} />
                                                    <FormInput name={`special_services.${index}.quantity`} label="Quantity" type="number" placeholder="Qty" className="flex-1" checkmark={false} />
                                                    <button type="button" onClick={() => remove(index)} className="mt-8 p-2 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => push({ id: "", quantity: "1" })} className="flex items-center gap-2 text-sm text-[#4CAF50] font-semibold"><Plus size={16} /> Add Special Service</button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            <div className="flex justify-end gap-4 mt-8">
                                <Button type="button" variant="outline" onClick={() => navigate("/compounds/packages")}>Cancel</Button>
                                <Button type="submit" className="bg-primary text-secondary-900 hover:bg-primary-600" disabled={isSubmitting}>
                                    {isSubmitting ? "Updating..." : "Update Package"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default EditCompoundPackage;
