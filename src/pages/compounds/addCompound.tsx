import { Formik, Form } from "formik";
import { FormInput } from "../../common/FormInput";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateCompound } from "../../api/features/compounds.hooks";
import DrawMap from "../../common/map";
import { Button } from "../../components/ui/button";

const AddCompound = () => {
    const navigate = useNavigate();

    const createMutation = useCreateCompound({
        onSuccess: () => {
            toast.success("Compound created successfully");
            navigate("/compounds/manage");
        },
        onError: () => toast.error("Failed to create compound"),
    });

    const handleSubmit = (values: any) => {
        const payload: any = {
            code: values.code,
            name_en: values.name_en,
            name_ar: values.name_ar,
        };
        if (values.city) payload.city = values.city;
        if (values.address) payload.address = values.address;
        if (values.area_vertices && values.area_vertices.length > 0) {
            payload.area_vertices = values.area_vertices;
        }
        createMutation.mutate(payload);
    };

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-secondary-900">Add Compound</h1>
                    <p className="text-xs text-secondary-500">Create a new compound</p>
                </div>
                <Formik
                    initialValues={{
                        code: "",
                        name_en: "",
                        name_ar: "",
                        city: "",
                        address: "",
                        area_vertices: [],
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values }) => (
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
                                    {isSubmitting ? "Creating..." : "Create Compound"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
};

export default AddCompound;
