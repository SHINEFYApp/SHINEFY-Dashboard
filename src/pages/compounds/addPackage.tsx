import { Formik, Form, FieldArray } from "formik";
import { FormInput } from "../../common/FormInput";
import { FormDropdown } from "../../common/FormDropdown";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreatePackage } from "../../api/features/compounds.hooks";
import { useGetServices } from "../../api/features/services.hooks";
import { useGetExtraServices } from "../../api/features/extraServices.hooks";
import { useGetSpecialServices } from "../../api/features/specialServices.hooks";
import { Button } from "../../components/ui/button";
import { Trash2, Plus } from "lucide-react";
import type { FormTextArea } from "../../types/common";

const mapServiceId = (name: string, list: any[]) => {
    const found = list.find(item => item.name === name);
    return found ? Number(found.id) : 0;
};

const AddCompoundPackage = () => {
    const navigate = useNavigate();

    const { data: mainServicesData } = useGetServices({ start: 0, length: 100 });
    const { data: extraServicesData } = useGetExtraServices({ start: 0, length: 100 });
    const { data: specialServicesData } = useGetSpecialServices({ per_page: 100 });

    const buildServiceList = (data: any, nameField: string) =>
        (data?.data?.services || []).map((s: any) => ({ id: s.id, name: s[nameField] }));

    const availableMainServices = buildServiceList(mainServicesData, "service_name");
    const availableExtraServices = buildServiceList(extraServicesData, "extra_service_name");
    const availableSpecialServices = buildServiceList(specialServicesData, "name_en");

    const createMutation = useCreatePackage({
        onSuccess: () => {
            toast.success("Package created successfully");
            navigate("/compounds/packages");
        },
        onError: () => toast.error("Failed to create package"),
    });

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
            .filter((s: any) => s.service_name)
            .map((s: any) => ({ id: mapServiceId(s.service_name, availableMainServices), quantity: Number(s.quantity) }));
        const extraServices = (values.extra_services || [])
            .filter((s: any) => s.service_name)
            .map((s: any) => ({ id: mapServiceId(s.service_name, availableExtraServices), quantity: Number(s.quantity) }));
        const specialServices = (values.special_services || [])
            .filter((s: any) => s.service_name)
            .map((s: any) => ({ id: mapServiceId(s.service_name, availableSpecialServices), quantity: Number(s.quantity) }));

        if (mainServices.length > 0) payload.main_services = mainServices;
        if (extraServices.length > 0) payload.extra_services = extraServices;
        if (specialServices.length > 0) payload.special_services = specialServices;

        createMutation.mutate(payload);
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-secondary-900">Add Package</h1>
                    <p className="text-xs text-secondary-500">Create a new package for compounds</p>
                </div>
                <Formik
                    initialValues={{
                        name_en: "",
                        name_ar: "",
                        description_en: "",
                        description_ar: "",
                        price: "",
                        period_days: "30",
                        main_services: [] as { service_name: string; quantity: string }[],
                        extra_services: [] as { service_name: string; quantity: string }[],
                        special_services: [] as { service_name: string; quantity: string }[],
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

                            {/* Main Services */}
                            <div className="mt-8">
                                <h3 className="text-md font-bold text-gray-800 mb-3">Main Services</h3>
                                <FieldArray name="main_services">
                                    {({ push, remove }) => (
                                        <div className="space-y-3">
                                            {values.main_services.map((_, index) => (
                                                <div key={index} className="flex gap-4 items-start">
                                                    <FormDropdown
                                                        name={`main_services.${index}.service_name`}
                                                        label="Service Name"
                                                        placeholder="Select Service"
                                                        options={availableMainServices.map(s => s.name)}
                                                        className="flex-1"
                                                    />
                                                    <FormInput
                                                        name={`main_services.${index}.quantity`}
                                                        label="Quantity"
                                                        type="number"
                                                        placeholder="Qty"
                                                        className="flex-1"
                                                        checkmark={false}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="mt-8 p-2 text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => push({ service_name: "", quantity: "1" })}
                                                className="flex items-center gap-2 text-sm text-[#4CAF50] font-semibold"
                                            >
                                                <Plus size={16} /> Add Main Service
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            {/* Extra Services */}
                            <div className="mt-8">
                                <h3 className="text-md font-bold text-gray-800 mb-3">Extra Services</h3>
                                <FieldArray name="extra_services">
                                    {({ push, remove }) => (
                                        <div className="space-y-3">
                                            {values.extra_services.map((_, index) => (
                                                <div key={index} className="flex gap-4 items-start">
                                                    <FormDropdown
                                                        name={`extra_services.${index}.service_name`}
                                                        label="Service Name"
                                                        placeholder="Select Service"
                                                        options={availableExtraServices.map(s => s.name)}
                                                        className="flex-1"
                                                    />
                                                    <FormInput
                                                        name={`extra_services.${index}.quantity`}
                                                        label="Quantity"
                                                        type="number"
                                                        placeholder="Qty"
                                                        className="flex-1"
                                                        checkmark={false}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="mt-8 p-2 text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => push({ service_name: "", quantity: "1" })}
                                                className="flex items-center gap-2 text-sm text-[#4CAF50] font-semibold"
                                            >
                                                <Plus size={16} /> Add Extra Service
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            {/* Special Services */}
                            <div className="mt-8">
                                <h3 className="text-md font-bold text-gray-800 mb-3">Special Services</h3>
                                <FieldArray name="special_services">
                                    {({ push, remove }) => (
                                        <div className="space-y-3">
                                            {values.special_services.map((_, index) => (
                                                <div key={index} className="flex gap-4 items-start">
                                                    <FormDropdown
                                                        name={`special_services.${index}.service_name`}
                                                        label="Service Name"
                                                        placeholder="Select Service"
                                                        options={availableSpecialServices.map(s => s.name)}
                                                        className="flex-1"
                                                    />
                                                    <FormInput
                                                        name={`special_services.${index}.quantity`}
                                                        label="Quantity"
                                                        type="number"
                                                        placeholder="Qty"
                                                        className="flex-1"
                                                        checkmark={false}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="mt-8 p-2 text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => push({ service_name: "", quantity: "1" })}
                                                className="flex items-center gap-2 text-sm text-[#4CAF50] font-semibold"
                                            >
                                                <Plus size={16} /> Add Special Service
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            <div className="flex justify-end gap-4 mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/compounds/packages")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-primary text-secondary-900 hover:bg-primary-600"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating..." : "Create Package"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default AddCompoundPackage;
