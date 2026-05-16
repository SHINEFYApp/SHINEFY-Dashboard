import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { FormInput } from "../../common/FormInput";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCompound, useUpdateCompound, useGetPackages } from "../../api/features/compounds.hooks";
import DrawMap from "../../common/map";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";

const EditCompound = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const compoundId = Number(id);

    const { data, isLoading } = useGetCompound(compoundId);
    const updateMutation = useUpdateCompound({
        onSuccess: () => {
            toast.success("Compound updated successfully");
            navigate("/compounds/manage");
        },
        onError: () => toast.error("Failed to update compound"),
    });

    const { data: packagesData } = useGetPackages({ limit: 200 });
    const allPackages = (packagesData?.data?.data?.packages || []) as any[];

    const compound = data?.data?.data;

    const [initialValues, setInitialValues] = useState({
        code: "",
        name_en: "",
        name_ar: "",
        city: "",
        address: "",
        area_vertices: [] as { lat: number; lng: number }[],
        package_ids: [] as number[],
    });

    useEffect(() => {
        if (compound) {
            let parsedAreaVertices: { lat: number; lng: number }[] = [];
            if (compound.area_vertices) {
                try {
                    const raw = compound.area_vertices;
                    parsedAreaVertices = typeof raw === 'string' ? JSON.parse(raw) : raw;
                } catch {
                    parsedAreaVertices = [];
                }
            }
            if (!Array.isArray(parsedAreaVertices)) parsedAreaVertices = [];

            const compoundPackages = compound.packages || [];
            const pkgIds = compoundPackages.map((p: any) => Number(p.id ?? p.package_id));

            setInitialValues({
                code: compound.code || "",
                name_en: compound.name_en || "",
                name_ar: compound.name_ar || "",
                city: compound.city || "",
                address: compound.address || "",
                area_vertices: parsedAreaVertices,
                package_ids: pkgIds,
            });
        }
    }, [compound]);

    const handleSubmit = (values: any) => {
        const payload: any = {
            code: values.code,
            name_en: values.name_en,
            name_ar: values.name_ar,
            package_ids: values.package_ids,
        };
        if (values.city) payload.city = values.city;
        if (values.address) payload.address = values.address;
        if (values.area_vertices && values.area_vertices.length > 0) {
            payload.area_vertices = values.area_vertices;
        }
        updateMutation.mutate({ id: compoundId, data: payload });
    };

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (!compound) return <div className="p-8">Compound not found.</div>;

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-secondary-900">Edit Compound</h1>
                    <p className="text-xs text-secondary-500">Update compound details</p>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput name="code" label="Code *" placeholder="e.g. CMP003" />
                                <FormInput name="name_en" label="Name (English) *" placeholder="Compound name in English" />
                                <FormInput name="name_ar" label="Name (Arabic) *" placeholder="اسم المجمع بالعربية" />
                                <FormInput name="city" label="City" placeholder="City name" />
                                <div className="md:col-span-2">
                                    <FormInput name="address" label="Address" placeholder="Street address" />
                                </div>
                            </div>

                            {allPackages.length > 0 && (
                                <div className="mt-6">
                                    <label className="text-sm font-medium text-gray-700 block mb-3">
                                        Assigned Packages
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {allPackages.map((pkg: any) => {
                                            const isChecked = values.package_ids.includes(Number(pkg.id));
                                            return (
                                                <label
                                                    key={pkg.id}
                                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                                                        isChecked
                                                            ? "border-primary bg-primary/5"
                                                            : "border-gray-200 bg-white hover:border-gray-300"
                                                    }`}
                                                >
                                                    <Checkbox
                                                        checked={isChecked}
                                                        onCheckedChange={(checked) => {
                                                            const id = Number(pkg.id);
                                                            if (checked) {
                                                                setFieldValue("package_ids", [...values.package_ids, id]);
                                                            } else {
                                                                setFieldValue("package_ids", values.package_ids.filter((pid: number) => pid !== id));
                                                            }
                                                        }}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{pkg.name_en}</p>
                                                        <p className="text-xs text-gray-500">{pkg.price} EGP</p>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6">
                                <label className="text-sm font-medium text-gray-700 block mb-2">
                                    Area Polygon (draw on map)
                                </label>
                                <DrawMap name="area_vertices" />
                                {values.area_vertices && values.area_vertices.length > 0 && (
                                    <p className="text-xs text-green-600 mt-1">
                                        {values.area_vertices.length} points drawn
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/compounds/manage")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-primary text-secondary-900 hover:bg-primary-600"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Updating..." : "Update Compound"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default EditCompound;
